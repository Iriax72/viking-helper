export class Button{
    constructor (label, coos, callback=()=>{}, style={}) {
        this.element = document.createElement('button');
        this.element.id = label + "-btn";
        this.element.textContent = label;
        // Apply provided style properties to the element's style
        const defaultStyle = { position: 'absolute' };
        const finalStyle = Object.assign({}, defaultStyle, style || {});
        Object.entries(finalStyle).forEach(([k, v]) => {
            try {
                this.element.style[k] = v;
            } catch (e) {
                // ignore invalid style keys
            }
        });

        // Ensure left/top use pixel units when numbers are provided
        this.element.style.left = (typeof coos.x === 'number') ? `${coos.x}px` : coos.x;
        this.element.style.top = (typeof coos.y === 'number') ? `${coos.y}px` : coos.y;
        document.body.appendChild(this.element);
        this.element.addEventListener('click', callback);
        
        this.style = this.element.style;
    }

    remove() {
        this.element.remove();
    }
}