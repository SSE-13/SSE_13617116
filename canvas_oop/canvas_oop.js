var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.st = ' ';
    }
    TextField.prototype.render = function (context) {
        context.font = "100px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.st, 0, 100);
    };
    return TextField;
}(DisplayObject));
var TextField2 = (function (_super) {
    __extends(TextField2, _super);
    function TextField2() {
        _super.apply(this, arguments);
        this.st = ' ';
    }
    TextField2.prototype.render = function (context) {
        context.font = "60px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.st, 0, 100);
    };
    return TextField2;
}(DisplayObject));
var TextField3 = (function (_super) {
    __extends(TextField3, _super);
    function TextField3() {
        _super.apply(this, arguments);
        this.st = ' ';
    }
    TextField3.prototype.render = function (context) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.st, 0, 100);
    };
    return TextField3;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 230;
rect.height = 30;
rect.x = 400;
rect.y = 350;
rect.color = '#FFFFFF';
var rect2 = new Rect();
rect2.width = 230;
rect2.height = 30;
rect2.x = 400;
rect2.y = 420;
rect2.color = '#FFFFFF';
var text = new TextField();
text.st = '人生';
text.x = 400;
text.y = 100;
var text2 = new TextField2();
text2.st = 'Online';
text2.x = 415;
text2.y = 170;
var bitmap = new Bitmap();
bitmap.source = 'beijing.jpg';
var rect3 = new Rect();
rect3.width = 100;
rect3.height = 50;
rect3.x = 460;
rect3.y = 500;
rect3.color = '#a8d6e6';
var rect4 = new Rect();
rect4.width = 300;
rect4.height = 230;
rect4.x = 350;
rect4.y = 300;
rect4.color = '#ace37b';
var text3 = new TextField3();
text3.st = '用户名:';
text3.x = 410;
text3.y = 270;
var text4 = new TextField3();
text4.st = '密码:';
text4.x = 410;
text4.y = 340;
var text5 = new TextField3();
text5.st = '登录';
text5.x = 485;
text5.y = 435;
//var bitmap2 = new Bitmap();
//bitmap2.source = 'beijing1.jpg';
//渲染队列
var renderQueue = [bitmap, text, text2, rect4, rect, rect2, rect3, text3, text4, text5];
//资源加载列表
var imageList = ['beijing.jpg'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
