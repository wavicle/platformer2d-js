import { Sprite } from "konva/lib/shapes/Sprite";

export const KonvaUtils = {
  horizontalSprite(params: {
    image: HTMLImageElement;
    animations: {
      width: number;
      height: number;
      byName: { [key: string]: { start: number; end: number } };
    };
    animation: string;
    frameRate: number;
  }) {
    return new Sprite({
      image: params.image,
      animations: castAnimations(params.animations),
      animation: params.animation,
      frameRate: params.frameRate,
      frameIndex: 0,
    });
  },
};

function castAnimations(animations: {
  width: number;
  height: number;
  byName: { [key: string]: { start: number; end: number } };
}): { [key: string]: number[] } {
  const konvaAnimations: { [key: string]: number[] } = {};
  for (const animationName in animations.byName) {
    const frames: number[] = [];
    const start = animations.byName[animationName].start;
    const end = animations.byName[animationName].end;
    for (var i = start; i <= end; i++) {
      const x = (i - start) * animations.width;
      frames.push(x, 0, animations.width, animations.height);
    }
    konvaAnimations[animationName] = frames;
  }
  return konvaAnimations;
}
