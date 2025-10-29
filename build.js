import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';
import flutterThemeFormat from './formats/flutter-theme.js';
import flutterTypographyFormat from './formats/flutter-typography.js';
import flutterDimensionsFormat from './formats/flutter-dimensions.js';
import composeThemeFormat from './formats/compose-theme.js';
import composeTypographyFormat from './formats/compose-typography.js';
import composeDimensionsFormat from './formats/compose-dimensions.js';
import cssThemeVariablesFormat from './formats/css-theme-variables.js';
import cssTypographyFormat from './formats/css-typography.js';
import cssDimensionsFormat from './formats/css-dimensions.js';
import androidColorsThemeFormat from './formats/android-colors-theme.js';
import androidTypographyFormat from './formats/android-typography.js';
import androidDimensionsFormat from './formats/android-dimensions.js';
import iosSwiftThemeFormat from './formats/ios-swift-theme.js';
import iosSwiftTypographyFormat from './formats/ios-swift-typography.js';
import iosSwiftDimensionsFormat from './formats/ios-swift-dimensions.js';

// Register custom formats

// Flutter formatters
StyleDictionary.registerFormat({
  name: 'flutter/theme',
  format: flutterThemeFormat,
});

StyleDictionary.registerFormat({
  name: 'flutter/typography',
  format: flutterTypographyFormat,
});

StyleDictionary.registerFormat({
  name: 'flutter/dimensions',
  format: flutterDimensionsFormat,
});

// Compose formatters
StyleDictionary.registerFormat({
  name: 'compose/theme',
  format: composeThemeFormat,
});

StyleDictionary.registerFormat({
  name: 'compose/typography',
  format: composeTypographyFormat,
});

StyleDictionary.registerFormat({
  name: 'compose/dimensions',
  format: composeDimensionsFormat,
});

// CSS formatters
StyleDictionary.registerFormat({
  name: 'css/theme-variables',
  format: cssThemeVariablesFormat,
});

StyleDictionary.registerFormat({
  name: 'css/typography',
  format: cssTypographyFormat,
});

StyleDictionary.registerFormat({
  name: 'css/dimensions',
  format: cssDimensionsFormat,
});

// Register Android XML formats
StyleDictionary.registerFormat({
  name: 'android/colors-theme',
  format: androidColorsThemeFormat,
});

StyleDictionary.registerFormat({
  name: 'android/typography',
  format: androidTypographyFormat,
});

StyleDictionary.registerFormat({
  name: 'android/dimensions',
  format: androidDimensionsFormat,
});

// iOS Swift formatters
StyleDictionary.registerFormat({
  name: 'ios-swift/theme',
  format: iosSwiftThemeFormat,
});

StyleDictionary.registerFormat({
  name: 'ios-swift/typography',
  format: iosSwiftTypographyFormat,
});

StyleDictionary.registerFormat({
  name: 'ios-swift/dimensions',
  format: iosSwiftDimensionsFormat,
});

// ============================================
// FLUTTER - NEW 3-FILE STRUCTURE
// ============================================

// Build Typography (theme-independent, only once)
console.log('🚀 Building Flutter Typography...\n');
const sdTypography = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/typography.json',
  ],
  platforms: {
    'flutter-typography': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'typography.dart',
          format: 'flutter/typography',
          className: 'Typography',
        },
      ],
    },
  },
});

await sdTypography.buildAllPlatforms();

// Build Dimensions (theme-independent, only once)
console.log('\n🚀 Building Flutter Dimensions...\n');
const sdDimensions = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
  ],
  platforms: {
    'flutter-dimensions': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'dimensions.dart',
          format: 'flutter/dimensions',
          className: 'Dimensions',
        },
      ],
    },
  },
});

await sdDimensions.buildAllPlatforms();

// ============================================
// COMPOSE - NEW 3-FILE STRUCTURE
// ============================================

