import { b2World, b2Vec2 } from "@box2d/core";
import { event } from "melonjs";

// a global variable to store the box2D world
let world = null;


function initBox2D() {

    const gravity = new b2Vec2(0, 9.8);

    // create the b2World
    world  = new b2World(gravity);
    
    // update the box2D world every frame
    event.on(event.GAME_UPDATE, (dt) => {
        world.Step(dt, { velocityIterations: 3, positionIterations: 2 });
    });

    return world;

}

export default initBox2D;