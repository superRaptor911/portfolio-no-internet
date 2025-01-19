import { spawnEntity } from ".";
import { Bullet } from "./bullet";
import { Entity } from "./entity";

const SPEED = 300;
const FIRE_RPS = 3;

export class Player extends Entity {
  kb: Record<string, boolean> = {};
  fire_ts = 0;
  last_input = "a"

  constructor() {
    super(window.screen.width / 2, window.screen.height / 2, "white", 30, 30);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.addEventListener("keydown", (e) => {
      const key = e.key;
      this.kb[key] = true;
    });
    document.addEventListener("keyup", (e) => {
      const key = e.key;
      this.kb[key] = false;
    });
  }

  process(delta: number) {
    let vx = 0;
    let vy = 0;

    if (this.kb["a"]) {
      vx = -1;
      this.last_input = "a";
    }

    if (this.kb["d"]) {
      vx += 1;
      this.last_input = "d";
    }

    if (this.kb["w"]) {
      vy = -1;
      this.last_input = "w";
    }

    if (this.kb["s"]) {
      vy += 1;
      this.last_input = "s";
    }

    if (this.kb[" "]) {
      this.fire();
    }


    const posx = this.x + SPEED * delta * vx;
    const posy = this.y + SPEED * delta * vy;

    this.setPos(posx, posy);
  }

  fire() {
    const diff = performance.now() - this.fire_ts;

    if (( diff ) / 1000 > 1 / FIRE_RPS) {
      this.fire_ts = performance.now();
        
      let vx = 0;
      let vy = 0;

      if (this.last_input === "a") {
          vx = -1;
          vy = 0;
      } else if (this.last_input === "d") {
          vx = 1;
          vy = 0;
      } else if (this.last_input === "w") {
          vx = 0;
          vy = -1;
      } else if (this.last_input === "s") {
          vx = 0;
          vy = 1;
      }
      const bullet = new Bullet(this.x, this.y, vx, vy)
      spawnEntity(bullet);
    }
  }
}
