/**
 * Reusable grouping utilities for Style Dictionary formatters
 *
 * Provides utilities to organize tokens by semantic categories for better code structure.
 *
 * @module utils/grouping
 */

/**
 * Group semantic color tokens by category
 *
 * Organizes filtered tokens into semantic categories (text, background, border, etc.)
 * for better code structure and readability in generated files.
 *
 * @param {Array<Object>} semanticColors - Array of filtered semantic color tokens
 * @param {Function} nameConverter - Function to convert token names (e.g., toCamelCase)
 * @param {Function} valueFormatter - Function to format token values (e.g., formatColor)
 * @returns {Object} Object with tokens grouped by category
 * @returns {Array} returns.text - Text color tokens
 * @returns {Array} returns.background - Background color tokens
 * @returns {Array} returns.border - Border color tokens
 * @returns {Array} returns.foreground - Foreground color tokens
 * @returns {Array} returns.utility - Utility color tokens
 * @returns {Array} returns.components - Component color tokens
 * @returns {Array} returns.alpha - Alpha/transparency color tokens
 *
 * @example
 * const grouped = groupSemanticColors(
 *   semanticTokens,
 *   toCamelCase,
 *   formatColor
 * );
 * // Result: { text: [...], background: [...], ... }
 */
export function groupSemanticColors(semanticColors, nameConverter, valueFormatter) {
  const grouped = {
    text: [],
    background: [],
    border: [],
    foreground: [],
    utility: [],
    components: [],
    alpha: []
  };

  semanticColors.forEach(token => {
    const name = nameConverter(token.name);
    const value = valueFormatter(token.value);
    const path = token.path.join('.');

    const entry = { name, value };

    if (path.startsWith('colors.text')) {
      grouped.text.push(entry);
    } else if (path.startsWith('colors.background')) {
      grouped.background.push(entry);
    } else if (path.startsWith('colors.border')) {
      grouped.border.push(entry);
    } else if (path.startsWith('colors.foreground')) {
      grouped.foreground.push(entry);
    } else if (path.startsWith('componentColors.utility')) {
      grouped.utility.push(entry);
    } else if (path.startsWith('componentColors.components')) {
      grouped.components.push(entry);
    } else if (path.startsWith('componentColors.alpha')) {
      grouped.alpha.push(entry);
    }
  });

  return grouped;
}

/**
 * Build formatted output from grouped tokens with category comments
 *
 * Takes grouped tokens and generates formatted code output with category
 * headers and properly formatted token definitions.
 *
 * @param {Object} grouped - Grouped tokens object from groupSemanticColors()
 * @param {string} commentStyle - Comment prefix for the target language
 *   - '///' for Dart doc comments
 *   - '//' for Kotlin/Java comments
 *   - '#' for Python comments
 * @param {Function} lineFormatter - Function to format each token line
 *   - Receives (name, value) and returns formatted string
 * @returns {string} Complete formatted output with comments and token definitions
 *
 * @example
 * // Flutter/Dart output
 * const output = buildGroupedOutput(
 *   grouped,
 *   '//',
 *   (name, value) => `  static const Color ${name} = ${value};\n`
 * );
 *
 * @example
 * // Kotlin/Compose output
 * const output = buildGroupedOutput(
 *   grouped,
 *   '//',
 *   (name, value) => `  val ${name} = ${value}\n`
 * );
 */
export function buildGroupedOutput(grouped, commentStyle, lineFormatter) {
  let output = '';

  const categories = [
    { key: 'text', label: 'Text colors' },
    { key: 'background', label: 'Background colors' },
    { key: 'border', label: 'Border colors' },
    { key: 'foreground', label: 'Foreground colors' },
    { key: 'utility', label: 'Utility colors' },
    { key: 'components', label: 'Component colors' },
    { key: 'alpha', label: 'Alpha colors' }
  ];

  categories.forEach(({ key, label }) => {
    if (grouped[key].length > 0) {
      output += `  ${commentStyle} ${label}\n`;
      grouped[key].forEach(({ name, value }) => {
        output += lineFormatter(name, value);
      });
      output += '\n';
    }
  });

  return output;
}
