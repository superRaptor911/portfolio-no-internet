import { getPlayer, killPlayer } from ".";
import { randInt } from "../utils";
import { Entity } from "./entity";

const SPEED = 200;

const COLORS = ["black", "pink", "blue"];

export class Enemy extends Entity {
  speed = SPEED;
  constructor(x: number, y: number, size = 30, speedx = 1) {
    const c = randInt() % COLORS.length;
    super(x, y, COLORS[c], size, size);
    this.speed = SPEED * speedx;
    this.body.style.borderRadius = "999px";
  }

  takeDamage() {
    this.height -= 10;
    this.width -= 10;

    this.body.style.width = `${this.width}px`;
    this.body.style.height = `${this.height}px`;

    if (this.height < 30) {
      this.remove();
    }
  }

  process(delta: number) {
    const player = getPlayer();

    if (!player) return;

    const xdiff = player.x - this.x;
    const ydiff = player.y - this.y;

    const len = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    const vx = xdiff / len;
    const vy = ydiff / len;

    const posx = this.x + this.speed * delta * vx;
    const posy = this.y + this.speed * delta * vy;

    this.setPos(posx, posy);

    if (len < 10) {
      killPlayer();
    }
  }
}
