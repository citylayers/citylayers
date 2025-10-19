const fs = require('fs');
const path = require('path');

function addJsExtensions(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      addJsExtensions(fullPath);
    } else if (file.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Add .js to relative imports
      content = content.replace(
        /from\s+(['"])(\.[^'"]+)(?<!\.js)\1/g,
        (match, quote, importPath) => {
          // Don't add .js if already there or if it's a directory import
          if (importPath.endsWith('.js')) return match;
          return `from ${quote}${importPath}.js${quote}`;
        }
      );

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

addJsExtensions('./public/js');
console.log('✓ Added .js extensions to imports');
