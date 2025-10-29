/**
 * Compose typography formatter - font properties only
 * NOT full TextStyle - Compose doesn't support static TextStyle objects easily
 */
export default function composeTypographyFormat({ dictionary, options, file }) {
  const className = options?.className || file.className || 'Typography';
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
  let output = `// ${className}.kt
// Do not edit directly, this file was auto-generated.

package ${packageName}

import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

/**
 * Typography tokens
 * 
 * Font properties for text styling.
 * Use these tokens to build TextStyle objects in your composables.
 * 
 * Example:
 * Text(
 *   text = "Hello",
 *   fontSize = ${className}.fontSizeLg,
 *   fontWeight = ${className}.fontWeightBold,
 *   lineHeight = ${className}.lineHeightLg
 * )
 */
object ${className} {

`;

  // Add font families
  if (fontFamilyTokens.length > 0) {
    output += `    // Font families\n`;
    fontFamilyTokens.forEach(token => {
      const name = toCamelCase(token.name);
      output += `    const val ${name}: String = "${token.value}"\n`;
    });
    output += '\n';
  }

  // Add font sizes
  if (fontSizeTokens.length > 0) {
    output += `    // Font sizes\n`;
    fontSizeTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = formatNumber(token.value);
      output += `    val ${name}: TextUnit = ${value}.sp\n`;
    });
    output += '\n';
  }

  // Add font weights
  if (fontWeightTokens.length > 0) {
    output += `    // Font weights\n`;
    fontWeightTokens.forEach(token => {
      const name = toCamelCase(token.name);
      let weight = formatNumber(token.value);
      
      // Map to Compose FontWeight
      let composeWeight;
      if (weight <= 150) composeWeight = 100;
      else if (weight <= 250) composeWeight = 200;
      else if (weight <= 350) composeWeight = 300;
      else if (weight <= 450) composeWeight = 400;
      else if (weight <= 550) composeWeight = 500;
      else if (weight <= 650) composeWeight = 600;
      else if (weight <= 850) composeWeight = 700;
      else if (weight <= 950) composeWeight = 800;
      else composeWeight = 900;
      
      output += `    val ${name}: FontWeight = FontWeight.W${composeWeight}\n`;
    });
    output += '\n';
  }

  // Add line heights (as TextUnit for Compose)
  if (lineHeightTokens.length > 0) {
    output += `    // Line heights\n`;
    lineHeightTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = formatNumber(token.value);
      output += `    val ${name}: TextUnit = ${value}.sp\n`;
    });
    output += '\n';
  }

  // Add letter spacing
  if (letterSpacingTokens.length > 0) {
    output += `    // Letter spacing\n`;
    letterSpacingTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = token.value;
      
      if (typeof value === 'string' && value.includes('%')) {
        const percent = parseFloat(value.replace('%', ''));
        output += `    val ${name}: TextUnit = ${(percent / 100).toFixed(2)}.sp\n`;
      } else {
        const numValue = formatNumber(value);
        output += `    val ${name}: TextUnit = ${numValue}.sp\n`;
      }
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
