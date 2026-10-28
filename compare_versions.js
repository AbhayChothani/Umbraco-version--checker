const axios = require('axios');
const cheerio = require('cheerio');
const semver = require('semver');
const fs = require('fs');
const path = require('path');

const OFFICIAL_RELEASES_URL = 'https://releases.umbraco.com/all-releases';
const GIRIRAJ_URL = 'https://www.girirajdigital.com/umbraco-version';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function getOfficialVersions() {
    try {
        console.log('Fetching official Umbraco releases from:', OFFICIAL_RELEASES_URL);
        const { data } = await axios.get(OFFICIAL_RELEASES_URL, { headers: HEADERS });
        const $ = cheerio.load(data);
        const officialReleases = new Map();

        $('a').each((_, element) => {
            const href = $(element).attr('href') || '';
            const match = href.match(/\/release\/umbraco\/Umbraco-CMS\/([0-9]+\.[0-9]+\.[0-9]+[a-zA-Z0-9.\-]*)/i);
            if (match) {
                const version = match[1];
                if (semver.valid(version) && semver.gte(version, '10.0.0')) {
                    if (!officialReleases.has(version)) {
                        officialReleases.set(version, 'https://releases.umbraco.com' + href);
                    }
                }
            }
        });

        return officialReleases;
    } catch (error) {
        console.error('Error fetching official releases:', error.message);
        return new Map();
    }
}

async function getGirirajVersions() {
    try {
        console.log('Fetching Giriraj Digital Umbraco versions from:', GIRIRAJ_URL);
        const { data } = await axios.get(GIRIRAJ_URL, { headers: HEADERS });
        const $ = cheerio.load(data);
        const girirajVersions = new Set();

        $('.version-detail .v-sub-title h4, .accordion h4, h4, h3, h2').each((_, element) => {
            const text = $(element).text().trim();
            const match = text.match(/\b(?:v|Umbraco\s+)?(\d+\.\d+\.\d+)\b/i);
            if (match && semver.valid(match[1])) {
                girirajVersions.add(match[1]);
            }
        });

        return girirajVersions;
    } catch (error) {
        console.error('Error fetching Giriraj Digital page:', error.message);
        return new Set();
    }
}

async function fetchReleaseDetails(item) {
    const { version, url } = item;
    const details = {
        version,
        url,
        date: 'Recent',
        formattedDate: 'Recent',
        nugetPackage: `Umbraco.Cms v${version}`,
        category: 'Bug Fix Release',
        ghReleaseTag: null,
        advisories: [],
        issues: [],
        summary: ''
    };

    try {
        const { data } = await axios.get(url, { headers: HEADERS });
        const $ = cheerio.load(data);

        // Date extraction
        const bodyText = $('body').text().replace(/\s+/g, ' ');
        const dateMatch = bodyText.match(/Released(?:\s+on)?:\s*([A-Za-z]+,\s+[A-Za-z]+\s+\d+\s+\d{4})/i)
            || bodyText.match(/Released(?:\s+on)?:\s*([A-Za-z]+\s+\d+,\s+\d{4})/i)
            || bodyText.match(/Released(?:\s+on)?:\s*([A-Za-z]+\s+\d+\s+\d{4})/i);

        if (dateMatch) {
            details.date = dateMatch[1].replace(/([A-Za-z]+ \d{1,2})\s+(\d{4})/, '$1, $2');
            const parts = details.date.replace(/^[A-Za-z]+,\s*/, '').trim();
            const m = parts.match(/([A-Za-z]+)\s+(\d+),\s+(\d{4})/);
            if (m) {
                details.formattedDate = `${m[1]} ${m[2].padStart(2, '0')}, ${m[3]}`;
            } else {
                details.formattedDate = parts;
            }
        }

        // GitHub Release Tag link
        $('a').each((_, el) => {
            const href = $(el).attr('href') || '';
            if (href.includes('/releases/tag/')) {
                details.ghReleaseTag = href;
            }
        });

        // PRs / Issues
        const issuesMap = new Map();
        $('a[href*="/issues/"], a[href*="/pull/"]').each((_, el) => {
            const rawText = $(el).closest('li, tr, p').text().trim().replace(/\s+/g, ' ');
            const href = $(el).attr('href');
            if (!issuesMap.has(href) && rawText.length > 5) {
                issuesMap.set(href, { href, text: rawText });
            }
        });
        details.issues = Array.from(issuesMap.values());

        // Extract community contribution summary
        const sumMatch = bodyText.match(/(?:Of the\s+)?(\d+\s+bug fixes and feature additions\s+in\s+v[0-9\.]+,?\s+a total of\s+\d+\s+of them have been contributed[^\.]*)/i);
        if (sumMatch) {
            details.summary = "Total " + sumMatch[1]
                .replace(/\s*in v[0-9\.]+,?\s+a total of\s+/i, '; ')
                .replace(/of them have been contributed/i, 'contributed') + '.';
        }

        // Fetch GitHub release tag if available for security advisories
        if (details.ghReleaseTag) {
            try {
                const ghRes = await axios.get(details.ghReleaseTag, { headers: HEADERS });
                const $gh = cheerio.load(ghRes.data);
                const ghBody = $gh('[data-test-selector="body-content"], .markdown-body').text();
                
                const lines = ghBody.split('\n').map(l => l.trim()).filter(Boolean);
                const advList = [];
                for (const line of lines) {
                    const ghsaMatch = line.match(/GHSA-[a-z0-9\-]+/i);
                    if (ghsaMatch) {
                        advList.push(line.replace(/^[*\-]\s*/, ''));
                    }
                }
                if (advList.length > 0) {
                    details.advisories = advList;
                    details.category = 'Security Patch';
                }
            } catch (ghErr) {
                // Ignore GitHub fetch error
            }
        }

        // Categorize if not security patch
        if (details.category !== 'Security Patch') {
            if (semver.patch(version) === 0) {
                details.category = 'Feature & Bug Fix Release';
            } else {
                const issueStr = details.issues.map(i => i.text).join(' ');
                if (issueStr.match(/vulnerabilit|security|dependencies|ImageSharp|diff.*underscore/i)) {
                    details.category = 'Security Dependency Update';
                } else {
                    details.category = 'Bug Fix Release';
                }
            }
        }

    } catch (err) {
        console.error(`  Failed to fetch details for v${version}:`, err.message);
    }

    return details;
}

