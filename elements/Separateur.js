export class Separateur {
    constructor(scene, orientation, coos, length=null, color=0xffffff) {
        this.scene = scene;
        this.orientation = orientation;
        this.coos = {x: coos.x ?? 0, y: coos.y ?? 0};
        this.length = length;
        this.color = color;

        // Graphique pour le séparateur
        this.graphic = scene.add.graphics();

        // Dessiner le separateur
        this.draw();

        //Ajouter le graphique à la scene
        this.scene.add.existing(this.graphic);
    }

    draw() {
        this.graphic.clear();
        this.graphic.lineStyle(2, this.color, 1);

        if (this.orientation === 'horizontal') {
            const length = this.length ?? window.innerWidth; // Grande valeur pour etre sur
            this.graphic.moveTo(this.coos.x, this.coos.y);
            this.graphic.lineTo(this.coos.x + length, this.coos.y);
            this.graphic.strokePath();
        } else if (this.orientation === 'vertical') {
            const length = this.length ?? window.innerHeight;
            this.graphic.moveTo(this.coos.x, this.coos.y);
            this.graphic.lineTo(this.coos.x, this.coos.y + length);
            this.graphic.strokePath();
        } else {
            console.error("Orientation invalide pour le séparateur, utilisez 'horizontal' ou 'vertical'.");
        }
    }
}