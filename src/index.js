const generateData = require('./generate-data');
const fd = require('./fuzzy-duplicates');

console.time('Generate');
let lines = generateData(1000000,50, 0.01);
console.timeEnd('Generate');

console.time('Find Duplicates');
const duplicates = fd.findDuplicates(lines);
console.timeEnd('Find Duplicates');
console.log(' ---- Duplicates ---- ', duplicates.length);
// console.table(duplicates);

// console.log('Is Duplicate: ', fd.isDuplicate('abc def ghi', ' acb. def... ghi' ));