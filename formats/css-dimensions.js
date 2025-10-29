/**
 * CSS dimensions formatter - spacing, radius, sizing
 */
export default function cssDimensionsFormat({ dictionary, options, file }) {
  
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

  // Filter dimension-related tokens
  const dimensionTokens = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    return (
      tokenType === 'spacing' ||
      tokenType === 'borderRadius' ||
      tokenType === 'borderWidth' ||
      tokenType === 'sizing' ||
      tokenType === 'dimension' ||
      tokenType === 'number'
    );
  });

  // Group by type
  const grouped = {
    spacing: [],
    borderRadius: [],
    borderWidth: [],
    sizing: [],
    other: []
  };

  dimensionTokens.forEach(token => {
    const name = toKebabCase(token.name);
    const value = formatNumber(token.value);
    const tokenType = token.type || token.$type;
    
    if (tokenType === 'spacing') {
      grouped.spacing.push({ name, value });
    } else if (tokenType === 'borderRadius') {
      grouped.borderRadius.push({ name, value });
    } else if (tokenType === 'borderWidth') {
      grouped.borderWidth.push({ name, value });
    } else if (tokenType === 'sizing') {
      grouped.sizing.push({ name, value });
    } else {
      grouped.other.push({ name, value });
    }
  });

  // Build output
  let output = `/**
 * Do not edit directly, this file was auto-generated.
 * 
 * Design Tokens - Dimensions
 * 
 * Usage:
 * padding: var(--spacing-4);
 * border-radius: var(--border-radius-lg);
 * width: var(--sizing-48);
 */

:root {
`;

  // Add spacing tokens
  if (grouped.spacing.length > 0) {
    output += `  /* Spacing */\n`;
    grouped.spacing.forEach(({ name, value }) => {
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add border radius tokens
  if (grouped.borderRadius.length > 0) {
    output += `  /* Border radius */\n`;
    grouped.borderRadius.forEach(({ name, value }) => {
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add border width tokens
  if (grouped.borderWidth.length > 0) {
    output += `  /* Border width */\n`;
    grouped.borderWidth.forEach(({ name, value }) => {
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add sizing tokens
  if (grouped.sizing.length > 0) {
    output += `  /* Sizing */\n`;
    grouped.sizing.forEach(({ name, value }) => {
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  // Add other tokens
  if (grouped.other.length > 0) {
    output += `  /* Other dimensions */\n`;
    grouped.other.forEach(({ name, value }) => {
      output += `  --${name}: ${value}px;\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
