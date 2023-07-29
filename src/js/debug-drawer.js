import { Renderable, CanvasTexture, plugins } from "melonjs";
import { DebugDraw } from "@box2d/debug-draw";
import { DrawShapes, DrawAABBs } from "@box2d/core";
import { GetWorld } from "./box2d.js";

// https://lusito.github.io/box2d.ts/docs/guide/debug-draw/
export default class DebugDrawer extends Renderable {
    constructor(width, height) {
        super(0, 0, width, height);
        this.offScreenCanvas = new CanvasTexture(width, height);
        this.debugDraw = new DebugDraw(this.offScreenCanvas.context);
        this.anchorPoint.set(0, 0);
    }

    update(dt) {
        return GetWorld().GetBodyCount() > 0;
    }

    draw(renderer) {
        // only draw if the debug panel is visible
        if (plugins.debugPanel && plugins.debugPanel.panel.visible) {
            // skip if the world is empty
            if (GetWorld().GetBodyCount() > 0) {
                this.offScreenCanvas.invalidate(renderer);
                this.debugDraw.Prepare(this.width / 2, this.height / 2, 1, false);
                DrawAABBs(this.debugDraw, GetWorld(), false);
                DrawShapes(this.debugDraw, GetWorld(), false);
                this.debugDraw.Finish();
                renderer.drawImage(this.offScreenCanvas.canvas);
            }
        }
    }
}