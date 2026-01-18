export class Jauge {
  constructor(scene, coos, bornes, params={}) { // params can contain color, isVertical and length
    this.scene = scene;
    this.x = coos.x;
    this.y = coos.y;
    this.min = bornes.min;
    this.max = bornes.max;
    this.value = Math.round(bornes.min);
    this.color = params.color ?? 0x333333;
    this.isVertical = params.isVertical ?? false;
    
    // Dimensions de la jauge
    this.length = params.length ?? 300;
    this.thickness = 20;
    this.cursorRadius = 12;
    this.borderRadius = 10;
    
    // Conteneur pour tous les éléments graphiques
    this.container = scene.add.container(this.x, this.y);
    
    // Fond de la jauge (rectangle arrondi)
    this.background = scene.add.graphics();
    this.background.fillStyle(this.color);
    if (this.isVertical) {
      this.background.fillRoundedRect(
        -this.thickness / 2, -this.length / 2,
        this.thickness, this.length,
        this.borderRadius
      );
    } else {
      this.background.fillRoundedRect(
        -this.length / 2, -this.thickness / 2,
        this.length, this.thickness,
        this.borderRadius
      );
    }
    this.container.add(this.background);
    
    // Barre de remplissage
    this.fill = scene.add.graphics();
    this.container.add(this.fill);
    
    // Curseur déplaçable
    this.cursor = scene.add.circle(
      this.isVertical ? 0 : -this.length / 2,
      this.isVertical ? this.length / 2 : 0,
      this.cursorRadius,
      0xffffff
    );
    this.cursor.setStrokeStyle(2, 0x000000);
    this.cursor.setInteractive({ draggable: true });
    this.container.add(this.cursor);
    
    // Texte affichant la valeur
    const textOffset = this.isVertical ? 40 : -30;
    this.valueText = scene.add.text(
      this.isVertical ? textOffset : 0,
      this.isVertical ? 0 : textOffset,
      this.value.toString(),
      { fontSize: '16px', color: '#ffffff' }
    );
    this.valueText.setOrigin(0.5);
    this.container.add(this.valueText);
    
    // Gestion du drag
    this.cursor.on('drag', (pointer, dragX, dragY) => {
      if (this.isVertical) {
        this.updateCursorPosition(dragY);
      } else {
        this.updateCursorPosition(dragX);
      }
    });
    
    // Initialisation
    this.updateVisuals();
  }
  
  updateCursorPosition(dragPos) {
    // Limiter le déplacement du curseur dans les bornes de la jauge
    const minPos = this.isVertical ? -this.length / 2 : -this.length / 2;
    const maxPos = this.isVertical ? this.length / 2 : this.length / 2;
    const clampedPos = Phaser.Math.Clamp(dragPos, minPos, maxPos);
    
    // Calculer la valeur correspondante
    let ratio;
    if (this.isVertical) {
      // Inverser le ratio pour la jauge verticale (haut = max, bas = min)
      ratio = (maxPos - clampedPos) / this.length;
    } else {
      ratio = (clampedPos - minPos) / this.length;
    }
    
    // Calculer la valeur et l'arrondir à l'entier le plus proche
    const rawValue = this.min + ratio * (this.max - this.min);
    this.value = Math.round(rawValue);
    
    // Recalculer la position exacte du curseur pour correspondre à la valeur entière
    const exactRatio = (this.value - this.min) / (this.max - this.min);
    if (this.isVertical) {
      this.cursor.y = maxPos - exactRatio * this.length;
    } else {
      this.cursor.x = minPos + exactRatio * this.length;
    }
    
    this.updateVisuals();
  }
  
  updateVisuals() {
    // Effacer et redessiner la barre de remplissage
    this.fill.clear();
    this.fill.fillStyle(0x00ff00);
    
    const ratio = (this.value - this.min) / (this.max - this.min);
    
    if (this.isVertical) {
      const fillHeight = this.length * ratio;
      this.fill.fillRoundedRect(
        -this.thickness / 2 + 2, this.length / 2 - fillHeight,
        this.thickness - 4, fillHeight,
        this.borderRadius - 2
      );
    } else {
      const fillWidth = this.length * ratio;
      this.fill.fillRoundedRect(
        -this.length / 2 + 2, -this.thickness / 2 + 2,
        fillWidth, this.thickness - 4,
        this.borderRadius - 2
      );
    }
    
    // Mettre à jour le texte
    this.valueText.setText(this.value.toString());
  }
  
  setValue(newValue) {
    this.value = Math.round(Phaser.Math.Clamp(newValue, this.min, this.max));
    
    // Mettre à jour la position du curseur
    const ratio = (this.value - this.min) / (this.max - this.min);
    if (this.isVertical) {
      this.cursor.y = this.length / 2 - ratio * this.length;
    } else {
      this.cursor.x = -this.length / 2 + ratio * this.length;
    }
    
    this.updateVisuals();
  }
  
  getValue() {
    return this.value;
  }
  
  destroy() {
    this.container.destroy();
  }
}