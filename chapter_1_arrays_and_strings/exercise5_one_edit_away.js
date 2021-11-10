/**
 * Statement:
 *
 * One Away: There are three types of edits that can be performed on strings: insert a character,
 * remove a character, or replace a character. Given two strings, write a function to check if they are
 * one edit (or zero edits) away.
 *
 * EXAMPLE
 * pale, ple -> true
 * pales, pale -> true
 * pale, bale -> true
 * pale, bae -> false
 *
 */

const OneEditAway = (str1, str2) => {
    // More than one edit away?
    if (Math.abs(str1.length - str2.length) > 1) return false;

    let indexLonger = 0;
    let indexShorter = 0;
    const longerString = str1.length > str2.length ? str1 : str2;
    const shorterString = str1.length > str2.length ? str2 : str1;

    let oneEditAway = false;

    while (indexShorter < shorterString.length && indexLonger < longerString.length) {
        if (shorterString[indexShorter] !== longerString[indexLonger]) {
            if (oneEditAway) return false;
            if (shorterString.length === longerString.length) { // one edit away
                indexShorter++;
            }
            // else --> one insert / removal away, no need to do anything as we are setting
            // oneEditAway for both oneEditAway and one insert/removal away in the same place
            oneEditAway = true;
        } else { // both sides are equal
            indexShorter++;
        }
        // we always, in every case, increment the longer index
        indexLonger++;
    }

    return true;
}

const strBenchArr = [
    ['pale', 'ple'],
    ['pales', 'pale'],
    ['pale', 'bale'],
    ['pale', 'bae'],
    ['pale', 'palepale'],
];

strBenchArr.forEach(([str1, str2]) => {
    console.log(`str1 ${str1} and str2 is ${str2} are one edit away? ${OneEditAway(str1, str2)}`);
});

