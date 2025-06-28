const yaml = require('js-yaml');
const fs = require('fs');

const files = ['.github/workflows/deploy.yml', '.github/workflows/lighthouse-monitoring.yml'];

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    yaml.load(content);
    console.log(`✅ ${file} is valid YAML`);
  } catch (error) {
    console.log(`❌ ${file} has YAML errors:`, error.message);
  }
});

console.log('🎉 YAML validation complete!');
