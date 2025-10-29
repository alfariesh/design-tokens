/**
 * Custom Flutter dimensions format for Style Dictionary v5
 * Generates Dimensions class with spacing, radius, sizing, etc.
 */
export default function flutterDimensionsFormat({ dictionary, options, file }) {
  const className = file.className || options.className || 'Dimensions';
  
  // Helper to convert token name to camelCase
  const toCamelCase = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[éèêë]/g, 'e')
              .replace(/[áàâä]/g, 'a')
              .replace(/[íìîï]/g, 'i')
              .replace(/[óòôö]/g, 'o')
              .replace(/[úùûü]/g, 'u');
    return str.replace(/[-_.](.)/g, (_, char) => char.toUpperCase());
  };

  // Helper to format number values
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
    const name = toCamelCase(token.name);
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
  let output = `//
// ${file.destination}
//

// Do not edit directly, this file was auto-generated.

/// Dimensions design tokens
/// 
/// Contains spacing, border radius, sizing, and other dimension values.
class ${className} {
  ${className}._();

`;

  // Add spacing tokens
  if (grouped.spacing.length > 0) {
    output += `  // Spacing\n`;
    grouped.spacing.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add border radius tokens
  if (grouped.borderRadius.length > 0) {
    output += `  // Border radius\n`;
    grouped.borderRadius.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add border width tokens
  if (grouped.borderWidth.length > 0) {
    output += `  // Border width\n`;
    grouped.borderWidth.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add sizing tokens
  if (grouped.sizing.length > 0) {
    output += `  // Sizing\n`;
    grouped.sizing.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add other tokens
  if (grouped.other.length > 0) {
    output += `  // Other dimensions\n`;
    grouped.other.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
