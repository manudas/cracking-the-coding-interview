/**
 * Statement:
 *
 *  Write a method to replace all spaces in a string with '%2e: You may assume that the string
 *  has sufficient space at the end to hold the additional characters, and that you are given the "true"
 *  length of the string. (Note: if implementing in Java, please use a character array so that you can
 *  perform this operation in place.)
 *  EXAMPLE
 *
 *  Input: "Mr John Smith    ", 13 // without the spaces at the end, the length of the string is 13
 *  Output: "Mr%2eJohn%2eSmith"
 *
 */

const URLify = (str, realLength) => {
    // starting from the back of the string
    let realIndex = str.length - 1;
    const arrStr = [...str];
    for (let descendingIndex = realLength - 1; descendingIndex >= 0; descendingIndex--) {
        if (arrStr[descendingIndex] == ' ') {
            arrStr[realIndex] = '0';
            arrStr[ realIndex - 1 ] = '2';
            arrStr[ realIndex - 2 ] = '%';
            realIndex -= 3;
        } else {
            arrStr[realIndex] = arrStr[descendingIndex];
            realIndex --;
        }
    }

    return arrStr.join('');
}

const str1 = "Mr John Smith    ";
const str2 = "Mr John Smi th      ";
const str3 = "MrJohn Smith  ";


console.log(`'${URLify(str1, 13)}'`);
console.log(`'${URLify(str2, 14)}'`);
console.log(`'${URLify(str3, 12)}'`);