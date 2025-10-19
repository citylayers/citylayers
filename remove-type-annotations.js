const fs = require('fs');
const path = require('path');

function removeTypeAnnotations(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      removeTypeAnnotations(fullPath);
    } else if (file.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Remove type annotations from parameters and variables
      // Change (param:Type) to (param:any)
      content = content.replace(/:\s*(QASet|QAPair|AnswerTree|TeamMember|Project|Illustration)\b/g, ':any');
      
      // Change :Type[] to :any[]
      content = content.replace(/:\s*(TeamMember|Project)\[\]/g, ':any[]');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✓ Fixed types in ${fullPath}`);
      }
    }
  }
}

removeTypeAnnotations('./client/src');
console.log('\n✓ All type annotations replaced with any');
