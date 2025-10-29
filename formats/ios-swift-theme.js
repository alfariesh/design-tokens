/**
 * iOS Swift theme formatter - colors only (semantic colors)
 * Generates Swift file with UIColor/Color extensions
 */

// Helper to convert token name to camelCase
const toCamelCase = (str) => {
  return str
    .replace(/[-_.](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
};

// Helper to format color values for iOS
const formatColor = (value) => {
  if (typeof value === 'string') {
    // Check if already transformed (UIColor format from ios-swift transform)
    if (value.includes('UIColor')) {
      return value;
    }
    
    if (value.startsWith('#')) {
      let hex = value.replace('#', '').toLowerCase();
      
      if (hex.length === 8) {
        // AARRGGBB format (from android transform)
        const aa = hex.substring(0, 2);
        const rr = hex.substring(2, 4);
        const gg = hex.substring(4, 6);
        const bb = hex.substring(6, 8);
        
        const r = parseInt(rr, 16) / 255;
        const g = parseInt(gg, 16) / 255;
        const b = parseInt(bb, 16) / 255;
        const a = parseInt(aa, 16) / 255;
        
        return {
          r: r.toFixed(3),
          g: g.toFixed(3),
          b: b.toFixed(3),
          a: a.toFixed(3)
        };
      } else if (hex.length === 6) {
        const rr = hex.substring(0, 2);
        const gg = hex.substring(2, 4);
        const bb = hex.substring(4, 6);
        
        const r = parseInt(rr, 16) / 255;
        const g = parseInt(gg, 16) / 255;
        const b = parseInt(bb, 16) / 255;
        
        return {
          r: r.toFixed(3),
          g: g.toFixed(3),
          b: b.toFixed(3),
          a: '1.000'
        };
      }
    }
  }
  return { r: '0.000', g: '0.000', b: '0.000', a: '1.000' };
};

export default function iosSwiftThemeFormat({ dictionary, options, file }) {
  const className = options?.className || file.className || 'ThemeLight';
  
  // Filter only semantic color tokens
  const semanticColors = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    if (tokenType !== 'color') return false;
    
    const rawValue = token.value;
    if (typeof rawValue === 'object') return false;
    
    const path = token.path.join('.');
    
    // Exclude primitive colors
    if (path.startsWith('colors.base') ||
        path.startsWith('colors.brand.') ||
        path.startsWith('colors.error.') ||
        path.startsWith('colors.warning.') ||
        path.startsWith('colors.success.') ||
        path.startsWith('colors.gray') ||
        path.startsWith('colors.blue') ||
        path.startsWith('colors.indigo') ||
        path.startsWith('colors.purple') ||
        path.startsWith('colors.pink') ||
        path.startsWith('colors.fuchsia') ||
        path.startsWith('colors.orange') ||
        path.startsWith('colors.green') ||
        path.startsWith('colors.yellow') ||
        path.startsWith('colors.effects.shadowColors')) {
      return false;
    }
    
    // Include semantic colors
    return (
      path.startsWith('colors.text') ||
      path.startsWith('colors.background') ||
      path.startsWith('colors.border') ||
      path.startsWith('colors.foreground') ||
      path.startsWith('componentColors.utility') ||
      path.startsWith('componentColors.components') ||
      path.startsWith('componentColors.alpha')
    );
  });

  // Build output
  let output = `// ${className}.swift
// Do not edit directly, this file was auto-generated.

import UIKit
import SwiftUI

/// Theme colors for ${className.includes('Light') ? 'Light' : 'Dark'} mode
///
/// Semantic color tokens for consistent theming.
/// Usage:
/// - UIKit: \`view.backgroundColor = ${className}.colorsBackgroundPrimary\`
/// - SwiftUI: \`.foregroundColor(${className}.colorsTextPrimary)\`
public struct ${className} {
    
`;

  // Group by category
  const grouped = {
    text: [],
    background: [],
    border: [],
    foreground: [],
    utility: [],
    components: [],
    alpha: []
  };

  semanticColors.forEach(token => {
    const name = toCamelCase(token.name);
    const val = token.value;
    
    // ios-swift transform returns string like "UIColor(red: 1.000, green: 0.500, blue: 0.250, alpha: 1)"
    let colorObj;
    
    if (typeof val === 'string' && val.includes('UIColor')) {
      // Parse the UIColor string
      const redMatch = val.match(/red:\s*([\d.]+)/);
      const greenMatch = val.match(/green:\s*([\d.]+)/);
      const blueMatch = val.match(/blue:\s*([\d.]+)/);
      const alphaMatch = val.match(/alpha:\s*([\d.]+)/);
      
      colorObj = {
        r: redMatch ? redMatch[1] : '0.000',
        g: greenMatch ? greenMatch[1] : '0.000',
        b: blueMatch ? blueMatch[1] : '0.000',
        a: alphaMatch ? alphaMatch[1] : '1.000'
      };
    } else {
      // Parse hex string
      colorObj = formatColor(val);
    }
    
    const path = token.path.join('.');
    
    if (path.startsWith('colors.text')) {
      grouped.text.push({ name, color: colorObj });
    } else if (path.startsWith('colors.background')) {
      grouped.background.push({ name, color: colorObj });
    } else if (path.startsWith('colors.border')) {
      grouped.border.push({ name, color: colorObj });
    } else if (path.startsWith('colors.foreground')) {
      grouped.foreground.push({ name, color: colorObj });
    } else if (path.startsWith('componentColors.utility')) {
      grouped.utility.push({ name, color: colorObj });
    } else if (path.startsWith('componentColors.components')) {
      grouped.components.push({ name, color: colorObj });
    } else if (path.startsWith('componentColors.alpha')) {
      grouped.alpha.push({ name, color: colorObj });
    }
  });

  // Add text colors
  if (grouped.text.length > 0) {
    output += `    // MARK: - Text Colors\n`;
    grouped.text.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add background colors
  if (grouped.background.length > 0) {
    output += `    // MARK: - Background Colors\n`;
    grouped.background.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add border colors
  if (grouped.border.length > 0) {
    output += `    // MARK: - Border Colors\n`;
    grouped.border.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add foreground colors
  if (grouped.foreground.length > 0) {
    output += `    // MARK: - Foreground Colors\n`;
    grouped.foreground.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add utility colors
  if (grouped.utility.length > 0) {
    output += `    // MARK: - Utility Colors\n`;
    grouped.utility.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add component colors
  if (grouped.components.length > 0) {
    output += `    // MARK: - Component Colors\n`;
    grouped.components.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  // Add alpha colors
  if (grouped.alpha.length > 0) {
    output += `    // MARK: - Alpha Colors\n`;
    grouped.alpha.forEach(({ name, color }) => {
      output += `    \n`;
      output += `    public static let ${name} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})\n`;
      output += `    public static var ${name}Color: Color { Color(${name}) }\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
