# Multi-Platform Design Tokens

> Build design tokens dari JSON source ke Flutter, Jetpack Compose, CSS, Android XML, dan iOS Swift dengan Style Dictionary v5.1.1

[![Build & Deploy](https://github.com/alfariesh/design-tokens/actions/workflows/build.yml/badge.svg)](https://github.com/alfariesh/design-tokens/actions/workflows/build.yml)
[![Version](https://img.shields.io/badge/version-v1.0.0--alpha.1-orange)](https://github.com/alfariesh/design-tokens/releases)
[![Style Dictionary](https://img.shields.io/badge/Style%20Dictionary-v5.1.1-blueviolet)](https://github.com/amzn/style-dictionary)
[![Flutter](https://img.shields.io/badge/Flutter-Ready-02569B?logo=flutter)](docs/flutter/)
[![Jetpack Compose](https://img.shields.io/badge/Compose-Ready-4285F4?logo=jetpack-compose)](docs/compose/)
[![CSS](https://img.shields.io/badge/CSS-Ready-1572B6?logo=css3)](docs/css/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://alfariesh.github.io/design-tokens/)

---

## 📡 GitHub Pages - Live Tokens

Design tokens tersedia secara publik via GitHub Pages:

**Base URL:** `https://alfariesh.github.io/design-tokens/`

### Download URLs

#### Flutter (Dart)
```bash
https://alfariesh.github.io/design-tokens/flutter/colors.dart
https://alfariesh.github.io/design-tokens/flutter/typography.dart
https://alfariesh.github.io/design-tokens/flutter/dimensions.dart
```

#### Jetpack Compose (Kotlin)
```bash
https://alfariesh.github.io/design-tokens/compose/Colors.kt
https://alfariesh.github.io/design-tokens/compose/Typography.kt
https://alfariesh.github.io/design-tokens/compose/Dimensions.kt
```

#### CSS
```bash
https://alfariesh.github.io/design-tokens/css/colors.css
https://alfariesh.github.io/design-tokens/css/typography.css
https://alfariesh.github.io/design-tokens/css/dimensions.css
```

#### Android XML
```bash
https://alfariesh.github.io/design-tokens/android/colors-light.xml
https://alfariesh.github.io/design-tokens/android/colors-dark.xml
https://alfariesh.github.io/design-tokens/android/typography.xml
https://alfariesh.github.io/design-tokens/android/dimens.xml
```

#### iOS Swift
```bash
https://alfariesh.github.io/design-tokens/ios/Colors.swift
https://alfariesh.github.io/design-tokens/ios/Typography.swift
https://alfariesh.github.io/design-tokens/ios/Dimensions.swift
```

### Usage in CI/CD

Download tokens langsung di CI/CD pipeline:

```bash
# Flutter
curl -o lib/tokens/colors.dart https://alfariesh.github.io/design-tokens/flutter/colors.dart

# Android
curl -o app/src/main/res/values/colors.xml https://alfariesh.github.io/design-tokens/android/colors-light.xml

# CSS
curl -o src/styles/tokens.css https://alfariesh.github.io/design-tokens/css/colors.css
```

### Import Langsung (CSS)

```html
<!-- Import CSS tokens langsung dari GitHub Pages -->
<link rel="stylesheet" href="https://alfariesh.github.io/design-tokens/css/colors.css">
<link rel="stylesheet" href="https://alfariesh.github.io/design-tokens/css/typography.css">
<link rel="stylesheet" href="https://alfariesh.github.io/design-tokens/css/dimensions.css">
```

### Versioning

Design tokens menggunakan [Semantic Versioning](https://semver.org/):

**Current Version:** `v1.0.0-alpha.1`

**Version Format:**
- `alpha`: Early preview, API may change
- `beta`: Feature complete, testing phase
- `rc`: Release candidate, production ready
- `stable`: Production release (1.0.0, 1.1.0, etc)

**Download Specific Version:**

Setiap release tersimpan di GitHub Releases dengan zip file yang berisi semua token files:

```bash
# Download dari GitHub Releases
https://github.com/alfariesh/design-tokens/releases/tag/v1.0.0-alpha.1

# Latest version (always updated)
https://alfariesh.github.io/design-tokens/flutter/colors.dart
```

**Version History:** See [CHANGELOG.md](CHANGELOG.md) untuk detail lengkap setiap release.

---

## 🎯 Overview

**Single source of truth** untuk design tokens yang dapat di-export ke berbagai platform:

| Platform | Files | File Size | Status |
|----------|-------|-----------|--------|
| **Flutter** | 3 files | ~45 KB | ✅ Ready |
| **Jetpack Compose** | 3 files | ~40 KB | ✅ Ready |
| **CSS** | 3 files | ~38 KB | ✅ Ready |
| **Android XML** | 4 files | ~25 KB | ✅ Ready |
| **iOS Swift** | 3 files | ~42 KB | ✅ Ready |

**Total Source Tokens:** 668 colors + 44 typography + 31 gradients + 29 spacing + 11 radius + 11 shadows + sizing

---

## 📦 Output Files

```
build/
├── flutter/
│   ├── colors.dart        (ThemeLight + ThemeDark)
│   ├── typography.dart    (Typography styles)
│   └── dimensions.dart    (Spacing, radius, sizing)
├── compose/
│   ├── Colors.kt          (ThemeLight + ThemeDark)
│   ├── Typography.kt      (Typography styles)
│   └── Dimensions.kt      (Spacing, radius, sizing)
├── css/
│   ├── colors.css         (Light + dark themes)
│   ├── typography.css     (Typography styles)
│   └── dimensions.css     (Spacing, radius, sizing)
├── android/
│   ├── colors-light.xml   (Semantic colors light)
│   ├── colors-dark.xml    (Semantic colors dark)
│   ├── typography.xml     (Font properties)
│   └── dimensions.xml     (Spacing, radius, sizing)
└── ios/
    ├── Colors.swift       (ThemeLight + ThemeDark)
    ├── Typography.swift   (Typography styles)
    └── Dimensions.swift   (Spacing, radius, sizing)
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Tokens

```bash
npm run build
```

This generates tokens for all 3 platforms simultaneously!

### 3. Use in Your Project

Choose your platform:

#### **Flutter** 📱

```dart
import 'tokens/colors.dart';
import 'tokens/typography.dart';
import 'tokens/dimensions.dart';

Container(
  color: ThemeLight.colorsBackgroundPrimary,
  padding: EdgeInsets.all(Dimensions.spacing4),
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(Dimensions.borderRadiusLg),
  ),
  child: Text(
    'Hello Flutter',
    style: Typography.displayLgBold,
  ),
)
```

[**📖 Flutter Documentation**](docs/flutter/)

#### **Jetpack Compose** 🤖

```kotlin
import com.app.tokens.ThemeLight
import com.app.tokens.Typography
import com.app.tokens.Dimensions

Box(
    modifier = Modifier
        .background(ThemeLight.colorsBackgroundPrimary)
        .padding(Dimensions.spacing4)
        .clip(RoundedCornerShape(Dimensions.borderRadiusLg))
) {
    Text(
        text = "Hello Compose",
        fontSize = Typography.displayLg.fontSize,
        fontWeight = Typography.displayLg.fontWeight,
        color = ThemeLight.colorsTextPrimary
    )
}
```

[**📖 Compose Documentation**](docs/compose/)

#### **CSS** 🌐

```css
.card {
  background-color: var(--colors-background-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
}

.title {
  font-size: var(--typography-font-size-lg);
  font-weight: var(--typography-font-weight-bold);
  color: var(--colors-text-primary-900);
}
```

[**📖 CSS Documentation**](docs/css/)

## 🎨 Token Categories

### **Colors** (668 tokens)
- **Base Colors**: White, Black, Transparent
- **Brand Palette**: 25, 50, 100, 200...900, 950 shades
- **Gray Palettes**: Light mode, Dark mode, Neutral, True Gray, Warm Gray, Cool Gray
- **Semantic Colors**: Error, Warning, Success, Info
- **Text Colors**: Primary, Secondary, Tertiary, Quaternary, Placeholder, Disabled, White, Brand
- **Background Colors**: Primary, Secondary, Tertiary, Brand (Solid/Subtle), Error, Warning, Success, Overlay
- **Border Colors**: Primary, Secondary, Tertiary, Brand, Error, Warning, Success, Disabled

### **Typography** (44 TextStyles for Flutter)
- **Display Hierarchy**: Display2XL, DisplayXL, DisplayLG, DisplayMD, DisplaySM, DisplayXS
  - Each with: Regular, Medium, Semibold, Bold
- **Text Hierarchy**: TextXL, TextLG, TextMD, TextSM, TextXS
  - Each with: Regular, Medium, Semibold, Bold
- **Font Properties** (Compose/CSS): Family, Size, Weight, Line Height, Letter Spacing

### **Gradients** (31 tokens - Flutter only)
- **Brand Gradients**: 7 brand gradient variations
- **Gray Gradients**: 15 gray gradient variations
- **Decorative Gradients**: 10 linear gradients (Purple-Peach, Orange-Pink, etc.)
- **Special**: Skeuemorphic border gradient
- All gradients parsed as `LinearGradient` with proper Alignment

### **Spacing** (29 tokens)
- `none`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`...`11xl`
- Range: 0px to 160px
- Consistent scale across all platforms

### **Border Radius** (11 tokens)
- `none`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `full`
- Range: 0px to 9999px (circle)

### **Shadows** (11 sets - Flutter only)
- `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Each as `List<BoxShadow>` with multi-layer support
- Color, offset, blur radius, spread radius

### **Sizing & Containers**
- Container max widths (Mobile, Tablet, Desktop, Wide)
- Container padding (Mobile, Desktop)
- Border widths (Hairline, Thin, Thick, Heavy)
- Sizing values (48px - 480px)

## 📝 Token Structure

### Flutter (Dart)

```dart
class TokensLight {
  TokensLight._();

  // Colors
  static const Color colorsBaseWhite = Color(0xFFFFFFFF);
  static const Color colorsBrand600 = Color(0xFF7F56D9);
  
  // Typography (Complete TextStyles)
  static const TextStyle typographyDisplayLgBold = TextStyle(
    fontFamily: 'Bricolage Grotesque',
    fontSize: 48.0,
    fontWeight: FontWeight.w700,
    height: 1.25,
    letterSpacing: 0.0,
  );
  
  // Gradients
  static const Gradient colorsEffectsGradientsBrandGradient600To500Deg90 = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Color(0xFF7F56D9), Color(0xFF9E77ED)],
    stops: [0, 1],
  );
  
  // Shadows
  static const List<BoxShadow> colorsEffectsShadowsLg = [
    BoxShadow(
      color: Color(0x1F101828),
      offset: Offset(0.0, 12.0),
      blurRadius: 16.0,
      spreadRadius: -4.0,
    ),
    // ... multiple layers
  ];
  
  // Spacing
  static const double spacing4 = 16.0;
  static const double borderRadiusLg = 10.0;
}
```

### Jetpack Compose (Kotlin)

```kotlin
object TokensLight {
    // Colors
    val colorsBaseWhite = Color(0xFFFFFFFF)
    val colorsBrand600 = Color(0xFF7F56D9)
    
    // Typography Properties
    val typographyFontFamilyDisplay = "Bricolage Grotesque"
    val typographyFontSizeLg = 48.sp
    val typographyFontWeightBold = FontWeight.W900
    val typographyLineHeightLg = 1.25f
    
    // Spacing
    val spacing4 = 16.dp
    val borderRadiusLg = 10.dp
}
```

### CSS (Custom Properties)

```css
:root {
  /* Colors */
  --colors-base-white: #FFFFFF;
  --colors-brand-600: #7F56D9;
  
  /* Typography */
  --typography-font-family-display: "Bricolage Grotesque";
  --typography-font-size-lg: 48px;
  --typography-font-weight-bold: 900;
  --typography-line-height-lg: 60px;
  
  /* Spacing */
  --spacing-4: 16px;
  --border-radius-lg: 10px;
}
```

---

## 🔧 Technology Stack

- **Style Dictionary**: v5.1.1 (latest)
- **Node.js**: v18+ recommended
- **Custom Formatters**: Flutter, Compose, CSS
- **Build System**: Multi-platform simultaneous export
- **Type Safety**: Explicit types for mobile platforms

## 📂 Project Structure

```
design-tokens/
├── build.js                      # Multi-platform build script
├── package.json                  # Dependencies
│
├── formats/                      # Custom formatters
│   ├── flutter-class.js          # Flutter formatter (with gradients)
│   └── compose-object.js         # Jetpack Compose formatter
│
├── design-tokens/                # 🎨 SOURCE OF TRUTH
│   ├── primitives.json           # Base colors (668 tokens)
│   ├── typography.json           # Typography definitions (44 styles)
│   ├── spacing.json              # Spacing scale (29 tokens)
│   ├── radius.json               # Border radius (11 tokens)
│   ├── widths.json               # Border widths
│   ├── containers.json           # Container sizes
│   └── modes/
│       ├── light.json            # Light theme semantic mappings
│       └── dark.json             # Dark theme semantic mappings
│
├── build/                        # 📦 GENERATED OUTPUT
│   ├── flutter/
│   │   ├── tokens_light.dart     # 899 tokens
│   │   └── tokens_dark.dart      # 899 tokens
│   ├── compose/
│   │   ├── TokensLight.kt        # 869 tokens
│   │   └── TokensDark.kt         # 869 tokens
│   └── css/
│       ├── tokens-light.css      # 869 tokens
│       └── tokens-dark.css       # 869 tokens
│
└── docs/                         # 📖 DOCUMENTATION
    ├── flutter/                  # Flutter usage guide
    ├── compose/                  # Compose usage guide
    └── css/                      # CSS usage guide
```

## ✨ Key Features

### **Multi-Platform Export**
- ✅ **3 Platforms**: Flutter, Jetpack Compose, CSS
- ✅ **Single Build**: Generate all platforms simultaneously
- ✅ **Consistent**: Same design values across platforms

### **Complete Token System**
- ✅ **899 Tokens**: Most comprehensive coverage
- ✅ **Dark Mode**: Full light/dark theme support
- ✅ **Gradients**: 31 gradient definitions (Flutter)
- ✅ **Typography**: Complete TextStyle hierarchy
- ✅ **Shadows**: Multi-layer BoxShadow support

### **Developer Experience**
- ✅ **Type Safe**: Explicit types for mobile (Color, double, TextStyle)
- ✅ **Organized**: Grouped by category with comments
- ✅ **Documented**: Comprehensive docs for each platform
- ✅ **Production Ready**: Zero errors, fully tested
- ✅ **Hot Reload**: Changes apply immediately

### **Advanced Features**
- ✅ **Gradient Parser**: CSS linear-gradient → Flutter LinearGradient
- ✅ **Angle Mapping**: Intelligent angle to Alignment conversion
- ✅ **Font Weight Mapping**: Custom weights to platform standards
- ✅ **Relative Heights**: Typography with proper line height calculations
- ✅ **Semantic Naming**: Intuitive token names for clarity

## 🎯 Best Practices

### ✅ DO

```dart
// Use tokens for consistency
Container(
  color: TokensLight.colorsBrand600,
  padding: EdgeInsets.all(TokensLight.spacing4),
)

// Use complete TextStyles
Text('Title', style: TokensLight.typographyDisplayLgBold)

// Use gradients
decoration: BoxDecoration(
  gradient: TokensLight.colorsEffectsGradientsBrandGradient600To500Deg90,
)

// Theme switching
final tokens = isDark ? TokensDark : TokensLight;
color: tokens.colorsBackgroundPrimary
```

### ❌ DON'T

```dart
// Don't hardcode colors
color: Color(0xFF7F56D9)  // ❌ Use TokensLight.colorsBrand600

// Don't hardcode spacing
padding: EdgeInsets.all(16.0)  // ❌ Use TokensLight.spacing4

// Don't hardcode text styles
TextStyle(fontSize: 48, fontWeight: FontWeight.w700)  // ❌ Use typographyDisplayLgBold

// Don't hardcode gradients
LinearGradient(colors: [...])  // ❌ Use gradient tokens
```

## 🔄 Updating Tokens

### 1. Modify Source Tokens

Edit JSON files in `design-tokens/`:

```bash
# Edit base colors
design-tokens/primitives.json

# Edit semantic mappings
design-tokens/modes/light.json
design-tokens/modes/dark.json
```

### 2. Rebuild All Platforms

```bash
npm run build
```

This regenerates Flutter, Compose, and CSS tokens automatically!

### 3. Copy to Your Projects

```bash
# Flutter
cp build/flutter/*.dart your_flutter_project/lib/tokens/

# Jetpack Compose
cp build/compose/*.kt your_android_project/app/src/main/java/tokens/

# CSS
cp build/css/*.css your_web_project/src/styles/
```

### 4. Hot Reload / Rebuild

Changes apply immediately in development!

---

## 📚 Documentation

- **[Flutter Guide](docs/flutter/)** - Complete Flutter usage with examples
- **[Jetpack Compose Guide](docs/compose/)** - Compose integration & best practices
- **[CSS Guide](docs/css/)** - Web implementation with dark mode
- **[Gradient Usage](GRADIENT_USAGE_GUIDE.md)** - Flutter gradient examples
- **[Multi-Platform Guide](MULTI_PLATFORM_GUIDE.md)** - Cross-platform overview
- **[Example Usage](EXAMPLE_USAGE.md)** - Real-world code examples

---

## 🤝 Contributing

### Adding New Tokens

1. Add to appropriate JSON file in `design-tokens/`
2. Run `npm run build` to validate
3. Test in target platform(s)
4. Update documentation if needed

### Custom Formatters

See `formats/` directory for examples:
- `flutter-class.js` - Flutter Dart class generator
- `compose-object.js` - Kotlin object generator

---

## 📊 Token Statistics

| Category | Count | Platforms |
|----------|-------|-----------|
| Colors | 668 | All |
| Typography (TextStyles) | 44 | Flutter |
| Typography (Properties) | 56 | Compose, CSS |
| Gradients | 31 | Flutter |
| Spacing | 29 | All |
| Border Radius | 11 | All |
| Shadows | 11 | Flutter |
| Sizing & Containers | 16 | All |
| Border Widths | 4 | All |
| **Total Unique** | **870+** | **3 platforms** |

---

## ⚙️ Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Style Dictionary**: v5.1.1 (included)

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Missing Tokens

Check that source JSON files are valid:
```bash
# Validate JSON
node -e "require('./design-tokens/primitives.json')"
```

### Platform-Specific Issues

- **Flutter**: Check import path and file location
- **Compose**: Verify package name matches your project
- **CSS**: Ensure proper @import or <link> in HTML

---

## 📝 License

This project structure and formatters are available for use in your projects.

---

## 🌟 Credits

Built with:
- [Style Dictionary](https://amzn.github.io/style-dictionary/) by Amazon
- Custom formatters for multi-platform support
- Comprehensive design token system

---

**Generated by Style Dictionary v5.1.1**  
**Multi-Platform Support** | **Production Ready** | **899 Tokens** ✨

For detailed usage instructions, see platform-specific documentation in `docs/`
