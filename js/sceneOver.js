class sceneOver extends Phaser.Scene{
    constructor(){
        super('sceneOver');
    }

    preload(){}
    create(){
        this.alien=this.add.image(game.config.width/2,game.config.height/2,'alien');
        this.gameOverText=this.add.text(game.config.width/2-150,game.config.height/2-150,"Game Over",{color: "#fff",fontSize: 64});
        
    }
    update(){}
}