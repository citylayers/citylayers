const fs = require('fs');
const path = require('path');

function removeImportsExports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      removeImportsExports(fullPath);
    } else if (file.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Remove import statements
      content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
      content = content.replace(/^import\s+['"].*?['"];?\s*$/gm, '');

      // Remove export statements but keep the declarations
      content = content.replace(/^export\s+\{[^}]+\};?\s*$/gm, '');
      content = content.replace(/^export\s+(default\s+)?/gm, '');

      // Replace uuid import usage
      content = content.replace(/uuidv4\(\)/g, 'window.uuidv4()');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✓ Cleaned ${fullPath}`);
      }
    }
  }
}

removeImportsExports('./public/js');
console.log('\n✓ All imports/exports removed');