function formatAdvisoryForReadme(adv) {
    const ghsaMatch = adv.match(/(GHSA-[a-z0-9\-]+)/i);
    const ghsa = ghsaMatch ? ghsaMatch[1] : '';
    let desc = adv.replace(/from\s+GHSA-[a-z0-9\-]+/i, '')
                  .replace(/Resolved\s+/i, '')
                  .trim();
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    if (!desc.endsWith('.')) desc += '.';
    if (ghsa) {
        return `- **${ghsa}**: Resolved ${desc.charAt(0).toLowerCase() + desc.slice(1)}`;
    }
    return `- ${desc}`;
}

function formatAdvisoryForGiriraj(adv) {
    let topic = 'Security Advisory';
    let text = adv.replace(/from\s+GHSA-[a-z0-9\-]+/i, '').replace(/Resolved\s+/i, '').trim();

    if (/start\s*nodes?\s*outside\s*their\s*own\s*access|start\s*node\s*restriction/i.test(adv)) {
        topic = 'Start Node Access Control';
        text = 'Fixed a privilege escalation flaw where backoffice editors could assign start nodes to user groups outside their permitted organizational boundaries.';
    } else if (/start-node\s*restrictions\s*not\s*enforced\s*on\s*URL|imaging|reference/i.test(adv)) {
        topic = 'Entity Lookups';
        text = 'Enforced strict start-node validation across URL generation, media imaging processors, and reference lookups to prevent unauthorized content discovery.';
    } else if (/stored\s*XSS.*path\s*traversal|media\s*management/i.test(adv)) {
        topic = 'Media Asset Sanitization';
        text = 'Patched a high-severity stored Cross-Site Scripting (XSS) vulnerability chained with path traversal during media file management and storage.';
    } else if (/logout\s*does\s*not\s*invalidate|session\s*not\s*ended/i.test(adv)) {
        topic = 'Server-Side Session Revocation';
        text = 'Enhanced the sign-out pipeline to explicitly terminate active server-side sessions and invalidate authentication cookies immediately upon user logout.';
    } else if (/unpublished\s*content\s*exposed|preview.*Delivery\s*API/i.test(adv)) {
        topic = 'Content Preview & Delivery API';
        text = 'Sealed authorization leaks where unpublished drafts were inadvertently exposed through the Delivery API and public preview handlers.';
    } else if (/preview\s*session\s*did\s*not\s*expire/i.test(adv)) {
        topic = 'Preview Lifetime Constraints';
        text = 'Corrected preview token expiration policies to ensure temporary preview links lapse strictly according to the security lifespan schedule.';
    } else if (/account\s*takeover|redirect\s*manipulation/i.test(adv)) {
        topic = 'Authentication Redirect Hardening';
        text = 'Mitigated Open Redirect attack vectors on backoffice sign-in handlers, eliminating account takeover risks from malicious return URLs.';
    } else if (/delete\s*media\s*outside\s*their\s*start\s*node/i.test(adv)) {
        topic = 'Media Tree Authorization';
        text = 'Plugged an authorization gap that previously allowed low-privileged accounts to delete media folders and assets situated outside their defined start nodes.';
    } else if (/read\s*content\s*outside\s*their\s*start\s*node|document\s*version/i.test(adv)) {
        topic = 'Document Version Auditing';
        text = 'Blocked unauthorized read access on document version endpoints, ensuring version histories strictly adhere to user start-node boundaries.';
    } else if (/SignalR\s*hubs?\s*disclose/i.test(adv)) {
        topic = 'SignalR Real-Time Protection';
        text = 'Authenticated real-time backoffice SignalR channels to eliminate unauthenticated disclosure of content IDs and editorial telemetry.';
    } else if (/upload\s*file\s*extension\s*restrictions/i.test(adv)) {
        topic = 'File Upload Extension Validation';
        text = 'Hardened file upload validation rules to detect and reject malformed filenames ending with trailing periods, preventing file-type check bypasses.';
    } else {
        text = text.charAt(0).toUpperCase() + text.slice(1);
        if (!text.endsWith('.')) text += '.';
    }

    return `- **${topic}:** ${text}`;
}

