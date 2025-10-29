/**
 * Android XML Typography format
 * Font sizes, weights, line heights
 */

// Helper to convert token name to snake_case
const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s_.]+/g, '_')
    .toLowerCase();
};

// Helper to format font size values
const formatFontSize = (value) => {
  if (typeof value === 'string') {
    if (value.includes('sp') || value.includes('dp') || value.includes('px')) {
      return value;
    }
    const num = parseFloat(value);
    return isNaN(num) ? value : `${num}sp`;
  }
  if (typeof value === 'number') {
    return `${value}sp`;
  }
  return value;
};

// Helper to format dimension values for line height
const formatDimension = (value) => {
  if (typeof value === 'string') {
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

export default function androidTypographyFormat({ dictionary }) {
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

  let output = `<?xml version="1.0" encoding="UTF-8"?>

<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Typography
  Font families, sizes, weights, line heights
  
  Usage:
  <TextView
      android:fontFamily="@string/font_family_text"
      android:textSize="@dimen/font_size_lg"
      android:lineHeight="@dimen/line_height_text_lg" />
-->
<resources>
`;

  // Font families as strings
  if (fontFamilyTokens.length > 0) {
    output += `    <!-- Font families -->\n`;
    fontFamilyTokens.forEach(token => {
      const name = toSnakeCase(token.name);
      output += `    <string name="${name}">${token.value}</string>\n`;
    });
    output += '\n';
  }

  // Font sizes as dimensions (sp)
  if (fontSizeTokens.length > 0) {
    output += `    <!-- Font sizes -->\n`;
    fontSizeTokens.forEach(token => {
      const name = toSnakeCase(token.name);
      const value = formatFontSize(token.value);
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Font weights as integers (100-900)
  if (fontWeightTokens.length > 0) {
    output += `    <!-- Font weights -->\n`;
    fontWeightTokens.forEach(token => {
      const name = toSnakeCase(token.name);
      let weight = typeof token.value === 'string' ? parseFloat(token.value) : token.value;
      // Round to nearest valid weight
      if (weight <= 150) weight = 100;
      else if (weight <= 250) weight = 200;
      else if (weight <= 350) weight = 300;
      else if (weight <= 450) weight = 400;
      else if (weight <= 550) weight = 500;
      else if (weight <= 650) weight = 600;
      else if (weight <= 850) weight = 700;
      else if (weight <= 950) weight = 800;
      else weight = 900;
      
      output += `    <integer name="${name}">${weight}</integer>\n`;
    });
    output += '\n';
  }

  // Line heights as dimensions (dp or sp)
  if (lineHeightTokens.length > 0) {
    output += `    <!-- Line heights -->\n`;
    lineHeightTokens.forEach(token => {
      const name = toSnakeCase(token.name);
      const value = formatDimension(token.value);
      output += `    <dimen name="${name}">${value}</dimen>\n`;
    });
    output += '\n';
  }

  // Letter spacing as floats (em)
  if (letterSpacingTokens.length > 0) {
    output += `    <!-- Letter spacing (em) -->\n`;
    letterSpacingTokens.forEach(token => {
      const name = toSnakeCase(token.name);
      let value = token.value;
      
      if (typeof value === 'string' && value.includes('%')) {
        const percent = parseFloat(value.replace('%', ''));
        value = (percent / 100).toFixed(2);
      } else if (typeof value === 'number') {
        value = value.toFixed(2);
      } else if (typeof value === 'string') {
        value = parseFloat(value).toFixed(2);
      }
      
      output += `    <item name="${name}" type="dimen" format="float">${value}</item>\n`;
    });
    output += '\n';
  }

  output += `</resources>\n`;

  return output;
}
