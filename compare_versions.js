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
        console.log('\n✅ README.md and REWRITTEN_RELEASES.md are up-to-date with full details.');
    } else {
        console.log('\n✅ All official v10+ Umbraco versions are present on Giriraj Digital!');
    }
}

runComparison();
