/**
 * Statement:
 *
 * Palindrome Permutation: Given a string, write a function to check if it is a permutation of
 * a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A
 * permutation is a rearrangement of letters. The palindrome does not need to be limited to just
 * dictionary words.
 *
 * EXAMPLE
 * Input: Tact Coa
 * Output: True (permutations:"taco cat'; "atco cta '; etc.)
 *
 */

const allowedChars = 'abcdefghijklmnopqrstuvwxyz';
const possibleChars = allowedChars + ' ';

const PalindromePermutation = (str) => {
    /* A word can be transformed in a palindrome
     * permutation only if it holds just one  character
     * appearing an odd number of times into the string.
     *
     * Should we ignore spaces?
     */

    // Palindrome ignore char upper/lower case
    const palindromeStr = str.toLowerCase();

    // let's use one integer to store bitwise operations
    // about the characters appearing an even or odd
    // number of times into the string
    let check = 0 >>> 0;

    for (let strIndex = 0; strIndex < palindromeStr.length; strIndex++) {
        const currentChar = palindromeStr[strIndex];
        const shiftIndex = allowedChars.indexOf(currentChar);
        // const shiftIndex = currentChar.charCodeAt(0) - 'a'.charCodeAt(0); // this one doesn't takes into consideration that space is not allowed
        if (shiftIndex === -1) continue;
        check ^= (1 << shiftIndex);
    }

    // Max 1 one in a bit-wise value: value - 1 AND value === 0
    // EXAMPLE true: 10000 - 1 = 01111 -> 10000 & 01111 = 0
    // EXAMPLE false: 1100 - 1 = 1011 -> 1100 & 1011 = 1000 -> 1000 != 0
    // EXAMPLE true if no character has been found an odd number of times: 0000 - 1 = 1111111111110000 (two complement) -> 1111111111110000 & 000000000000000 = 0
    return ((check - 1) & check) === 0;
}

const str1 = 'Tact Coa'; // should be true
const str2 = 'TacAtACoa'; // should be true
const str3 = 'T act Coa'; // should be true
const str4 = 'act Coa'; // should be false
const str5 = 'pERRADelInfierno'; // should be false
const str6 = 'TactCoa'; // should be true
const str7 = 'TT'; // should be true

console.log(`str ${str1} is a palindrome? ${PalindromePermutation(str1)}`);
console.log(`str ${str2} is a palindrome? ${PalindromePermutation(str2)}`);
console.log(`str ${str3} is a palindrome? ${PalindromePermutation(str3)}`);
console.log(`str ${str4} is a palindrome? ${PalindromePermutation(str4)}`);
console.log(`str ${str5} is a palindrome? ${PalindromePermutation(str5)}`);
console.log(`str ${str6} is a palindrome? ${PalindromePermutation(str6)}`);
console.log(`str ${str7} is a palindrome? ${PalindromePermutation(str7)}`);