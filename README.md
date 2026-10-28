# Umbraco Missing Versions - Official Release Details

> **Comparison Overview**:
> - Source 1: [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version)
> - Source 2: [Official Umbraco CMS Releases](https://releases.umbraco.com/all-releases)
> - Filter: Modern supported Umbraco versions tracked by Giriraj Digital (Umbraco 10.x to 18.x)
> - Total Official Releases Checked (v10+): 172
> - Total Releases Listed on Giriraj: 163
> - **Total Missing Releases**: 9

---

## 📋 List of Missing Umbraco Versions

| Version | Release Date | Official Release Page | Release Category |
| :--- | :--- | :--- | :--- |
| **v18.2.2** | October 27, 2026 | [Umbraco 18.2.2 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.2) | Security Patch |
| **v18.2.1** | October 06, 2026 | [Umbraco 18.2.1 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.1) | Security Patch |
| **v18.2.0** | September 17, 2026 | [Umbraco 18.2.0 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.0) | Feature & Bug Fix Release |
| **v17.7.2** | October 27, 2026 | [Umbraco 17.7.2 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.2) | Security Patch |
| **v17.7.1** | October 06, 2026 | [Umbraco 17.7.1 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.1) | Security Patch |
| **v17.7.0** | September 17, 2026 | [Umbraco 17.7.0 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.0) | Feature & Bug Fix Release |
| **v13.16.4** | October 27, 2026 | [Umbraco 13.16.4 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.4) | Security Dependency Update |
| **v13.16.3** | October 27, 2026 | [Umbraco 13.16.3 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.3) | Security Patch |
| **v13.16.2** | September 14, 2026 | [Umbraco 13.16.2 Release Notes](https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.2) | Security Dependency Update |

---

## 🔍 Detailed Raw Official Release Notes

### 1. Umbraco CMS v18.2.2

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v18.2.2`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.2
- **GitHub Release Tag:** [release-18.2.2](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-18.2.2)
- **Resolved Security Advisories:**
  - **GHSA-r4qv-c8pg-qq59**: Resolved backoffice users can grant user groups start nodes outside their own access (start node restriction bypass).
  - **GHSA-xqwv-jvcm-5vjq**: Resolved start-node restrictions not enforced on URL, imaging and reference lookups.
  - **GHSA-88p9-4pxf-pq3c**: Resolved stored XSS chained with path traversal in Umbraco CMS media management.
  - **GHSA-4qmm-fhgv-vq9g**: Resolved backoffice logout does not invalidate the auth cookie (session not ended server-side).
  - **GHSA-24m3-86rh-6888**: Resolved unpublished content exposed through website preview and the Delivery API.
  - **GHSA-4vcm-wj6q-3pmg**: Resolved website preview session did not expire.
  - **GHSA-rpv9-qp4c-g469**: Resolved backoffice account takeover via sign-in redirect manipulation in Umbraco CMS.

---

### 2. Umbraco CMS v18.2.1

- **Release Date:** Tuesday, October 6, 2026
- **NuGet Package:** `Umbraco.Cms v18.2.1`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.1
- **GitHub Release Tag:** [release-18.2.1](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-18.2.1)
- **Resolved Security Advisories:**
  - **GHSA-7pj9-jmp9-p86q**: Resolved authorization bypass allows low-privileged users to delete media outside their start node.
  - **GHSA-w5jr-cmfx-544x**: Resolved backoffice users can read content outside their start node via the document version endpoints.
  - **GHSA-4c5q-6c64-96j7**: Resolved unauthenticated SignalR hubs disclose content identifiers and editorial activity.
  - **GHSA-7pj9-jmp9-p86q**: Resolved upload file extension restrictions are not enforced for file names ending in a period.

---

### 3. Umbraco CMS v18.2.0

- **Release Date:** Thursday, September 17, 2026
- **NuGet Package:** `Umbraco.Cms v18.2.0`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.0
- **Summary:** Total 112 bug fixes and feature additions; 24 contributed by the community, by 16 unique contributors.
- **Key Changes and Contributions:**
  - `#22817` Installer: Write connection string to the final available appsettings.*.json (closes `#21833`)
  - `#23584` Array State: support value to be undefined
  - `#23416` Config Repositories: Defer store-backed config observables via a shared base so consumers need not await initialized
  - `#23726` Block Grid: Fx clean up Blocks from Areas
  - `#23721` Variant selector: avoid rendering fallback shortly
  - `#23716` TipTap RTE: Remove toolbar shadow before scroll (closes `#23710`)
  - `#23707` Members: Indicate that withheld sensitive values exist instead of showing their defaults
  - `#23692` Blocks: Inline editing hides the box if only a single box would be presented
  - `#23686` Cleanup: refinement of cleanup localization
  - `#23669` Tiptap RTE: Fix table toolbar menu staying open after deleting table (closes `#23658`)
  - `#23642` Document Tree: Add card and table views
  - `#23611` Content type designer: add root property styles
  - `#23606` Pickers: Show the number of selected items in the tree and collection item picker modals
  - `#23593` Tree Item Picker: Make table rows and cards with children navigable in pickers during selection
  - `#23585` Tree: Increase child page size to 100
  - `#23578` Code Block: style update
  - `#23571` Collections: Remember the view, filter, ordering and page of a collection (closes `#22418`)
  - `#23563` Tiptap RTE: Fix crash when content contains an embedded media node
  - `#23542` Confirm Modal: Escaped special characters in item names
  - `#23525` Block editors: inner block values shift onto neighbouring blocks when saving a subset of variants
  - `#23426` Backoffice: Support running in insecure browser contexts (plain HTTP on IP addresses)
  - `#23385` Content Workspaces: Redirect stale variant workspace URLs when the content type variance changes
  - `#23101` Media Picker search - add disambiguation of search results, particularly for folders!
  - `#23092` Error label at block doesn't seem to consider UFM
  - `#23499` Management API: Generate valid operation IDs for minor API versions, and upgrade @hey-api/openapi-ts
  - `#23761` Document Link Picker: Scope search results to the selected/inherited culture
  - `#23759` Auth: Obsolete services already removed in V19
  - `#23727` OpenIddict: Compare ConsentType and ApplicationType only when the descriptor sets them (follow-up to `#23599`)
  - `#23720` Block Rich Text Editor Impl.: cleanup & deprecate
  - `#23702` Upgrade to v17 fails in `SetDateDefaultsToUtcNow` when a date default constraint has a non-canonical name or is missing

---

### 4. Umbraco CMS v17.7.2

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.2`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.2
- **GitHub Release Tag:** [release-17.7.2](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-17.7.2)
- **Resolved Security Advisories:**
  - **GHSA-r4qv-c8pg-qq59**: Resolved backoffice users can grant user groups start nodes outside their own access (start node restriction bypass).
  - **GHSA-xqwv-jvcm-5vjq**: Resolved start-node restrictions not enforced on URL, imaging and reference lookups.
  - **GHSA-88p9-4pxf-pq3c**: Resolved stored XSS chained with path traversal in Umbraco CMS media management.
  - **GHSA-4qmm-fhgv-vq9g**: Resolved backoffice logout does not invalidate the auth cookie (session not ended server-side).
  - **GHSA-24m3-86rh-6888**: Resolved unpublished content exposed through website preview and the Delivery API.
  - **GHSA-4vcm-wj6q-3pmg**: Resolved website preview session did not expire.
  - **GHSA-rpv9-qp4c-g469**: Resolved backoffice account takeover via sign-in redirect manipulation in Umbraco CMS.

---

### 5. Umbraco CMS v17.7.1

- **Release Date:** Tuesday, October 6, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.1`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.1
- **GitHub Release Tag:** [release-17.7.1](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-17.7.1)
- **Resolved Security Advisories:**
  - **GHSA-7pj9-jmp9-p86q**: Resolved authorization bypass allows low-privileged users to delete media outside their start node.
  - **GHSA-w5jr-cmfx-544x**: Resolved backoffice users can read content outside their start node via the document version endpoints.
  - **GHSA-4c5q-6c64-96j7**: Resolved unauthenticated SignalR hubs disclose content identifiers and editorial activity.
  - **GHSA-7pj9-jmp9-p86q**: Resolved upload file extension restrictions are not enforced for file names ending in a period.

---

### 6. Umbraco CMS v17.7.0

- **Release Date:** Thursday, September 17, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.0`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.0
- **Summary:** Total 109 bug fixes and feature additions; 24 contributed by the community, by 16 unique contributors.
- **Key Changes and Contributions:**
  - `#22817` Installer: Write connection string to the final available appsettings.*.json (closes `#21833`)
  - `#23584` Array State: support value to be undefined
  - `#23416` Config Repositories: Defer store-backed config observables via a shared base so consumers need not await initialized
  - `#23726` Block Grid: Fx clean up Blocks from Areas
  - `#23721` Variant selector: avoid rendering fallback shortly
  - `#23716` TipTap RTE: Remove toolbar shadow before scroll (closes `#23710`)
  - `#23707` Members: Indicate that withheld sensitive values exist instead of showing their defaults
  - `#23692` Blocks: Inline editing hides the box if only a single box would be presented
  - `#23686` Cleanup: refinement of cleanup localization
  - `#23669` Tiptap RTE: Fix table toolbar menu staying open after deleting table (closes `#23658`)
  - `#23642` Document Tree: Add card and table views
  - `#23611` Content type designer: add root property styles
  - `#23606` Pickers: Show the number of selected items in the tree and collection item picker modals
  - `#23593` Tree Item Picker: Make table rows and cards with children navigable in pickers during selection
  - `#23585` Tree: Increase child page size to 100
  - `#23578` Code Block: style update
  - `#23571` Collections: Remember the view, filter, ordering and page of a collection (closes `#22418`)
  - `#23563` Tiptap RTE: Fix crash when content contains an embedded media node
  - `#23542` Confirm Modal: Escaped special characters in item names
  - `#23525` Block editors: inner block values shift onto neighbouring blocks when saving a subset of variants
  - `#23426` Backoffice: Support running in insecure browser contexts (plain HTTP on IP addresses)
  - `#23385` Content Workspaces: Redirect stale variant workspace URLs when the content type variance changes
  - `#23101` Media Picker search - add disambiguation of search results, particularly for folders!
  - `#23092` Error label at block doesn't seem to consider UFM
  - `#23685` Management API: Add `hasChildren` to document and media collection responses
  - `#23499` Management API: Generate valid operation IDs for minor API versions, and upgrade @hey-api/openapi-ts
  - `#24105` Icons: Update `lucide-static` to 1.52.0 and `simple-icons` to 16.34.0 and regenerate icons
  - `#23761` Document Link Picker: Scope search results to the selected/inherited culture
  - `#23759` Auth: Obsolete services already removed in V19
  - `#23727` OpenIddict: Compare ConsentType and ApplicationType only when the descriptor sets them (follow-up to `#23599`)

---

### 7. Umbraco CMS v13.16.4

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v13.16.4`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.4
- **Summary:** Total 2 bug fixes and feature additions; 1 contributed by the community, by 1 unique contributors.
- **Resolved Changes:**
  - `#24300` [v13] SixLabors.ImageSharp 3.1.12 is affected by known vulnerabilities; the 3.2.0 update from 17/18 hasn't been applied (and ImageSharp 2 package status)
  - `#24298` Dependencies: Update MessagePack and pin System.Security.Cryptography.Pkcs and .Xml to patched versions (v13)

---

### 8. Umbraco CMS v13.16.3

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v13.16.3`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.3
- **GitHub Release Tag:** [release-13.16.3](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-13.16.3)
- **Resolved Security Advisories:**
  - **GHSA-r4qv-c8pg-qq59**: Resolved backoffice users can grant user groups start nodes outside their own access (start node restriction bypass).

---

### 9. Umbraco CMS v13.16.2

- **Release Date:** Monday, September 14, 2026
- **NuGet Package:** `Umbraco.Cms v13.16.2`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.2
- **Summary:** Total 1 bug fixes and feature additions; 1 contributed by the community, by 1 unique contributors.
- **Resolved Changes:**
  - `#23910` Dependencies: Bump JS diff and underscore versions for security patches

---

