import { Stage, game, level  } from "melonjs";
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
    }

    onDestroyEvent() {

    }
};

export default PlayScreen;
