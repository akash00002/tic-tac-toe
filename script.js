let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let box_count = 0;
let win = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.innerText = "O";
            box.style.color = "#E2BE00"
            turn0 = false
        }
        else{
            box.innerText = "X";
            turn0 = true
        }
        box.disabled = true
        box_count++;
        checkWinner()
    })
});

const resetGame = () => {
    turn0 = true;
    box_count = 0;
    win = false
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText = ""
    }
}

const showWinner = (winner) => {
    msg.innerText = `Game over. Player ${winner} Wins!`
    msgContainer.classList.remove("hide");
    disableBoxes()
}

const checkWinner = () =>{
    for (let pattern of winPatterns) {
        let pos1Val = (boxes[pattern[0]].innerText);
        let pos2Val = (boxes[pattern[1]].innerText);
        let pos3Val = (boxes[pattern[2]].innerText);
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                win = true;
                // break
            }
            else if(box_count === 9 && win === false) {
                msg.innerText = "Game over. Draw Match!"
                msgContainer.classList.remove("hide");
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame)
