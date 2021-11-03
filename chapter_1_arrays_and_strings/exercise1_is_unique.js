/**
 * Statement:
 *
 * Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you
 * cannot use additional data structures?
 *
 */

/**
 * First option using addictional structures
 * We'll use a "hash map" / javascript object
 *
 * @param {string} str to determine if its chars
 * are unique within the string
 *
 * @return {boolean} true if all characters are
 * unique, false otherwise
 */
const isUnique = (str) => {

    let check = 0; // cumulative bitwise OR of all characters. It's 32 bits in JS, more than enough
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        const charIndex = char.charCodeAt(0);
        // if ((check & (1 << charIndex)) > 0) {
        if ((check & (1 * (charIndex * 2))) > 0) { // *2 is equivalent to shift one position left, but faster
            return false;
        }

        // check |= (1 << charIndex);
        check |= (1 * (charIndex*2)); // *2 is equivalent to shift one position left, but faster
    }

    return true;
}

const isUniqueNoAddictionalStructures = (str) => {

    // if string is ascii and str.length > 128 or 256 if extended, then return false

    for(let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        for(let j = i + 1; j < str.length; j++) {
            if (char === str.charAt(j)) return false;
        }
    }

    return true;
}

const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// testing functions:
const getRandomString = (length) => {
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return result;
}

const generateRandomTestingBenchData = () => {
    const stringCounter = 100000;
    const data = [];
    for (let index = 0; index < stringCounter; index++) {
        data[index] = getRandomString(100);
    }
    return data;
}

const performaceSensitiveFunc = () => {
    const obs = new PerformanceObserver((list, observer) => {
        console.log(list.getEntriesByType('measure'));
        observer.disconnect();
    });
    obs.observe({ entryTypes: ['measure'] });

	const markStart = "mark_start";
	const mark1 = "mark1";
	const mark2 = "mark2";
	const mark3 = "mark3";

	performance.mark(markStart);

    const data = generateRandomTestingBenchData();
    data.forEach((string) => {
        isUnique(string);
        isUniqueNoAddictionalStructures(string);
    });
	performance.mark(mark1);

    const resultIsUnique = [];
    const resultIsUniqueNoAddictionalStructures = [];

    data.forEach((string, index) => {
        resultIsUnique[index] = isUnique(string);
        // resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
    });

	performance.mark(mark2);

    data.forEach((string, index) => {
        // resultIsUnique[index] = isUnique(string);
        resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
    });

	performance.mark(mark3);

    // log:
    performance.measure("random string generation + first run", markStart, mark1);
    performance.measure("isUnique with hashMap", mark1, mark2);
    performance.measure("isUniqueNoAddictionalStructures with inner looping", mark2, mark3);

    // correctness check
    for (let i = 0; i < resultIsUnique.length; i++) {
        const elem1 = resultIsUnique[i];
        const elem2 = resultIsUniqueNoAddictionalStructures[i];

        if (elem1 !== elem2) {
            console.log(`ERROR in index ${i}!!: First string from isUnique has duplicated is: ${elem1}. Second one from isUniqueNoAddictionalStructures is: ${elem2}`);
        }
    }
}

performaceSensitiveFunc();