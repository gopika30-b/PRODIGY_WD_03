document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".game-container");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameActive = true; 
    const cells = [];
    updateMessage();
    for (let i = 0; i < 3; i++) {
        const row = document.getElementById(`row-${i}`);
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            row.appendChild(cell);
            cells.push(cell);
        }
    }
    function handleCellClick(event) {
        if (!gameActive) return;
        const cell = event.target;
        if (cell.textContent === "") {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            if (checkWinner()) {
                messageElement.textContent = `Player ${currentPlayer} wins! Good Job!`;
                showResetButton();
                gameActive = false; 
            } else if (isBoardFull()) {
                messageElement.textContent = "It's a draw!";
                showResetButton();
                gameActive = false; 
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                updateMessage();
            }
        }
    }
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]             
        ];
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent !== "" &&
                   cells[a].textContent === cells[b].textContent &&
                   cells[a].textContent === cells[c].textContent;
        });
    }
    function isBoardFull() {
        return cells.every(cell => cell.textContent !== "");
    }
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
        currentPlayer = "X";
        hideResetButton();
        updateMessage();
        gameActive = true;
    }
    function updateMessage() {
        messageElement.textContent = `Player ${currentPlayer === 'X' ? 'X' : 'O'} turn`;
    }
    function hideResetButton(){
        resetButton.style.display = "none";
    }
    function showResetButton() {
        resetButton.style.display = "block";
    }
    resetButton.addEventListener("click", resetGame);
});

