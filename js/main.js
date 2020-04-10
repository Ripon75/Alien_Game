var game;
window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        width: 500,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: { y: 100 },
                debug: false
            }
        },
        parent: 'div-tag-name',
        scene: [mainScene,sceneOver]
    };   
    game = new Phaser.Game(config);
}
