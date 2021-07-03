let unsortedArray = [13,4,6,1,13,20,7,3,10,18]


// Outer loop that goes through the array starting from index 
for (let i = 0; i < unsortedArray.length; i++) {
    // Inner loop that goes through the array starting at index of outer + 1
    for (let j = i+1; j < unsortedArray.length; j++) {
        // If current selection in outer is greater than selection in inner, swap them
        if(unsortedArray[i] > unsortedArray[j] ){
            // Swap i and j elements in the array
            let temp = unsortedArray[i]
            unsortedArray[i] = unsortedArray[j]
            unsortedArray[j] = temp
        }   
    }
}
const sortedArray = unsortedArray

console.log(sortedArray)