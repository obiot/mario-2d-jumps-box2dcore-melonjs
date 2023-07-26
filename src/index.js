import {
    audio,
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

import data from './data.js';

import PlayScreen from 'js/stage/play.js';
import PlayerEntity from 'js/renderables/player.js';

import DataManifest from 'manifest.js';


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(320, 240, {parent : "screen", scaleMethod: "flex-height"})) {
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

    // allow cross-origin for image/texture loading
    loader.crossOrigin = "anonymous";

    // set and load all resources.
    loader.preload(DataManifest, function() {
        // set the user defined game stages
        state.set(state.PLAY, new PlayScreen());

        // add our player entity in the entity pool
        pool.register("mainPlayer", PlayerEntity);

        // load the texture atlas file
        // this will be used by renderable object later
        data.texture = new TextureAtlas(
            loader.getJSON("texture"),
            loader.getImage("texture")
        );

        // Start the game.
        state.change(state.PLAY);
    });
});