// Build Typography (theme-independent, only once)
console.log('\n🚀 Building Compose Typography...\n');
const sdComposeTypography = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/typography.json',
  ],
  platforms: {
    'compose-typography': {
      transformGroup: 'compose',
      buildPath: 'build/compose/',
      files: [
        {
          destination: 'Typography.kt',
          format: 'compose/typography',
          className: 'Typography',
          packageName: 'com.app.tokens',
        },
      ],
    },
  },
});

await sdComposeTypography.buildAllPlatforms();

// Build Dimensions (theme-independent, only once)
console.log('\n🚀 Building Compose Dimensions...\n');
const sdComposeDimensions = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
  ],
  platforms: {
    'compose-dimensions': {
      transformGroup: 'compose',
      buildPath: 'build/compose/',
      files: [
        {
          destination: 'Dimensions.kt',
          format: 'compose/dimensions',
          className: 'Dimensions',
          packageName: 'com.app.tokens',
        },
      ],
    },
  },
});

await sdComposeDimensions.buildAllPlatforms();

// ============================================
// CSS - NEW 4-FILE STRUCTURE
// ============================================

// Build Typography (theme-independent, only once)
console.log('\n🚀 Building CSS Typography...\n');
const sdCssTypography = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/typography.json',
  ],
  platforms: {
    'css-typography': {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'typography.css',
          format: 'css/typography',
        },
      ],
    },
  },
});

await sdCssTypography.buildAllPlatforms();

// Build Dimensions (theme-independent, only once)
console.log('\n🚀 Building CSS Dimensions...\n');
const sdCssDimensions = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
  ],
  platforms: {
    'css-dimensions': {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'dimensions.css',
          format: 'css/dimensions',
        },
      ],
    },
  },
});

await sdCssDimensions.buildAllPlatforms();

// ============================================
// iOS - NEW 3-FILE STRUCTURE
// ============================================

// Build Typography (theme-independent, only once)
console.log('\n🚀 Building iOS Typography...\n');
const sdIosTypography = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/typography.json',
  ],
  platforms: {
    'ios-swift-typography': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/',
      files: [
        {
          destination: 'Typography.swift',
          format: 'ios-swift/typography',
        },
      ],
    },
  },
});

await sdIosTypography.buildAllPlatforms();

// Build Dimensions (theme-independent, only once)
console.log('\n🚀 Building iOS Dimensions...\n');
const sdIosDimensions = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
  ],
  platforms: {
    'ios-swift-dimensions': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/',
      files: [
        {
          destination: 'Dimensions.swift',
          format: 'ios-swift/dimensions',
        },
      ],
    },
  },
});

await sdIosDimensions.buildAllPlatforms();

// ============================================
// ANDROID XML - TYPOGRAPHY (shared, theme-independent)
// ============================================

console.log('\n🚀 Building Android XML Typography...\n');
const sdAndroidTypography = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/typography.json',
  ],
  platforms: {
    'android-typography': {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'typography.xml',
          format: 'android/typography',
        },
      ],
    },
  },
});

await sdAndroidTypography.buildAllPlatforms();

// Build Dimensions (theme-independent, only once)
console.log('\n🚀 Building Android XML Dimensions...\n');
const sdAndroidDimensions = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
  ],
  platforms: {
    'android-dimensions': {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'dimens.xml',
          format: 'android/dimensions',
        },
      ],
    },
  },
});

await sdAndroidDimensions.buildAllPlatforms();

