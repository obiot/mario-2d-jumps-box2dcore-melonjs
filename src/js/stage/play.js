import { Stage, game, ColorLayer, level  } from 'melonjs';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // add a gray background to the default Stage
        game.world.addChild(new ColorLayer("background", "#202020"));
        
        // load a level
        level.load("simple-level");
    }
};

export default PlayScreen;
