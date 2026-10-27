# Umbraco Missing Versions - Official Release Details

> **Comparison Overview**:
> - Source 1: [Giriraj Digital Umbraco Roadmap](https://www.girirajdigital.com/umbraco-version)
> - Source 2: [Official Umbraco CMS Releases](https://releases.umbraco.com/all-releases)
> - Filter: Modern supported Umbraco versions tracked by Giriraj Digital (Umbraco 10.x to 18.x)
> - Total Official Releases Checked (v10+): 171
> - Total Releases Listed on Giriraj: 163
> - **Total Missing Releases**: 8

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
  - **GHSA-r4qv-c8pg-qq59**: Resolved issue where backoffice users could grant user groups start nodes outside their own access (start node restriction bypass).
  - **GHSA-xqwv-jvcm-5vjq**: Resolved issue where start-node restrictions were not enforced on URL, imaging, and reference lookups.
  - **GHSA-88p9-4pxf-pq3c**: Resolved stored XSS chained with path traversal vulnerability in Umbraco CMS media management.
  - **GHSA-4qmm-fhgv-vq9g**: Resolved issue where backoffice logout did not invalidate the auth cookie (session was not terminated server-side).
  - **GHSA-24m3-86rh-6888**: Resolved unpublished content being exposed through website preview and the Delivery API.
  - **GHSA-4vcm-wj6q-3pmg**: Resolved website preview session expiration vulnerability.
  - **GHSA-rpv9-qp4c-g469**: Resolved backoffice account takeover via sign-in redirect manipulation in Umbraco CMS.

---

### 2. Umbraco CMS v18.2.1

- **Release Date:** Tuesday, October 6, 2026
- **NuGet Package:** `Umbraco.Cms v18.2.1`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.1
- **GitHub Release Tag:** [release-18.2.1](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-18.2.1)
- **Resolved Security Advisories:**
  - **GHSA-7pj9-jmp9-p86q**: Resolved authorization bypass allowing low-privileged users to delete media outside their assigned start node.
  - **GHSA-w5jr-cmfx-544x**: Resolved issue where backoffice users could read content outside their start node via the document version endpoints.
  - **GHSA-4c5q-6c64-96j7**: Resolved unauthenticated SignalR hubs disclosing content identifiers and editorial activity.
  - **GHSA-7pj9-jmp9-p86q (Upload validation)**: Resolved upload file extension restrictions not enforced when file names end in a period (`.`).

---

### 3. Umbraco CMS v18.2.0

- **Release Date:** Thursday, September 17, 2026
- **NuGet Package:** `Umbraco.Cms v18.2.0`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/18.2.0
- **Summary:** Total 112 bug fixes and feature additions; 24 contributed by 16 unique community members.
- **Key Changes and Contributions:**
  - `#22817` **Installer**: Write connection string to the final available `appsettings.*.json` (closes `#21833`).
  - `#23642` **Document Tree**: Added card and table views to document trees.
  - `#23571` **Collections**: Remember the view, filter, ordering and page of a collection (closes `#22418`).
  - `#23606` **Pickers**: Show the number of selected items in the tree and collection item picker modals.
  - `#23593` **Tree Item Picker**: Make table rows and cards with children navigable in pickers during selection.
  - `#23585` **Tree**: Increase child page size to 100.
  - `#23716` **TipTap RTE**: Remove toolbar shadow before scroll (closes `#23710`).
  - `#23669` **Tiptap RTE**: Fix table toolbar menu staying open after deleting table (closes `#23658`).
  - `#23563` **Tiptap RTE**: Fix crash when content contains an embedded media node.
  - `#23525` **Block editors**: Fix issue where inner block values shifted onto neighbouring blocks when saving a subset of variants.
  - `#23692` **Blocks**: Inline editing hides the box if only a single box would be presented.
  - `#23726` **Block Grid**: Clean up blocks from areas.
  - `#23426` **Backoffice**: Support running in insecure browser contexts (plain HTTP on IP addresses).
  - `#23385` **Content Workspaces**: Redirect stale variant workspace URLs when the content type variance changes.
  - `#23101` **Media Picker**: Added disambiguation of search results, especially for folders.
  - `#23499` **Management API**: Generate valid operation IDs for minor API versions, and upgrade `@hey-api/openapi-ts`.
  - `#23655` **Authentication**: Log silent auto-link failures in `BackOfficeSignInManager` and `MemberSignInManager` (closes `#23632`).
  - `#23599` **OpenIddict**: Prevent `ConcurrencyException` when several instances register the same application (closes `#23544`).
  - `#23583` **Performance**: Pre-populate `IdKeyMap` when `IPublishedContent` is loaded/created.
  - `#23673` **Performance**: Only load server information once when instantiating the backoffice.
  - `#23670` **Tree**: Avoid reloads on no-change config updates.
  - `#23403` **Table collection view**: Ensure 'Select all' accumulates across pages instead of replacing selection.
  - `#23542` **Confirm Modal**: Escaped special characters in item names.
  - `#23415` **Users**: Validate avatar uploads against configured image file types.
  - `#23446` **Media Library**: Optimized write operations (upload, folder creation) for large item counts.
  - `#23562` **Dependencies**: Upgraded Tiptap to version 3.29.

---

### 4. Umbraco CMS v17.7.2

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.2`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.2
- **GitHub Release Tag:** [release-17.7.2](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-17.7.2)
- **Resolved Security Advisories:**
  - **GHSA-r4qv-c8pg-qq59**: Resolved issue where backoffice users could grant user groups start nodes outside their own access (start node restriction bypass).
  - **GHSA-xqwv-jvcm-5vjq**: Resolved issue where start-node restrictions were not enforced on URL, imaging, and reference lookups.
  - **GHSA-88p9-4pxf-pq3c**: Resolved stored XSS chained with path traversal vulnerability in Umbraco CMS media management.
  - **GHSA-4qmm-fhgv-vq9g**: Resolved issue where backoffice logout did not invalidate the auth cookie (session was not terminated server-side).
  - **GHSA-24m3-86rh-6888**: Resolved unpublished content being exposed through website preview and the Delivery API.
  - **GHSA-4vcm-wj6q-3pmg**: Resolved website preview session expiration vulnerability.
  - **GHSA-rpv9-qp4c-g469**: Resolved backoffice account takeover via sign-in redirect manipulation in Umbraco CMS.

---

### 5. Umbraco CMS v17.7.1

- **Release Date:** Tuesday, October 6, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.1`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.1
- **GitHub Release Tag:** [release-17.7.1](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-17.7.1)
- **Resolved Security Advisories:**
  - **GHSA-7pj9-jmp9-p86q**: Resolved authorization bypass allowing low-privileged users to delete media outside their assigned start node.
  - **GHSA-w5jr-cmfx-544x**: Resolved issue where backoffice users could read content outside their start node via the document version endpoints.
  - **GHSA-4c5q-6c64-96j7**: Resolved unauthenticated SignalR hubs disclosing content identifiers and editorial activity.
  - **GHSA-7pj9-jmp9-p86q (Upload validation)**: Resolved upload file extension restrictions not enforced when file names end in a period (`.`).

---

### 6. Umbraco CMS v17.7.0

- **Release Date:** Thursday, September 17, 2026
- **NuGet Package:** `Umbraco.Cms v17.7.0`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/17.7.0
- **Summary:** Total 109 bug fixes and feature additions; 24 contributed by 16 unique community members.
- **Key Changes and Contributions:**
  - `#22817` **Installer**: Write connection string to the final available `appsettings.*.json` (closes `#21833`).
  - `#23642` **Document Tree**: Added card and table views to document trees.
  - `#23571` **Collections**: Remember the view, filter, ordering and page of a collection (closes `#22418`).
  - `#23606` **Pickers**: Show the number of selected items in the tree and collection item picker modals.
  - `#23593` **Tree Item Picker**: Make table rows and cards with children navigable in pickers during selection.
  - `#23585` **Tree**: Increase child page size to 100.
  - `#23716` **TipTap RTE**: Remove toolbar shadow before scroll (closes `#23710`).
  - `#23669` **Tiptap RTE**: Fix table toolbar menu staying open after deleting table (closes `#23658`).
  - `#23563` **Tiptap RTE**: Fix crash when content contains an embedded media node.
  - `#23525` **Block editors**: Fix issue where inner block values shifted onto neighbouring blocks when saving a subset of variants.
  - `#23692` **Blocks**: Inline editing hides the box if only a single box would be presented.
  - `#23726` **Block Grid**: Clean up blocks from areas.
  - `#23426` **Backoffice**: Support running in insecure browser contexts (plain HTTP on IP addresses).
  - `#23385` **Content Workspaces**: Redirect stale variant workspace URLs when the content type variance changes.
  - `#23101` **Media Picker**: Disambiguation of search results, particularly for folders.
  - `#23499` **Management API**: Generate valid operation IDs for minor API versions, and upgrade `@hey-api/openapi-ts`.
  - `#23655` **Authentication**: Log silent auto-link failures in `BackOfficeSignInManager` and `MemberSignInManager`.
  - `#23599` **OpenIddict**: Prevent `ConcurrencyException` when several instances register the same application.
  - `#23583` **Performance**: Pre-populate `IdKeyMap` when `IPublishedContent` is loaded/created.
  - `#23673` **Performance**: Only load server information once when instantiating the backoffice.
  - `#23403` **Table collection view**: Multi-page selection fix so 'Select all' accumulates items across pages.
  - `#23542` **Confirm Modal**: Escaped special characters in item names.
  - `#23446` **Media Library**: Optimized write operations for large item counts.
  - `#23562` **Dependencies**: Upgraded Tiptap to version 3.29.

---

### 7. Umbraco CMS v13.16.3

- **Release Date:** Tuesday, October 27, 2026
- **NuGet Package:** `Umbraco.Cms v13.16.3`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.3
- **GitHub Release Tag:** [release-13.16.3](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-13.16.3)
- **Resolved Security Advisories:**
  - **GHSA-r4qv-c8pg-qq59**: Resolved start node restriction bypass where backoffice users could grant user groups start nodes outside their own access permissions.

---

### 8. Umbraco CMS v13.16.2

- **Release Date:** Monday, September 14, 2026
- **NuGet Package:** `Umbraco.Cms v13.16.2`
- **Release Source:** https://releases.umbraco.com/release/umbraco/Umbraco-CMS/13.16.2
- **GitHub Release Tag:** [release-13.16.2](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-13.16.2)
- **Summary:** Security dependency patch.
- **Resolved Changes:**
  - `#23910` **Dependencies**: Bumped `diff` and `underscore` JavaScript library versions to address upstream client-side security vulnerabilities.
