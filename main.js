import {winCards, loseCards, ressources} from "./datas.js";

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

    // Ressources (haut à droite)
    let ressourcesCounters = [];
    ressources.forEach((ressource) => {
        ressourcesCounters.push(new Counter(
            this,
            {
                x: window.innerWidth - 120,
                y: 40 + ressources.indexOf(ressource) * 60
            },
            ressource.toUpperCase(),
            0,
            [0]
        ));
    });

    // Gloire (zone gauche)
    const gloryX = window.innerWidth * 0.08;
    const glory = new Jauge(
        this,
        {x: gloryX, y: window.innerHeight / 2},
        [0, 25],
        {
            color: 0xFFFF00,
            isVertical: true,
            length: window.innerHeight / 1.5
        }
    )

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.15}));

    // Batiments (zone 2)
    const batiments = ["mairie", "port", "forge", "temple", "champ"];
    const LevelCounters = [];
    const batimentsX = window.innerWidth * 0.28;
    const batimentsStartY = window.innerHeight / 2 - 160;
    batiments.forEach((bat) => {
        LevelCounters.push(new Counter(
            this,
            {
                x: batimentsX,
                y: batimentsStartY + batiments.indexOf(bat) * 70
            },
            bat.toUpperCase(),
            (bat === "mairie" || bat === "port") ? 1 : 0,
            (bat === "mairie" || bat === "port") ? [1, 4] : [0, 4]
        ));
    });

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.4}));

    // Gods (zone 3)
    const gods = ["odin", "njörd", "thor", "loki", "freyr"];
    const toggles = [];
    const godsX = window.innerWidth * 0.53;
    const godsStartY = window.innerHeight / 2 - 160;
    gods.forEach((god) => {
        toggles.push(new ToggleSquare(
            this,
            {
                x: godsX,
                y: godsStartY + gods.indexOf(god) * 70
            },
            god[0].toUpperCase() + god.slice(1),
            {
                size: 50,
                initialState: false
            }
        ));
    });

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.65}));

    // Combat (zone droite)
    const combatX = window.innerWidth * 0.78;
    const combatStartY = window.innerHeight / 2 - 120;
    
    const dice = new Dice(this, combatX, combatStartY);

    const winDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 90},
        "carte victoire",
        winCards,
        true
    );

    const loseDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 160},
        "carte défaite",
        loseCards,
        true
    );

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.92}));
}

function update () {}