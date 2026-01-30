export class Button{
    constructor (label, coos, callback=()=>{}, style={}) {
        this.element = document.createElement('button');
        this.element.id = label + "-btn";
        this.element.textContent = label;
        this.element.style = style;
        this.element.style.left = coos.x;
        this.element.style.top = coos.y;
        document.body.appendChild(this.element);
        this.element.addEventListener('click', callback);
    }

    remove() {
        this.element.remove();
    }
}