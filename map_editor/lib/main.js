"use strict";
const fs = require('fs');
var Cancel_length = 0;
var Cancel = new Array(4);
for (var i = 0; i < 3; i++) {
    Cancel[i] = new Array();
}
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json";
    var json = "{\"map\":" + JSON.stringify(mapData) + "}";
    fs.writeFileSync(map_path, json, "utf-8");
}
function CancelTile() {
    if (Cancel_length <= 0) {
        alert("Ended");
        return;
    }
    else {
        var new_row = Cancel[0][Cancel_length - 1];
        var new_col = Cancel[1][Cancel_length - 1];
        mapData[new_row][new_col] = Cancel[2][Cancel_length - 1];
        Cancel_length--;
    }
    console.log("undone");
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var button_Save = new render.Bitmap();
button_Save.width = 50;
button_Save.height = 50;
button_Save.source = "Save.png";
button_Save.y = 200;
var Save = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= button_Save.width && localPoint.y >= 0 && localPoint.y <= button_Save.height)
        return true;
};
function onSaveClick() {
    writeFile();
    console.log("Save");
}
var button_Cannel = new render.Bitmap();
button_Cannel.width = 50;
button_Cannel.height = 50;
button_Cannel.source = "Cannel.png";
button_Cannel.x = 150;
button_Cannel.y = 200;
var Cannel = (localPoint, displayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= button_Cannel.width && localPoint.y >= 0 && localPoint.y <= button_Cannel.height)
        return true;
};
function onCannelClick() {
    CancelTile();
    console.log("Cannel");
}
function onTileClick(tile) {
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
    Cancel[0][Cancel_length] = tile.ownedRow;
    Cancel[1][Cancel_length] = tile.ownedCol;
    Cancel[2][Cancel_length] = mapData[tile.ownedRow][tile.ownedCol];
    Cancel_length++;
    if (mapData[tile.ownedRow][tile.ownedCol] == 0)
        mapData[tile.ownedRow][tile.ownedCol] = 1;
    else
        mapData[tile.ownedRow][tile.ownedCol] = 0;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
}
var mapData = readFile();
var Container = new render.DisplayObjectContainer();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var editor = createMapEditor();
Container.addChild(button_Save);
Container.addChild(button_Cannel);
Container.addChild(editor);
renderCore.start(Container, ["Save.png", "Cannel.png"]);
eventCore.register(button_Save, Save, onSaveClick);
eventCore.register(button_Cannel, Cannel, onCannelClick);
