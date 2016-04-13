
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}


function  writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json"
    var json="{\"map\":"+JSON.stringify(mapData)+"}";
    console.log(json);
    fs.writeFileSync(map_path,json,"utf-8");
    console.log("saved");
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
            tile.y = row * editor.GRID_PIXEL_HEIGHT
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



function onTileClick(tile: editor.Tile) {
    console.log(tile.ownedRow+" "+tile.ownedCol+" "+mapData[tile.ownedRow][tile.ownedCol]); 
     
   if( mapData[tile.ownedRow][tile.ownedCol]==0)
       mapData[tile.ownedRow][tile.ownedCol]=1;
   else
      mapData[tile.ownedRow][tile.ownedCol]=0;
    
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow+" "+tile.ownedCol+" "+mapData[tile.ownedRow][tile.ownedCol]); 
   
}


var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();
renderCore.start(editor);
