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
rect.width = 500;
rect.height = 500;
rect.color = '#000000'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'

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

//渲染队列
var renderQueue = [rect, rect2, bitmap,text,text2];
//资源加载列表
var imageList = ['beijing.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


