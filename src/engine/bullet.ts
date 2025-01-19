import { getAllEntities } from ".";
import { Enemy } from "./enemy";
import { Entity } from "./entity";

const SPEED = 500;

export class Bullet extends Entity {
  vx = 0;
  vy = 0;

  constructor(x: number, y: number, vx: number, vy: number) {
    super(x, y, "white", 8, 8);

    this.vx = vx;
    this.vy = vy;
  }

  process(delta: number) {
    const posx = this.x + SPEED * delta * this.vx;
    const posy = this.y + SPEED * delta * this.vy;

    this.setPos(posx, posy);

    const enimies = getAllEntities().filter((e) => e instanceof Enemy);

    for (const e of enimies) {
        const cx = e.x + e.width / 2;
        const cy = e.y + e.height / 2;
      const xdiff = Math.abs(cx - this.x);
      const ydiff = Math.abs(cy - this.y);

      if (xdiff + ydiff < 50) {
          ( e as Enemy ).takeDamage()
        this.remove();
        return;
      }
    }

    if (posx > 2000 || posx < -1000 || posy > 2000 || posy < -1000) {
      this.remove();
    }
  }
}
