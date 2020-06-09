var scene = new Phaser.Scene("game");
//var gamescene = new Phaser.Scene("game");
//var titleScene = new Phaser.Scene("title");


var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 700 },
        debug: false
    } 
},scene: scene
   
};
var game = new Phaser.Game(config);




scene.preload = function() 


{ this.load.image('sky', 'assets/night.png');
this.load.image('ground', 'assets/magmaMediumBlock.png');
this.load.image('end', 'assets/magmaSmallBlock3.png');
this.load.image('grass', 'assets/magma1.png');
this.load.image('star', 'assets/redstar1.png');
this.load.image('coin', 'assets/RealCoin.png');

this.load.image('bomb', 'assets/bomb.png');
this.load.spritesheet('dude', 
    'assets/Grimm.png',
    { frameWidth: 64, frameHeight: 64 }
);
this.load.spritesheet('blue', 
    'assets/BigBlueCoin.png',
    { frameWidth: 72, frameHeight: 72 }
);

}

scene.create = function() {

 this.add.image(700, 300, 'sky');
platforms = this.physics.add.staticGroup();

platforms.create(300, 568, 'grass').setScale(1).refreshBody();
platforms.create(700, 568, 'grass').setScale(1).refreshBody();
platforms.create(1000, 568, 'grass').setScale(1).refreshBody();
platforms.create(1300, 568, 'grass').setScale(1).refreshBody();

platforms.create(300, 450, 'ground');
platforms.create(50, 330, 'ground');
platforms.create(1200, 460, 'ground');
platforms.create(750, 330, 'ground');
platforms.create(400, 220, 'ground');
platforms.create(650, 120, 'ground');
platforms.create(900, 220, 'ground');
platforms.create(550, 450, 'ground');
platforms.create(1340, 110, 'end');
platforms.create(1340, 350, 'end');
platforms.create(1180, 230, 'end');



enemy = this.physics.add.sprite(1340, 0, 'blue');   

enemy.setBounce(0.2);
enemy.setCollideWorldBounds(true);

this.anims.create({
key: 'bluecoin',
frames: this.anims.generateFrameNumbers('blue', { start: 0, end: 5 }),
frameRate: 10,
repeat: -1
});

player = this.physics.add.sprite(100, 450, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);


this.anims.create({
key: 'left',
frames: this.anims.generateFrameNumbers('dude', { start: 118, end: 126 }),
frameRate: 10,
repeat: -1
});

this.anims.create({
key: 'turn',
frames: [ { key: 'dude', frame: 131 } ],
frameRate: 20
});

this.anims.create({
key: 'right',
frames: this.anims.generateFrameNumbers('dude', { start: 144, end: 152 }),
frameRate: 10,
repeat: -1
});
this.anims.create({
key: 'space',
frames: this.anims.generateFrameNumbers('dude', { start: 196, end: 200 }),
frameRate: 10,
repeat: 0
});

this.physics.add.collider(player, platforms);
this.physics.add.collider(enemy, platforms);
coins = this.physics.add.group({
key: 'coin',
repeat: 24,
setXY: { x: 12, y: 50, stepX: 50 }
});


this.physics.add.collider(coins, platforms);

this.physics.add.overlap(player, coins, collectcoin, null, this);
function collectcoin (player, coin)
{
coin.disableBody(true, true);
score += 1;
scoreText.setText('Score: ' + score);

}
coins.children.iterate(function (child) {

child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

});

this.physics.add.overlap(player, enemy, collectcoin, null, this);
function collectcoin (player, enemy)
{
enemy.disableBody(true, true);
score += 5;
scoreText.setText('Score: ' + score);



};
let score = 0;
let scoreText;
scoreText = this.add.text(16, 16, 'COINS: 0', { fontSize: '32px', fill: '#000' });
}

scene.update = function() {
 
    
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
{
player.setVelocityX(-160);

player.anims.play('left', true);


}
else if (cursors.right.isDown)
{
player.setVelocityX(160);

player.anims.play('right', true);


}
else if (cursors.space.isDown)
{
player.setVelocityX(0);

player.anims.play('space', true);


}

else
{
player.setVelocityX(0);

player.anims.play('turn');

enemy.anims.play('bluecoin');
}



var canDoubleJump = player.jumpCount < 2;

if (cursors.up.isDown && (player.body.touching.down || canDoubleJump ) )
{
    player.jumpCount++;
     player.setVelocityY(-430);
}
}
scene.end = function() {

    if(score === 130) {
		alert('Level Complete');
	} else {
		this.create();
	}
};