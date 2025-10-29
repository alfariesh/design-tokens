/**
 * Compose dimensions formatter - spacing, radius, sizing
 */
export default function composeDimensionsFormat({ dictionary, options, file }) {
  const className = options?.className || file.className || 'Dimensions';
  const packageName = options?.packageName || 'com.app.tokens';
  
  // Helper to convert token name to camelCase
  const toCamelCase = (str) => {
    return str
      .replace(/[-_.](.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (_, char) => char.toLowerCase());
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
  let output = `// ${className}.kt
// Do not edit directly, this file was auto-generated.

package ${packageName}

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Dimension tokens
 * 
 * Spacing, border radius, sizing values for consistent layouts.
 * 
 * Example:
 * Box(
 *   modifier = Modifier
 *     .padding(${className}.spacing4)
 *     .size(${className}.sizing48)
 *     .clip(RoundedCornerShape(${className}.borderRadiusLg))
 * )
 */
object ${className} {

`;

  // Add spacing tokens
  if (grouped.spacing.length > 0) {
    output += `    // Spacing\n`;
    grouped.spacing.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}.dp\n`;
    });
    output += '\n';
  }

  // Add border radius tokens
  if (grouped.borderRadius.length > 0) {
    output += `    // Border radius\n`;
    grouped.borderRadius.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}.dp\n`;
    });
    output += '\n';
  }

  // Add border width tokens
  if (grouped.borderWidth.length > 0) {
    output += `    // Border width\n`;
    grouped.borderWidth.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}.dp\n`;
    });
    output += '\n';
  }

  // Add sizing tokens
  if (grouped.sizing.length > 0) {
    output += `    // Sizing\n`;
    grouped.sizing.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}.dp\n`;
    });
    output += '\n';
  }

  // Add other tokens
  if (grouped.other.length > 0) {
    output += `    // Other dimensions\n`;
    grouped.other.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}.dp\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
