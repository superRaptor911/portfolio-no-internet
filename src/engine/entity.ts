export class Entity {
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;

    body: HTMLElement;
    alive = true;

    constructor(x: number, y: number, color = "red", width = 10, height = 10) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        const div = document.createElement("div")
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.position = "absolute";
        div.style.backgroundColor = this.color;
        this.body = div;

        this.setPos(this.x, this.y);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const screen = document.getElementById("screen")!;
        screen.appendChild(this.body)
    }

    setPos(x: number, y: number) {
        this.body.style.top = `${y}px`;
        this.body.style.left = `${x}px`;
        this.x = x;
        this.y = y;
    }

    remove() {
        this.body.remove();
        this.alive = false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process(_delta: number) {
        // none
    }

}
