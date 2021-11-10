/**
 * Statement:
 *
 * Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and
 * column are set to 0.
 *
 * Example:
 *
 *  1  2  3  4
 *  5  0  7  8
 *  9 10 11 12
 * 13 14 15 16
 *
 *
 * Zero'ed to:
 *
 *  1  0  3  4
 *  0  0  0  0
 *  9  0 11 12
 * 13  0 15 16
 *
 */

const ZeroMatrix = (mat) => {
    const nullifyRow = (mat, row) => {
        for (let col = 0; col < mat[row].length; col++) {
            mat[row][col] = 0;
        }
    }
    const nullifyCol = (mat, col) => {
        for (let row = 0; row < mat.length; row++) {
            mat[row][col] = 0;
        }
    }
    // MxN matrix are allowed

    /*
     * We'll store rows and columns with
     * zero in a integer doing bitwise
     * operations, so as the integer is
     * 32 bits wide (JS), this algorithm will
     * be valid only for up to 32x32 matrices
     */
    let rows = 0;
    let cols = 0;
    for (let rowI = 0; rowI < mat.length; rowI++) {
        for (let colI = 0; colI < mat[rowI].length; colI++) {
            if (mat[rowI][colI] === 0) {
                rows |= 1 << rowI;
                cols |= 1 << colI;
            }
        }
    }
    for (let i = 0; i < mat.length; i++) {
        if ((rows & (1 << i)) == 1 << i) {
            // rows and 1 shifted i positions has to be equal to i shifted i postions:
            // this implies that at position i we have a one, so this row contains a 0
            nullifyRow(mat, i);
        }
    }
    for (let c = 0; c < mat[0].length; c++) {
        if ((cols & (1 << c)) == 1 << c) {
            nullifyCol(mat, c);
        }
    }
    return mat;
}

const matBenchArr = [
    [
        [
            [ 1,  2,  3,  4],
            [ 5,  0,  7,  8],
            [ 9, 10, 11, 12],
            [13, 14, 15, 16]
        ],[
            [  1,  0,  3,  4],
            [  0,  0,  0,  0],
            [  9,  0, 11, 12],
            [ 13,  0, 15, 16]
        ]],
];

const matEquals = (mat1, mat2) => mat1.length === mat2.length && mat1.every((row, indexRow) => row.every((elem, indexCol) => elem === mat2[indexRow][indexCol]));

matBenchArr.forEach(([matOrigin, matResult]) => {
    const result = ZeroMatrix(matOrigin);
    if ( !matEquals(result, matResult) ) {
        console.error(`Error in zero'ed mat ${matOrigin}. Returned ${result} but expected ${matResult}`);
    }
});
