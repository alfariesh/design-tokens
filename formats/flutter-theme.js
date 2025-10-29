/**
 * Custom Flutter theme format for Style Dictionary v5
 * Generates ThemeLight or ThemeDark class with semantic colors only
 */
import { fileHeader } from 'style-dictionary/utils';
import { filterSemanticColors } from './utils/filters.js';
import { toCamelCase, normalizeUnicode } from './utils/nameConverters.js';
import { groupSemanticColors, buildGroupedOutput } from './utils/grouping.js';

export default async function flutterThemeFormat({ dictionary, options = {}, file }) {
  // Validate input
  if (!dictionary?.allTokens) {
    throw new Error('Dictionary or allTokens is missing in flutter-theme formatter');
  }

  const className = file.className ?? options.className ?? 'ThemeLight';
  const formatting = options.formatting ?? {};

  // Helper to format color values
  // Note: Flutter transformGroup already converts colors to 'Color(0xFFHEXHEX)' format
  const formatColor = (value) => {
    if (typeof value === 'string') {
      // If already in Flutter Color format (from transform), use as-is
      if (value.startsWith('Color(')) {
        return value;
      }

      // Fallback: manual conversion if needed
      if (value.startsWith('#')) {
        let hex = value.replace('#', '').toUpperCase();
        if (hex.length === 8) {
          const rgb = hex.substring(0, 6);
          const alpha = hex.substring(6, 8);
          return `Color(0x${alpha}${rgb})`;
        } else if (hex.length === 6) {
          return `Color(0xFF${hex})`;
        } else if (hex.length === 3) {
          hex = hex.split('').map(char => char + char).join('');
          return `Color(0xFF${hex})`;
        }
      }
      if (value.startsWith('0x') || value.startsWith('0X')) {
        return `Color(${value})`;
      }
    }
    return `Color(0xFF000000)`;
  };

  // Filter semantic colors using reusable utility
  const semanticColors = filterSemanticColors(dictionary, options);

  if (semanticColors.length === 0) {
    console.warn(`⚠️  No semantic color tokens found for ${className}`);
  }

  // Group tokens by category using reusable utility
  const grouped = groupSemanticColors(semanticColors, toCamelCase, formatColor);

  // Generate file header using Style Dictionary helper
  const header = await fileHeader({ file, formatting, options });

  // Build output
  let output = header;
  output += `/// Design tokens - ${className} theme
///
/// Semantic color tokens for ${className.includes('Light') ? 'light' : 'dark'} theme.
/// Auto-generated from design tokens - do not edit directly.
class ${className} {
  ${className}._();

`;

  // Build grouped output using utility
  output += buildGroupedOutput(
    grouped,
    '//',
    (name, value) => `  static const Color ${name} = ${value};\n`
  );

  output += `}\n`;

  return output;
}
