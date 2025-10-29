/**
 * CSS theme formatter with CSS Variables (for merging light & dark)
 * This generates either :root or @media blocks that will be merged
 */
export default function cssThemeVariablesFormat({ dictionary, options, file }) {
  const mode = options?.mode || file.mode || 'light';

  // Helper to convert token name to kebab-case
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\s]/g, '-')
      .toLowerCase();
  };

  // Helper to format color values
  const formatColor = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('#')) {
        return value.toLowerCase();
      }
      if (value.startsWith('rgb')) {
        return value;
      }
    }
    return '#000000';
  };

  // Filter only semantic color tokens
  const semanticColors = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    if (tokenType !== 'color') return false;

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
    const name = toKebabCase(token.name);
    const value = formatColor(token.value);
    const path = token.path.join('.');

    if (path.startsWith('colors.text')) {
      grouped.text.push({ name, value });
    } else if (path.startsWith('colors.background')) {
      grouped.background.push({ name, value });
    } else if (path.startsWith('colors.border')) {
      grouped.border.push({ name, value });
    } else if (path.startsWith('colors.foreground')) {
      grouped.foreground.push({ name, value });
    } else if (path.startsWith('componentColors.utility')) {
      grouped.utility.push({ name, value });
    } else if (path.startsWith('componentColors.components')) {
      grouped.components.push({ name, value });
    } else if (path.startsWith('componentColors.alpha')) {
      grouped.alpha.push({ name, value });
    }
  });

  // Build CSS variables output
  let output = '';

  // Add text colors
  if (grouped.text.length > 0) {
    output += `  /* Text colors */\n`;
    grouped.text.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add background colors
  if (grouped.background.length > 0) {
    output += `  /* Background colors */\n`;
    grouped.background.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add border colors
  if (grouped.border.length > 0) {
    output += `  /* Border colors */\n`;
    grouped.border.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add foreground colors
  if (grouped.foreground.length > 0) {
    output += `  /* Foreground colors */\n`;
    grouped.foreground.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add utility colors
  if (grouped.utility.length > 0) {
    output += `  /* Utility colors */\n`;
    grouped.utility.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add component colors
  if (grouped.components.length > 0) {
    output += `  /* Component colors */\n`;
    grouped.components.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
    output += '\n';
  }

  // Add alpha colors
  if (grouped.alpha.length > 0) {
    output += `  /* Alpha colors */\n`;
    grouped.alpha.forEach(({ name, value }) => {
      output += `  --${name}: ${value};\n`;
    });
  }

  return output;
}
