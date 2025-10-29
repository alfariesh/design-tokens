/**
 * CSS typography formatter - font properties
 */
export default function cssTypographyFormat({ dictionary, options, file }) {
  
  // Helper to convert token name to kebab-case
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\s]/g, '-')
      .toLowerCase();
  };

  // Helper to format number
  const formatNumber = (value) => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    }
    return typeof value === 'number' ? value : 0;
  };

  // Filter typography-related tokens
  const fontFamilyTokens = [];
  const fontSizeTokens = [];
  const fontWeightTokens = [];
  const lineHeightTokens = [];
  const letterSpacingTokens = [];

  dictionary.allTokens.forEach(token => {
    const tokenType = token.type || token.$type;
    const path = token.path.join('.');
    
    if (path.includes('fontFamily')) {
      fontFamilyTokens.push(token);
    } else if (tokenType === 'fontSizes' || path.includes('fontSize')) {
      fontSizeTokens.push(token);
    } else if (tokenType === 'fontWeights' || path.includes('fontWeight')) {
      fontWeightTokens.push(token);
    } else if (tokenType === 'lineHeights' || path.includes('lineHeight')) {
      lineHeightTokens.push(token);
    } else if (tokenType === 'letterSpacing' || path.includes('letterSpacing')) {
      letterSpacingTokens.push(token);
    }
  });

  // Build output
  let output = `/**
 * Do not edit directly, this file was auto-generated.
 * 
 * Design Tokens - Typography
 * 
 * Usage:
 * font-family: var(--font-family-inter);
 * font-size: var(--font-size-lg);
 * font-weight: var(--font-weight-bold);
 */

:root {
`;

  // Add font families
  if (fontFamilyTokens.length > 0) {
    output += `  /* Font families */\n`;
    fontFamilyTokens.forEach(token => {
      const name = toKebabCase(token.name);
      output += `  --${name}: ${token.value};\n`;
    });
    output += '\n';
  }

  // Add font sizes
  if (fontSizeTokens.length > 0) {
    output += `  /* Font sizes */\n`;
    fontSizeTokens.forEach(token => {
      const name = toKebabCase(token.name);
      const value = formatNumber(token.value);
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add font weights
  if (fontWeightTokens.length > 0) {
    output += `  /* Font weights */\n`;
    fontWeightTokens.forEach(token => {
      const name = toKebabCase(token.name);
      const value = formatNumber(token.value);
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add line heights
  if (lineHeightTokens.length > 0) {
    output += `  /* Line heights */\n`;
    lineHeightTokens.forEach(token => {
      const name = toKebabCase(token.name);
      const value = formatNumber(token.value);
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add letter spacing
  if (letterSpacingTokens.length > 0) {
    output += `  /* Letter spacing */\n`;
    letterSpacingTokens.forEach(token => {
      const name = toKebabCase(token.name);
      const value = token.value;
      
      if (typeof value === 'string' && value.includes('%')) {
        const percent = parseFloat(value.replace('%', ''));
        output += `  --${name}: ${(percent / 100).toFixed(2)}em;\n`;
      } else {
        const numValue = formatNumber(value);
        output += `  --${name}: ${numValue}px;\n`;
      }
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
