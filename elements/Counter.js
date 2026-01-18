export class Counter extends Phaser.GameObjects.Container {
    constructor(scene, coos, label, initialValue, bornes = []) {
        super(scene, coos.x, coos.y);
        
        this.scene = scene;
        this.label = label;
        this.value = initialValue;
        
        // Définir les bornes
        this.borneMin = bornes.length > 0 ? bornes[0] : null;
        this.borneMax = bornes.length > 1 ? bornes[1] : null;
        
        // Vérifier que la valeur initiale respecte les bornes
        this.validateValue();
        
        // Créer l'interface
        this.createUI();
        
        // Ajouter au scene
        scene.add.existing(this);
    }
    
    createUI() {
        // Label au-dessus
        this.labelText = this.scene.add.text(0, -40, this.label, {
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Bouton moins (-)
        this.minusButton = this.scene.add.text(-60, 0, '-', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#e74c3c',
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5);
        this.minusButton.setInteractive({ useHandCursor: true });
        
        // Valeur au centre
        this.valueText = this.scene.add.text(0, 0, this.value.toString(), {
            fontSize: '28px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Bouton plus (+)
        this.plusButton = this.scene.add.text(60, 0, '+', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#27ae60',
            padding: { x: 12, y: 5 }
        }).setOrigin(0.5);
        this.plusButton.setInteractive({ useHandCursor: true });
        
        // Ajouter tous les éléments au container
        this.add([this.labelText, this.minusButton, this.valueText, this.plusButton]);
        
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
        if (this.borneMax !== null && this.value >= this.borneMax) {
            return; // Ne pas dépasser la borne max
        }
        
        this.value++;
        this.updateDisplay();
    }
    
    decrement() {
        if (this.borneMin !== null && this.value <= this.borneMin) {
            return; // Ne pas descendre sous la borne min
        }
        
        this.value--;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.valueText.setText(this.value.toString());
        this.updateButtons();
        
        // Animation de changement de valeur
        this.scene.tweens.add({
            targets: this.valueText,
            scale: 1.2,
            duration: 100,
            yoyo: true
        });
    }
    
    updateButtons() {
        // Désactiver visuellement les boutons si aux limites
        if (this.borneMin !== null && this.value <= this.borneMin) {
            this.minusButton.setAlpha(0.5);
        } else {
            this.minusButton.setAlpha(1);
        }
        
        if (this.borneMax !== null && this.value >= this.borneMax) {
            this.plusButton.setAlpha(0.5);
        } else {
            this.plusButton.setAlpha(1);
        }
    }
    
    validateValue() {
        // Ajuster la valeur si elle dépasse les bornes
        if (this.borneMin !== null && this.value < this.borneMin) {
            this.value = this.borneMin;
        }
        if (this.borneMax !== null && this.value > this.borneMax) {
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