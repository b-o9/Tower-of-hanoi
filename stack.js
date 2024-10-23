
class Node {
    constructor(data, next = null) {
      this.data = data; // Data that the node will hold
      this.next = next; // Pointer to the next node
    }
  }
  
  // Stack class using linked list
  class Stack {
    constructor() {
      this.tail = null; // Tail points to the top of the stack (most recent node)
      this._size = 0;   // Internal variable to track size
    }
  
    // Push data onto the stack
    push(data) {
      const newNode = new Node(data, this.tail); // Create new node pointing to the current top
      this.tail = newNode; // Move the tail to the new node
      this._size++; // Increment the size of the stack
    }
  
    // Pop the top item off the stack
    pop() {
      if (this.tail === null) {
        return null; // Stack is empty, nothing to pop
      }
  
      const poppedData = this.tail.data; // Get the data from the current top
      this.tail = this.tail.next; // Move the tail to the next node (removing the current top)
      this._size--; // Decrement the size of the stack
      return poppedData; // Return the popped data
    }
  
    // Peek at the top item of the stack without removing it
    peek() {
      if (this.tail === null) {
        return null; // Stack is empty
      }
      return this.tail.data; // Return the data at the top of the stack
    }
  
    // Return the current size of the stack
    size() {
      return this._size;
    }
  
    // Get the item at a specific index (0 = top of stack)
    get(index) {
      if (index < 0 || index >= this._size) {
        return null; // Index out of bounds
      }
  
      let currentNode = this.tail; // Start at the top of the stack
      let currentIndex = 0;
  
      // Traverse through the stack until the index is reached
      while (currentIndex < index) {
        currentNode = currentNode.next;
        currentIndex++;
      }
  
      return currentNode.data; // Return the data at the given index
    }
  }
  
  // Export the Stack class as an ES module
  export { Stack };
  