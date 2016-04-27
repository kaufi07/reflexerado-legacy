Reflexerado.MainMenu = function (game) {

    this.music;
    this.shoot;

    this.playerOneReady;
    this.playerTwoReady;

    this.controls;

    this.title_buttons;
};

Reflexerado.MainMenu.prototype = {
    init: function () {
        this.music = null;
        this.shoot = null;
        this.playerOneReady = false;
        this.playerTwoReady = false;

        this.controls = {
            p1: {
                left: Phaser.Keyboard.Q,
                center: Phaser.Keyboard.S,
                right: Phaser.Keyboard.Y
            },
            p2: {
                left: Phaser.Keyboard.M,
                center: Phaser.Keyboard.J,
                right: Phaser.Keyboard.I
            }
        };

        this.title_buttons = {
            p1: null,
            p2: null
        }
    },

    create: function () {


        if (!this.music) {
            this.music = this.add.audio('bg_audio');
            this.shoot = this.add.audio('shot');
            this.music.loop = true;
            if (debug === false)
                this.music.play();
        }

        this.add.image(0, 0, 'titlescreen');

        this.title_buttons.p1 = this.add.sprite(this.world.width / 2 - 350, this.world.height / 7 * 6, 'title_buttons');
        this.title_buttons.p1.animations.add('press');
        this.title_buttons.p1.animations.play('press', 2, true);

        this.title_buttons.p2 = this.add.sprite(this.world.width / 2 + 350, this.world.height / 7, 'title_buttons');
        this.title_buttons.p2.scale.x *= -1;
        this.title_buttons.p2.scale.y *= -1;
        this.title_buttons.p2.animations.add('press');
        this.title_buttons.p2.animations.play('press', 2, true);


        this.input.enabled = true;
        var p1 = this.input.keyboard.addKey(this.controls.p1.center);
        p1.onDown.add(function () {
            this.playerOneReady = true;
        }, this);
        p1.onUp.add(function() {
            this.playerOneReady = false;
        }, this);
        var p2 = this.input.keyboard.addKey(this.controls.p2.center);
        p2.onDown.add(function () {
            this.playerTwoReady = true;
        }, this);
        p2.onUp.add(function() {
            this.playerTwoReady = false;
        }, this);

    },

    update: function () {
        console.log("player1 ready: " + this.playerOneReady);
        if (this.playerOneReady === true && this.playerTwoReady === true) {
            this.shoot.play();
            this.title_buttons.p1.animations.stop();
            this.title_buttons.p2.animations.stop();
            this.playerOneReady = false;
            this.playerTwoReady = false;
            this.time.events.add(Phaser.Timer.SECOND, function () {
                this.state.start('Game', true, false, {controls: this.controls});
            }, this);
        }

    }

};