"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = exports.GameScene = void 0;
const Phaser = __importStar(require("phaser"));
const GridControls_1 = require("./GridControls");
const GridPhysics_1 = require("./GridPhysics");
const Player_1 = require("./Player");
const SocketClient_1 = require("./SocketClient");
const sceneConfig = {
    active: false,
    visible: false,
    key: "Game",
};
class GameScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }
    create() {
        const client = new SocketClient_1.Client();
        client.sendTest();
        const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
        cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
            layer.setDepth(i);
            layer.scale = 3;
        }
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.setDepth(2);
        this.cameras.main.startFollow(playerSprite);
        this.gridPhysics = new GridPhysics_1.GridPhysics(new Player_1.Player(playerSprite, 6, 8, 8), cloudCityTilemap);
        this.gridControls = new GridControls_1.GridControls(this.input, this.gridPhysics);
    }
    update(_time, delta) {
        this.gridControls.update();
        this.gridPhysics.update(delta);
    }
    preload() {
        try {
            this.load.image("tiles", "assets/cloud_tileset.png");
            this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
            this.load.spritesheet("player", "assets/characters.png", {
                frameWidth: Player_1.Player.SPRITE_FRAME_WIDTH,
                frameHeight: Player_1.Player.SPRITE_FRAME_HEIGHT,
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.GameScene = GameScene;
GameScene.CANVAS_WIDTH = 720;
GameScene.CANVAS_HEIGHT = 528;
GameScene.TILE_SIZE = 48;
const gameConfig = {
    title: "Sample",
    render: {
        antialias: false,
    },
    type: Phaser.AUTO,
    scene: GameScene,
    scale: {
        width: GameScene.CANVAS_WIDTH,
        height: GameScene.CANVAS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: "game",
    backgroundColor: "#48C4F8",
};
exports.game = new Phaser.Game(gameConfig);
//# sourceMappingURL=main.js.map