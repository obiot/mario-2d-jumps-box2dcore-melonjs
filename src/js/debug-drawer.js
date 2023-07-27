import { Renderable, CanvasTexture } from "melonjs";
import { DebugDraw } from "@box2d/debug-draw";
import { DrawShapes, DrawAABBs } from "@box2d/core";
import global from "./global.js";

// https://lusito.github.io/box2d.ts/docs/guide/debug-draw/
export default class DebugDrawer extends Renderable {
    constructor(width, height) {
        super(0, 0, width, height);
        this.offScreenCanvas = new CanvasTexture(width, height);
        this.debugDraw = new DebugDraw(this.offScreenCanvas.context);
        this.anchorPoint.set(0, 0);
    }

    update(dt) {
        this.debugDraw.Prepare(this.width / 2, this.height / 2, 1, false);
        DrawShapes(this.debugDraw, global.b2World, false);
        DrawAABBs(this.debugDraw, global.b2World, false);
        this.debugDraw.Finish();
        return true;
    }

    draw(renderer) {
        renderer.drawImage(this.offScreenCanvas.canvas);
    }
}