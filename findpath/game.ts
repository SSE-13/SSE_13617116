module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;
    

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);

        }

        render(context: CanvasRenderingContext2D) {
            context.fillStyle = '#0000FF';
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    
                    if(!this.grid.getNode(i,j).walkable){ 
                        context.fillRect(i * GRID_PIXEL_WIDTH, (j-1) * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fillStyle = '#000000';
                    }else{
                        context.fillStyle = '#0000FF';
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.strokeRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);    
                }
            }
            context.closePath();
            }

        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {

       public _Step = 1;
       public Path : astar.AStar;
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            this.Path = new astar.AStar();
            this.Path.setHeurisitic(this.Path.diagonal);
            var result = this.Path.findPath(grid);
            var Path = this.Path._path;
        }

        public onTicker(duringTime) {
            if(this._Step<this.Path._path.length-1){
            var Tx = this.Path._path[this._Step].x*GRID_PIXEL_WIDTH;
            var Ty = this.Path._path[this._Step].y*GRID_PIXEL_HEIGHT;
            if(this.x<Tx)
            {
                this.x = (this.x+this.vx*duringTime>Tx)?Tx:(this.x+this.vx*duringTime);
            }
            if (this.y<Ty) {
                this.y = (this.y+this.vx*duringTime>Ty)?Ty:(this.y+this.vx*duringTime);
            }
            if(this.x==Tx&&this.y==Ty){
                this._Step++;
            }
           /* if(this.x==Tx&&this.y!=Ty){ 
                this.x = (this.x-this.vx*duringTime<Tx-GRID_PIXEL_WIDTH)?Tx-GRID_PIXEL_WIDTH:(this.x-this.vx*duringTime);
              }
              if(this.y==Ty&&this.x!=Tx){
                   this.y = (this.y-this.vx*duringTime>Ty-GRID_PIXEL_HEIGHT)?Ty-GRID_PIXEL_HEIGHT:(this.y-this.vx*duringTime);
              }*/
             }
            }
        }
    }



var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);

var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
body.vx = 10;
body.vy = 20;
ticker.start([body]);
