/**
 * Reusable filter functions for Style Dictionary formatters
 *
 * @module utils/filters
 */

/**
 * Filter only semantic color tokens, excluding primitive colors
 *
 * This function filters out base/primitive colors (like colors.brand.500) and only
 * returns semantic tokens (like colors.text.primary) that developers should use.
 *
 * @param {Object} dictionary - Style Dictionary object containing allTokens
 * @param {Array} dictionary.allTokens - Array of all design tokens
 * @param {Object} [options={}] - Format options
 * @param {boolean} [options.usesDtcg=false] - Whether using DTCG format ($value vs value)
 * @returns {Array<Object>} Filtered array of semantic color tokens
 *
 * @example
 * // Returns only semantic colors
 * const semantic = filterSemanticColors(dictionary);
 * // Result: [{ name: 'colorsTextPrimary', value: '#181d27', ... }]
 *
 * @example
 * // With DTCG format
 * const semantic = filterSemanticColors(dictionary, { usesDtcg: true });
 */
export function filterSemanticColors(dictionary, options = {}) {
  if (!dictionary?.allTokens) {
    return [];
  }

  return dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;

    // Must be a color type
    if (tokenType !== 'color') return false;

    // Skip object/array values (design tokens with multiple properties)
    const rawValue = options.usesDtcg ? token.$value : token.value;
    if (typeof rawValue === 'object' && rawValue !== null) {
      return false;
    }

    const path = token.path.join('.');

    // Define primitive patterns to exclude
    const primitivePatterns = [
      'colors.base',
      'colors.brand.',
      'colors.error.',
      'colors.warning.',
      'colors.success.',
      'colors.gray',
      'colors.blue',
      'colors.indigo',
      'colors.purple',
      'colors.pink',
      'colors.fuchsia',
      'colors.orange',
      'colors.green',
      'colors.yellow',
      'colors.effects.shadowColors'
    ];

    // Exclude primitives
    if (primitivePatterns.some(pattern => path.startsWith(pattern))) {
      return false;
    }

    // Define semantic patterns to include
    const semanticPatterns = [
      'colors.text',
      'colors.background',
      'colors.border',
      'colors.foreground',
      'componentColors.utility',
      'componentColors.components',
      'componentColors.alpha'
    ];

    // Include only semantic colors
    return semanticPatterns.some(pattern => path.startsWith(pattern));
  });
}
