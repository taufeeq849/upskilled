"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Direction_1 = require("./Direction");
const main_1 = require("./main");
class Player {
    constructor(sprite, characterIndex, startTilePosX, startTilePosY) {
        this.sprite = sprite;
        this.characterIndex = characterIndex;
        this.directionToFrameRow = {
            [Direction_1.Direction.DOWN]: 0,
            [Direction_1.Direction.LEFT]: 1,
            [Direction_1.Direction.RIGHT]: 2,
            [Direction_1.Direction.UP]: 3,
        };
        this.lastFootLeft = false;
        this.sprite.scale = Player.SCALE_FACTOR;
        this.sprite.setPosition(startTilePosX * main_1.GameScene.TILE_SIZE + this.playerOffsetX(), startTilePosY * main_1.GameScene.TILE_SIZE + this.playerOffsetY());
        this.sprite.setFrame(this.framesOfDirection(Direction_1.Direction.DOWN).standing);
    }
    getPosition() {
        return this.sprite.getCenter();
    }
    setPosition(position) {
        this.sprite.setPosition(position.x, position.y);
    }
    setWalkingFrame(direction) {
        const frameRow = this.framesOfDirection(direction);
        this.sprite.setFrame(this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot);
    }
    setStandingFrame(direction) {
        if (this.isCurrentFrameStanding(direction)) {
            this.lastFootLeft = !this.lastFootLeft;
        }
        this.sprite.setFrame(this.framesOfDirection(direction).standing);
    }
    getTilePos() {
        const x = (this.sprite.getCenter().x - this.playerOffsetX()) / main_1.GameScene.TILE_SIZE;
        const y = (this.sprite.getCenter().y - this.playerOffsetY()) / main_1.GameScene.TILE_SIZE;
        return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
    }
    isCurrentFrameStanding(direction) {
        return (Number(this.sprite.frame.name) !=
            this.framesOfDirection(direction).standing);
    }
    playerOffsetX() {
        return main_1.GameScene.TILE_SIZE / 2;
    }
    playerOffsetY() {
        return (-((Player.SPRITE_FRAME_HEIGHT * Player.SCALE_FACTOR) %
            main_1.GameScene.TILE_SIZE) / 2);
    }
    framesOfDirection(direction) {
        const playerCharRow = Math.floor(this.characterIndex / Player.CHARS_IN_ROW);
        const playerCharCol = this.characterIndex % Player.CHARS_IN_ROW;
        const framesInRow = Player.CHARS_IN_ROW * Player.FRAMES_PER_CHAR_ROW;
        const framesInSameRowBefore = Player.FRAMES_PER_CHAR_ROW * playerCharCol;
        const rows = this.directionToFrameRow[direction] +
            playerCharRow * Player.FRAMES_PER_CHAR_COL;
        const startFrame = framesInSameRowBefore + rows * framesInRow;
        return {
            leftFoot: startFrame,
            standing: startFrame + 1,
            rightFoot: startFrame + 2,
        };
    }
}
exports.Player = Player;
Player.SPRITE_FRAME_WIDTH = 52;
Player.SPRITE_FRAME_HEIGHT = 72;
Player.SCALE_FACTOR = 1.5;
Player.CHARS_IN_ROW = 4;
Player.FRAMES_PER_CHAR_ROW = 3;
Player.FRAMES_PER_CHAR_COL = 4;
//# sourceMappingURL=Player.js.map