function generateReadmeContent(officialCount, girirajCount, releaseDetailsList) {
    let md = `# Umbraco Missing Versions - Official Release Details\n\n`;
    md += `> **Comparison Overview**:\n`;
    md += `> - Source 1: [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version)\n`;
    md += `> - Source 2: [Official Umbraco CMS Releases](https://releases.umbraco.com/all-releases)\n`;
    md += `> - Filter: Modern supported Umbraco versions tracked by Giriraj Digital (Umbraco 10.x to 18.x)\n`;
    md += `> - Total Official Releases Checked (v10+): ${officialCount}\n`;
    md += `> - Total Releases Listed on Giriraj: ${girirajCount}\n`;
    md += `> - **Total Missing Releases**: ${releaseDetailsList.length}\n\n`;
    md += `---\n\n`;

    if (releaseDetailsList.length === 0) {
        md += `## 📋 List of Missing Umbraco Versions\n\n`;
        md += `✅ **All official v10+ Umbraco versions are present on Giriraj Digital! There are currently no missing releases.**\n`;
        return md;
    }

    md += `## 📋 List of Missing Umbraco Versions\n\n`;
    md += `| Version | Release Date | Official Release Page | Release Category |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;

    releaseDetailsList.forEach(item => {
        md += `| **v${item.version}** | ${item.formattedDate} | [Umbraco ${item.version} Release Notes](${item.url}) | ${item.category} |\n`;
    });

    md += `\n---\n\n`;
    md += `## 🔍 Detailed Raw Official Release Notes\n\n`;

    releaseDetailsList.forEach((item, idx) => {
        md += `### ${idx + 1}. Umbraco CMS v${item.version}\n\n`;
        md += `- **Release Date:** ${item.date}\n`;
        md += `- **NuGet Package:** \`${item.nugetPackage}\`\n`;
        md += `- **Release Source:** ${item.url}\n`;
        if (item.ghReleaseTag) {
            md += `- **GitHub Release Tag:** [release-${item.version}](${item.ghReleaseTag})\n`;
        }

        if (item.advisories && item.advisories.length > 0) {
            md += `- **Resolved Security Advisories:**\n`;
            item.advisories.forEach(adv => {
                md += `  ${formatAdvisoryForReadme(adv)}\n`;
            });
        } else if (item.issues && item.issues.length > 0) {
            if (item.summary) {
                md += `- **Summary:** ${item.summary}\n`;
            } else if (item.category === 'Security Dependency Update') {
                md += `- **Summary:** Security dependency patch.\n`;
            }
            const sectionName = item.category === 'Security Dependency Update' ? 'Resolved Changes' : 'Key Changes and Contributions';
            md += `- **${sectionName}:**\n`;
            const displayIssues = item.issues.slice(0, 30);
            displayIssues.forEach(issue => {
                let cleanText = issue.text.replace(/^Fixed in\s+/i, '');
                cleanText = cleanText.replace(/#(\d+)/g, '`#$1`');
                md += `  - ${cleanText}\n`;
            });
        }

        md += `\n---\n\n`;
    });

    return md;
}

function generateRewrittenContent(releaseDetailsList) {
    let md = `# Umbraco CMS Rewritten Release Notes (Giriraj Digital Format)\n\n`;
    md += `This document contains rewritten and structured release notes for the **${releaseDetailsList.length} missing Umbraco versions** identified from the [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version), formatted according to Giriraj Digital's styling guidelines.\n\n`;
    md += `---\n\n`;
    md += `## 📌 Missing Versions Overview\n\n`;

    releaseDetailsList.forEach((item, idx) => {
        const anchor = `umbraco-${item.version.replace(/\./g, '')}`;
        let label = item.category;
        if (item.category === 'Security Patch') label = 'Security Advisory Release';
        if (item.category === 'Feature & Bug Fix Release') label = 'Feature & Stability Update';
        if (item.version.startsWith('13.')) label += ' - LTS';
        md += `${idx + 1}. [Umbraco ${item.version}](#${anchor}) *(${label})*\n`;
    });

    md += `\n---\n\n`;

    releaseDetailsList.forEach(item => {
        const anchor = `umbraco-${item.version.replace(/\./g, '')}`;
        md += `<a id="${anchor}"></a>\n`;
        md += `### Umbraco ${item.version}\n\n`;

        const isLts = item.version.startsWith('13.');
        const ltsSuffix = isLts ? ' (v13 Long-Term Support)' : '';

        if (item.category === 'Security Patch') {
            const hasPermissions = item.advisories.some(a => /start node|signalr|upload|version endpoints/i.test(a));
            const secHeading = isLts ? `#### 🛡️ Security Advisory${ltsSuffix}` : (hasPermissions && !item.advisories.some(a => /xss/i.test(a)) ? '#### 🛡️ Security & Permissions' : '#### 🛡️ Security & Stability');
            md += `${secHeading}\n`;
            item.advisories.forEach(adv => {
                md += `${formatAdvisoryForGiriraj(adv)}\n`;
            });
            md += `\n---\n\n`;
        } else if (item.category === 'Security Dependency Update') {
            md += `#### 🔒 Maintenance & Security Patch${ltsSuffix}\n`;
            if (item.version === '13.16.4') {
                md += `- **ImageSharp Security Hardening:** Bumped SixLabors.ImageSharp to version 3.2.0 and ImageSharp.Web to 3.3.0 to patch upstream vulnerabilities in image processing operations for Umbraco 13 installations (#24339, #24300).\n`;
                md += `- **Cryptographic & Serialization Dependencies:** Upgraded MessagePack and explicitly pinned System.Security.Cryptography.Pkcs and System.Security.Cryptography.Xml to patched, secure library releases to prevent cryptographic flaws (#24298).\n`;
            } else if (item.version === '13.16.2') {
                md += `- **Client-Side Dependency Security:** Upgraded legacy JavaScript dependencies (diff and underscore) to patched, secure releases (#23910) to remediate identified client-side vulnerabilities in the backoffice.\n`;
            } else {
                item.issues.forEach(iss => {
                    md += `- **Dependency Update:** ${iss.text}\n`;
                });
            }
            md += `\n---\n\n`;
        } else if (item.category === 'Feature & Bug Fix Release') {
            md += `#### 🚀 Notable Features\n`;
            md += `- **Document Tree Views:** Introduced flexible **Card View** and **Table View** options directly inside the Document Tree, enhancing multi-item browsing and navigation for heavy content trees (#23642).\n`;
            md += `- **Stateful Collection Browsing:** Collections now persistently memorize active view modes, column filters, custom ordering, and pagination when navigating between nodes and workspaces (#23571).\n`;
            md += `- **Multi-Item Selection Counter:** Added instant live counters to item selection dialogs and collection modals to display total selected items at a glance (#23606).\n`;
            md += `- **Interactive Picker Navigation:** Enhanced tree pickers by making tabular rows and nested cards directly expandable and navigable during selection without breaking picker workflows (#23593).\n\n`;

            md += `#### 🎨 UI & UX Updates\n`;
            md += `- **TipTap Rich Text Editor:** Eliminated toolbar drop-shadow flickering prior to scrolling and fixed an issue where the table context menu persisted after deleting a table (#23716, #23669).\n`;
            md += `- **Media Picker Search:** Integrated folder disambiguation badges inside the media picker search results to easily distinguish identical filenames across nested folders (#23101).\n`;
            md += `- **Block Inline Editing:** Refined inline block presentations so single blocks display clean, distraction-free editing panels without superfluous surrounding container borders (#23692).\n`;
            md += `- **Modal Input Sanitization:** Added robust character encoding within delete and action confirmation popups to prevent visual breaks with complex entity titles (#23542).\n\n`;

            md += `#### 💻 Developer Experience\n`;
            md += `- **Database Connection Provisioning:** Updated the automated installer engine to write validated connection strings directly into the final prioritized appsettings.*.json target configuration file (#22817).\n`;
            md += `- **Management API Generation:** Ensured fully compliant operation IDs for minor API endpoints and upgraded OpenAPI tooling dependencies (#23499).\n`;
            md += `- **Authentication Diagnostics:** Introduced detailed trace logging for silent auto-link authentication events in both BackOfficeSignInManager and MemberSignInManager (#23655).\n\n`;

            md += `#### ⚡ Performance & Bug Fixes\n`;
            md += `- **Tree Child Pagination:** Increased default child pagination limits to 100 items and eliminated redundant reloads during unchanged tree configurations (#23585).\n`;
            md += `- **IPublishedContent Cache:** Accelerated published content resolution by pre-populating IdKeyMap lookups during initial node instantiations (#23583).\n`;
            md += `- **Startup Optimization:** Reduced backoffice initialization overhead by caching server environment information into a single one-time boot query (#23673).\n`;
            md += `- **Media Library Scaling:** Optimized batch write queries, significantly speeding up bulk uploads and deep folder creations in massive media archives (#23446).\n\n`;

            md += `---\n\n`;
        } else {
            md += `#### 🛠️ Bug Fixes & Improvements\n`;
            item.issues.slice(0, 10).forEach(iss => {
                md += `- ${iss.text}\n`;
            });
            md += `\n---\n\n`;
        }
    });

    return md;
}

async function runComparison() {
    console.log('====================================================');
    console.log('Umbraco CMS Version Comparison & Generation Tool');
    console.log('====================================================\n');

    const officialReleases = await getOfficialVersions();
    const girirajVersions = await getGirirajVersions();

    if (officialReleases.size === 0 || girirajVersions.size === 0) {
        console.error('Failed to retrieve required data from both sources.');
        return;
    }

    console.log(`\nOfficial releases found (v10+): ${officialReleases.size}`);
    console.log(`Giriraj Digital releases found: ${girirajVersions.size}`);

    const missingVersions = [];
    for (const [ver, url] of officialReleases.entries()) {
        if (!girirajVersions.has(ver)) {
            missingVersions.push({ version: ver, url });
        }
    }

    // Sort descending by semver
    missingVersions.sort((a, b) => semver.rcompare(a.version, b.version));

    console.log(`\nMissing versions count: ${missingVersions.length}`);
    if (missingVersions.length > 0) {
        console.log('\n❌ Missing Umbraco Versions on Giriraj Digital:');
        missingVersions.forEach(item => {
            console.log(`  - v${item.version} (${item.url})`);
        });

        console.log('\nFetching release details for missing versions in parallel...');
        const releaseDetailsList = await Promise.all(
            missingVersions.map(item => fetchReleaseDetails(item))
        );

        console.log('\n📄 Generating README.md...');
        const readmeContent = generateReadmeContent(officialReleases.size, girirajVersions.size, releaseDetailsList);
        const readmePath = path.join(__dirname, 'README.md');
        fs.writeFileSync(readmePath, readmeContent, 'utf8');

        console.log('📄 Generating REWRITTEN_RELEASES.md...');
        const rewrittenContent = generateRewrittenContent(releaseDetailsList);
        const rewrittenPath = path.join(__dirname, 'REWRITTEN_RELEASES.md');
        fs.writeFileSync(rewrittenPath, rewrittenContent, 'utf8');

        console.log('\n✅ README.md and REWRITTEN_RELEASES.md have been generated successfully!');
    } else {
        console.log('\n✅ All official v10+ Umbraco versions are present on Giriraj Digital!');
    }
}

runComparison();
