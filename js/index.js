//Game constants and variables
let inputDir = {x:0,y:0};
const foodsound = new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3');
const movesound=new Audio('music/direction.mp3');
const musicsound=new Audio('music/music.mp3');
let speed=10;
let lastPaintime=0;
let snakeArr=[
    {x:13 ,y:15}
]
let score=0;
food={x:6,y:7};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime)
    if((ctime-lastPaintime)/1000<1/speed){
        return;
    }
    lastPaintime = ctime;
    gameEngine();
}
function isColloid(sArr){
    //if you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(sArr[i].x===sArr[0].x && sArr[i].y===sArr[0].y ){
            return true;
        }
    }
    // if you bump into wall
    if(snakeArr[0].x>=18||snakeArr[0].x<=0 || snakeArr[0].y>=18||snakeArr[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine(){
    //updating the snake and food

    if(isColloid(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicsound.play();
        score =0;
    }
    //if snake has eaten the food ,increment the length of snake and regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodsound.play();
        score += 1;
        if(score > Hiscoreval){
            Hiscoreval=score;
            localStorage.setItem("Hiscore",JSON.stringify(Hiscoreval));
            HiscoreBox.innerHTML = "Hiscore: " + Hiscoreval;
        }
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a +(b-a)*Math.random()),y:Math.round(a +(b-a)*Math.random())}
    }
    // snake moving
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    musicsound.play();
    //display snake and food
    board.innerHTML = "";
    //display snake
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
       
        board.appendChild(snakeElement);
    })
    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
  

}
//main logic starts here
let Hiscore = localStorage.getItem("Hiscore");
if(Hiscore===null){
    Hiscoreval=0;
    localStorage.setItem("Hiscore",JSON.stringify(Hiscoreval))
}
else{
    Hiscoreval = JSON.parse(Hiscore);
    HiscoreBox.innerHTML = "Hiscore: " + Hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    movesound.play();
    switch(e.key){
       
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        default:
            break;
        

    }
})