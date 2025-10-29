/**
 * Custom Flutter typography format for Style Dictionary v5
 * Generates Typography class with all TextStyles
 */
export default function flutterTypographyFormat({ dictionary, options, file }) {
  const className = file.className || options.className || 'Typography';
  
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

  // Helper to format TextStyle
  const formatTextStyle = (typoValue) => {
    if (!typoValue || typeof typoValue !== 'object') return 'null';
    
    const props = [];
    
    if (typoValue.fontFamily) {
      props.push(`fontFamily: '${typoValue.fontFamily}'`);
    }
    
    let fontSize = null;
    if (typoValue.fontSize) {
      fontSize = formatNumber(typoValue.fontSize);
      props.push(`fontSize: ${fontSize}`);
    }
    
    if (typoValue.fontWeight) {
      const weight = formatNumber(typoValue.fontWeight);
      
      let flutterWeight;
      if (weight <= 150) {
        flutterWeight = 100;
      } else if (weight <= 250) {
        flutterWeight = 200;
      } else if (weight <= 350) {
        flutterWeight = 300;
      } else if (weight <= 450) {
        flutterWeight = 400;
      } else if (weight <= 550) {
        flutterWeight = 500;
      } else if (weight <= 650) {
        flutterWeight = 600;
      } else if (weight <= 850) {
        flutterWeight = 700;
      } else if (weight <= 950) {
        flutterWeight = 800;
      } else {
        flutterWeight = 900;
      }
      
      props.push(`fontWeight: FontWeight.w${flutterWeight}`);
    }
    
    if (typoValue.lineHeight && fontSize) {
      const lineHeight = formatNumber(typoValue.lineHeight);
      const relativeHeight = (lineHeight / fontSize).toFixed(2);
      props.push(`height: ${relativeHeight}`);
    }
    
    if (typoValue.letterSpacing) {
      const ls = typoValue.letterSpacing;
      if (typeof ls === 'string' && ls.includes('%')) {
        const percent = parseFloat(ls.replace('%', ''));
        props.push(`letterSpacing: ${(percent / 100).toFixed(2)}`);
      } else {
        props.push(`letterSpacing: ${formatNumber(ls)}`);
      }
    }
    
    if (props.length === 0) return 'null';
    
    return `TextStyle(\n      ${props.join(',\n      ')},\n    )`;
  };

  // Filter typography tokens
  const typographyTokens = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    return tokenType === 'typography';
  });

  // Build output
  let output = `//
// ${file.destination}
//

// Do not edit directly, this file was auto-generated.

import 'package:flutter/material.dart';

/// Typography design tokens
/// 
/// Contains all TextStyle definitions for consistent typography across the app.
class ${className} {
  ${className}._();

`;

  // Add typography tokens
  if (typographyTokens.length > 0) {
    typographyTokens.forEach(token => {
      const name = toCamelCase(token.name);
      const value = formatTextStyle(token.value);
      output += `  static const TextStyle ${name} = ${value};\n\n`;
    });
  }

  output += `}\n`;

  return output;
}
