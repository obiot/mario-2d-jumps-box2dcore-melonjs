import {
    audio,
    game, 
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool,
    TextureAtlas
} from 'melonjs';

import 'index.css';

import global from './js/global.js';

import PlayScreen from 'js/stage/play.js';
import b2Collider from "./js/renderables/collider.js";

import DataManifest from 'manifest.js';
import initBox2D from './js/init-box2d.js';
import PlayerEntity from './js/renderables/player.js';


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(320, 240, {parent : "screen", scale : "auto", renderer: video.AUTO})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import("@melonjs/debug-plugin").then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });
    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // disable built-in physic engine
    game.world.physic = "none";

    // initialize the box2D world
    global.b2World = initBox2D();

    // allow cross-origin for image/texture loading
    loader.crossOrigin = "anonymous";

    // set and load all resources.
    loader.preload(DataManifest, function() {
        // set the user defined game stages
        state.set(state.PLAY, new PlayScreen());

        // declare box2d collider into the pool
        pool.register("player", PlayerEntity);
        pool.register("ground", b2Collider);
        pool.register("pipe", b2Collider);
        pool.register("bricks", b2Collider);
        pool.register("side2", b2Collider);
        pool.register("side1", b2Collider);
        pool.register("side0", b2Collider);

        // load the texture atlas file
        global.texture = new TextureAtlas(
            loader.getJSON("texture"),
            loader.getImage("texture")
        );

        // Start the game.
        state.change(state.PLAY);
    });
});
