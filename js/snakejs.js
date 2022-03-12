
// All game variables are here -
let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr =[
    {x: 13, y: 15}
]
let food = {x: 6, y: 7};
let gameBoard = document.querySelector('#board')

// ALl game functions starts here -
function main(ctime) { // ctime = Current time /-
    window.requestAnimationFrame(main);
    
    // for FPS -
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // IF you snake bump into him -
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x  && snake[i].y === snake[0].y ) {
            return true;
        }
    }

    // If snake bump into wall -
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
    }
    
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over. Press 'OK' to play again");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        score = " ";
    }
    
    // IF you had eaten the food, increment the score and regenerate  the food -
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HighScore: " + hiscoreval;
        }

        scoreBox.innerHTML = 'Score:' + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random()) }
    } 
    // Move the snake -
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    // Display the snake
    gameBoard.innerHTML = "";
    snakeArr.forEach(function (e, index) {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        gameBoard.appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}


// All game logic starts here -
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "HighScore: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1}  // Start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            
        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});
