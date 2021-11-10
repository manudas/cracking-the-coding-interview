/**
 * Statement:
 *
 * String Rotation: Assume you have a method i5Substring which checks ifone word is a substring
 * of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one
 * call to isSubstring (e.g., "waterbottle" is a rotation of "erbottlewat").
 *
 * Clarifications:
 *
 * If we imagine that s2 is a rotation of s1, then we can ask what the rotation point is. For example, if you
 * rotate waterbottle after wat, you get erbottlewat. In a rotation, we cut s1 into two parts, x and y,
 * and rearrange them to get s2.
 *
 */

const StringRotation = (str1, str2) => {
    // O(X + M) being X from isSubstring
    // and M the concatenation of str2 + str2
    // if they are copied again and again
    // when adding each new character (M
    // size of str2)
    return isSubstring(str2+str2, str1);
}

const strBenchArr = [
    ["waterbottle","erbottlewat"],
];

const isSubstring = (str1, str2) => str1.includes(str2);

strBenchArr.forEach(([str1, str2]) => {
    const result = StringRotation(str1, str2);
    console.log(`Is string ${str1} a rotation of string ${str2}? ${result}`);
});
