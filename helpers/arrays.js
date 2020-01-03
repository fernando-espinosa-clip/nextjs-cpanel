export function randomElements (array, numberOfElements) {
    if (numberOfElements < 0) return false;
    if (!Array.isArray(array)) return false;
    if (numberOfElements > array.length) return false;
    let copy = [...array];
    const response = [];
    for (let c = 0; c < numberOfElements; c++) {
        const index = Math.floor(Math.random() * copy.length);
        response.push(copy[index]);
        copy = copy.filter((e, i) => i !== index)
    }
    return response
}
