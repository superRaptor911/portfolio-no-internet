import { randInt, sleep } from "../utils";
import { Enemy } from "./enemy";
import { Entity } from "./entity";
import { Player } from "./player";

const FPS = 60;
const isGameOver = () => {
  return false;
};

let entities: Entity[] = [];
let player: Player | undefined;
let round = 0;
let spawnComplete = true;
let isPaused = false;

const pause = () => {
  isPaused = !isPaused;
};

export const gameLoop = async () => {
  let delta = 0;
  let time = performance.now();
  initGame();

  while (!isGameOver()) {
    if (!isPaused) {
      process(delta);
      gameLogic();
    }

    const waitTime = 1 / FPS - delta;
    if (waitTime > 0) {
      await sleep(waitTime * 1000);
    }
    delta = (performance.now() - time) / 1000;
    time = performance.now();
  }
};

const initGame = () => {
  const p1 = new Player();
  player = p1;

  entities.push(p1);
  showMessage("Move using W.A.S.D  and SPACE to shoot");
  round1();
};

export const spawnEntity = (e: Entity) => {
  entities.push(e);
};

export const getAllEntities = () => {
  return entities;
};

export const getPlayer = () => player;
export const killPlayer = () => {
  if (!player) return;
  player.remove();
  player = undefined;
};

const process = (delta: number) => {
  entities = entities.filter((e) => e.alive);
  entities.forEach((player) => player.process(delta));
};

const randomSpawnEnemy = () => {
  const left = randInt() % 3;
  const top = randInt() % 3;

  let posX = randInt() % 1000;
  let posY = randInt() % 1000;

  if (left === 0) {
    posX = 0;
  }

  if (top === 0) {
    posY = 0;
  } else if (top == 1) {
    posY *= -1;
  } else {
    posY += window.screen.height;
  }

  if (left === 0) {
    posX = 0;
  } else if (left == 1) {
    posX *= -1;
  } else {
    posX += window.screen.width;
  }

  const r = rounds[round];

  const e = new Enemy(posX, posY, r.size, r.speedx);
  entities.push(e);
};

const round1 = async () => {
  spawnComplete = false;
  const ec = rounds[round].ec;

  for (let i = 0; i < ec; i++) {
    randomSpawnEnemy();
    await sleep(800 + (randInt() % 2000));
  }
  spawnComplete = true;
};

const rounds = [
  {
    fn: round1,
    message: "My name is Aditya Aravind",
    ec: 4,
    speedx: 1,
    size: 30,
  },
  {
    fn: round1,
    message: "I am a software dev @Clusterdev",
    ec: 5,
    speedx: 1.2,
    size: 40,
  },
  {
    fn: round1,
    message: "I have worked on ReactJS,Python,JS,TS,C++",
    ec: 3,
    speedx: 1.3,
    size: 50,
  },
  {
    fn: round1,
    message: "I did my B.Tech from CUSAT",
    ec: 2,
    speedx: 1.1,
    size: 100,
  },
  {
    fn: round1,
    message: "I'm a metal head \\m/",
    ec: 4,
    speedx: 1.5,
    size: 30,
  },
  {
    fn: round1,
    message: "I did my B.Tech from CUSAT",
    ec: 3,
    speedx: 1.5,
    size: 40,
  },
  {
    fn: round1,
    message: "I'm a rider and I love visiting new places on my bike",
    ec: 7,
    speedx: 1.2,
    size: 70,
  },
];

const gameLogic = () => {
  const eLeft = entities.filter((e) => e instanceof Enemy).length;

  if (round >= 0 && round < rounds.length) {
    const hud = document.getElementById("hud")!;
    hud.style.display = "block";
    hud.innerText = `${eLeft}/${rounds[round].ec}`;
  }

  if (spawnComplete && round < rounds.length) {
    if (eLeft === 0) {
      showMessage(rounds[round].message);
      round += 1;
      rounds[round]?.fn();
    }
  }

  if (!player) {
    pause();
    showMessage("Oops! Better Luck Next Time!");
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
};

const showMessage = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const screen = document.getElementById("screen")!;

  Array.from(screen.getElementsByClassName("text-renderer")).forEach((it) =>
    it.remove(),
  );

  const msg = document.createElement("div");
  msg.classList.add("text-renderer");
  msg.innerText = text;
  screen.appendChild(msg);
};
