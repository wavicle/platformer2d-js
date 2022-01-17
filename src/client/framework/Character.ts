import { Layer } from "konva/lib/Layer";
import { Sprite } from "konva/lib/shapes/Sprite";
import { KonvaUtils } from "../framework/KonvaUtils";
import { Animable } from "./Animable";
import { AnimationManager } from "./AnimationManager";
import { Callout } from "./Callout";

export class Character implements Animable {
  private _x: number = 0;
  private _y: number = 0;
  private lookingRight: boolean;
  private sprite: Sprite;
  private targetX?: number;
  private walkingSpeed;
  private callout: Callout;

  constructor(
    private params: {
      id: string;
      layer: Layer;
      sprite: {
        image: HTMLImageElement;
        animations: {
          width: number;
          height: number;
          byName: { [key: string]: { start: number; end: number } };
        };
        animation: string;
        frameRate: number;
      };
      x: number;
      y: number;
      walkingSpeed: number;
    }
  ) {
    this.lookingRight = true;
    this.sprite = KonvaUtils.horizontalSprite(params.sprite);
    this.x = params.x;
    this.y = params.y;
    this.walkingSpeed = params.walkingSpeed;
    this.callout = new Callout({
      id: params.id,
      text: "",
      layer: params.layer,
      x: params.x,
      y: params.y,
      visible: false,
    });
    AnimationManager.add(this);
  }

  set x(val: number) {
    const offset = this.params.sprite.animations.width / 2;
    if (this.lookingRight) {
      this.sprite.x(val - offset);
    } else {
      this.sprite.x(val + offset);
    }
  }

  set y(val: number) {
    const offset = this.params.sprite.animations.height / 2;
    this.sprite.y(val - offset);
  }

  addToLayer() {
    this.params.layer.add(this.sprite);
  }

  lookLeft() {
    if (this.lookingRight) {
      const sprite = this.sprite;
      sprite.scaleX(-1);
      sprite.x(sprite.x() + this.params.sprite.animations.width);
      this.lookingRight = !this.lookingRight;
    }
  }

  lookRight() {
    if (!this.lookingRight) {
      const sprite = this.sprite;
      sprite.scaleX(1);
      sprite.x(sprite.x() - this.params.sprite.animations.width);
      this.lookingRight = !this.lookingRight;
    }
  }

  walkHorizontallyTo(x: number) {
    const diff = this.sprite.x() - x;
    if (diff < 0) {
      this.lookRight();
    } else {
      this.lookLeft();
    }
    this.targetX = x;
    this.sprite.animation("walk").start();
  }

  stop() {
    this.targetX = undefined;
    this.sprite.animation("idle").stop();
  }

  animate(dt: number): void {
    if (this.targetX) {
      const x0 = this.sprite.x();
      const diff = this.targetX - x0;
      const dx = Math.sign(diff) * Math.min(Math.abs(diff), (this.walkingSpeed * dt) / 1000);
      if (dx == 0) {
        this.stop();
      } else {
        this.sprite.x(x0 + dx);
      }
    }
  }

  showCallout(text: string) {
    this.callout.text = text;
    this.callout.visible = true;
  }
}
