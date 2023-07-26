import { Renderable, Vector2d, Vector3d } from 'melonjs';
import { b2BodyType, b2PolygonShape } from "@box2d/core";
import global from '../global.js';

let sidePositions = [];
let sideScales = [];
let fixtures = [];

// TODO get the level data
const fieldSize = 8 * 16;//levelContent.width * levelContent.tilewidth;
const x0 = fieldSize / 2;
const y0 = fieldSize / 2;

class b2Collider extends Renderable {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        const w = settings.width;
        const h = settings.height;

        const position = new Vector2d();
        const scale = new Vector3d();

        // call the parent constructor
        super(x, y , w, h);

        console.log(x, y , settings);


        if (settings.name === "ground") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            scale.x = w;
            scale.y = h;
            scale.z = 1;
        } else if (settings.name === "pipe") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            scale.x = w;
            scale.y = h;
            scale.z = 1;
        } else if (settings.name === "bricks") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            scale.x = w;
            scale.y = h;
            scale.z = 1;
        } else if (settings.name === "side0") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            sidePositions.push(position);
            scale.x = w;
            scale.y = h;
            scale.z = 1;
            sideScales.push(scale);
        } else if (settings.name === "side1") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            sidePositions.push(position);
            scale.x = w;
            scale.y = h;
            scale.z = 1;
            sideScales.push(scale);
        } else if (settings.name === "side2") {
            position.x = (x - x0) + w / 2;
            position.y = (y0 - y) - h / 2;
            sidePositions.push(position);
            scale.x = w;
            scale.y = h;
            scale.z = 1;
            sideScales.push(scale);
        }

        this.colliderBody = global.world.CreateBody({
            type: b2BodyType.b2_staticBody,
            position: {
                x: position.x / global.pixelsPerMeter,
                y: position.y / global.pixelsPerMeter
            }
        });

        const colliderShape = new b2PolygonShape();

        colliderShape.SetAsBox(scale.x / 2 / global.pixelsPerMeter, scale.y / 2 / global.pixelsPerMeter);

        const colliderFixture = this.colliderBody.CreateFixture({ shape: colliderShape });
        
        colliderFixture.SetFriction(3);
        
        fixtures.push(colliderFixture);

    }

};

export default b2Collider;
