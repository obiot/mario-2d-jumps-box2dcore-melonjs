import { Renderable } from 'melonjs';
import { b2BodyType, b2PolygonShape } from "@box2d/core";
import global from '../global.js';

class b2Collider extends Renderable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        const w = settings.width;
        const h = settings.height;

        // call the parent constructor
        super(x, y , w, h);

        // match Tiled origin point (0,0);
        this.anchorPoint.set(0, 0);

        // create the physic body shape based on the given settings
        this.colliderBody = global.b2World.CreateBody({
            type: b2BodyType.b2_staticBody,
            position: {
                x: this.pos.x + w / 2, // adjust for tiled origin point
                y: this.pos.y + h / 2 // adjust for tiled origin point
            }
        });
        this.colliderBody.SetUserData(settings.name);

        const colliderShape = new b2PolygonShape();
        colliderShape.SetAsBox(w / 2, h / 2);
        const colliderFixture = this.colliderBody.CreateFixture({ shape: colliderShape, density: 0.0 });
        colliderFixture.SetFriction(1);
        colliderFixture.SetRestitution(0);
    }

};

export default b2Collider;
