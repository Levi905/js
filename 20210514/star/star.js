window.onload = function(){

    var canvas = document.getElementById('starCanvas');
    //获取该canvas下的画笔对象
    var c = canvas.getContext('2d');//3D绘制 使用webGL
    var stars =[];//保存所有的星星对象
    //利用画笔提供的方法来完成图形的绘制
    // 绘制图片
    var bgimg = new Image();//底层是生成了一个<img>标签 HTMLImageElement
    var starimg = new Image();
    //设置图片地址，加载图片
    bgimg.setAttribute('src','girl.jpg');
    starimg.setAttribute('src','star.png');
    // alert(girl);
    //吧图片绘制到canvas中
    //问题：当图片指定src时，浏览器才会去加载图片，而加载中代码会继续执行。
    //在执行drawImage时，图片可以没有加载完成
    //解决：onload
    bgimg.onload = function(){
        
    }
    var index =0;//表示当前绘制的帧数
    //绘制星星图片
    starimg.onload =function(){
        // 创建星星
        for(var i=0;i<100;i++){
            var star = new Star(Math.random()*canvas.width,Math.random()*canvas.height);
            //将新的星星对象放入到数组中
            stars.push(star);
        }
        setInterval(function(){
            //先清理，后绘制
            c.clearRect(0,0,canvas.width,canvas.height);
            //c.drawImage(bgimg,0,0);
            // c.drawImage(starimg,index*7,0,7,7,0,0,49,49);
            //对数组中的每个星星进行绘制
            for(var i = 0;i<stars.length;i++){
                stars[i].draw(c,starimg);
                stars[i].move();
            }
        },50);
    }
    
}


//星星类
class Star{
    constructor(x,y){
        this.x = x;//绘制x坐标
        this.y = y;//绘制y坐标
        this.index =parseInt(Math.random()*7);//默认从0开始 0~6
        //x轴增加就向右走，x轴减少就往左走
        //y轴增加向下走，减少向上走
        //设置移动方向和速度， -0.5~ 0.5  -2~+2
        this.speedx = -2+Math.random()*4;
        this.speedY = -2+Math.random()*4;
    }
    //绘制星星
    draw(c,img){
        c.drawImage(img,this.index*7,0,7,7,this.x,this.y,7,7);
        //设置帧数 
        if(this.index<7){
            this.index++;
        }else{
            this.index=0;
        }
    }
    //移动方法
    move(){
        // 判断是否出界
        if(this.x >=canvas.width || this.x <=0){
            this.speedx = -this.speedx;
        }
        if(this.y >=canvas.height || this.y <=0){
            this.speedY =-this.speedY;
        }
        //进行移动
        this.x +=this.speedx;
        this.y +=this.speedY;
    }
}




