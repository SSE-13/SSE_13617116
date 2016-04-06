var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
right_leg.source = "right_leg.png";
humanContainer.addChild(human);
human.addChild(head);
human.addChild(trunk);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
    }
    //vy:number  = 0;
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        // this.y = this.vy*duringTime;
        this.rotation += Math.PI / 2 * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200;
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    alert("\u70B9\u51FB\u4F4D\u7F6E\u4E3A" + localPoint.x + "," + localPoint.y);
    return true;
};
var headOnClick = function () {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
eventCore.register(head, headHitTest, headOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDM0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDakMsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFDbkMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFDakMsU0FBUyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFFbkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUvQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4QixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDeEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUN6QixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN6QyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxjQUFjLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUd6SDtJQUF3Qiw2QkFBSTtJQUE1QjtRQUF3Qiw4QkFBSTtRQUUxQixPQUFFLEdBQVUsQ0FBQyxDQUFDO0lBVWhCLENBQUM7SUFUQyxpQkFBaUI7SUFFZiw0QkFBUSxHQUFSLFVBQVMsVUFBa0I7UUFFdEIsSUFBSSxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQztRQUM3QiwrQkFBK0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsSUFBRyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsR0FBQyxVQUFVLENBQUM7SUFFMUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXdCLElBQUksR0FZM0I7QUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQzFCLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3pDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7QUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUdyQixJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN2QyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFakIsSUFBSSxXQUFXLEdBQUcsVUFBQyxVQUFxQixFQUFDLGFBQWtDO0lBQ3ZFLEtBQUssQ0FBRSxtQ0FBUSxVQUFVLENBQUMsQ0FBQyxTQUFJLFVBQVUsQ0FBQyxDQUFHLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQTtBQUVELElBQUksV0FBVyxHQUFHO0lBQ2QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25CLHlCQUF5QjtBQUM3QixDQUFDLENBQUE7QUFFRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsV0FBVyxDQUFDLENBQUMifQ==