// Build Light Theme (semantic colors only)
console.log('\n🚀 Building Flutter Light Theme...\n');
const sdLight = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
    'design-tokens/modes/light.json',
  ],
  platforms: {
    // Flutter - Light Theme (temporary file)
    'flutter': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/.temp/',
      files: [
        {
          destination: 'theme_light.dart',
          format: 'flutter/theme',
          className: 'ThemeLight',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Jetpack Compose - Light Theme (temporary file)
    'compose': {
      transformGroup: 'compose',
      buildPath: 'build/compose/.temp/',
      files: [
        {
          destination: 'theme_light.kt',
          format: 'compose/theme',
          className: 'ThemeLight',
          packageName: 'com.app.tokens',
        },
      ],
    },
    // CSS - Light Theme (temporary file for merging)
    'css': {
      transformGroup: 'css',
      buildPath: 'build/css/.temp/',
      files: [
        {
          destination: 'theme_light.css',
          format: 'css/theme-variables',
          mode: 'light',
        },
      ],
    },
    // Android XML - Light Theme (semantic colors only)
    'android': {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'colors-light.xml',
          format: 'android/colors-theme',
          mode: 'light',
        },
      ],
    },
    // iOS - Light Theme (temporary file)
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/.temp/',
      files: [
        {
          destination: 'theme_light.swift',
          format: 'ios-swift/theme',
          className: 'ThemeLight',
        },
      ],
    },
  },
});

await sdLight.buildAllPlatforms();

// Build Dark Theme
console.log('\n🚀 Building Dark Theme (Flutter, Compose, CSS)...\n');
const sdDark = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
    'design-tokens/modes/dark.json',
  ],
  platforms: {
    // Flutter - Dark Theme (temporary file)
    'flutter': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/.temp/',
      files: [
        {
          destination: 'theme_dark.dart',
          format: 'flutter/theme',
          className: 'ThemeDark',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Jetpack Compose - Dark Theme (temporary file)
    'compose': {
      transformGroup: 'compose',
      buildPath: 'build/compose/.temp/',
      files: [
        {
          destination: 'theme_dark.kt',
          format: 'compose/theme',
          className: 'ThemeDark',
          packageName: 'com.app.tokens',
        },
      ],
    },
    // CSS - Dark Theme (temporary file for merging)
    'css': {
      transformGroup: 'css',
      buildPath: 'build/css/.temp/',
      files: [
        {
          destination: 'theme_dark.css',
          format: 'css/theme-variables',
          mode: 'dark',
        },
      ],
    },
    // Android XML - Dark Theme (semantic colors only)
    'android': {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        {
          destination: 'colors-dark.xml',
          format: 'android/colors-theme',
          mode: 'dark',
        },
      ],
    },
    // iOS - Dark Theme (temporary file)
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/.temp/',
      files: [
        {
          destination: 'theme_dark.swift',
          format: 'ios-swift/theme',
          className: 'ThemeDark',
        },
      ],
    },
  },
});

await sdDark.buildAllPlatforms();

// ============================================
// MERGE THEME FILES
// ============================================

console.log('\n🔄 Merging theme files...\n');

// Merge Flutter themes
const flutterTempPath = 'build/flutter/.temp/';
const flutterOutputPath = 'build/flutter/';

const flutterThemeLightContent = fs.readFileSync(path.join(flutterTempPath, 'theme_light.dart'), 'utf-8');
const flutterThemeDarkContent = fs.readFileSync(path.join(flutterTempPath, 'theme_dark.dart'), 'utf-8');

const combinedFlutterTheme = `//
// colors.dart
//

// Do not edit directly, this file was auto-generated.

import 'package:flutter/material.dart';

${flutterThemeLightContent.replace(/\/\/[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}

${flutterThemeDarkContent.replace(/\/\/[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}`;

fs.writeFileSync(path.join(flutterOutputPath, 'colors.dart'), combinedFlutterTheme);
fs.rmSync(flutterTempPath, { recursive: true, force: true });

console.log('✅ Flutter theme files merged!');

// Merge Compose themes
const composeTempPath = 'build/compose/.temp/';
const composeOutputPath = 'build/compose/';

const composeThemeLightContent = fs.readFileSync(path.join(composeTempPath, 'theme_light.kt'), 'utf-8');
const composeThemeDarkContent = fs.readFileSync(path.join(composeTempPath, 'theme_dark.kt'), 'utf-8');

