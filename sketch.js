//variaveis
var rex,rexcorendo,rexcolidiu;
var bordas;
var chao,andar;
var chaoi;
var nuvemi,imagemi;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5,obstaculo6;
var pontuacao=0;
var estado = JOGAR;
var JOGAR;
var FIM = 0;
var gameover,gameover1;
var reiniciar, reiniciar1
var pontos1=0;
var somsalto;
var sommorte;
var sompontos; 


//cimagens
function preload(){

rexcorendo=loadAnimation("trex1.png","trex3.png","trex4.png");  
gameover1=loadImage("gameOver.png");  
 
reiniciar1=loadImage("restart.png");  
  
rexcolidiu = loadImage("trex_collided.png");
  
andar=loadAnimation("ground2.png");

imagemi=loadImage("cloud.png"); 
 
obstaculo1=loadImage("obstacle1.png");  

obstaculo2=loadImage("obstacle2.png");  
  
obstaculo3=loadImage("obstacle3.png");      
  
obstaculo4=loadImage("obstacle4.png");   
  
obstaculo5=loadImage("obstacle5.png");   
   
obstaculo6=loadImage("obstacle6.png");   

sommorte=loadSound("die.mp3"); 

somsalto=loadSound("jump.mp3"); 

sompontos=loadSound("checkPoint.mp3");  
  
}

//tamanho, animação e caracteristicas
function setup(){
  createCanvas(600,200)

 chao=createSprite(400, 180, 800, 20)
 chao.x=chao.width/2
 chao.addAnimation("a",andar); 
  
 rex = createSprite(40, 170, 10, 10)
 rex.addAnimation("corendo",rexcorendo);
 rex.scale=0.5;
 
//raio de colisao 
 rex.debug=false;
 rex.setCollider("circle",0,0,40); 
  
 chaoi=createSprite(100, 190, 200, 10);
 chaoi.visible=false;

 gruponuvem = new Group(); 
 
 grupoobstaculos = new Group();
 
 gameover=createSprite(300,100); 
 gameover.addImage(gameover1)
 gameover.scale=0.8;
  
 reiniciar=createSprite(300,140); 
 reiniciar.addImage(reiniciar1); 
 reiniciar.scale=0.5; 
 
 gameover.visible=false;   
 
reiniciar.visible=false;  
  
 }

//condicionais
function draw(){
  background(180);
  
 text("pontos: "+pontuacao,480, 50)
 
  
  if(estado===JOGAR){
  
pontuacao=pontuacao+Math.round(frameCount /100)  
    
chao.velocityX=-(4 + pontuacao/3000); 

if(pontuacao>0 && pontuacao%1000===0){
  
sompontos.play();  
  
}    
    
    
if(chao.x<210){

chao.x=chao.width/2
    
}

if(keyDown("space")&&rex.y>=150){

rex.velocityY=-15;   

somsalto.play();  
  
}
    
rex.velocityY=rex.velocityY+1; 

    
}
  
if(rex.isTouching(grupoobstaculos)){

estado=FIM;
sommorte.play(); 
 
  
}
  
if(estado===FIM){
  
   grupoobstaculos.setVelocityXEach(0);
   gruponuvem.setVelocityXEach(0); 
  
   grupoobstaculos.destroyEach();
   gruponuvem.destroyEach();
    
   chao.velocityX=0; 
    
   rex.addImage(rexcolidiu);
    
   gruponuvem.setLifetimeEach(-1);
   grupoobstaculos.setLifetimeEach(-1); 
   
   gameover.visible=true;   
 
   reiniciar.visible=true; 
   
  }

  if(mousePressedOver(reiniciar)){
    
  resetar(); 
    
  }   
  
  rex.collide(chaoi)
  gerarNuvens(); 
  
  gerarobstaculo();
  drawSprites(); 
 
  
 }

function resetar(){
 
estado = JOGAR;
  
gameover.visible=false;    
reiniciar.visible=false; 
grupoobstaculos .destroyEach();
gruponuvem.destroyEach();  
rex.addAnimation("corendo",rexcorendo)  
pontuacao=0;  
  
  
}


function gerarNuvens (){
  
 
if(frameCount % 100 === 0){
   
nuvemi=createSprite(700, 100, 10, 10)
nuvemi.velocityX=-5;  
nuvemi.addImage(imagemi);
  
console.log(rex.depth);
console.log(nuvemi.depth);  
  
nuvemi.y=Math.round(random(10,85))

//ajustando a profundidaade  

nuvemi.depth = rex.depth;
rex.depth = rex.depth+1;

nuvemi.lifetime=150;  
  
gruponuvem.add(nuvemi);
  
}  
  

  
}

function gerarobstaculo (){

  if(frameCount % 50 === 0){
    
 var obstaculo=createSprite(650, 165, 10, 10)
   obstaculo.velocityX = -(6 + pontuacao/1000);
   
    
 var rand = Math.round(random(1,6)); 
    switch(rand) { 
      
    case 1: obstaculo.addImage(obstaculo1);
    break; 
    
    case 2: obstaculo.addImage(obstaculo2);
    break; 
   
    case 3: obstaculo.addImage(obstaculo3);
    break;
    
    case 4: obstaculo.addImage(obstaculo4);
    break;
    
    case 5: obstaculo.addImage(obstaculo5);
    break;
    
    case 6: obstaculo.addImage(obstaculo6);
    break;
    
  }
  
  obstaculo.lifetime=150;
   obstaculo.scale=0.5; 
    
    
  grupoobstaculos.add(obstaculo);
    
}  

}

