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

    const dice = new Dice(this, 70, 70);

    const toggleSquare = new ToggleSquare(
        this,
        {x: 300, y: 160},
        {
            initialState: true,
            size: 65
        }
    );

    const deck = new CardDeck(
        this, 
        {x: 340, y: 300},
        "TECHNOLOGIES",
        ["CARTE 1", " NO 2", "La 3 stp", "4 ?", "Voila: 5"],
        (chosenCard) => {
            alert('carte choisie: ' + chosenCard);
        },
        false
    );

    const otherDeck = new CardDeck(
        this,
        {x: 360, y: 420},
        "WIN !!",
        ["win1", "win2", "win3", "win4", "win5", "win6", "win7"],
        (chosenCard) => {
            alert("Carte choisie = " + chosenCard);
        }
    )

    const counter = new Counter(
        this,
        {x: 400, y: 550},
        "GOLD",
        2,
        [0]
    );
}

function update () {
}