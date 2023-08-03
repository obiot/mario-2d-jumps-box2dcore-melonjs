import { b2World, b2Vec2, b2BodyType, b2PolygonShape, b2CircleShape, b2ContactListener } from "@box2d/core";
import { event } from "melonjs";

// a global variable to store the box2D world
let world = null;

export const velocityIterations = 3;
export const positionIterations = 2;
export const pixelsPerMeter = 30;

// create the Box2D world
export function initBox2D() {
    // create the b2World
    world  = new b2World(new b2Vec2(0, 9.8));
    
    // update the box2D world every frame
    event.on(event.GAME_AFTER_UPDATE, (dt) => {
        if (world.GetBodyCount() > 0) {
            //console.log("update box2d world :" + dt / 1000 + "ms");
            world.Step(dt / 1000, velocityIterations, positionIterations);
        }
    });

    return world;
}

export function GetWorld() {
    return world;
}

// create a static body at the given position
export function createStaticBody(x, y, userData) {
    const body = world.CreateBody({
        type: b2BodyType.b2_staticBody,
        position: {
            x: x,
            y: y
        }
    });
    body.SetUserData(userData);
    return body;
};

// create a static body at the given position
export function createDynamicBody(x, y, userData) {
    const body = world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: {
            x: x,
            y: y
        },
        bullet: true
    });
    body.SetUserData(userData);
    return body;
};

// create and return a polygon box shape of the given dimension
export function createBoxShape(w, h) {
    const shape = new b2PolygonShape();
    shape.SetAsBox(w / 2, h / 2);
    return shape;
};

// create and return a polygon box shape of the given dimension
export function createCircleShape(radius) {
    const shape = new b2CircleShape(radius);
    return shape;
};

// create and return a polygon box shape of the given dimension
export function SetContactListener(beginContact = () => {}, EndContact = () => {} , PreSolve = () => {}, PostSolve = () => {}) {
    b2ContactListener.BeginContact = beginContact;
    b2ContactListener.EndContact = EndContact;
    b2ContactListener.PreSolve = PreSolve;
    b2ContactListener.PostSolve = PostSolve;
    world.SetContactListener(b2ContactListener);
};