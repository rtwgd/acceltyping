const fs = require('fs');

const files = {
    easy: 'words_easy.json',
    normal: 'words_normal.json',
    hard: 'words_hard.json'
};

let output = '';

try {
    const easy = fs.readFileSync(files.easy, 'utf8');
    const normal = fs.readFileSync(files.normal, 'utf8');
    const hard = fs.readFileSync(files.hard, 'utf8');

    // Parse to ensure valid JSON before writing, though we trust the source mostly.
    // Actually, just wrapping strings is safer if we trust the format? 
    // Let's parse and re-stringify to be safe.
    
    // The source JSONs contain { list: [...] } or just [...]?
    // Based on previous viewing, they were objects. I recall viewing words_easy.json:
    // "This file contains a JSON array of words... with 'text' and 'kana' fields"
    // Wait, my memory says "JSON array".
    // I should check one just to be sure of the structure structure.
    
    // Actually, let's just make the script robust.
    
    const eObj = JSON.parse(easy);
    const nObj = JSON.parse(normal);
    const hObj = JSON.parse(hard);

    // Assuming they are Arrays or Objects with a list property.
    // If they are Arrays, assign to DATA_XX.
    // If Objects, we might need eObj.list if that's where the array is.
    // I'll check the structure by logging it during this script run or just inspecting the file first.
    // Wait, I can't inspect easily without reading.
    // I'll assume they are the arrays or object wrapper.
} catch (e) {
    console.error("Error reading files:", e);
    process.exit(1);
}

// Rewriting assuming simple read/write with variable assignment
output += `const DATA_EASY = ${fs.readFileSync(files.easy, 'utf8')};\n`;
output += `const DATA_NORMAL = ${fs.readFileSync(files.normal, 'utf8')};\n`;
output += `const DATA_HARD = ${fs.readFileSync(files.hard, 'utf8')};\n`;

fs.writeFileSync('data.js', output);
console.log("data.js created successfully");
