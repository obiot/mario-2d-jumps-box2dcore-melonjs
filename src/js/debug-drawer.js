import { Renderable, CanvasTexture, plugins } from "melonjs";
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
        return global.b2World.GetBodyCount() > 0;
    }

    draw(renderer) {
        // only draw if the debug panel is visible
        if (plugins.debugPanel && plugins.debugPanel.panel.visible) {
            // skip if the world is empty
            if (global.b2World.GetBodyCount() > 0) {
                // TODO: replace with `invalidate(renderer)` once version 15.8 is published
                if (typeof renderer.gl !== "undefined") {
                    // make sure the right compositor is active
                    renderer.setCompositor("quad");
                    // invalidate the previous corresponding texture so that it can reuploaded once changed
                    this.glTextureUnit = renderer.cache.getUnit(renderer.cache.get(this.offScreenCanvas.canvas));
                    renderer.currentCompositor.unbindTexture2D(null, this.glTextureUnit);
                }
                this.debugDraw.Prepare(this.width / 2, this.height / 2, 1, false);
                DrawAABBs(this.debugDraw, global.b2World, false);
                DrawShapes(this.debugDraw, global.b2World, false);
                this.debugDraw.Finish();
                renderer.drawImage(this.offScreenCanvas.canvas);
            }
        }
    }
}