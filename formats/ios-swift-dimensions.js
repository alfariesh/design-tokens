/**
 * iOS Swift dimensions formatter - spacing, radius, sizing
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

export default function iosSwiftDimensionsFormat({ dictionary }) {
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
  let output = `// Dimensions.swift
// Do not edit directly, this file was auto-generated.

import UIKit
import SwiftUI

/// Dimension tokens
///
/// Spacing, border radius, sizing values for consistent layouts.
/// Usage:
/// - UIKit: \`view.layer.cornerRadius = Dimensions.borderRadiusLg\`
/// - SwiftUI: \`.padding(Dimensions.spacing4)\`
public struct Dimensions {
    
`;

  // Add spacing tokens
  if (grouped.spacing.length > 0) {
    output += `    // MARK: - Spacing\n`;
    output += `    \n`;
    grouped.spacing.forEach(({ name, value }) => {
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add border radius tokens
  if (grouped.borderRadius.length > 0) {
    output += `    // MARK: - Border Radius\n`;
    output += `    \n`;
    grouped.borderRadius.forEach(({ name, value }) => {
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add border width tokens
  if (grouped.borderWidth.length > 0) {
    output += `    // MARK: - Border Width\n`;
    output += `    \n`;
    grouped.borderWidth.forEach(({ name, value }) => {
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add sizing tokens
  if (grouped.sizing.length > 0) {
    output += `    // MARK: - Sizing\n`;
    output += `    \n`;
    grouped.sizing.forEach(({ name, value }) => {
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  // Add other tokens
  if (grouped.other.length > 0) {
    output += `    // MARK: - Other Dimensions\n`;
    output += `    \n`;
    grouped.other.forEach(({ name, value }) => {
      output += `    public static let ${name}: CGFloat = ${value}\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