const combinedComposeTheme = `// Colors.kt
// Do not edit directly, this file was auto-generated.

${composeThemeLightContent.replace(/\/\/[^\n]*\n/g, '').replace(/package[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}

${composeThemeDarkContent.replace(/\/\/[^\n]*\n/g, '').replace(/package[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}`;

// Add package and imports at the top
const finalComposeTheme = `package com.app.tokens

import androidx.compose.ui.graphics.Color

${combinedComposeTheme}`;

fs.writeFileSync(path.join(composeOutputPath, 'Colors.kt'), finalComposeTheme);
fs.rmSync(composeTempPath, { recursive: true, force: true });

console.log('✅ Compose theme files merged!');

// Merge iOS themes
const iosTempPath = 'build/ios/.temp/';
const iosOutputPath = 'build/ios/';

const iosThemeLightContent = fs.readFileSync(path.join(iosTempPath, 'theme_light.swift'), 'utf-8');
const iosThemeDarkContent = fs.readFileSync(path.join(iosTempPath, 'theme_dark.swift'), 'utf-8');

const combinedIosTheme = `// Colors.swift
// Do not edit directly, this file was auto-generated.

${iosThemeLightContent.replace(/\/\/[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}

${iosThemeDarkContent.replace(/\/\/[^\n]*\n/g, '').replace(/import[^\n]*\n/g, '')}`;

// Add imports at the top
const finalIosTheme = `import UIKit
import SwiftUI

${combinedIosTheme}`;

fs.writeFileSync(path.join(iosOutputPath, 'Colors.swift'), finalIosTheme);
fs.rmSync(iosTempPath, { recursive: true, force: true });

console.log('✅ iOS theme files merged!');

// Merge CSS themes into single file with CSS Variables
const cssTempPath = 'build/css/.temp/';
const cssOutputPath = 'build/css/';

const cssThemeLightContent = fs.readFileSync(path.join(cssTempPath, 'theme_light.css'), 'utf-8');
const cssThemeDarkContent = fs.readFileSync(path.join(cssTempPath, 'theme_dark.css'), 'utf-8');

const combinedCssTheme = `/**
 * Do not edit directly, this file was auto-generated.
 *
 * Design Tokens - Theme Colors
 * Single file with CSS Variables for light and dark mode
 *
 * Usage:
 *   background-color: var(--colors-background-primary);
 *   color: var(--colors-text-primary);
 *
 * The theme automatically switches based on system preference.
 * For manual control, add data-theme="dark" to your root element.
 */

:root {
  /* Light theme (default) */
${cssThemeLightContent}}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme */
${cssThemeDarkContent}  }
}

/* Manual dark mode toggle support */
[data-theme="dark"] {
${cssThemeDarkContent}}
`;

fs.writeFileSync(path.join(cssOutputPath, 'colors.css'), combinedCssTheme);
fs.rmSync(cssTempPath, { recursive: true, force: true });

console.log('✅ CSS theme files merged!');

console.log('\n✅ Build completed successfully!');
console.log('📦 Generated:');
console.log('   - Flutter: build/flutter/');
console.log('     • colors.dart (ThemeLight + ThemeDark)');
console.log('     • typography.dart');
console.log('     • dimensions.dart');
console.log('   - Compose: build/compose/');
console.log('     • Colors.kt (ThemeLight + ThemeDark objects)');
console.log('     • Typography.kt');
console.log('     • Dimensions.kt');
console.log('   - CSS: build/css/');
console.log('     • colors.css (CSS Variables with light + dark)');
console.log('     • typography.css');
console.log('     • dimensions.css');
console.log('   - Android XML: build/android/');
console.log('     • colors-light.xml (semantic colors light)');
console.log('     • colors-dark.xml (semantic colors dark)');
console.log('     • typography.xml (font properties)');
console.log('     • dimensions.xml (spacing, radius)');
console.log('   - iOS: build/ios/');
console.log('     • Colors.swift (ThemeLight + ThemeDark structs)');
console.log('     • Typography.swift');
console.log('     • Dimensions.swift');
