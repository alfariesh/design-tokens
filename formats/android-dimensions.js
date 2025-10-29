/**
 * Android XML Dimensions format - Spacing, radius, sizing only
 * Excludes font sizes (those go in typography.xml)
 */

// Helper to convert token name to snake_case
const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s_.]+/g, '_')
    .toLowerCase();
};

// Helper to format dimension values
const formatDimension = (value) => {
  if (typeof value === 'string') {
    // If already has a unit, return as is
    if (value.includes('dp') || value.includes('sp') || value.includes('px')) {
      return value;
    }
    const num = parseFloat(value);
    return isNaN(num) ? value : `${num}dp`;
  }
  if (typeof value === 'number') {
    return `${value}dp`;
  }
  return value;
};

export default function androidDimensionsFormat({ dictionary }) {
  // Filter dimension-related tokens (exclude font sizes)
  const dimensionTokens = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    const path = token.path.join('.');
    
    // Exclude font sizes (those go in typography.xml)
    if (path.includes('fontSize') || tokenType === 'fontSizes') {
      return false;
    }
    
    // Include spacing, radius, sizing, borderWidth
    return (
      tokenType === 'spacing' ||
      tokenType === 'borderRadius' ||
      tokenType === 'borderWidth' ||
      tokenType === 'sizing' ||
      tokenType === 'dimension' ||
      tokenType === 'number'
    );
  });

  let output = `<?xml version="1.0" encoding="UTF-8"?>

<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Dimensions
  Spacing, border radius, sizing values
  
  Usage:
  <View
      android:padding="@dimen/spacing_4"
      android:layout_width="@dimen/sizing_48" />
-->
<resources>
`;

  // Group by type
  const grouped = {
    spacing: [],
    borderRadius: [],
    borderWidth: [],
    sizing: [],
    other: []
  };

  dimensionTokens.forEach(token => {
    const name = toSnakeCase(token.name);
    const value = formatDimension(token.value);
    const tokenType = token.type || token.$type;
    const comment = token.comment || token.description;
    
    const item = { name, value, comment };
    
    if (tokenType === 'spacing') {
      grouped.spacing.push(item);
    } else if (tokenType === 'borderRadius') {
      grouped.borderRadius.push(item);
    } else if (tokenType === 'borderWidth') {
      grouped.borderWidth.push(item);
    } else if (tokenType === 'sizing') {
      grouped.sizing.push(item);
    } else {
      grouped.other.push(item);
    }
  });

  // Add spacing dimensions
  if (grouped.spacing.length > 0) {
    output += `    <!-- Spacing -->\n`;
    grouped.spacing.forEach(({ name, value, comment }) => {
      if (comment) {
        output += `    <!-- ${comment} -->\n`;
      }
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Add border radius dimensions
  if (grouped.borderRadius.length > 0) {
    output += `    <!-- Border radius -->\n`;
    grouped.borderRadius.forEach(({ name, value, comment }) => {
      if (comment) {
        output += `    <!-- ${comment} -->\n`;
      }
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Add border width dimensions
  if (grouped.borderWidth.length > 0) {
    output += `    <!-- Border width -->\n`;
    grouped.borderWidth.forEach(({ name, value, comment }) => {
      if (comment) {
        output += `    <!-- ${comment} -->\n`;
      }
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Add sizing dimensions
  if (grouped.sizing.length > 0) {
    output += `    <!-- Sizing -->\n`;
    grouped.sizing.forEach(({ name, value, comment }) => {
      if (comment) {
        output += `    <!-- ${comment} -->\n`;
      }
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Add other dimensions
  if (grouped.other.length > 0) {
    output += `    <!-- Other dimensions -->\n`;
    grouped.other.forEach(({ name, value, comment }) => {
      if (comment) {
        output += `    <!-- ${comment} -->\n`;
      }
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  output += `</resources>\n`;

  return output;
}
