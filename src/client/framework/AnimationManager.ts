import { Animable } from "./Animable";

let running: boolean = false;
const animables: Animable[] = [];
let previousTime = Date.now();

function animate() {
  const currentTime = Date.now();
  const dt = currentTime - previousTime;
  previousTime = currentTime;
  animables.forEach((a) => a.animate(dt));
  if (running) {
    requestAnimationFrame(animate);
  }
}

export const AnimationManager = {
  start: function () {
    running = true;
    requestAnimationFrame(animate);
  },

  stop: function () {
    running = false;
  },

  add: function (object: Animable) {
    if (animables.indexOf(object) < 0) {
      animables.push(object);
    }
  },
};
