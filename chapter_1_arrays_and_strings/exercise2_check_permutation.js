/**
 * Statement:
 *
 * Check Permutation: Given two strings, write a method to decide if one is a permutation of the
 * other.
 *
 */

// const allowedChars = 'ABCDE'; // 62 chars
const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 62 chars

const checkPermutation = (str1, str2) => {
    if (str1.length != str2.length) return false;
    const repetitionMap = Array(str1.length).fill(0);
    for(c of str1) {
        const charIndex = allowedChars.indexOf(c);
        repetitionMap[charIndex]++;
    }

    for(c of str2) {
        const charIndex = allowedChars.indexOf(c);
        repetitionMap[charIndex]--;
        if (repetitionMap[charIndex] < 0) return [false, str1, str2];
    }

    return [repetitionMap.filter(elem => elem !== 0).length === 0, str1, str2];
}

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
        data[index] = getRandomString(3);
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
	// const mark3 = "mark3";

	performance.mark(markStart);

    const data = generateRandomTestingBenchData();
    const data2 = generateRandomTestingBenchData();
    data.forEach((string, index) => {
        checkPermutation(string, data2[index]);
    });
	performance.mark(mark1);

    const result = [];
    data.forEach((string, index) => {
        result[index] = checkPermutation(string, data2[index]);
    });

	performance.mark(mark2);

    performance.measure("random string generation + first run", markStart, mark1);
    performance.measure("checkPermutation with hashMap", mark1, mark2);
    // performance.measure("isUniqueNoAddictionalStructures with inner looping", mark2, mark3);

    // correctness check
    for (let i = 0; i < result.length; i++) {
        const elem = result[i];
        if (elem[0]) {
            console.log(`PERMUTION FOUND: ${elem[0]} in index ${i}!!: First string from is: ${elem[1]}. Second one is: ${elem[2]}`);
        }
    }
}

performaceSensitiveFunc();