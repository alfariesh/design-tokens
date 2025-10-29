/**
 * Android XML Colors format - Semantic colors only (theme colors)
 * Excludes primitive colors
 */
import { fileHeader } from 'style-dictionary/utils';
import { filterSemanticColors } from './utils/filters.js';
import { toSnakeCase } from './utils/nameConverters.js';

// Helper to format color values for Android
const formatAndroidColor = (value) => {
  if (typeof value === 'string') {
    if (value.startsWith('#')) {
      let hex = value.replace('#', '').toLowerCase();
      // Handle alpha channel - Android uses #AARRGGBB format
      if (hex.length === 8) {
        // If format is AARRGGBB (from Style Dictionary android transform), return as-is
        return `#${hex}`;
      } else if (hex.length === 6) {
        return `#ff${hex}`; // Add full opacity
      } else if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
        return `#ff${hex}`;
      }
    }
    return value;
  }

  if (typeof value === 'number') {
    return `#${value.toString(16).padStart(8, '0').toLowerCase()}`;
  }

  return value;
};

export default async function androidColorsThemeFormat({ dictionary, options = {}, file }) {
  // Validate input
  if (!dictionary?.allTokens) {
    throw new Error('Dictionary or allTokens is missing in android-colors-theme formatter');
  }

  const mode = options.mode ?? file.mode ?? 'light';
  const themeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
  const formatting = options.formatting ?? {};

  // Filter semantic colors using reusable utility
  const semanticColors = filterSemanticColors(dictionary, options);

  if (semanticColors.length === 0) {
    console.warn(`⚠️  No semantic color tokens found for Android ${themeLabel} theme`);
  }

  // Generate file header using Style Dictionary helper
  const header = await fileHeader({
    file,
    formatting,
    options,
    commentStyle: 'xml'
  });

  let output = `<?xml version="1.0" encoding="UTF-8"?>

${header}
<!--
  Design Tokens - Theme Colors (${themeLabel} Mode)
  Semantic color tokens only (no primitives)

  Usage:
  <View android:background="@color/colors_background_primary" />
  <TextView android:textColor="@color/colors_text_primary" />
-->
<resources>
`;

  semanticColors.forEach(token => {
    const name = toSnakeCase(token.name);
    const value = formatAndroidColor(token.value);
    const comment = token.comment || token.description;

    if (comment) {
      output += `    <!-- ${comment} -->\n`;
    }
    output += `    <color name="${name}">${value}</color>\n`;
  });

  output += `</resources>\n`;

  return output;
}
