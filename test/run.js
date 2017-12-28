const fs = require('fs');
const path = require('path');
const jscodeshift = require('jscodeshift');
const gen2aw = require('../index.js');

const src = fs.readFileSync(path.resolve(__dirname, 'easy.js')).toString();
console.log(gen2aw({ source: src }, { jscodeshift: jscodeshift }));