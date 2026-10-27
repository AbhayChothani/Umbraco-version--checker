# Umbraco CMS Rewritten Release Notes (Giriraj Digital Format)

This document contains rewritten and structured release notes for the **8 missing Umbraco versions** identified from the [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version), formatted according to Giriraj Digital's styling guidelines.

---

## 📌 Missing Versions Overview

1. [Umbraco 18.2.2](#umbraco-1822) *(Security Advisory Release)*
2. [Umbraco 18.2.1](#umbraco-1821) *(Security Advisory Release)*
3. [Umbraco 18.2.0](#umbraco-1820) *(Feature & Stability Update)*
4. [Umbraco 17.7.2](#umbraco-1772) *(Security Advisory Release)*
5. [Umbraco 17.7.1](#umbraco-1771) *(Security Advisory Release)*
6. [Umbraco 17.7.0](#umbraco-1770) *(Feature & Stability Update)*
7. [Umbraco 13.16.3](#umbraco-13163) *(Security Advisory Release - LTS)*
8. [Umbraco 13.16.2](#umbraco-13162) *(Security Dependency Patch - LTS)*

---

<a id="umbraco-1822"></a>
### Umbraco 18.2.2

#### 🛡️ Security & Stability
- **Start Node Access Control:** Fixed a privilege escalation flaw where backoffice editors could assign start nodes to user groups outside their permitted organizational boundaries.
- **Entity Lookups:** Enforced strict start-node validation across URL generation, media imaging processors, and reference lookups to prevent unauthorized content discovery.
- **Media Asset Sanitization:** Patched a high-severity stored Cross-Site Scripting (XSS) vulnerability chained with path traversal during media file management and storage.
- **Server-Side Session Revocation:** Enhanced the sign-out pipeline to explicitly terminate active server-side sessions and invalidate authentication cookies immediately upon user logout.
- **Content Preview & Delivery API:** Sealed authorization leaks where unpublished drafts were inadvertently exposed through the Delivery API and public preview handlers.
- **Preview Lifetime Constraints:** Corrected preview token expiration policies to ensure temporary preview links lapse strictly according to the security lifespan schedule.
- **Authentication Redirect Hardening:** Mitigated Open Redirect attack vectors on backoffice sign-in handlers, eliminating account takeover risks from malicious return URLs.

---

<a id="umbraco-1821"></a>
### Umbraco 18.2.1

#### 🛡️ Security & Permissions
- **Media Tree Authorization:** Plugged an authorization gap that previously allowed low-privileged accounts to delete media folders and assets situated outside their defined start nodes.
- **Document Version Auditing:** Blocked unauthorized read access on document version endpoints, ensuring version histories strictly adhere to user start-node boundaries.
- **SignalR Real-Time Protection:** Authenticated real-time backoffice SignalR channels to eliminate unauthenticated disclosure of content IDs and editorial telemetry.
- **File Upload Extension Validation:** Hardened file upload validation rules to detect and reject malformed filenames ending with trailing periods, preventing file-type check bypasses.

---

<a id="umbraco-1820"></a>
### Umbraco 18.2.0

#### 🚀 Notable Features
- **Document Tree Views:** Introduced flexible **Card View** and **Table View** options directly inside the Document Tree, enhancing multi-item browsing and navigation for heavy content trees.
- **Stateful Collection Browsing:** Collections now persistently memorize active view modes, column filters, custom ordering, and pagination when navigating between nodes and workspaces.
- **Multi-Item Selection Counter:** Added instant live counters to item selection dialogs and collection modals to display total selected items at a glance.
- **Interactive Picker Navigation:** Enhanced tree pickers by making tabular rows and nested cards directly expandable and navigable during selection without breaking picker workflows.

#### 🎨 UI & UX Updates
- **TipTap Rich Text Editor:** Eliminated jarring toolbar drop-shadow flickering prior to scrolling and fixed an issue where the table context menu persisted after deleting a table.
- **Media Picker Search:** Integrated folder disambiguation badges inside the media picker search results to easily distinguish identical filenames across nested folders.
- **Variant Switcher Smoothness:** Smoothed out culture switches by removing temporary fallback text flickers during language and variant transitions.
- **Block Inline Editing:** Refined inline block presentations so single blocks display clean, distraction-free editing panels without superfluous surrounding container borders.
- **Modal Input Sanitization:** Added robust character encoding within delete and action confirmation popups to prevent visual breaks with complex entity titles.

#### 💻 Developer Experience
- **Database Connection Provisioning:** Updated the automated installer engine to write validated connection strings directly into the final prioritized `appsettings.*.json` environment file.
- **Unrestricted Local Testing:** Enabled seamless backoffice access and previewing across insecure local network contexts (plain HTTP via direct IP addresses) for Docker and local dev environments.
- **Reactive Configuration Repositories:** Streamlined store-backed config observables via an abstract reactive base, eliminating the need for manual initialization awaits in custom plugins.
- **Management API Versioning:** Modernized operation ID generation across minor API endpoints and upgraded OpenAPI tooling dependencies (`@hey-api/openapi-ts`).
- **Authentication Diagnostics:** Introduced detailed trace logging for silent auto-link authentication events in both `BackOfficeSignInManager` and `MemberSignInManager`.
- **OpenIddict Scalability:** Resolved concurrency race conditions during multi-instance clustered application registration.

#### ⚡ Performance & Bug Fixes
- **Tree Child Pagination:** Increased default child pagination limits to 100 items and eliminated redundant reloads during unchanged tree configurations.
- **IPublishedContent Cache:** Accelerated published content resolution by pre-populating `IdKeyMap` lookups during initial node instantiations.
- **Startup Optimization:** Reduced backoffice initialization overhead by caching server environment information into a single one-time boot query.
- **Media Library Scaling:** Optimized batch write queries, significantly speeding up bulk uploads and deep folder creations in massive media archives.
- **Block Variant Synchronization:** Corrected nested block editor models where saving subsets of variants could inadvertently shift values onto adjacent blocks.
- **Upgraded Dependencies:** Bumped TipTap to v3.29 along with the latest underlying .NET and npm packages.

---

<a id="umbraco-1772"></a>
### Umbraco 17.7.2

#### 🛡️ Security & Stability (LTS Track)
- **Start Node Access Control:** Backported security fix ensuring backoffice users cannot assign user groups start nodes that surpass their own permissions.
- **Entity Lookups Hardening:** Enforced start-node boundary checks across URL segment resolvers, media image crops, and relation lookups.
- **Media Management XSS Patch:** Resolved a stored XSS vulnerability combined with path traversal in backoffice media handling.
- **Logout Session Invalidation:** Ensured server-side cookie tokens and sessions are completely invalidated upon logging out.
- **Delivery API Content Privacy:** Prevented unpublished drafts from leaking into website preview mechanisms and the Delivery API.
- **Preview Session Security:** Fixed preview authentication lifecycles to automatically expire abandoned preview tokens.
- **Sign-in Redirect Protection:** Secured backoffice login redirects against arbitrary open-redirect destinations.

---

<a id="umbraco-1771"></a>
### Umbraco 17.7.1

#### 🛡️ Security & Permissions (LTS Track)
- **Media Start Node Bypass:** Restricted unauthorized asset removal by preventing low-privilege users from deleting items beyond their start nodes.
- **Version Endpoint Auditing:** Prevented unauthorized document version history reads across restricted tree paths.
- **SignalR Hub Security:** Added authorization gates to backoffice SignalR broadcast hubs to prevent editorial metadata leaks.
- **Upload Filename Validation:** Disallowed trailing period bypass tricks during file extension verification.

---

<a id="umbraco-1770"></a>
### Umbraco 17.7.0

#### 🚀 Notable Features & Backoffice Experience
- **Card and Table Tree Views:** Brought responsive card and table displays to Document Tree structures, mirroring modern content layout workflows.
- **Persistent Collection States:** Preserved filter rules, page positions, and sort orders in collection workspaces across editorial navigation.
- **Selection Modal Badges:** Added live selection count badges to tree and collection item picker dialogues.
- **Navigable Tree Picker Rows:** Allowed users to drill down into child branches directly from table and card rows in picker overlays.

#### 🛠️ Platform & Performance
- **Installer Appsettings Resolution:** Directed database connection strings to the final prioritized `appsettings.*.json` target.
- **TipTap RTE Stability:** Resolved toolbar shadow rendering glitches and eliminated residual table floating menus after deletion.
- **Variant Value Alignment:** Prevented nested block data shifting when selectively saving subset culture variants.
- **Bulk Media Operations:** Enhanced file I/O and SQL batching for fast folder indexing and bulk media uploads.
- **Performance Caching:** Pre-populated `IdKeyMap` indices to boost cold-read performance in high-traffic installations.

---

<a id="umbraco-13163"></a>
### Umbraco 13.16.3

#### 🛡️ Security Advisory (v13 Long-Term Support)
- **Start Node Permission Bypass:** Resolved a critical backoffice permission bypass (**GHSA-r4qv-c8pg-qq59**) where administrative or delegated users could grant user groups start nodes outside their authorized section roots. Recommended immediate upgrade for all Umbraco 13 installations.

---

<a id="umbraco-13162"></a>
### Umbraco 13.16.2

#### 🔒 Maintenance & Security Patch (v13 Long-Term Support)
- **Client-Side Dependency Security:** Upgraded legacy JavaScript dependencies (`diff` and `underscore`) to patched, secure releases (**#23910**) to remediate identified client-side vulnerabilities in the backoffice.
