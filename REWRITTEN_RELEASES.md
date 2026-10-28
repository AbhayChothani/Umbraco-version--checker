# Umbraco CMS Rewritten Release Notes (Giriraj Digital Format)

This document contains rewritten and structured release notes for the **9 missing Umbraco versions** identified from the [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version), formatted according to Giriraj Digital's styling guidelines.

---

## 📌 Missing Versions Overview

1. [Umbraco 18.2.2](#umbraco-1822) *(Security Advisory Release)*
2. [Umbraco 18.2.1](#umbraco-1821) *(Security Advisory Release)*
3. [Umbraco 18.2.0](#umbraco-1820) *(Feature & Stability Update)*
4. [Umbraco 17.7.2](#umbraco-1772) *(Security Advisory Release)*
5. [Umbraco 17.7.1](#umbraco-1771) *(Security Advisory Release)*
6. [Umbraco 17.7.0](#umbraco-1770) *(Feature & Stability Update)*
7. [Umbraco 13.16.4](#umbraco-13164) *(Security Dependency Update - LTS)*
8. [Umbraco 13.16.3](#umbraco-13163) *(Security Advisory Release - LTS)*
9. [Umbraco 13.16.2](#umbraco-13162) *(Security Dependency Update - LTS)*

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
- **Document Tree Views:** Introduced flexible **Card View** and **Table View** options directly inside the Document Tree, enhancing multi-item browsing and navigation for heavy content trees (#23642).
- **Stateful Collection Browsing:** Collections now persistently memorize active view modes, column filters, custom ordering, and pagination when navigating between nodes and workspaces (#23571).
- **Multi-Item Selection Counter:** Added instant live counters to item selection dialogs and collection modals to display total selected items at a glance (#23606).
- **Interactive Picker Navigation:** Enhanced tree pickers by making tabular rows and nested cards directly expandable and navigable during selection without breaking picker workflows (#23593).

#### 🎨 UI & UX Updates
- **TipTap Rich Text Editor:** Eliminated toolbar drop-shadow flickering prior to scrolling and fixed an issue where the table context menu persisted after deleting a table (#23716, #23669).
- **Media Picker Search:** Integrated folder disambiguation badges inside the media picker search results to easily distinguish identical filenames across nested folders (#23101).
- **Block Inline Editing:** Refined inline block presentations so single blocks display clean, distraction-free editing panels without superfluous surrounding container borders (#23692).
- **Modal Input Sanitization:** Added robust character encoding within delete and action confirmation popups to prevent visual breaks with complex entity titles (#23542).

#### 💻 Developer Experience
- **Database Connection Provisioning:** Updated the automated installer engine to write validated connection strings directly into the final prioritized appsettings.*.json target configuration file (#22817).
- **Management API Generation:** Ensured fully compliant operation IDs for minor API endpoints and upgraded OpenAPI tooling dependencies (#23499).
- **Authentication Diagnostics:** Introduced detailed trace logging for silent auto-link authentication events in both BackOfficeSignInManager and MemberSignInManager (#23655).

#### ⚡ Performance & Bug Fixes
- **Tree Child Pagination:** Increased default child pagination limits to 100 items and eliminated redundant reloads during unchanged tree configurations (#23585).
- **IPublishedContent Cache:** Accelerated published content resolution by pre-populating IdKeyMap lookups during initial node instantiations (#23583).
- **Startup Optimization:** Reduced backoffice initialization overhead by caching server environment information into a single one-time boot query (#23673).
- **Media Library Scaling:** Optimized batch write queries, significantly speeding up bulk uploads and deep folder creations in massive media archives (#23446).

---

<a id="umbraco-1772"></a>
### Umbraco 17.7.2

#### 🛡️ Security & Stability
- **Start Node Access Control:** Fixed a privilege escalation flaw where backoffice editors could assign start nodes to user groups outside their permitted organizational boundaries.
- **Entity Lookups:** Enforced strict start-node validation across URL generation, media imaging processors, and reference lookups to prevent unauthorized content discovery.
- **Media Asset Sanitization:** Patched a high-severity stored Cross-Site Scripting (XSS) vulnerability chained with path traversal during media file management and storage.
- **Server-Side Session Revocation:** Enhanced the sign-out pipeline to explicitly terminate active server-side sessions and invalidate authentication cookies immediately upon user logout.
- **Content Preview & Delivery API:** Sealed authorization leaks where unpublished drafts were inadvertently exposed through the Delivery API and public preview handlers.
- **Preview Lifetime Constraints:** Corrected preview token expiration policies to ensure temporary preview links lapse strictly according to the security lifespan schedule.
- **Authentication Redirect Hardening:** Mitigated Open Redirect attack vectors on backoffice sign-in handlers, eliminating account takeover risks from malicious return URLs.

---

<a id="umbraco-1771"></a>
### Umbraco 17.7.1

#### 🛡️ Security & Permissions
- **Media Tree Authorization:** Plugged an authorization gap that previously allowed low-privileged accounts to delete media folders and assets situated outside their defined start nodes.
- **Document Version Auditing:** Blocked unauthorized read access on document version endpoints, ensuring version histories strictly adhere to user start-node boundaries.
- **SignalR Real-Time Protection:** Authenticated real-time backoffice SignalR channels to eliminate unauthenticated disclosure of content IDs and editorial telemetry.
- **File Upload Extension Validation:** Hardened file upload validation rules to detect and reject malformed filenames ending with trailing periods, preventing file-type check bypasses.

---

<a id="umbraco-1770"></a>
### Umbraco 17.7.0

#### 🚀 Notable Features
- **Document Tree Views:** Introduced flexible **Card View** and **Table View** options directly inside the Document Tree, enhancing multi-item browsing and navigation for heavy content trees (#23642).
- **Stateful Collection Browsing:** Collections now persistently memorize active view modes, column filters, custom ordering, and pagination when navigating between nodes and workspaces (#23571).
- **Multi-Item Selection Counter:** Added instant live counters to item selection dialogs and collection modals to display total selected items at a glance (#23606).
- **Interactive Picker Navigation:** Enhanced tree pickers by making tabular rows and nested cards directly expandable and navigable during selection without breaking picker workflows (#23593).

#### 🎨 UI & UX Updates
- **TipTap Rich Text Editor:** Eliminated toolbar drop-shadow flickering prior to scrolling and fixed an issue where the table context menu persisted after deleting a table (#23716, #23669).
- **Media Picker Search:** Integrated folder disambiguation badges inside the media picker search results to easily distinguish identical filenames across nested folders (#23101).
- **Block Inline Editing:** Refined inline block presentations so single blocks display clean, distraction-free editing panels without superfluous surrounding container borders (#23692).
- **Modal Input Sanitization:** Added robust character encoding within delete and action confirmation popups to prevent visual breaks with complex entity titles (#23542).

#### 💻 Developer Experience
- **Database Connection Provisioning:** Updated the automated installer engine to write validated connection strings directly into the final prioritized appsettings.*.json target configuration file (#22817).
- **Management API Generation:** Ensured fully compliant operation IDs for minor API endpoints and upgraded OpenAPI tooling dependencies (#23499).
- **Authentication Diagnostics:** Introduced detailed trace logging for silent auto-link authentication events in both BackOfficeSignInManager and MemberSignInManager (#23655).

#### ⚡ Performance & Bug Fixes
- **Tree Child Pagination:** Increased default child pagination limits to 100 items and eliminated redundant reloads during unchanged tree configurations (#23585).
- **IPublishedContent Cache:** Accelerated published content resolution by pre-populating IdKeyMap lookups during initial node instantiations (#23583).
- **Startup Optimization:** Reduced backoffice initialization overhead by caching server environment information into a single one-time boot query (#23673).
- **Media Library Scaling:** Optimized batch write queries, significantly speeding up bulk uploads and deep folder creations in massive media archives (#23446).

---

<a id="umbraco-13164"></a>
### Umbraco 13.16.4

#### 🔒 Maintenance & Security Patch (v13 Long-Term Support)
- **ImageSharp Security Hardening:** Bumped SixLabors.ImageSharp to version 3.2.0 and ImageSharp.Web to 3.3.0 to patch upstream vulnerabilities in image processing operations for Umbraco 13 installations (#24339, #24300).
- **Cryptographic & Serialization Dependencies:** Upgraded MessagePack and explicitly pinned System.Security.Cryptography.Pkcs and System.Security.Cryptography.Xml to patched, secure library releases to prevent cryptographic flaws (#24298).

---

<a id="umbraco-13163"></a>
### Umbraco 13.16.3

#### 🛡️ Security Advisory (v13 Long-Term Support)
- **Start Node Access Control:** Fixed a privilege escalation flaw where backoffice editors could assign start nodes to user groups outside their permitted organizational boundaries.

---

<a id="umbraco-13162"></a>
### Umbraco 13.16.2

#### 🔒 Maintenance & Security Patch (v13 Long-Term Support)
- **Client-Side Dependency Security:** Upgraded legacy JavaScript dependencies (diff and underscore) to patched, secure releases (#23910) to remediate identified client-side vulnerabilities in the backoffice.

---

