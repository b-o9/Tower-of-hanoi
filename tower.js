import { Stack } from './stack.js'; // Import stack

// Create three pins as stacks
const pin1 = new Stack();
const pin2 = new Stack();
const pin3 = new Stack();

const pins = [pin1, pin2, pin3];

// DOM elements for the pins
const pin1V = document.getElementById('pin1');
const pin2V = document.getElementById('pin2');
const pin3V = document.getElementById('pin3');

var totalMoves = 0;
const moves = document.getElementById('moves');

// Button to solve the game

// Track selected pin
let selectedPin = null;

// Function to setup the game
function setup() {
    // Fill pin1 with disks (8 disks, sizes 1-8)
    for (let i = 8; i >= 1; i--) {
        pin1.push(i);
    }
    visualize(); // Initial visualization
}

// Function to visualize the pins and disks
function visualize() {
    // Clear all pins' innerHTML
    pin1V.innerHTML = '';
    pin2V.innerHTML = '';
    pin3V.innerHTML = '';

    // Helper to visualize each pin
    function visualizePin(pin, pinV) {
        let html = '';
        for (let i = 0; i < pin.size(); i++) {
            const diskSize = pin.get(i);
            html += `<div class="disk" style="width:${diskSize * 20}px">${diskSize}</div>`;
        }
        pinV.innerHTML = html;
    }

    // Visualize all three pins
    visualizePin(pin1, pin1V);
    visualizePin(pin2, pin2V);
    visualizePin(pin3, pin3V);
}

function handlePinClick(pinIndex) {
    const currentPin = pins[pinIndex];

    // Reset previously selected pins' style
    document.querySelectorAll('.pin').forEach(pin => pin.classList.remove('selected'));

    if (selectedPin === null) {
        // No pin selected, select this one
        if (currentPin.size() > 0) {
            selectedPin = pinIndex;
            document.getElementById(`pin${pinIndex + 1}`).classList.add('selected'); // Highlight selected pin
            console.log(`Selected pin: ${selectedPin + 1}`);
        }
    } else {
        // Move disk from selected pin to the clicked pin
        const selectedStack = pins[selectedPin];

        if (selectedPin !== pinIndex && canMove(selectedStack, currentPin)) {
            totalMoves += 1;
            moves.innerHTML = "Moves: "+ totalMoves;
            const disk = selectedStack.pop();
            currentPin.push(disk);
            selectedPin = null; // Reset selection
            visualize(); // Re-render pins

            // Check if the game is won
            if (pin3.size() === 8) {
                alert('You won!');
            }
            if (pin2.size() === 8) {
                alert('You won!');
            }
        } else {
            console.log('Invalid move');
            selectedPin = null; // Reset selection
        }
    }
}


// Function to check if a disk can be moved to a target pin
function canMove(fromStack, toStack) {
    if (toStack.size() === 0) {
        return true;
    }
    return fromStack.peek() < toStack.peek(); // Ensure smaller disk goes on top
}



// Event listeners for pin clicks
pin1V.addEventListener('click', () => handlePinClick(0));
pin2V.addEventListener('click', () => handlePinClick(1));
pin3V.addEventListener('click', () => handlePinClick(2));


// Initial setup
setup();
