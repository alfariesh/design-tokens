/**
 * Reusable name conversion utilities for Style Dictionary formatters
 *
 * Provides consistent naming conventions across different platforms.
 *
 * @module utils/nameConverters
 */

/**
 * Convert string to camelCase format
 *
 * Transforms kebab-case, snake_case, or space-separated strings into camelCase.
 * Commonly used for JavaScript, Dart (Flutter), and Kotlin (Compose) token names.
 *
 * @param {string} str - Input string to convert
 * @returns {string} Converted string in camelCase format
 *
 * @example
 * toCamelCase('my-token-name')    // 'myTokenName'
 * toCamelCase('my_token_name')    // 'myTokenName'
 * toCamelCase('my.token.name')    // 'myTokenName'
 * toCamelCase('colors-text-primary') // 'colorsTextPrimary'
 */
export function toCamelCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_./]+/g, '-')
    .toLowerCase()
    .replace(/-(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Convert string to snake_case format
 *
 * Transforms any naming convention into snake_case with lowercase letters.
 * Commonly used for Android XML resource names and Python.
 *
 * @param {string} str - Input string to convert
 * @returns {string} Converted string in snake_case format
 *
 * @example
 * toSnakeCase('myTokenName')      // 'my_token_name'
 * toSnakeCase('my-token-name')    // 'my_token_name'
 * toSnakeCase('MyTokenName')      // 'my_token_name'
 * toSnakeCase('colorsTextPrimary') // 'colors_text_primary'
 */
export function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s_.]+/g, '_')
    .toLowerCase();
}

/**
 * Convert string to kebab-case format
 *
 * Transforms any naming convention into kebab-case with lowercase letters.
 * Commonly used for CSS class names and HTML attributes.
 *
 * @param {string} str - Input string to convert
 * @returns {string} Converted string in kebab-case format
 *
 * @example
 * toKebabCase('myTokenName')      // 'my-token-name'
 * toKebabCase('my_token_name')    // 'my-token-name'
 * toKebabCase('MyTokenName')      // 'my-token-name'
 * toKebabCase('colorsTextPrimary') // 'colors-text-primary'
 */
export function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_.]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to PascalCase format
 *
 * Transforms any naming convention into PascalCase (UpperCamelCase).
 * Commonly used for class names and component names.
 *
 * @param {string} str - Input string to convert
 * @returns {string} Converted string in PascalCase format
 *
 * @example
 * toPascalCase('my-token-name')    // 'MyTokenName'
 * toPascalCase('my_token_name')    // 'MyTokenName'
 * toPascalCase('myTokenName')      // 'MyTokenName'
 * toPascalCase('colorsTextPrimary') // 'ColorsTextPrimary'
 */
export function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Normalize Unicode characters for Flutter/Dart compatibility
 *
 * Converts accented characters (é, ñ, ü) to their base ASCII form.
 * Removes diacritical marks and keeps only alphanumeric characters.
 * Useful for creating valid Dart identifiers from internationalized token names.
 *
 * @param {string} str - Input string with potential Unicode characters
 * @returns {string} Normalized ASCII string
 *
 * @example
 * normalizeUnicode('café')        // 'cafe'
 * normalizeUnicode('señor')       // 'senor'
 * normalizeUnicode('über')        // 'uber'
 * normalizeUnicode('naïve-123')   // 'naive123'
 */
export function normalizeUnicode(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}
