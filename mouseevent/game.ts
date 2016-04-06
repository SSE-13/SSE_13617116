
var humanContainer = new render.DisplayObjectContainer();
var human = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
head.source = "head.png";
trunk.source = "trunk.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source  ="right_leg.png";

humanContainer.addChild(human);

human.addChild(head)
human.addChild(trunk)
human.addChild(left_arm)
human.addChild(right_arm)
human.addChild(left_leg)
human.addChild(right_leg)
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","left_arm.png","right_arm.png","left_leg.png","right_leg.png"]);


class HumanBody extends Body {

  vx:number = 5;
  vy:number  = 0;

    onTicker(duringTime: number) {

         this.x +=this.vx*duringTime;
         this.y = this.vy*duringTime;
         this.rotation +=Math.PI/2*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










