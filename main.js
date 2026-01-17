import {Jauge} from "./elements/Jauge.js";

const gameContainer = document.body;

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: gameContainer,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config);

function preload () {}

function create () {
    const jauge = new Jauge(
        this, 
        {x: 200, y: 200}, 
        {min: 0, max: 5},
        {
            length: 300,
            color: 0x333333,
            isVertical: true
        }
    );
}

function update () {
}