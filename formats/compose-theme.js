/**
 * Compose theme formatter - colors only (semantic colors)
 * Generates single file with ThemeLight and ThemeDark objects
 */
import { fileHeader } from 'style-dictionary/utils';
import { filterSemanticColors } from './utils/filters.js';
import { toCamelCase } from './utils/nameConverters.js';
import { groupSemanticColors, buildGroupedOutput } from './utils/grouping.js';

export default async function composeThemeFormat({ dictionary, options = {}, file }) {
  // Validate input
  if (!dictionary?.allTokens) {
    throw new Error('Dictionary or allTokens is missing in compose-theme formatter');
  }

  const className = options.className ?? file.className ?? 'ThemeLight';
  const packageName = options.packageName ?? file.packageName ?? 'com.app.tokens';
  const formatting = options.formatting ?? {};

  // Helper to format color values for Compose
  const formatColor = (value) => {
    if (typeof value === 'string') {
      // If already in Compose Color format (from transform), use as-is
      if (value.startsWith('Color(')) {
        return value;
      }

      // Fallback: manual conversion if needed
      if (value.startsWith('#')) {
        let hex = value.replace('#', '').toLowerCase();
        if (hex.length === 8) {
          const rgb = hex.substring(0, 6);
          const alpha = hex.substring(6, 8);
          return `Color(0x${alpha}${rgb})`;
        } else if (hex.length === 6) {
          return `Color(0xff${hex})`;
        } else if (hex.length === 3) {
          hex = hex.split('').map(char => char + char).join('');
          return `Color(0xff${hex})`;
        }
      }
    }
    return `Color(0xff000000)`;
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
  output += `package ${packageName}

import androidx.compose.ui.graphics.Color

/**
 * Design tokens - ${className} theme
 *
 * Semantic color tokens for ${className.includes('Light') ? 'light' : 'dark'} theme.
 * Auto-generated from design tokens - do not edit directly.
 */
object ${className} {
`;

  // Build grouped output using utility
  output += buildGroupedOutput(
    grouped,
    '//',
    (name, value) => `  val ${name} = ${value}\n`
  );

  output += `}\n`;

  return output;
}
