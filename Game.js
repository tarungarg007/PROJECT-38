class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    fruit1=createSprite(100,200)
    fruit2=createSprite(300,200)
    fruit3=createSprite(500,200)
    fruit4=createSprite(700,200)
    fruits=[fruit1,fruit2,fruit3,fruit4]
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 0;
      var y;
      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        fruits[index-1].x = x;
        fruits[index-1].y = y;
        if (index === player.index){
          fruits[index - 1].shapeColor = "red";
          camera.position.x = displayWidth;
          camera.position.y = fruits[index-1].y
        }
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance)
    }
    drawSprites();
  }
}
