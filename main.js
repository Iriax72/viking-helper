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

// Variables globales pour stocker les éléments du jeu
let gameElements = {
    ressourcesCounters: [],
    glory: null,
    levelCounters: [],
    toggles: [],
    dice: null,
    winDeck: null,
    loseDeck: null,
    separateurs: []
};

function preload () {}

function create () {

    // vérifier l'orientation
    checkOrientation();
    initializeGame.call(this);
    this.scale.on('resize', () => {
        destroyGame();
        initializeGame.call(this);
        checkOrientation();
    }, this);
}

function initializeGame() {
    const separateurs = [];

    // Ressources (haut à droite)
    let ressourcesCounters = [];
    ressources.forEach((ressource) => {
        ressourcesCounters.push(new Counter(
            this,
            {
                x: window.innerWidth - 90,
                y: 40 + ressources.indexOf(ressource) * 80
            },
            ressource.toUpperCase(),
            0,
            [0]
        ));
    });
    gameElements.ressourcesCounters = ressourcesCounters;

    // Gloire (zone gauche) - 10% de la largeur
    const gloryX = 0;
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
    gameElements.glory = glory;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.08, y: 0}, window.innerHeight));

    // Batiments (zone 2)
    const batiments = ["mairie", "port", "forge", "temple", "champ"];
    const LevelCounters = [];
    const batimentsX = window.innerWidth * 0.19;
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
    gameElements.levelCounters = LevelCounters;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.31, y: 0}, window.innerHeight));

    // Gods (zone 3)
    const gods = ["odin", "njörd", "thor", "loki", "freyr"];
    const toggles = [];
    const godsX = window.innerWidth * 0.41;
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
    gameElements.toggles = toggles;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.50, y: 0}, window.innerHeight));

    // Raid et technologies (zone 4)
    const raidNTech = window.innerWidth * 0.51;
    
    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.57, y: 0}, window.innerHeight));

    // Combat (zone 5)
    const combatX = window.innerWidth * 0.57;
    const combatStartY = window.innerHeight / 2 - 120;
    
    const dice = new Dice(this, combatX, combatStartY);
    gameElements.dice = dice;

    const winDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 120},
        "carte victoire",
        winCards,
        true
    );
    gameElements.winDeck = winDeck;

    const loseDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 260},
        "carte défaite",
        loseCards,
        true
    );
    gameElements.loseDeck = loseDeck;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * 0.72, y: 0}, window.innerHeight));
    gameElements.separateurs = separateurs;
}

function destroyGame() {
    // Détruire tous les compteurs de ressources
    gameElements.ressourcesCounters.forEach(counter => counter.destroy());
    gameElements.ressourcesCounters = [];
    
    // Détruire la jauge de gloire
    if (gameElements.glory) {
        gameElements.glory.container.destroy();
        gameElements.glory = null;
    }
    
    // Détruire tous les compteurs de bâtiments
    gameElements.levelCounters.forEach(counter => counter.destroy());
    gameElements.levelCounters = [];
    
    // Détruire tous les toggles des dieux
    gameElements.toggles.forEach(toggle => toggle.container.destroy());
    gameElements.toggles = [];
    
    // Détruire le dé
    if (gameElements.dice) {
        gameElements.dice.container.destroy();
        gameElements.dice = null;
    }
    
    // Détruire les decks de cartes
    if (gameElements.winDeck) {
        gameElements.winDeck.destroy();
        gameElements.winDeck = null;
    }
    
    if (gameElements.loseDeck) {
        gameElements.loseDeck.destroy();
        gameElements.loseDeck = null;
    }
    
    // Détruire les séparateurs
    gameElements.separateurs.forEach(sep => sep.graphic.destroy());
    gameElements.separateurs = [];
}

function update () {}

function checkOrientation() {
    if (window.innerWidth < window.innerHeight) {
        hideContent();
        printMessage();
    } else {
        showContent();
        removeMessage();
    }
}

function hideContent() {
    // Masquer tous les éléments créés
    gameElements.ressourcesCounters.forEach(counter => counter.setVisible(false));
    if (gameElements.glory) gameElements.glory.container.setVisible(false);
    gameElements.levelCounters.forEach(counter => counter.setVisible(false));
    gameElements.toggles.forEach(toggle => toggle.container.setVisible(false));
    if (gameElements.dice) gameElements.dice.container.setVisible(false);
    if (gameElements.winDeck) gameElements.winDeck.setVisible(false);
    if (gameElements.loseDeck) gameElements.loseDeck.setVisible(false);
    gameElements.separateurs.forEach(sep => sep.graphic.setVisible(false));
}

function showContent() {
    // Afficher tous les éléments créés
    gameElements.ressourcesCounters.forEach(counter => counter.setVisible(true));
    if (gameElements.glory) gameElements.glory.container.setVisible(true);
    gameElements.levelCounters.forEach(counter => counter.setVisible(true));
    gameElements.toggles.forEach(toggle => toggle.container.setVisible(true));
    if (gameElements.dice) gameElements.dice.container.setVisible(true);
    if (gameElements.winDeck) gameElements.winDeck.setVisible(true);
    if (gameElements.loseDeck) gameElements.loseDeck.setVisible(true);
    gameElements.separateurs.forEach(sep => sep.graphic.setVisible(true));
}

function printMessage() {
    // Afficher un message d'orientation
    const messageDiv = document.createElement('div');
    messageDiv.id = 'orientation-message';
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        text-align: center;
        z-index: 1000;
    `;
    messageDiv.textContent = 'Veuillez utiliser l\'application en mode paysage';
    document.body.appendChild(messageDiv);
}

function removeMessage() {
    // Supprimer le message d'orientation
    const messageDiv = document.getElementById('orientation-message');
    if (messageDiv) {
        messageDiv.remove();
    }
}