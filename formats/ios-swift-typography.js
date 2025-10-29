/**
 * iOS Swift typography formatter - font properties
 */

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

// Helper to map font weight to iOS weight
const mapFontWeight = (weight) => {
  const numWeight = formatNumber(weight);
  
  if (numWeight <= 150) return 'ultraLight';
  else if (numWeight <= 250) return 'thin';
  else if (numWeight <= 350) return 'light';
  else if (numWeight <= 450) return 'regular';
  else if (numWeight <= 550) return 'medium';
  else if (numWeight <= 650) return 'semibold';
  else if (numWeight <= 750) return 'bold';
  else if (numWeight <= 850) return 'heavy';
  else return 'black';
};

export default function iosSwiftTypographyFormat({ dictionary }) {
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
  let output = `// Typography.swift
// Do not edit directly, this file was auto-generated.

import UIKit
import SwiftUI

/// Typography tokens
///
/// Font properties for text styling.
/// Usage:
/// - UIKit: \`label.font = UIFont.systemFont(ofSize: Typography.fontSizeLg, weight: Typography.fontWeightBold)\`
/// - SwiftUI: \`.font(.system(size: Typography.fontSizeLg, weight: Typography.fontWeightBold))\`
public struct Typography {
    
`;

  // Add font families
  if (fontFamilyTokens.length > 0) {
    output += `    // MARK: - Font Families\n`;
    output += `    \n`;
    fontFamilyTokens.forEach(token => {
      const name = toCamelCase(token.name);
      output += `    public static let ${name}: String = "${token.value}"\n`;
    });
    output += '\n';
  }

  // Add font sizes
  if (fontSizeTokens.length > 0) {
    output += `    // MARK: - Font Sizes\n`;
    output += `    \n`;
    fontSizeTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = formatNumber(token.value);
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add font weights
  if (fontWeightTokens.length > 0) {
    output += `    // MARK: - Font Weights\n`;
    output += `    \n`;
    fontWeightTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const weight = mapFontWeight(token.value);
      output += `    public static let ${name}: UIFont.Weight = .${weight}\n`;
    });
    output += '\n';
    
    // Add SwiftUI Font.Weight variants
    output += `    // MARK: - SwiftUI Font Weights\n`;
    output += `    \n`;
    fontWeightTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const weight = mapFontWeight(token.value);
      const swiftUIWeight = weight === 'ultraLight' ? 'ultraLight' :
                           weight === 'thin' ? 'thin' :
                           weight === 'light' ? 'light' :
                           weight === 'regular' ? 'regular' :
                           weight === 'medium' ? 'medium' :
                           weight === 'semibold' ? 'semibold' :
                           weight === 'bold' ? 'bold' :
                           weight === 'heavy' ? 'heavy' :
                           'black';
      output += `    public static let ${name}SwiftUI: Font.Weight = .${swiftUIWeight}\n`;
    });
    output += '\n';
  }

  // Add line heights
  if (lineHeightTokens.length > 0) {
    output += `    // MARK: - Line Heights\n`;
    output += `    \n`;
    lineHeightTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = formatNumber(token.value);
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add letter spacing
  if (letterSpacingTokens.length > 0) {
    output += `    // MARK: - Letter Spacing\n`;
    output += `    \n`;
    letterSpacingTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = token.value;
      
      let spacing;
      if (typeof value === 'string' && value.includes('%')) {
        const percent = parseFloat(value.replace('%', ''));
        spacing = (percent / 100).toFixed(2);
      } else {
        spacing = formatNumber(value).toFixed(2);
      }
      
      output += `    public static let ${name}: CGFloat = ${spacing}\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
