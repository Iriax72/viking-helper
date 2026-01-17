export class Dice {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.isRolling = false;
    this.currentValue = 1;
    
    // Conteneur pour le bouton
    this.container = scene.add.container(x, y);
    
    // Créer le bouton (apparence de dé)
    this.button = scene.add.graphics();
    this.drawButton();
    this.container.add(this.button);
    
    // Texte sur le bouton
    this.buttonText = scene.add.text(0, 0, '🎲', {
      fontSize: '32px',
      color: '#ffffff'
    });
    this.buttonText.setOrigin(0.5);
    this.container.add(this.buttonText);
    
    // Zone interactive
    this.hitArea = scene.add.rectangle(0, 0, 80, 80, 0x000000, 0);
    this.hitArea.setInteractive({ useHandCursor: true });
    this.container.add(this.hitArea);
    
    // Événements du bouton
    this.hitArea.on('pointerdown', () => this.roll());
    this.hitArea.on('pointerover', () => this.onHover());
    this.hitArea.on('pointerout', () => this.onOut());
  }
  
  drawButton(scale = 1) {
    this.button.clear();
    this.button.fillStyle(0x4a90e2);
    this.button.fillRoundedRect(-40 * scale, -40 * scale, 80 * scale, 80 * scale, 12);
    this.button.lineStyle(3, 0x2e5c8a);
    this.button.strokeRoundedRect(-40 * scale, -40 * scale, 80 * scale, 80 * scale, 12);
  }
  
  onHover() {
    if (!this.isRolling) {
      this.scene.tweens.add({
        targets: this.container,
        scale: 1.1,
        duration: 100,
        ease: 'Power2'
      });
    }
  }
  
  onOut() {
    if (!this.isRolling) {
      this.scene.tweens.add({
        targets: this.container,
        scale: 1,
        duration: 100,
        ease: 'Power2'
      });
    }
  }
  
  roll() {
    if (this.isRolling) return;
    
    this.isRolling = true;
    
    // Créer le dé d'animation au premier plan
    const diceSize = 100;
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;
    
    // Fond semi-transparent qui couvre tout l'écran
    this.overlay = this.scene.add.rectangle(
      centerX, centerY,
      this.scene.cameras.main.width * 2,
      this.scene.cameras.main.height * 2,
      0x000000, 0.5
    );
    this.overlay.setOrigin(0.5);
    this.overlay.setDepth(999);
    this.overlay.setScrollFactor(0);
    
    // Conteneur pour le dé en animation
    this.animDiceContainer = this.scene.add.container(centerX, centerY);
    this.animDiceContainer.setDepth(1000);
    this.animDiceContainer.setScrollFactor(0);
    
    // Le dé animé
    this.animDice = this.scene.add.graphics();
    this.animDiceContainer.add(this.animDice);
    
    // Points du dé
    this.diceDotsContainer = this.scene.add.container(0, 0);
    this.animDiceContainer.add(this.diceDotsContainer);
    
    // Animation de rotation et changement de faces
    let rotations = 0;
    const maxRotations = 15;
    
    const rotateTimer = this.scene.time.addEvent({
      delay: 80,
      callback: () => {
        rotations++;
        const randomFace = Phaser.Math.Between(1, 6);
        this.drawDice(this.animDice, this.diceDotsContainer, diceSize, randomFace);
        
        if (rotations >= maxRotations) {
          rotateTimer.remove();
          this.finishRoll(diceSize);
        }
      },
      loop: true
    });
    
    // Animation de rebond
    this.scene.tweens.add({
      targets: this.animDiceContainer,
      y: centerY - 50,
      duration: 400,
      ease: 'Quad.easeOut',
      yoyo: true,
      repeat: 3
    });
    
    this.scene.tweens.add({
      targets: this.animDiceContainer,
      angle: 360 * 3,
      duration: 1200,
      ease: 'Power2'
    });
  }
  
  drawDice(graphics, dotsContainer, size, value) {
    graphics.clear();
    graphics.fillStyle(0xffffff);
    graphics.fillRoundedRect(-size/2, -size/2, size, size, 15);
    graphics.lineStyle(4, 0x333333);
    graphics.strokeRoundedRect(-size/2, -size/2, size, size, 15);
    
    dotsContainer.removeAll(true);
    
    const dotPositions = this.getDotPositions(value, size);
    dotPositions.forEach(pos => {
      const dot = this.scene.add.circle(pos.x, pos.y, 8, 0x333333);
      dotsContainer.add(dot);
    });
  }
  
  getDotPositions(value, size) {
    const offset = size * 0.25;
    const positions = [];
    
    switch(value) {
      case 1:
        positions.push({ x: 0, y: 0 });
        break;
      case 2:
        positions.push({ x: -offset, y: -offset });
        positions.push({ x: offset, y: offset });
        break;
      case 3:
        positions.push({ x: -offset, y: -offset });
        positions.push({ x: 0, y: 0 });
        positions.push({ x: offset, y: offset });
        break;
      case 4:
        positions.push({ x: -offset, y: -offset });
        positions.push({ x: offset, y: -offset });
        positions.push({ x: -offset, y: offset });
        positions.push({ x: offset, y: offset });
        break;
      case 5:
        positions.push({ x: -offset, y: -offset });
        positions.push({ x: offset, y: -offset });
        positions.push({ x: 0, y: 0 });
        positions.push({ x: -offset, y: offset });
        positions.push({ x: offset, y: offset });
        break;
      case 6:
        positions.push({ x: -offset, y: -offset });
        positions.push({ x: offset, y: -offset });
        positions.push({ x: -offset, y: 0 });
        positions.push({ x: offset, y: 0 });
        positions.push({ x: -offset, y: offset });
        positions.push({ x: offset, y: offset });
        break;
    }
    
    return positions;
  }
  
  finishRoll(diceSize) {
    // Déterminer le résultat final
    this.currentValue = Phaser.Math.Between(1, 6);
    
    // Afficher le résultat final
    this.drawDice(this.animDice, this.diceDotsContainer, diceSize, this.currentValue);
    
    // Animation finale de mise à l'échelle
    this.scene.tweens.add({
      targets: this.animDiceContainer,
      scale: 1.3,
      duration: 200,
      ease: 'Back.easeOut',
      yoyo: true,
      onComplete: () => {
        // Rendre l'overlay cliquable pour fermer
        this.overlay.setInteractive();
        this.overlay.on('pointerdown', () => {
          this.closeAnimation();
        });
      }
    });
  }
  
  closeAnimation() {
    // Fondu de sortie
    this.scene.tweens.add({
      targets: [this.overlay, this.animDiceContainer],
      alpha: 0,
      duration: 300,
      onComplete: () => {
        this.overlay.destroy();
        this.animDiceContainer.destroy();
        this.isRolling = false;
      }
    });
  }
  
  getValue() {
    return this.currentValue;
  }
  
  destroy() {
    if (this.overlay) this.overlay.destroy();
    if (this.animDiceContainer) this.animDiceContainer.destroy();
    this.container.destroy();
  }
}