// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    /* Bitmap Text */
    { name: "PressStart2P", type: "image", src:  "./data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type: "binary", src: "./data/fnt/PressStart2P.fnt" },

    /* Maps */
    { name: "simple-level",             type: "tmx",    src: "data/map/simple_level.tmx" },
    { name: "simple_level_tileset",     type: "tsx",    src: "data/map/simple_level_tileset.tsx" },

    /* bitmap */
    { name: "simple_level", type:"image", src: "data/map/simple_level.png" },

    /* texturePacker */
    { name: "texture",         type: "json",   src: "data/img/texture.json" },
    { name: "texture",         type: "image",  src: "data/img/texture.png" }
];

export default DataManifest;
