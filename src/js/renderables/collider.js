import { Renderable } from 'melonjs';
import { createStaticBody, createBoxShape } from '../box2d.js';

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

        // collider body
        this.colliderBody = createStaticBody(this.pos.x + w / 2, this.pos.y + h / 2, settings.name);
        
        // collider fixture
        this.fixture = this.colliderBody.CreateFixture({ shape: createBoxShape(w, h), density: 0.0 });
        //this.fixture.SetFriction(3);
    }

};

export default b2Collider;
