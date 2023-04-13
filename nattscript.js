const board = document.getElementById('sudoku-board');
let cells = [];

// สร้างเซลล์และกำหนดเลขเริ่มต้นให้กับเกม Sudoku
// Create a cell and assign a starting number to the Sudoku game
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `<input type="number" min="1" max="9" value="">`;
    cells.push(box);
    board.appendChild(box);
  }
}

// สุ่มตัวเลขเริ่มต้นให้กับเกม Sudoku
// randomize initial number for Sudoku game
function generateRandomPuzzle() {
    const values = Array(81).fill(0); // สร้างอาร์เรย์ 81 ตัวแรกเป็น 0, Creates the first 81 arrays as 0.
    for (let i = 0; i < 20; i++) { // สุ่มตัวเลขเริ่มต้น 20 ตัว, Random 20 starting numbers,
        let idx;
        do {
            idx = Math.floor(Math.random() * 81); // สุ่มตำแหน่งของเซลล์ที่ยังไม่มีค่า, Randomize the position of cells that do not have a value yet.
        } while (values[idx] !== 0);
            const num = Math.floor(Math.random() * 9) + 1; // สุ่มตัวเลข 1-9, random numbers 1-9
            values[idx] = num; // กำหนดค่าให้กับเซลล์นั้น, assign a value to that cell
    }
    for (let i = 0; i < cells.length; i++) {
        const input = cells[i].querySelector('input');
        input.value = values[i]; // กำหนดค่าให้กับ input element, Assign values to input elements.
        if (values[i] !== 0) {
        input.disabled = true; // ปิดใช้งาน input ที่มีค่าเริ่มต้น, Disable default input.
        }
    }
}
generateRandomPuzzle(); // เรียกใช้ฟังก์ชันสุ่มตัวเลขเริ่มต้น, Call the default random number function.



// ตรวจสอบความถูกต้องของคำตอบ, Check the correctness of the answer.
// function correctAnswer(values, row, col, num) {
//     // ตรวจสอบแนวนอน, horizontal check
//     for (let i = 0; i < 9; i++) {
//       if (values[row * 9 + i] === num) return false;
//     }
  
//     // ตรวจสอบแนวตั้ง, vertical check
//     for (let i = 0; i < 9; i++) {
//       if (values[col + i * 9] === num) return false;
//     }
  
//     // ตรวจสอบในเซลล์ 3x3, check in cell 3x3
//     const startRow = Math.floor(row/3) * 3;
//     const startCol = Math.floor(col/3) * 3;
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (values[(startRow + i) * 9 + startCol + j] === num) 
//             return false;
//         }
//     }
  
//     return true;
// }
  
  // แก้ไขปัญหา Sudoku ด้วยวิธี Backtracking
// function solve(values) {
// for (let i = 0; i < 81; i++) {
//     if (values[i] === 0) {
//     for (let num = 1; num <= 9; num++) {
//         if (correctAnswer(values, Math.floor(i / 9), i % 9, num)) {
//         values[i] = num;
//         if (solve(values)) return true;
//         values[i] = 0;
//         }
//     }
//     return false;
//     }
// }
// return true;
// }
  
// เมื่อกดปุ่ม Solve
// when the Solve button is pressed
function solveSudoku() {
    const values = cells.map(box => Number(box.querySelector('input').value));
    if (solve(values)) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].querySelector('input').value = values[i];
        }
    } else {
        alert('No answer');
    }
}

// When the Reset button is pressed
let resetSudoku = ()=>{
    for (let i = 0; i < cells.length; i++) {
        cells[i].querySelector('input').value = '';
    }
}
// เมื่อกดปุ่ม Reset
// function resetSudoku() {
//     for (let i = 0; i < cells.length; i++) {
//         cells[i].querySelector('input').value = '';
//     }
// }
  