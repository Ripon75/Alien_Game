class mainScene extends Phaser.Scene {
  constructor() {
    super('mainScene');
  }
  preload() {
    this.load.image('man', 'assets/images/sneeze.png');
    this.load.image('alien', 'assets/images/alien.png');
    this.load.image('bullet', 'assets/images/bullet .png');
    this.load.spritesheet('bomb',
      'assets/images/exp.png',
      { frameWidth: 256, frameHeight: 256 }
    );
    this.load.audio('bombSound', 'assets/audio/boom.wav');
    this.load.audio('shootSound', 'assets/audio/shoot.wav');
  }
  create() {

    this.score = 0;

    this.manGroup = this.physics.add.group();
    this.alienGroup = this.physics.add.group();
    this.bulletGroup = this.physics.add.group();

    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    this.aGrid.show();
    this.addChar();
    this.time.addEvent({ delay: 3000, callback: this.addChar, callbackScope: this, loop: true });
    this.input.on('pointerdown', this.addBullet, this);
    this.physics.add.collider(this.manGroup, this.bulletGroup, this.hitAction, null, this);
    this.physics.add.collider(this.alienGroup, this.bulletGroup, this.hitAction, null, this);
    this.scoreText = this.add.text(100, 5, "Score : 0", { color: "#fff", fontSize: 48 });

    this.anims.create({
      key: 'bom',
      frames: this.anims.generateFrameNumbers('bomb'),
      frameRate: 8,
      repeat: 0
    });
    this.bombSound = this.sound.add('bombSound');
    this.shootSound = this.sound.add('shootSound');
  }

  hitAction(man, bullet) {
    if (man.isMan) {
      this.scene.start('sceneOver');
    }
    else {
      this.updateScore();
      this.bombSound.play();
      this.bomb = this.add.sprite(man.x, man.y, 'bomb');
      Align.scaleToGameW(this.bomb, .2);
      this.bomb.play("bom");
      this.bomb.on('animationComplete', function () {
        this.destroy();
      })
    }
    man.destroy();
    bullet.destroy();
  }

  updateScore() {
    this.score++;
    this.scoreText.setText("Score " + this.score);
  }

  addChar() {
   
    var man = this.physics.add.sprite(0, 0, 'man');
    this.aGrid.placeAtIndex(32, man);
    Align.scaleToGameW(man, .1);
    this.manGroup.add(man);
    man.setVelocityX(-150);
    if (man.x < 30) {
      man.x = 500;
    }
    man.isMan = true;
    
    var alien = this.physics.add.sprite(0, 0, 'alien');
    this.aGrid.placeAtIndex(20, alien);
    Align.scaleToGameW(alien, .1);
    this.alienGroup.add(alien);
    alien.setVelocityX(-200);
    


  }
  addBullet(pointer) {
    this.shootSound.play();
    var bullet = this.physics.add.sprite(pointer.x, game.config.height - 150, 'bullet');
    this.bulletGroup.add(bullet);
    bullet.setVelocityY(-800);

  }
  update() {
   
    this.alienGroup.children.iterate(function (child) {
      if (child.x < 0) {
        child.x = 500;
        child.setVelocityX(-200);
      }
    }.bind(this));


  }
}