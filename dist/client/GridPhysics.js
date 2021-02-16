"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridPhysics = void 0;
const main_1 = require("./main");
const Direction_1 = require("./Direction");
const Vector2 = Phaser.Math.Vector2;
class GridPhysics {
    constructor(player, tileMap) {
        this.player = player;
        this.tileMap = tileMap;
        this.movementDirection = Direction_1.Direction.NONE;
        this.speedPixelsPerSecond = main_1.GameScene.TILE_SIZE * 4;
        this.tileSizePixelsWalked = 0;
        this.decimalPlacesLeft = 0;
        this.movementDirectionVectors = {
            [Direction_1.Direction.UP]: Vector2.UP,
            [Direction_1.Direction.DOWN]: Vector2.DOWN,
            [Direction_1.Direction.LEFT]: Vector2.LEFT,
            [Direction_1.Direction.RIGHT]: Vector2.RIGHT,
        };
    }
    movePlayer(direction) {
        if (this.isMoving())
            return;
        if (this.isBlockingDirection(direction)) {
            this.player.setStandingFrame(direction);
        }
        else {
            this.startMoving(direction);
        }
    }
    update(delta) {
        if (this.isMoving()) {
            this.updatePlayerPosition(delta);
        }
    }
    isMoving() {
        return this.movementDirection != Direction_1.Direction.NONE;
    }
    startMoving(direction) {
        this.movementDirection = direction;
    }
    tilePosInDirection(direction) {
        return this.player
            .getTilePos()
            .add(this.movementDirectionVectors[direction]);
    }
    isBlockingDirection(direction) {
        return this.hasBlockingTile(this.tilePosInDirection(direction));
    }
    hasNoTile(pos) {
        return !this.tileMap.layers.some((layer) => this.tileMap.hasTileAt(pos.x, pos.y, layer.name));
    }
    hasBlockingTile(pos) {
        if (this.hasNoTile(pos))
            return true;
        return this.tileMap.layers.some((layer) => {
            const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
            return tile && tile.properties.collides;
        });
    }
    updatePlayerPosition(delta) {
        this.decimalPlacesLeft = this.getDecimalPlaces(this.getSpeedPerDelta(delta) + this.decimalPlacesLeft);
        const pixelsToWalkThisUpdate = this.getIntegerPart(this.getSpeedPerDelta(delta) + this.decimalPlacesLeft);
        if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
            this.movePlayerSpriteRestOfTile();
        }
        else {
            this.movePlayerSprite(pixelsToWalkThisUpdate);
        }
    }
    getIntegerPart(float) {
        return Math.floor(float);
    }
    getDecimalPlaces(float) {
        return float % 1;
    }
    getSpeedPerDelta(delta) {
        const deltaInSeconds = delta / 1000;
        return this.speedPixelsPerSecond * deltaInSeconds;
    }
    willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate) {
        return (this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= main_1.GameScene.TILE_SIZE);
    }
    movePlayerSpriteRestOfTile() {
        this.movePlayerSprite(main_1.GameScene.TILE_SIZE - this.tileSizePixelsWalked);
        this.stopMoving();
    }
    movePlayerSprite(speed) {
        const newPlayerPos = this.player
            .getPosition()
            .add(this.movementDistance(speed));
        this.player.setPosition(newPlayerPos);
        this.tileSizePixelsWalked += speed;
        this.updatePlayerFrame(this.movementDirection, this.tileSizePixelsWalked);
        this.tileSizePixelsWalked %= main_1.GameScene.TILE_SIZE;
    }
    updatePlayerFrame(direction, tileSizePixelsWalked) {
        if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
            this.player.setStandingFrame(direction);
        }
        else {
            this.player.setWalkingFrame(direction);
        }
    }
    hasWalkedHalfATile(tileSizePixelsWalked) {
        return tileSizePixelsWalked > main_1.GameScene.TILE_SIZE / 2;
    }
    stopMoving() {
        this.movementDirection = Direction_1.Direction.NONE;
    }
    movementDistance(speed) {
        return this.movementDirectionVectors[this.movementDirection]
            .clone()
            .multiply(new Vector2(speed));
    }
}
exports.GridPhysics = GridPhysics;
//# sourceMappingURL=GridPhysics.js.map