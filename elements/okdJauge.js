export class Jauge {
    constructor(scene, coos, bornes) {
        this.scene = scene;
        this.x = coos.x;
        this.y = coos.y;
        this.min = bornes.min;
        this.max = bornes.max;
        this.value = bornes.min;
    
        // Dimensions de la jauge
        this.width = 300;
        this.height = 20;
        this.cursorRadius = 12;
    
        // Conteneur pour tous les éléments graphiques
        this.container = scene.add.container(this.x, this.y);
    
        // Fond de la jauge
        this.background = scene.add.rectangle(
            0, 0, 
            this.width, this.height, 
            0x333333
        );
        this.container.add(this.background);
    
        // Barre de remplissage
        this.fill = scene.add.rectangle(
            -this.width / 2, 0,
            0, this.height - 4,
            0x00ff00
        );
        this.fill.setOrigin(0, 0.5);
        this.container.add(this.fill);
    
        // Curseur déplaçable
        this.cursor = scene.add.circle(
            -this.width / 2, 0,
            this.cursorRadius,
            0xffffff
        );
        this.cursor.setStrokeStyle(2, 0x000000);
        this.cursor.setInteractive({ draggable: true });
        this.container.add(this.cursor);
    
        // Texte affichant la valeur
        this.valueText = scene.add.text(
            0, -30,
            this.value.toFixed(2),
            { fontSize: '16px', color: '#ffffff' }
        );
        this.valueText.setOrigin(0.5);
        this.container.add(this.valueText);
    
       // Gestion du drag
       this.cursor.on('drag', (pointer, dragX) => {
            this.updateCursorPosition(dragX);
        });
    
        // Initialisation
        this.updateVisuals();
    }
  
    updateCursorPosition(dragX) {
        // Limiter le déplacement du curseur dans les bornes de la jauge
        const minX = -this.width / 2;
        const maxX = this.width / 2;
        const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);
    
        this.cursor.x = clampedX;
    
        // Calculer la valeur correspondante
        const ratio = (clampedX - minX) / this.width;
        this.value = this.min + ratio * (this.max - this.min);
    
        this.updateVisuals();
    }
  
    updateVisuals() {
        // Mettre à jour la barre de remplissage
        const ratio = (this.value - this.min) / (this.max - this.min);
        this.fill.width = this.width * ratio;
    
        // Mettre à jour le texte
        this.valueText.setText(this.value.toFixed(2));
    }
  
    setValue(newValue) {
        this.value = Phaser.Math.Clamp(newValue, this.min, this.max);
    
        // Mettre à jour la position du curseur
        const ratio = (this.value - this.min) / (this.max - this.min);
        this.cursor.x = -this.width / 2 + this.width * ratio;
    
        this.updateVisuals();
    }
  
    getValue() {
        return this.value;
    }
  
    destroy() {
        this.container.destroy();
    }
}