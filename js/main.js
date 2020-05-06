var game;
window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT, //SMOTH
          parent: 'phaser-example',
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 360,
          height: 640
        },
        physics: {
            default: 'arcade',
            arcade: {
               
                debug: false
            }
        },
        parent: 'div-tag-name',
        backgroundColor: 0xa0a0a0,
        scene: [mainScene,sceneOver]
    };   
    game = new Phaser.Game(config);
}
