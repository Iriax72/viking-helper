export class CardDeck extends Phaser.GameObjects.Container {
    constructor(scene, coos, name, deck, onCardChosen) {
        super(scene, coos.x, coos.y);
        
        this.scene = scene;
        this.deckName = name; // Nom personnalisable du deck
        this.deck = [...deck]; // Copie du deck initial
        this.defausse = []; // Pile de défausse
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
        
        // Texte personnalisable
        this.deckText = this.scene.add.text(0, 0, this.deckName, {
            fontSize: '16px',
            color: '#ecf0f1',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 90 }
        }).setOrigin(0.5);
        
        this.add([this.deckBackground, this.deckText]);
        
        // Événement de clic sur le paquet
        this.deckBackground.on('pointerdown', () => this.drawCards());
    }
    
    drawCards() {
        if (this.isDrawing) return;
        
        // Vérifier si le deck est vide et mélanger si nécessaire
        if (this.deck.length === 0) {
            this.deck = [...this.defausse];
            this.defausse = [];
        }
        
        // Vérifier qu'il y a assez de cartes
        if (this.deck.length < 2) {
            console.warn('Pas assez de cartes dans le deck');
            return;
        }
        
        this.isDrawing = true;
        
        // Piocher deux cartes aléatoires
        const card1Label = this.drawRandomCard();
        const card2Label = this.drawRandomCard();
        
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
        
        this.card1 = this.createCard(centerX - 120, centerY, card1Label, 0xe74c3c);
        this.card2 = this.createCard(centerX + 120, centerY, card2Label, 0x3498db);
        
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
    
    drawRandomCard() {
        // Choisir un index aléatoire
        const randomIndex = Phaser.Math.Between(0, this.deck.length - 1);
        
        // Retirer la carte du deck
        const card = this.deck.splice(randomIndex, 1)[0];
        
        return card;
    }
    
    createCard(x, y, label, color) {
        const card = this.scene.add.container(x, y);
        card.setDepth(101);
        
        // Fond de la carte
        const bg = this.scene.add.rectangle(0, 0, 150, 200, color);
        bg.setStrokeStyle(4, 0xffffff);
        
        // Texte de la carte
        const text = this.scene.add.text(0, 0, label, {
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 130 }
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
        
        // Ajouter la carte choisie à la défausse
        this.defausse.push(chosenCard);
        
        // Ajouter l'autre carte à la défausse aussi
        const otherCard = selectedCard === this.card1 ? 
            this.card2.getData('label') : 
            this.card1.getData('label');
        this.defausse.push(otherCard);
        
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