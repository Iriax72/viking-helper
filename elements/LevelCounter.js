export class LevelCounter extends Phaser.GameObjects.Container {
    constructor(scene, coos, spritesheetKey, initialValue) {
        super(scene, coos.x, coos.y);
        
        this.scene = scene;
        this.spritesheetKey = spritesheetKey;
        
        // Calculer automatiquement les bornes en fonction du nombre de frames
        const texture = this.scene.textures.get(spritesheetKey);
        const frameCount = texture.frameTotal;
        
        // Les frames vont de 0 à frameCount - 1
        this.borneMin = 0;
        this.borneMax = frameCount - 1;
        
        this.value = initialValue;
        
        // Vérifier que la valeur initiale respecte les bornes
        this.validateValue();
        
        // Créer l'interface
        this.createUI();
        
        // Ajouter au scene
        scene.add.existing(this);
    }
    
    createUI() {
        // Valeur en haut
        this.valueText = this.scene.add.text(0, -60, this.value.toString(), {
            fontSize: '28px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Bouton moins (-)
        this.minusButton = this.scene.add.text(-70, 0, '-', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#e74c3c',
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5);
        this.minusButton.setInteractive({ useHandCursor: true });
        
        // Sprite au centre (utilise un spritesheet)
        this.centerSprite = this.scene.add.sprite(0, 0, this.spritesheetKey);
        // Définir la frame en fonction de la valeur
        this.centerSprite.setFrame(this.value);
        // Ajuster la taille pour qu'elle soit carrée (par exemple 60x60)
        this.centerSprite.setDisplaySize(60, 60);
        
        // Bouton plus (+)
        this.plusButton = this.scene.add.text(70, 0, '+', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#27ae60',
            padding: { x: 12, y: 5 }
        }).setOrigin(0.5);
        this.plusButton.setInteractive({ useHandCursor: true });
        
        // Ajouter tous les éléments au container
        this.add([this.valueText, this.minusButton, this.centerSprite, this.plusButton]);
        
        // Événements de clic
        this.minusButton.on('pointerdown', () => this.decrement());
        this.plusButton.on('pointerdown', () => this.increment());
        
        // Effets de survol
        this.minusButton.on('pointerover', () => {
            this.scene.tweens.add({
                targets: this.minusButton,
                scale: 1.1,
                duration: 100
            });
        });
        
        this.minusButton.on('pointerout', () => {
            this.scene.tweens.add({
                targets: this.minusButton,
                scale: 1,
                duration: 100
            });
        });
        
        this.plusButton.on('pointerover', () => {
            this.scene.tweens.add({
                targets: this.plusButton,
                scale: 1.1,
                duration: 100
            });
        });
        
        this.plusButton.on('pointerout', () => {
            this.scene.tweens.add({
                targets: this.plusButton,
                scale: 1,
                duration: 100
            });
        });
        
        // Mettre à jour l'état des boutons
        this.updateButtons();
    }
    
    increment() {
        if (this.value >= this.borneMax) {
            return; // Ne pas dépasser la borne max
        }
        
        this.value++;
        this.updateDisplay();
    }
    
    decrement() {
        if (this.value <= this.borneMin) {
            return; // Ne pas descendre sous la borne min
        }
        
        this.value--;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.valueText.setText(this.value.toString());
        
        // Changer la frame du sprite en fonction de la valeur
        this.centerSprite.setFrame(this.value);
        
        this.updateButtons();
        
        // Animation de changement de valeur
        this.scene.tweens.add({
            targets: this.valueText,
            scale: 1.2,
            duration: 100,
            yoyo: true
        });
        
        // Animation du sprite
        this.scene.tweens.add({
            targets: this.centerSprite,
            scale: 1.15,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                // Réinitialiser l'échelle au cas où setDisplaySize a été modifié
                this.centerSprite.setDisplaySize(60, 60);
            }
        });
    }
    
    updateButtons() {
        // Désactiver visuellement les boutons si aux limites
        if (this.value <= this.borneMin) {
            this.minusButton.setAlpha(0.5);
        } else {
            this.minusButton.setAlpha(1);
        }
        
        if (this.value >= this.borneMax) {
            this.plusButton.setAlpha(0.5);
        } else {
            this.plusButton.setAlpha(1);
        }
    }
    
    validateValue() {
        // Ajuster la valeur si elle dépasse les bornes
        if (this.value < this.borneMin) {
            this.value = this.borneMin;
        }
        if (this.value > this.borneMax) {
            this.value = this.borneMax;
        }
    }
    
    getValue() {
        return this.value;
    }
    
    setBorneMin(min) {
        this.borneMin = min;
        this.validateValue();
        this.updateDisplay();
    }
    
    setBorneMax(max) {
        this.borneMax = max;
        this.validateValue();
        this.updateDisplay();
    }
}

// Exemple d'utilisation :
/*
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    preload() {
        // Charger le spritesheet
        // Si le spritesheet a 5 frames (0, 1, 2, 3, 4), les bornes seront automatiquement [0, 4]
        this.load.spritesheet('levels', 'assets/levels.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }
    
    create() {
        // LevelCounter avec bornes automatiques
        // Si le spritesheet a 10 frames (0 à 9), la valeur sera limitée entre 0 et 9
        this.levelCounter = new LevelCounter(
            this,
            { x: 200, y: 150 },
            'levels',         // Clé du spritesheet
            0                 // Valeur initiale (frame 0)
        );
        
        // Les bornes sont automatiquement calculées !
        console.log('Niveau:', this.levelCounter.getValue());
        console.log('Min:', this.levelCounter.borneMin); // 0
        console.log('Max:', this.levelCounter.borneMax); // frameCount - 1
    }
}
*/