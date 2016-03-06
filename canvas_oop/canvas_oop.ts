/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

      st = ' ';
      
    render(context: CanvasRenderingContext2D) {
        
 
        context.font =  "100px Arial";
        context.fillStyle = '#000000';
    
        context.fillText(this.st, 0, 100);
    }
}

class TextField2 extends DisplayObject {

      st = ' ';
      
    render(context: CanvasRenderingContext2D) {
        
 
        context.font =  "60px Arial";
        context.fillStyle = '#000000';
    
        context.fillText(this.st, 0, 100);
    }
}

class TextField3 extends DisplayObject {

      st = ' ';
      
    render(context: CanvasRenderingContext2D) {
        
 
        context.font =  "20px Arial";
        context.fillStyle = '#000000';
    
        context.fillText(this.st, 0, 100);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
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
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");

var rect = new Rect();
rect.width = 230;
rect.height = 30;
rect.x = 400;
rect.y = 350;
rect.color = '#FFFFFF'

var rect2 = new Rect();
rect2.width = 230;
rect2.height = 30;
rect2.x = 400;
rect2.y = 420;
rect2.color = '#FFFFFF'

var text = new TextField();
text.st = '人生';
text.x = 400;
text.y = 100;


var text2 = new TextField2();
text2.st = 'Online';
text2.x=415;
text2.y=170;

var bitmap = new Bitmap();
bitmap.source = 'beijing.jpg';

var rect3 = new Rect();
rect3.width = 100;
rect3.height = 50;
rect3.x = 460;
rect3.y = 500;
rect3.color = '#a8d6e6'


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
//bitmap2.source = 'rensheng.jpg';
//渲染队列
var renderQueue = [ bitmap,text,text2,rect,rect2,rect3,text3,text4,text5,bitmap2];
//资源加载列表
var imageList = ['beijing.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


