# Mario 2D Jumps (melonJS/Box2D edition)
--------------------------------------
a port of the "mario-2d-jumps-box2dcore-webgl-js" demo by [8observer8](https://8observer8.github.io) that showcase integration of [melonJS](http://melonjs.org) with [@box2d/core](https://lusito.github.io/box2d.ts/).

<img width="640" alt="Screenshot 2023-07-28 at 10 27 46 AM" src="https://github.com/obiot/mario-2d-jumps-box2dcore-melonjs/assets/4033090/231efde4-5906-403a-8392-ae48ff071df8">


Description
-------------------------------------------------------------------------------
a tiny mario 2d platformer game built with [melonJS](http://melonjs.org) and the [@box2d/core](https://lusito.github.io/box2d.ts/) physics engine that showcase key features of melonJS :
* WebGL rendering
* integration with Box2D physics engine (as part of this demo)
* Tilemap integration
* Texture packing
* Bitmap Font

>Note: this is a proof of concept, not a accurate implementation of a super mario game physic & logic

Building the demo
-------------------------------------------------------------------------------

If you wish to build the demo and expand on the current features, you will need to install :

- The [Node.js](http://nodejs.org/) JavaScript runtime and the [NPM](https://npmjs.org/) package manager

then 
- `npm run dev` to start the dev server on watch mode at `localhost:9000`
- `npm run build` to generate a minified, production-ready build, in the docs folder

> Note: building the project under the `docs` folder will trigger the workflow for the GitHub Pages deployment.

To Do List
-------------------------------------------------------------------------------
- improve player movement and jumping logic to mimic super mario "real physic"
- add enemies and collectables with proper contact/collision handling
- add parallax background and other details to the mini level

Credits
-------------------------------------------------------------------------------
- [8observer8](https://8observer8.github.io) for the original demo
- [melonJS](http://melonjs.org) for the game engine
- [@box2d/core](https://lusito.github.io/box2d.ts/) for the physic engine
- [Tiled](https://www.mapeditor.org/) for the map editor
- [FreeTexturePacker](http://free-tex-packer.com) for the free texture packer
- [SnowB](https://snowb.org) for the BitmapFont editor
