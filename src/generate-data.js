function swapTokens(line, splitter) {
    let tokens = line.split(splitter);
    let p1 = Math.floor(Math.random() * tokens.length);
    let p2 = (p1 > 0 ? (p1 - 1) : (p1 + 1));
    let temp = tokens[p2];
    tokens[p2] = tokens[p1];
    tokens[p1] = temp;
    return tokens.join(splitter);
}

function swapChars(line) {
    return swapTokens(line, '');
}

function swapWords(line) {
    return swapTokens(line, ' ');
}

//console.log('--- SWAP WORDS: ', swapWords('123 456 789 abc def ghi'));

function generateData(number, size, dupProb) {

    // console.log('SWAP CHARS: ', swapChars('ABCDEF'));
    // console.log('SWAP WORDS: ', swapWords('ABC DEF GHI JKLM'));

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let lines = [];
    for (let i=0; i<number; i++) {
        let line = Array(size)
            .fill(0)
            .map(v => chars[Math.floor(Math.random() * chars.length)] + (Math.random() < 0.2 ? ' ' : ''))
            .join('');
        lines.push(line.trim());
        if (Math.random() < dupProb) {
            let duplicate = (Math.random() < 0 ? swapChars(line) : swapWords(line));
            lines.push(duplicate.trim());
        }
    }
    return lines;
}

module.exports = generateData;