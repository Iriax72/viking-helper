export class CardDeck extends Phaser.GameObjects.Container {
    constructor(scene, coos, name, cards, onCardChosen) {
        super(scene, coos.x, coos.y);
        
        this.scene = scene;
        this.name = name;
        this.deck = cards;
        this.defausse = [];
        this.onCardChosen = onCardChosen; // Callback pour savoir quelle carte a été choisie
        this.isDrawing = false;
        
        // Créer le paquet de cartes
        this.createDeck();
        
        // Ajouter au scene
        scene.add.existing(this);
    }
    
    createDeck() {
        // Fond du paquet
        this.deckBackground = this.scene.add.rectangle(0, 0, 100, 140, 0x2c3e50);
        this.deckBackground.setStrokeStyle(3, 0xecf0f1);
        this.deckBackground.setInteractive({ useHandCursor: true });
        
        // Texte indicatif
        this.deckText = this.scene.add.text(0, 0, this.name, {
            fontSize: '16px',
            color: '#ecf0f1',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.add([this.deckBackground, this.deckText]);
        
        // Événement de clic sur le paquet
        this.deckBackground.on('pointerdown', () => this.drawCards());
    }
    
    drawCards() {
        if (this.isDrawing) return;
        this.isDrawing = true;
        
        // Créer l'overlay d'assombrissement
        this.overlay = this.scene.add.rectangle(
            this.scene.cameras.main.width / 2,
            this.scene.cameras.main.height / 2,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000,
            0.7
        );
        this.overlay.setDepth(100);
        this.overlay.setOrigin(0.5);
        
        // Créer deux cartes
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;

        const rdmCard1 = this.deck[Math.floor(Math.random() * this.deck.length)];
        this.deck.
        
        this.card1 = this.createCard(centerX - 120, centerY, rdmCard1, 0xe74c3c);
        this.card2 = this.createCard(centerX + 120, centerY, rdmCard2, 0x3498db);
        
        // Animation d'apparition
        this.card1.setScale(0);
        this.card2.setScale(0);
        
        this.scene.tweens.add({
            targets: this.card1,
            scale: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
        
        this.scene.tweens.add({
            targets: this.card2,
            scale: 1,
            duration: 300,
            ease: 'Back.easeOut',
            delay: 100
        });
    }
    
    createCard(x, y, label, color) {
        const card = this.scene.add.container(x, y);
        card.setDepth(101);
        
        // Fond de la carte
        const bg = this.scene.add.rectangle(0, 0, 150, 200, color);
        bg.setStrokeStyle(4, 0xffffff);
        
        // Texte de la carte
        const text = this.scene.add.text(0, 0, label, {
            fontSize: '20px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        card.add([bg, text]);
        card.setInteractive(
            new Phaser.Geom.Rectangle(-75, -100, 150, 200),
            Phaser.Geom.Rectangle.Contains
        );
        card.setData('label', label);
        
        // Effet de survol
        card.on('pointerover', () => {
            this.scene.tweens.add({
                targets: card,
                scale: 1.1,
                duration: 200
            });
        });
        
        card.on('pointerout', () => {
            this.scene.tweens.add({
                targets: card,
                scale: 1,
                duration: 200
            });
        });
        
        // Événement de clic sur la carte
        card.on('pointerdown', () => {
            this.selectCard(card);
        });
        
        return card;
    }
    
    selectCard(selectedCard) {
        const chosenCard = selectedCard.getData('label');
        
        // Appeler le callback avec la carte choisie
        if (this.onCardChosen) {
            this.onCardChosen(chosenCard);
        }
        
        // Animation de disparition
        this.scene.tweens.add({
            targets: [this.card1, this.card2],
            scale: 0,
            alpha: 0,
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.card1.destroy();
                this.card2.destroy();
                this.card1 = null;
                this.card2 = null;
            }
        });
        
        this.scene.tweens.add({
            targets: this.overlay,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.overlay.destroy();
                this.overlay = null;
                this.isDrawing = false;
            }
        });
    }
}