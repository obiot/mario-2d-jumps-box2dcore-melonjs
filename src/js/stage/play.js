import { Stage, game, ColorLayer, level  } from "melonjs";
import DebugDrawer from "../debug-drawer";

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // add a gray background to the default Stage
        game.world.addChild(new ColorLayer("background", "#202020"));
        
        // load a level
        level.load("simple-level");

        // instantiate the debugDrawer
        this.debugDrawer = new DebugDrawer(game.world.width, game.world.height);
        // and add it to the game world
        game.world.addChild(this.debugDrawer);
    }

    
    onDestroyEvent() {

    }
};

export default PlayScreen;
