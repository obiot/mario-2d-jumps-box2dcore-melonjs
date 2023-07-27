import { b2World, b2Vec2 } from "@box2d/core";
import { event } from "melonjs";

// a global variable to store the box2D world
let world = null;


function initBox2D() {
    // create the b2World
    world  = new b2World(new b2Vec2(0, 9.8));
    
    // update the box2D world every frame
    event.on(event.GAME_AFTER_UPDATE, (dt) => {
        if (world.GetBodyCount() > 0) {
            //console.log("update box2d world :" + dt / 1000 + "ms");
            world.Step(dt / 1000, { velocityIterations: 3, positionIterations: 2 });
        }
    });

    return world;
}

export default initBox2D;