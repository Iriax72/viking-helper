export class ToggleSquare {
  constructor(scene, coos, label, params = {}) {
    this.scene = scene;
    this.x = coos.x;
    this.y = coos.y;
    this.label = label;
    this.size = params.size || 60;
    this.state = params.initialState || false;
    
    // Conteneur pour tous les éléments
    this.container = scene.add.container(this.x, this.y);
    
    // Texte du label (à gauche)
    this.labelText = scene.add.text(0, 0, this.label, {
      fontSize: '18px',
      color: '#ffffff'
    });
    this.labelText.setOrigin(1, 0.5);
    this.container.add(this.labelText);
    
    // Calculer la position du carré (à droite du label avec un espacement)
    const spacing = 2;
    this.squareOffsetX = this.labelText.width + spacing + this.size / 2;
    
    // Graphique pour le carré
    this.square = scene.add.graphics();
    this.square.x = this.squareOffsetX;
    this.container.add(this.square);
    
    // Graphique pour le symbole (✓ ou ✗)
    this.symbol = scene.add.graphics();
    this.symbol.x = this.squareOffsetX;
    this.container.add(this.symbol);
    
    // Zone interactive (seulement sur le carré)
    this.hitArea = scene.add.rectangle(
      this.squareOffsetX, 0, 
      this.size, this.size, 
      0x000000, 0
    );
    this.hitArea.setInteractive({ useHandCursor: true });
    this.container.add(this.hitArea);
    
    // Événements
    this.hitArea.on('pointerdown', () => this.toggle());
    this.hitArea.on('pointerover', () => this.onHover());
    this.hitArea.on('pointerout', () => this.onOut());
    
    // Dessiner l'état initial
    this.draw();
  }
  
  draw() {
    // Effacer les graphiques précédents
    this.square.clear();
    this.symbol.clear();
    
    const halfSize = this.size / 2;
    const borderRadius = 8;
    
    // Dessiner le carré avec la couleur appropriée
    if (this.state) {
      // État true: vert
      this.square.fillStyle(0x4caf50);
    } else {
      // État false: rouge
      this.square.fillStyle(0xf44336);
    }
    
    this.square.fillRoundedRect(
      -halfSize, -halfSize,
      this.size, this.size,
      borderRadius
    );
    
    // Dessiner le symbole
    this.symbol.lineStyle(4, 0xffffff, 1);
    
    if (this.state) {
      // Dessiner un ✓ (checkmark)
      this.drawCheckmark();
    } else {
      // Dessiner un ✗ (croix)
      this.drawCross();
    }
  }
  
  drawCheckmark() {
    const offset = this.size * 0.25;
    
    // Tracer le symbole ✓
    this.symbol.beginPath();
    this.symbol.moveTo(-offset * 0.5, 0);
    this.symbol.lineTo(-offset * 0.2, offset * 0.8);
    this.symbol.lineTo(offset * 0.9, -offset * 0.6);
    this.symbol.strokePath();
  }
  
  drawCross() {
    const offset = this.size * 0.3;
    
    // Tracer la croix ✗
    this.symbol.beginPath();
    this.symbol.moveTo(-offset, -offset);
    this.symbol.lineTo(offset, offset);
    this.symbol.strokePath();
    
    this.symbol.beginPath();
    this.symbol.moveTo(offset, -offset);
    this.symbol.lineTo(-offset, offset);
    this.symbol.strokePath();
  }
  
  toggle() {
    this.state = !this.state;
    this.draw();
    
    // Animation de feedback (seulement sur le carré)
    this.scene.tweens.add({
      targets: [this.square, this.symbol],
      scaleX: 0.9,
      scaleY: 0.9,
      duration: 100,
      yoyo: true,
      ease: 'Power2'
    });
  }
  
  setState(newState) {
    this.state = newState;
    this.draw();
  }
  
  getState() {
    return this.state;
  }
  
  onHover() {
    this.scene.tweens.add({
      targets: [this.square, this.symbol],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 100,
      ease: 'Power2'
    });
  }
  
  onOut() {
    this.scene.tweens.add({
      targets: [this.square, this.symbol],
      scaleX: 1,
      scaleY: 1,
      duration: 100,
      ease: 'Power2'
    });
  }
  
  destroy() {
    this.container.destroy();
  }
}