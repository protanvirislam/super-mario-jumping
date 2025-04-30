const character = document.querySelector("lottie-player");
const enemie = document.querySelector(".enemy-1");
const start =document.querySelector(".start");
const score_element = document.querySelector(".score");
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const jump_key = document.querySelector(".jump-key");




//Set Attribute global value for jupming
let speed = 1;
let velocity = 0;
let isJumping = false;
let position = -70 ;
let gravity = 0.5;
let force = 0.5;
let randomTime= 0;
let forward = 100;
let score = 0;




function jump(e) {
  moveSound.play()
  console.log(e.code)
  if (e.code === "Space") {
   
    if(isJumping) return;
    
    isJumping = true;

    velocity = 10;
    
    requestAnimationFrame(update);


  }
}


function update() {
    console.log(velocity, position)
    velocity -= gravity;     // gravity reduces velocity upward
    position += velocity;    // move Mario by velocity
  
    if (position < -70) {
      position = -70;
      velocity = 0;
      isJumping = false;
    }
  
    character.style.setProperty("--mario-jump", `${position}px`);
  
    if (isJumping) {
      requestAnimationFrame(update);
    }
  }


 


  function enemyRunnign() {
   
    
     forward = forward - force;
    
     enemie.style.left = `${forward}%`;
  
    


   
    if(forward > -9) {  
       requestAnimationFrame(enemyRunnign)
    }

    if(forward === -9 ){
      forward = 100;
      requestAnimationFrame(enemyRunnign) 
    }

   const getLeftValue =  enemie.style.left;



     if(!isJumping && getLeftValue === "23%" ) {
      gameOverSound.play()
       alert("game Over !!! Your Score is : " + score);
       location.reload()
     }
     if(!isJumping && getLeftValue === "13%" ) {
      gameOverSound.play()
       alert("game Over !!! Your Score is : " + score);
       location.reload()
     }

     if(isJumping && getLeftValue === "13%") {
      score++;
      score_element.textContent = `Score: ${score}`
     }
      
  }
 
function gameStart() {
  enemyRunnign();
  
  const animation = lottie.loadAnimation({
    container: document.querySelector('lottie-player'), // the DOM element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './asset/Animation - 1745845475004.json'
  });
  
  
  
  animation.setSpeed(0.5);   
  
  console.log(animation);

  start.style.display = "none";
 
  
} 





  

//Insital Speed of Super mario is 0



document.addEventListener("keydown", jump);

start.addEventListener("click", gameStart);

jump_key.addEventListener("click", function() {
  jump({code: "Space"});

} )