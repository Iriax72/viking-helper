import {Jauge} from "./elements/Jauge.js";
import {Dice} from "./elements/Dice.js";
import {ToggleSquare} from "./elements/ToggleSquare.js";
import {CardDeck} from "./elements/CardDeck.js";
import {Counter} from "./elements/Counter.js";

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

    // Ressources
    const ressources = ["OR", "PRISONNIERS", "MOUTONS", "FORCES ARMÉE"];

    let ressourcesCounters = [];
    ressources.forEach((ressource) => {
        ressourcesCounters.push(new Counter(
            this,
            {
                x: window.innerWidth - 50,
                y: ressources.indexOf(ressource) * 40 + 80
            },
            ressource,
            0,
            [0]
        ));
    });

    // Gloire
    const glory = new Jauge(
        this,
        {x: 50, y: window.innerHeight/2},
        [0, 25],
        {
            color: 0x444444,
            isVertical: true,
            length: 400
        }
    )
}

function update () {}