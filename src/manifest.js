// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
    /* Maps */
    { name: "simple-level",             type: "tmx",    src: "data/map/simple_level.json" },
    { name: "simple_level_tileset",     type: "tsx",    src: "data/map/simple_level_tileset.tsj" },

    /* bitmap */
    { name: "simple_level", type:"image", src: "data/map/simple_level.png" },

    /* texturePacker */
    { name: "texture",         type: "json",   src: "data/img/texture.json" },
    { name: "texture",         type: "image",  src: "data/img/texture.png" },

    /* Bitmap Font */
    { name: "SuperPlumberBrothers", type:"image", src: "data/fnt/SuperPlumberBrothers.png" },
    { name: "SuperPlumberBrothers", type:"binary", src: "data/fnt/SuperPlumberBrothers.fnt"}
];

export default DataManifest;
