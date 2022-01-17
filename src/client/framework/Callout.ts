import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Text } from "konva/lib/shapes/Text";

const calloutHtmlImage = new Image();
calloutHtmlImage.src = "images/callout.png";

export class Callout {
  private calloutShape: Konva.Image;
  private calloutText: Text;

  constructor(params: { id: string; text: string; layer: Layer; x: number; y: number; visible: boolean }) {
    this.calloutShape = new Konva.Image({ image: calloutHtmlImage });
    this.calloutShape.hide();
    this.calloutShape.id(params.id + "-callout-shape");
    params.layer.add(this.calloutShape);
    this.calloutText = new Text();
    this.calloutText.id(params.id + "-callout-text");
    this.calloutText.hide();
    this.calloutText.width(200);
    this.calloutText.padding(20);
    this.calloutText.fontStyle("bold");
    this.calloutText.wrap("word");
    params.layer.add(this.calloutText);
    this.visible = params.visible;
  }

  set visible(visible: boolean) {
    this.calloutShape.visible(visible);
    this.calloutText.visible(visible);
  }

  get visible(): boolean {
    return this.calloutShape.visible();
  }

  set x(val: number) {
    this.calloutShape.x(val);
    this.calloutText.x(val);
  }

  set y(val: number) {
    this.calloutShape.y(val);
    this.calloutText.y(val);
  }

  set text(val: string) {
    this.calloutText.text(val);
  }
}
