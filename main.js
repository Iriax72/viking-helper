import {winCards, loseCards} from "./datas.js";

import {Jauge} from "./elements/Jauge.js";
import {Dice} from "./elements/Dice.js";
import {ToggleSquare} from "./elements/ToggleSquare.js";
import {CardDeck} from "./elements/CardDeck.js";
import {Counter} from "./elements/Counter.js";
import { LevelCounter } from "./elements/LevelCounter.js";
import { Separateur } from "./elements/Separateur.js";

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
    const separateurs = [];

    // Ressources
    const ressources = ["or", "prisonniers", "moutons", "forces armées"];

    let ressourcesCounters = [];
    ressources.forEach((ressource) => {
        ressourcesCounters.push(new Counter(
            this,
            {
                x: window.innerWidth - 100,
                y: ressources.indexOf(ressource) * 80 + window.innerHeight/2 - 120
            },
            ressource.toUpperCase(),
            0,
            [0]
        ));
    });

    // Gloire
    const glory = new Jauge(
        this,
        {x: 30, y: window.innerHeight/2},
        [0, 25],
        {
            color: 0xFFFF00,
            isVertical: true,
            length: window.innerHeight / 1.5
        }
    )

    separateurs.push(new Separateur(this, 'vertical', {x: 85}));

    // Batiments
    const batiments = ["mairie", "port", "forge", "temple", "champ"];
    const LevelCounters = [];
    batiments.forEach((bat) => {
        LevelCounters.push(new Counter(
            this,
            {
                x: 180,
                y: batiments.indexOf(bat) * 80 + window.innerHeight/2 - 150
            },
            bat.toUpperCase(),
            (bat === "mairie" || bat === "port") ? 1 : 0,
            (bat === "mairie" || bat === "port") ? [1, 4] : [0, 4]
        ));
    });

    // Gods
    const gods = ["odin", "njörd", "thor", "loki", "freyr"];
    const toggles = [];
    gods.forEach((god) => {
        toggles.push(new ToggleSquare(
            this,
            {
                x: 310,
                y: gods.indexOf(god) * 80 + window.innerHeight/2 - 150
            },
            god[0].toUpperCase() + god.slice(1),
            {
                size: 50,
                initialState: false
            }
        ));
    });

    separateurs.push(new Separateur(this, 'vertical', {x: 435}));

    // Combat
    const dice = new Dice(this, 470, 35);

    const winDeck = new CardDeck(
        this,
        {x: 470, y: 115},
        "carte victoire",
        winCards,
        true
    );

    const loseDeck = new CardDeck(
        this,
        {x: 470, y: 195},
        "carte défaite",
        loseCards,
        true
    );

    separateurs.push(new Separateur(this, 'vertical', {x: 530}));
}

function update () {}