const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],  [0, 3, 6],  [0, 4, 8],
    [3, 4, 5],  [1, 4, 7],  [2, 4, 6],
    [6, 7, 8],  [2, 5, 8]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message]');
let circleTurn = document.querySelector('.circle')

startGame()


// Permet le lancement du jeu
function startGame() {
    circleTurn = false; //Comme c'est à false, cela va afficher le hover "x" en premier grace à la fonction setHoverBoardClass()
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    });// Pour chaque cellule du tableau, une fois que la case est cliquée, on ne peut plus cliquer de nouveau dessus
    
}


//Permet toute la prise en main de l'événement click
function handleClick(e) {
    const cell = e.target;
    const currentClass =  circleTurn ? CIRCLE_CLASS : X_CLASS; // si c'est un"o" alors tu affiches le "o" sinon tu affiches le "x"

    setBoardHoverClass()
    placeMark(cell, currentClass)
    
    if(checkWins(currentClass)) {
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
    
function endGame(draw) {
    if(draw) {
        winningMessageElement.innerText = 'Match nul!'
    }
    else {
        winningMessageElement.innerText = `${circleTurn ? "O" : "X" } gagne!`
    }
    winningMessageElement.classList.add('show')
    restartButton.addEventListener('click', startGame)
    restartButton.style.display="block"
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


//Permet d'ajouter tous les "x" car dans la fonction startGame() circleTurn est à true
function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
}

//Permet d'alterner le "x" et le "o"
function swapTurns() {circleTurn = !circleTurn }

//Permet d'afficher les hovers des "x" et des "o"
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS)
}

function checkWins(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {    //Détermine si chaque élément du tableau renvoie true en booleen
        return combination.every(index => cellElements[index].classList.contains(currentClass)
        )
    })
}