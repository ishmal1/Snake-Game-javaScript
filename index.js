import { update as updateSnake, draw as drawSnake, snakeSpeed, onSnake } from "./snake.js"
import { update as updateFood , draw as drawFood} from "./food.js"
import { score,outsideGrid } from "./food.js"
import { getSnakeHead, snakeIntersection } from "./snake.js"

let gameBoard= document.getElementById('game-board')
let highScoreElement = document.querySelector('.high-score')

let highScore = localStorage.getItem('high-score') || 0
    highScoreElement.innerText= `Highscore: ${highScore}`
let lastRenderTime=0
let gameOver =false

function main (currentTime){
     if (gameOver){
        if(confirm("you lose! Press ok to restart the game")){
        location.reload()
        }
        return
     }

    window.requestAnimationFrame(main)
    const secondsTillLastRender= (currentTime-lastRenderTime)/1000
    if(secondsTillLastRender< 1/snakeSpeed) return

    console.log("render")
    lastRenderTime=currentTime
    
    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkFailure()
}

function draw(){
    gameBoard.innerHTML=''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkFailure(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()

    if (gameOver){
    highScore = score >= highScore ? score: highScore;
    localStorage.setItem('high-score', highScore)
    highScoreElement.innerText= `Highscore: ${highScore}`

    
    }

}