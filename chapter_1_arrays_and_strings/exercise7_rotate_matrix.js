/**
 * Statement:
 *
 * Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4
 * bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
 *
 * Example:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 *
 *
 * Rotated to:
 *
 * 13  9  5  1
 * 14 10  6  2
 * 15 11  7  3
 * 16 12  8  4
 *
 */

const RotateMatrix = (mat) => {

    // Has to be NxN square matrix, so not allowed
    // different file / row sizes
    if (mat.length !== mat[0].length) return null;

    // Let's do it by layers, from the most external files / rows till the internals
    for (let layer = 0; layer < mat.length / 2; layer++) { // Layer => file / 2
        for (let offset = layer; offset < mat.length - layer - 1; offset++) {
            // Algorithm will be O(n^2)
            const topLeftElement = mat[layer][offset]; // temporary top left storage (on first loop)
            mat[layer][offset] = mat[mat.length - offset - 1][layer]; // bottom left (on first loop) to top left
            mat[mat.length - offset - 1][layer] = mat[mat.length - layer - 1][mat.length - offset - 1]; // bottom right element (firt loop) to bottom left
            mat[mat.length - layer - 1][mat.length - offset - 1] = mat[offset][mat.length - layer - 1]; // top right (on first loop) to bottom right
            mat[offset][mat.length - layer - 1] = topLeftElement; // top left element (on first loop) to top right
        }
    }

    return mat;
}

const matBenchArr = [
    [
        [
            [ 1,  2,  3,  4],
            [ 5,  6,  7,  8],
            [ 9, 10, 11, 12],
            [13, 14, 15, 16]
        ],[
            [13,  9,  5,  1],
            [14, 10,  6,  2],
            [15, 11,  7,  3],
            [16, 12,  8,  4]
        ]],
];

const matEquals = (mat1, mat2) => mat1.length === mat2.length && mat1.every((row, indexRow) => row.every((elem, indexCol) => elem === mat2[indexRow][indexCol]));

matBenchArr.forEach(([matOrigin, matResult]) => {
    const result = RotateMatrix(matOrigin);
    if ( !matEquals(result, matResult) ) {
        console.error(`Error in mat rotation of ${matOrigin}. Returned ${result} but expected ${matResult}`);
    }
});
