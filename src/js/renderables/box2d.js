import { level, Renderable, Vector2d, Vector3d } from 'melonjs';
import { b2BodyType, b2PolygonShape } from "@box2d/core";
import global from '../global.js';

let sidePositions = [];
let sideScales = [];
let fixtures = [];

class b2Collider extends Renderable {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings.width, settings.height);

        // match Tiled origin point (0,0);
        this.anchorPoint.set(0, 0);

        console.log(x, y , settings);

        const w = settings.width;
        const h = settings.height;
        const scale = new Vector3d();
        const x0 = level.getCurrentLevel().width / 2;
        const y0 = level.getCurrentLevel().height / 2;


        switch (settings.name) {
            case "ground":
            case "pipe":
            case "bricks" :
                scale.x = w;  
                scale.y = h;
                scale.z = 1;
                break;
            case "side0":
            case "side1":
            case "side2":
                const position = new Vector2d();
                position.x = (x - x0) + w / 2;
                position.y = (y0 - y) - h / 2;
                sidePositions.push(position);
                scale.x = w;
                scale.y = h;
                scale.z = 1;
                sideScales.push(scale);
                break;      
            default:
                throw new Error("unknown collider type");
        }


        this.colliderBody = global.b2World.CreateBody({
            type: b2BodyType.b2_staticBody,
            position: {
                x: this.pos.x + w / 2, // adjust for tiled origin point
                y: this.pos.y + h / 2 // adjust for tiled origin point
            }
        });

        const colliderShape = new b2PolygonShape();

        colliderShape.SetAsBox(scale.x / 2, scale.y / 2);

        const colliderFixture = this.colliderBody.CreateFixture({ shape: colliderShape });
        
        colliderFixture.SetFriction(3);
        
        fixtures.push(colliderFixture);

    }

};

export default b2Collider;
