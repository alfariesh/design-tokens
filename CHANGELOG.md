# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-alpha.1] - 2025-10-29

### 🎉 Initial Alpha Release

First public release of multi-platform design tokens system.

### Added

#### Core Features
- ✅ Multi-platform design token generation (5 platforms)
- ✅ Single source of truth from JSON files
- ✅ Automated GitHub Actions CI/CD pipeline
- ✅ GitHub Pages deployment for public access
- ✅ Style Dictionary v5.1.1 integration

#### Platforms Supported
- **Flutter (Dart)**: 3 files (colors.dart, typography.dart, dimensions.dart)
- **Jetpack Compose (Kotlin)**: 3 files (Colors.kt, Typography.kt, Dimensions.kt)
- **CSS**: 3 files (colors.css, typography.css, dimensions.css)
- **Android XML**: 4 files (colors-light.xml, colors-dark.xml, typography.xml, dimens.xml)
- **iOS Swift**: 3 files (Colors.swift, Typography.swift, Dimensions.swift)

#### Token Categories
- **Colors**: 668 tokens (primitives + semantic)
  - Base colors (white, black, transparent)
  - Brand palette (25-950 shades)
  - Gray palettes (6 variants)
  - Semantic colors (error, warning, success, info)
  - Text colors (8 variants)
  - Background colors (11 variants)
  - Border colors (8 variants)
- **Typography**: 44 text styles
  - Display hierarchy (2XL to XS, 4 weights each)
  - Text hierarchy (XL to XS, 4 weights each)
  - Font properties (family, size, weight, line height, letter spacing)
- **Spacing**: 29 tokens (0px to 160px)
- **Border Radius**: 11 tokens (0px to 9999px)
- **Sizing**: Container widths, padding, border widths

#### Custom Formatters
- **Flutter formatter**: With gradient and shadow support
- **Compose formatter**: Kotlin object with proper types
- **CSS formatter**: CSS variables with light/dark themes
- **Android formatter**: XML resources for colors, typography, dimensions
- **iOS formatter**: Swift structs with proper types

#### Reusable Utilities
- `formats/utils/filters.js`: Token filtering utilities
- `formats/utils/nameConverters.js`: Naming convention converters (camelCase, PascalCase, kebab-case, snake_case)
- `formats/utils/grouping.js`: Token grouping by semantic categories

#### Documentation
- Comprehensive README with usage examples for all platforms
- GitHub Pages URLs for direct token access
- CI/CD integration examples
- Workflow status badges

#### Automation
- GitHub Actions workflow for automated build & deploy
- Deploy to `output` branch on every push to `main`
- Automatic GitHub Pages updates

### Technical Details

- **Node.js**: v18+ required
- **Style Dictionary**: v5.1.1
- **Build Output**: 16 token files + README
- **Total Tokens**: 870+ unique tokens
- **Code Quality**: Zero duplication, 100% JSDoc coverage

### URLs

- **GitHub Repository**: https://github.com/alfariesh/design-tokens
- **GitHub Pages**: https://alfariesh.github.io/design-tokens/
- **Workflow**: https://github.com/alfariesh/design-tokens/actions

### Known Issues

- Android XML uses `dimens.xml` instead of `dimensions.xml` (inconsistent with other platforms)

### Notes

This is an alpha release for early testing. The token structure and naming conventions may change in future releases.

---

## Version History

- **v1.0.0-alpha.1** (2025-10-29): Initial alpha release

---

**Versioning Guide:**
- `alpha`: Early preview, API may change
- `beta`: Feature complete, testing phase
- `rc`: Release candidate, production ready
- `stable`: Production release

**Using Specific Versions:**
```bash
# Latest version
https://alfariesh.github.io/design-tokens/flutter/colors.dart

# Specific version (when tagged)
# Will be available via GitHub releases
# Download from: https://github.com/alfariesh/design-tokens/releases/tag/v1.0.0-alpha.1
```
