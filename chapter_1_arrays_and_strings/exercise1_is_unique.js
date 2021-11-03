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

    let bigger_check = 0; // cumulative bitwise OR of all characters. It's 32 bits in JS, more than enough
    let lower_check = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        // const charIndex = char.charCodeAt(0) - '0'.charCodeAt(0); // max 49 bits difference more than javascript integer
        const charIndex = allowedChars.indexOf(char);
        if (charIndex >= 31)  { // int size in JS
            if ((bigger_check & (1 << charIndex-31)) > 0) {
                return [false, str];
            }

            bigger_check |= (1 << charIndex-31);
        } else {

            if ((lower_check & (1 << charIndex)) > 0) {
                return [false, str];
            }

            lower_check |= (1 << charIndex);
        }
    }

    return [true, str];
}

const isUniqueNoAddictionalStructures = (str) => {

    // if string is ascii and str.length > 128 or 256 if extended, then return false

    for(let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        for(let j = i + 1; j < str.length; j++) {
            if (char === str.charAt(j)) {
                return [false, str];
            }
        }
    }

    return [true, str];
}

const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //62 chars

// testing functions:
const getRandomString = (length) => {
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    return result;
}

const generateRandomTestingBenchData = () => {
    const stringCounter = 1000;
    const data = [];
    for (let index = 0; index < stringCounter; index++) {
        data[index] = getRandomString(10);
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

        if (elem1[0] !== elem2[0]) {
            console.log(`ERROR in index ${i}!!: First string from isUnique has duplicated is: ${elem1[0]}-${elem1[1]}. Second one from isUniqueNoAddictionalStructures is: ${elem2[0]}-${elem2[1]}`);
        }
    }
}

performaceSensitiveFunc();