import { Stage, game, level, BitmapText } from "melonjs";
import DebugDrawer from "../debug-drawer";

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // load a level
        level.load("simple-level");

        if (process.env.NODE_ENV === 'development') {
            // instantiate a debugDrawer
            game.world.addChild(new DebugDrawer(game.world.width, game.world.height));
        }

        // create a font
        this.title = new BitmapText(160, 32, {
            font : "SuperPlumberBrothers",
            size : 1.0,
            textAlign : "center",
            textBaseline : "top",
            text: ["Mario 2D Demo", "Box2d/core & melonJS demo", "visit us at melonjs.org"],
            fillStyle: "#D3D3D3" // #954B0C"
        });

        game.world.addChild(this.title);
    }

    onDestroyEvent() {

    }
};

export default PlayScreen;
