import {datas} from "./datas.js";

import {Jauge} from "./elements/Jauge.js";
import {Dice} from "./elements/Dice.js";
import {ToggleSquare} from "./elements/ToggleSquare.js";
import {CardDeck} from "./elements/CardDeck.js";
import {Counter} from "./elements/Counter.js";
import { LevelCounter } from "./elements/LevelCounter.js";
import { Separateur } from "./elements/Separateur.js";
import { Button } from "./elements/Button.js";

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
    buildings: [],
    toggles: [],
    dice: null,
    winDeck: null,
    loseDeck: null,
    techDeck: null,
    raidsButton: null,
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
    datas.ressources.forEach((ressource) => {
        ressourcesCounters.push(new Counter(
            this,
            {
                x: window.innerWidth - 90,
                y: 40 + datas.ressources.indexOf(ressource) * 80
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

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * datas.separateurX[0], y: 0}, window.innerHeight));

    // Batiments (zone 2)
    const levelCounters = [];
    const batimentsX = window.innerWidth * 0.20;
    const batimentsStartY = window.innerHeight / 2 - 160;
    const buildingsList = Object.values(datas.godsAndBuildings);
    buildingsList.forEach((bat) => {
        levelCounters.push(new Counter(
            this,
            {
                x: batimentsX,
                y: batimentsStartY + buildingsList.indexOf(bat) * 70
            },
            bat.toUpperCase(),
            (bat === "mairie" || bat === "port") ? 1 : 0,
            (bat === "mairie" || bat === "port") ? [1, 3] : [0, 3]
        ));
    });
    gameElements.buildings = levelCounters;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * datas.separateurX[1], y: 0}, window.innerHeight));

    // Gods (zone 3)
    const toggles = [];
    const godsX = window.innerWidth * 0.40;
    const godsStartY = window.innerHeight / 2 - 160;
    const godsList = Object.keys(datas.godsAndBuildings);
    godsList.forEach((god) => {
        toggles.push(new ToggleSquare(
            this,
            {
                x: godsX,
                y: godsStartY + godsList.indexOf(god) * 70
            },
            god[0].toUpperCase() + god.slice(1),
            {
                size: 50,
                initialState: false
            }
        ));
    });
    gameElements.toggles = toggles;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * datas.separateurX[2], y: 0}, window.innerHeight, 0x00ff00));

    // Combat (zone 4)
    const combatX = window.innerWidth * 0.57;
    const combatStartY = window.innerHeight / 2 - 120;
    
    const dice = new Dice(this, combatX, combatStartY);
    gameElements.dice = dice;

    const winDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 120},
        "carte victoire",
        datas.winCards,
        true
    );
    gameElements.winDeck = winDeck;

    const loseDeck = new CardDeck(
        this,
        {x: combatX, y: combatStartY + 253},
        "carte défaite",
        datas.loseCards,
        true
    );
    gameElements.loseDeck = loseDeck;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * datas.separateurX[3], y: 0}, window.innerHeight));

    // raid n technologies (zone 5)
    const raidntechX = window.innerWidth * 0.70;
    const techDeck = new CardDeck(
        this,
        {x: raidntechX, y: window.innerHeight * 0.7},
        "technologies",
        datas.technologies,
        false
    );
    gameElements.techDeck = techDeck;

    // Bouton 'raids'
    const raidsButton = new Button(
        'raids',
        {x: raidntechX - 40, y: window.innerHeight * 0.3},
        () => {},
        datas.raidsButtonStyle
    );
    gameElements.raidsButton = raidsButton;

    separateurs.push(new Separateur(this, 'vertical', {x: window.innerWidth * datas.separateurX[4], y: 0}, window.innerHeight));
    gameElements.separateurs = separateurs;
}

function update() {
    let godsAndBuildings = Object.entries(datas.godsAndBuildings);
    let godsAndBuildingsMap = {};

    // Récupérer l'état des dieux
    godsAndBuildings.forEach(([god, building]) => {
        godsAndBuildingsMap[god] = gameElements.toggles.find(toggle => toggle.label === god);
    });

    // Récuperer les batiments
    godsAndBuildings.forEach(([god, building]) => {
        godsAndBuildingsMap[building] = gameElements.buildings.find(buildingCounter => buildingCounter.label === building);
    });

    // automatiquement activer le nv4 si le dieu est débeloqué
    godsAndBuildings.forEach(([god, building]) => {
        if (godsAndBuildingsMap[god] && godsAndBuildingsMap[god].getState()) {
            if (godsAndBuildingsMap[building] && typeof godsAndBuildingsMap[building].setBorneMax === 'function') {
                godsAndBuildingsMap[building].setBorneMax(4);
            }
        }
    });
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
    gameElements.buildings.forEach(counter => counter.destroy());
    gameElements.buildings = [];
    
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

    if (gameElements.techDeck) {
        gameElements.techDeck.destroy();
        gameElements.techDeck = null;
    }
    // Détruire le bouton 'raids' s'il existe
    if (gameElements.raidsButton) {
        gameElements.raidsButton.remove();
        gameElements.raidsButton = null;
    }
    // Détruire les séparateurs
    gameElements.separateurs.forEach(sep => sep.graphic.destroy());
    gameElements.separateurs = [];
}

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
    gameElements.buildings.forEach(counter => counter.setVisible(false));
    gameElements.toggles.forEach(toggle => toggle.container.setVisible(false));
    if (gameElements.dice) gameElements.dice.container.setVisible(false);
    if (gameElements.winDeck) gameElements.winDeck.setVisible(false);
    if (gameElements.loseDeck) gameElements.loseDeck.setVisible(false);
    if (gameElements.techDeck) gameElements.techDeck.setVisible(false);
    if (gameElements.raidsButton) gameElements.raidsButton.style.display = 'none';
    gameElements.separateurs.forEach(sep => sep.graphic.setVisible(false));
}

function showContent() {
    // Afficher tous les éléments créés
    gameElements.ressourcesCounters.forEach(counter => counter.setVisible(true));
    if (gameElements.glory) gameElements.glory.container.setVisible(true);
    gameElements.buildings.forEach(counter => counter.setVisible(true));
    gameElements.toggles.forEach(toggle => toggle.container.setVisible(true));
    if (gameElements.dice) gameElements.dice.container.setVisible(true);
    if (gameElements.winDeck) gameElements.winDeck.setVisible(true);
    if (gameElements.loseDeck) gameElements.loseDeck.setVisible(true);
    if (gameElements.techDeck) gameElements.techDeck.setVisible(true);
    if (gameElements.raidsButton) gameElements.raidsButton.style.display = 'block';
    gameElements.separateurs.forEach(sep => sep.graphic.setVisible(true));
}

function printMessage() {
    // Afficher un message d'orientation
    const messageDiv = document.createElement('div');
    messageDiv.id = 'orientation-message';
    messageDiv.style.cssText = datas.messageStyle;
    messageDiv.textContent = "Veuillez utiliser l'application en mode paysage";
    document.body.appendChild(messageDiv);
}

function removeMessage() {
    // Supprimer le message d'orientation
    const messageDiv = document.getElementById('orientation-message');
    if (messageDiv) {
        messageDiv.remove();
    }
}