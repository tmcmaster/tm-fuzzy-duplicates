function diffLines(line1, line2) {
    let array1 = line1.split('').map(s => s.charCodeAt(0));
    let array2 = line2.split('').map(s => s.charCodeAt(0));
    let result1 = foldArray(array1);
    let result2 = foldArray(array2);

    let diff = result1.map((val, i) => (val === result2[i] ? 0 : 1)).reduce((a,v) => a + v);
    return diff;
}

function foldArray(array) {
    if (array.length < 2) {
        return array;
    } else {
        const middle = Math.ceil(array.length/2);
        const offset = middle + (array.length % 2);
        return array.slice(0, middle).map((v,i) => array[i] ^ array[offset+i]);
    }
}

function foldArrayToSize(array, size) {
    const folded = foldArray(array);
    return (folded.length > size ? foldArrayToSize(folded, size) : folded);
}

function stringToData(line) {
    return line.split('')
        .map(c => c.charCodeAt(0))
        .map(code => (code > 64 && code < 104 || code > 96 && code < 123 || code === 39 ? code : 124))
        .map(code => String.fromCharCode(code))
        .join('')
        .split('|')
        .filter(word => word.length > 0)
        .map(word => word.split('').map(c => c.charCodeAt(0)));

}

function stackWords(words) {
    const max = words.map(word => word.length).reduce((a,v) => (v > a ? v : a));
    return Array(max)
        .fill(0)
        .map((v,i) => words
            .map(word => word[i])
            .reduce((a,v) => a ^ v, 0));
}

function stackChars(words) {
    return words.map(word => word.reduce((a,v) => a^v, 0));
}

function hashCode(data) {
    return data.reduce((a,c) => (((a << 5) - a) + c)|0, 0);
}

function processLine(line) {
    const data = stringToData(line);
    return {
        line: line,
        words: hashCode(stackWords(data)),
        chars: hashCode(stackChars(data))
    }
}

function findDuplicates(lines) {
    console.time('Processing');
    const results = lines.map(line => processLine(line));
    console.timeEnd('Processing');
    const wordsMap = {};
    const charsMap = {};
    const duplicates = [];

    console.time('Comparing');
    results.forEach(result => {
        if (result.words in wordsMap || result.chars in charsMap) {
            duplicates.push(result);
        }
        wordsMap[result.words] = result;
        charsMap[result.chars] = result;
    });
    console.timeEnd('Comparing');
    return duplicates;
}

function isDuplicate(line1, line2) {
    const duplicates = findDuplicates([line1, line2]);
    return (duplicates.length > 0);
}

module.exports = {findDuplicates, isDuplicate};