/**
 * Statement:
 *
 * String Compression: Implement a method to perform basic string compression using the counts
 * of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3 . If the
 * "compressed" string would not become smaller than the original string, your method should return
 * the original string. You can assume the string has only uppercase and lowercase letters (a - z).
 *
 */

const StringCompression = (str) => {

    const findConsecutive = (str, index) => {
        let foundCounter = 1;
        // while next char exists and this char is equals to next one
        while (str[index + foundCounter] && str[index + foundCounter - 1] === str[index + foundCounter]) {
            foundCounter++;
        }

        return foundCounter;
    }

    const compressCounter = (str) => {
        let counter = 0;

        let charIndex = 0
        while (charIndex < str.length) {

            const consecutive = findConsecutive(str, charIndex);
            counter += 1 + String(consecutive).length;
            charIndex += consecutive;
        }

        return counter;
    }

    const compressionSize = compressCounter(str);
    if (str.length <= compressionSize) return str;
    const compressionArr = [];

    let charIndex = 0
    while (charIndex < str.length) {
        const consecutive = findConsecutive(str, charIndex);
        compressionArr.push(str[charIndex], ...Array.from(consecutive.toString()));
        charIndex += consecutive;
    }

    return compressionArr.join('');

}

const strBenchArr = [
    ['aabcccccaaa', 'a2b1c5a3'],
];

strBenchArr.forEach(([str1, str2]) => {
    const compressionResult = StringCompression(str1);
    if ( compressionResult !== str2) {
        console.error(`Error in compression of ${str1}. Returned ${compressionResult} but expected ${str2}`);
    }
});

