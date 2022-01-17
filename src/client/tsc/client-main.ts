import $ from "jQuery";
import Konva from "konva";
import { AnimationManager } from "../framework/AnimationManager";
import { Character } from "../framework/Character";
import { Promises } from "../framework/Promises";

$(function () {
  var stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  const loadImage = Promises.loadImage("images/walking.png").then((img) => {
    const person = new Character({
      id: "person",
      layer: layer,
      x: 0,
      y: 200,
      walkingSpeed: 150,
      sprite: {
        image: img,
        animations: {
          width: 84,
          height: 126,
          byName: {
            idle: { start: 0, end: 0 },
            walk: { start: 0, end: 6 },
          },
        },
        animation: "walk",
        frameRate: 10,
      },
    });

    person.addToLayer();
    person.lookLeft();
    AnimationManager.start();
    setTimeout(() => {
      person.walkHorizontallyTo(500);
    }, 1000);
    setTimeout(() => {
      person.walkHorizontallyTo(42);
    }, 2000);
    setTimeout(() => {
      person.showCallout(
        "Oh I am back now and look, if I type a really long text, it also gets wrapped automatically!"
      );
    }, 4500);
  });
});
