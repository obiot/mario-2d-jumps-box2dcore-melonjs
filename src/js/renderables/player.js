import { input, Renderable } from "melonjs";
import { b2BodyType, b2CircleShape, b2PolygonShape, b2ContactListener, b2Vec2 } from "@box2d/core";
import global from "../global.js";

const directions = { left: -1, right: 1 };
const playerStates = { idle: "idle", run: "run", jump: "jump" };

class PlayerEntity extends Renderable {

    /**
     * constructor
     */
    constructor(x, y) {
        // call the parent constructor
        super(x, y , 16, 16);

        this.anchorPoint.set(0, 0);

        // enable keyboard
        input.bindKey(input.KEY.LEFT,  "left");
        input.bindKey(input.KEY.RIGHT, "right");
        input.bindKey(input.KEY.X,     "jump", true);
        input.bindKey(input.KEY.UP,    "jump", true);
        input.bindKey(input.KEY.SPACE, "jump", true);
        input.bindKey(input.KEY.DOWN,  "down");

        input.bindKey(input.KEY.A,     "left");
        input.bindKey(input.KEY.D,     "right");
        input.bindKey(input.KEY.W,     "jump", true);
        input.bindKey(input.KEY.S,     "down");

        // create a sprite
        this.sprite = global.texture.createAnimationFromName([
            "mario_idle.png", 
            "mario_run_0.png", "mario_run_1.png", "mario_run_2.png", 
            "mario_jump.png", "simple_level.png"
        ]);

        this.sprite.addAnimation("idle", [{ name: "mario_idle.png" }]);
        this.sprite.addAnimation("run",  [{ name: "mario_run_0.png", delay: 125 }, { name: "mario_run_1.png", delay: 125 }, { name: "mario_run_2.png", delay: 125 }]);
        this.sprite.addAnimation("jump",  [{ name: "mario_jump.png" }]);
        this.sprite.setCurrentAnimation("idle");

        this.sprite.anchorPoint.set(0, 0);

        // status flags
        this.currentDir = directions.right;
        this.currentPlayerState = playerStates.idle;
        this.touchLeft = false;
        this.touchRight = false;
        this.touchBottom = false;
        
        // create the physic body
        this.playerBody = global.b2World.CreateBody({
            type: b2BodyType.b2_dynamicBody,
            position: {
                x: this.pos.x + this.sprite.width / 2,
                y: this.pos.y + this.sprite.height / 2
            },
            bullet: true
        });
        this.playerBody.SetLinearDamping(1);
        this.playerBody.SetUserData("player");
        //this.playerBody.SetFixedRotation(true);

        // create the physic body shape based on the renderable size
        const playerShape = new b2CircleShape(7);
        const playerFixture = this.playerBody.CreateFixture({ shape: playerShape, density: 10});
        playerFixture.SetRestitution(0);

        // setup the contact listener
        b2ContactListener.BeginContact = (contact) => {
            const name = contact.GetFixtureA().GetBody().GetUserData();

            // cancel horizontal velocity if touching a wall/pipe
            if (name !== "ground") {
                const vel = this.playerBody.GetLinearVelocity();
                if (vel.x < 0) {
                    this.touchLeft = true;
                    vel.x = 0;
                } else if (vel.x > 0) {
                    this.touchRight = true;
                    vel.x = 0;
                }
                this.playerBody.SetLinearVelocity(vel);
            }
        }

        b2ContactListener.EndContact = (contact) => {
            const name = contact.GetFixtureA().GetBody().GetUserData();
            if (name !== "ground") {
                this.touchLeft = false;
                this.touchRight = false;
            }
        }
        
        b2ContactListener.PreSolve = (contact, oldManifold) => {}
        b2ContactListener.PostSolve = (contact, impulse) => {}

        global.b2World.SetContactListener(b2ContactListener);
    }

    /**
     * update the entity
     */
    update(dt) {
        const vel = this.playerBody.GetLinearVelocity();
        if (input.isKeyPressed("left") && !this.touchLeft) {
            vel.x = -1;
            this.currentDir = directions.left;
            this.currentPlayerState = playerStates.run;
        } else if (input.isKeyPressed("right") && !this.touchRight) {
            vel.x = 1;
            this.currentDir = directions.right;
            this.currentPlayerState = playerStates.run;
        } else {
            vel.x = 0;
            this.currentPlayerState = playerStates.idle;
        }
        
        if (input.isKeyPressed("jump")) {
            if (Math.abs(vel.y) === 0.0) {
                vel.y = -5;
                this.currentPlayerState = playerStates.jump;
            }
        }

        this.playerBody.SetLinearVelocity(vel);

        this.sprite.setCurrentAnimation(this.currentPlayerState);

        // return true if sprite change or applied vel is not 0
        return this.sprite.update(dt) || vel.x !== 0 || vel.y !== 0;
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    draw(renderer) {
        // adjust position based on the physic body
        this.pos.set(
            this.playerBody.GetPosition().x - this.sprite.width / 2,
            this.playerBody.GetPosition().y - this.sprite.height / 2
        );

        renderer.save();
        // translate the rendering context to the parent renderable position
        renderer.translate(this.pos.x, this.pos.y);
        // TODO: fix default anchor point in the texture atlas
        this.sprite.anchorPoint.set(0, 0);
        this.sprite.preDraw(renderer);
        this.sprite.flipX(this.currentDir === directions.left);
        this.sprite.draw(renderer);
        this.sprite.postDraw(renderer);
        renderer.restore();
    }
};

export default PlayerEntity;
