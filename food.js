import { onSnake, growSnake } from "./snake.js"


let scoreElement= document.querySelector('.score') 


let growthRate = 1
let gridSize= 31
export let score= 0
let food = getRandomnFoodPosition()




export function update(){
    if (onSnake(food)){
        growSnake(growthRate)
        food = getRandomnFoodPosition()
        score++
        scoreElement.innerText =`Score: ${score}`
       
    }
  
}

export function draw(gameBoard){
    let foodElement = document.createElement('div')
    foodElement.style.gridColumnStart  = food.x
    foodElement.style.gridRowStart =food.y
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomnFoodPosition(){
   let newFoodPosition 
   while( newFoodPosition ==null || onSnake(newFoodPosition)){
    newFoodPosition = randomnGridPosition()
   }
   return newFoodPosition
}

function randomnGridPosition(){
    return {
        x: Math.floor(Math.random() * gridSize)+1,
        y:  Math.floor(Math.random() * gridSize)+1
    }
}

export function outsideGrid(position){
    if (position.x <1 || position.x> gridSize || position.y< 1 || position.y> gridSize) return true
}
