
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
head.x =-180;
head.y = -60;
trunk.x = 0;
trunk.y=150;
left_arm.x = -20;
left_arm.y =160;
right_arm.x = 20;
right_arm.y =160;
left_leg.x = -45;
left_leg.y =250;
right_leg.x = 20;
right_leg.y = 250;
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
  speed = 1;
  radius = Math.PI;
    onTicker(duringTime: number) {

         this.x +=this.vx*duringTime;
         this.y = this.vy*duringTime;
         this.rotation += this.radius/2*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();
var HeadClicked = false;
var LegClicked = false;
var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
   // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if(localPoint.x > 0  && localPoint.x <= 78 && localPoint.y > 0 && localPoint.y <= 73){
        HeadClicked =true;
    }   
    if(localPoint.x > 12  && localPoint.x <= 59 && localPoint.y > 132 && localPoint.y <= 189){
        LegClicked =true;
    }   
    return true;
}

var headOnClick = () => {
    if(HeadClicked)
    {        
        if(body.vx == 0)
        {
            body.vx = 5 * body.speed;
            body.radius = Math.PI * body.speed;   
            HeadClicked = false;     
        }else{
            body.vx *= -1;
            body.radius *= -1;
            body.speed*= -1;
            HeadClicked = false;
        }
    }
    if(LegClicked)
    {
        body.vx = 0;
        body.radius = 0;
        body.rotation = 0;
        LegClicked = false;
    }
   
}

eventCore.register(head,headHitTest,headOnClick);










