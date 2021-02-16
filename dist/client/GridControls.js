"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridControls = void 0;
const Direction_1 = require("./Direction");
class GridControls {
    constructor(input, gridPhysics) {
        this.input = input;
        this.gridPhysics = gridPhysics;
    }
    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.LEFT);
        }
        else if (cursors.right.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.RIGHT);
        }
        else if (cursors.up.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.UP);
        }
        else if (cursors.down.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.DOWN);
        }
    }
}
exports.GridControls = GridControls;
//# sourceMappingURL=GridControls.js.map