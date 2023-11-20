// Define the shape of the bucket object
export interface Bucket {
    size: number;
    img: string;
  }
  
  // Define the shape of the placed element object
export  interface PlacedElement {
    x: number;
    y: number;
    width: number;
    height: number;
    img: string;
  }
  
  // Function to fit buckets into a container
  function fitContainer(cWidth: number, cHeight: number, buckets: Bucket[]): PlacedElement[] {
    // Sort buckets in descending order by size
    const sortedBuckets = buckets.sort((a, b) => b.size - a.size);
    // Initialize the container with black squares
    const container = initializeContainer(cWidth, cHeight);
    // Array to store placed elements
    const placedElements: PlacedElement[] = [];
  
    // Start placing elements recursively
    addElement(0, 0, container, sortedBuckets, 0, placedElements);
  
    // Return the array of placed elements
    return placedElements;
  }
  
  // Function to initialize a container with black squares
  function initializeContainer(cWidth: number, cHeight: number): string[][] {
    return Array.from({ length: cHeight }, () => Array(cWidth).fill("⬛"));
  }
  
  // Recursive function to add an element to the container
  function addElement(
    x: number,
    y: number,
    container: string[][],
    buckets: Bucket[],
    i: number,
    placedElements: PlacedElement[]
  ): void {
    // Base case: if all buckets are placed, return
    if (i === buckets.length) {
      // Record the placement of the last bucket
      placedElements.push({ x, y, width: buckets[i - 1].size, height: buckets[i - 1].size, img: buckets[i - 1].img });
      return;
    }
  
    // Get the size of the current bucket
    const size = buckets[i].size;
  
    // Place the current bucket in the container
    for (let loopY = 0; loopY < size; loopY++) {
      for (let loopX = 0; loopX < size; loopX++) {
        if (container[loopY + y] && container[loopY + y][loopX + x]) {
          container[loopY + y][loopX + x] = buckets[i].img;
        }
      }
    }
  
    // Record the placement of the current bucket
    placedElements.push({ x, y, width: size, height: size, img: buckets[i].img });
  
    // Get the index of the next bucket
    const nextIndex = i + 1;
  
    // If there are more buckets, try placing the next one
    if (nextIndex < buckets.length) {
      const nextSize = buckets[nextIndex].size;
  
      // Iterate through possible positions in the container
      for (let newY = 0; newY <= container.length - nextSize; newY++) {
        for (let newX = 0; newX <= container[0].length - nextSize; newX++) {
          // Check if the next bucket can be placed at the current position
          const canPlace = checkPlacement(container, newX, newY, nextSize);
          if (canPlace) {
            // Recursively place the next bucket
            addElement(newX, newY, container, buckets, nextIndex, placedElements);
            return;
          }
        }
      }
    }
  }
  
  // Function to check if a bucket can be placed at a given position in the container
  function checkPlacement(container: string[][], x: number, y: number, size: number): boolean {
    for (let checkY = 0; checkY < size; checkY++) {
      for (let checkX = 0; checkX < size; checkX++) {
        // Check if the position is already occupied
        if (container[y + checkY] && container[y + checkY][x + checkX] !== "⬛") {
          return false;
        }
      }
    }
  
    // The bucket can be placed at the given position
    return true;
  }
  
  // Export the fitContainer function as the default export
  export default fitContainer;
  




