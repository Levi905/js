/**
 * @auther Deng naiwen
 * @time 2021-03-4
 * @version 1.0
 * 主要思路: 
 * 1. 星星随机绘制跟粒子动画类似，不过星星出生位置需要在随机x和y坐标之后减去画布宽高的一半，目的是为了随机正负
 * 2. 绘制星星的时候x和y坐标要加上画布宽高的一半，目的是将绘制的中心点移动到画布的正中心。因为画布的原点是在画布的左上角，所以需要更正绘制的中心。
 * 3. 更改星星位置时，是进行乘法运算，这样，就可以实现星星按照指定方向移动，而不是随机移动
 * 4. 加速度和更改大小和颜色是可选的
 */



var canvas = document.querySelector('#starCanvas');
var ctx = canvas.getContext('2d');
var starCount = 100;//每次新增星星数量

//设置画布大小为整个页面
canvas.width =innerWidth;
canvas.height =innerHeight;
var stars = [];//保存所有星星
//设置星星默认参数,可更改
var speedX = 0.001;//初始x加速度
var speedY = 0.001;//初始y加速度
var minSpeed = 0.002;//最小速度
var maxSpeed = 0.06;//最大速度
var starSize = 1.0;//星星初始半径
var starSizeMax =3;//星星最大半径
var opacityMin = 0.3;//星星最小透明度，由1逐渐降低
var opacityMax = 0.8;//星星最大透明度
var maxStarCount = 50000;//最多星星数量
var mouseX,mouseY;//记录鼠标位置，为加速做准备

//获取鼠标位置
document.body.addEventListener('mousemove',function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/*
功能函数
*/
//创建一个星星
function createStar(){
    var x = Math.ceil(Math.random()*canvas.width);
    var y = Math.ceil(Math.random()*canvas.height);
    var star = {
        x:x-canvas.width/2,
        y:y-canvas.height/2,
        size:starSize,//初始大小
        opacity:opacityMax,//初始透明度
        isSuper: Math.random() <0.1 ? true :false,
        move(){
            this.x+= speedX*this.x;
            this.y+= this.y*speedY;
        }
        
    }
    return  star;
}
//批量创建星星
function createStars(){
    if(stars.length<maxStarCount){
        for(var i=0;i<starCount;i++){
            var star = createStar();
            //添加到数组中
        stars.push(star);
        }
    }
    
}

//清屏
function clearScreen(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
//判断边界
function isOut(star){
    if(star.x>canvas.width*1.5 || star.y >canvas.height*1.5 ||star.x <-canvas.width/2 ||star.y<-canvas.height/2){
        return true;
    }
    return false;
}

//绘制所有星星
function drawStars(){
    
    for(var i=0;i<stars.length;i++){
        var star = stars[i];
        if(isOut(star)){
            stars.splice(i,1);
            i--;
            continue;
        }
        star.move();
        ctx.beginPath();
        //绘制坐标  
        var x = star.x+canvas.width/2;
        var y = star.y+canvas.height/2;  
        ctx.fillStyle =`rgba(255,255,255,${star.opacity})`;
        ctx.arc(x,y,star.size,0,Math.PI*2); 
        ctx.fill();
    }
    
    //ctx.stroke();
    ctx.closePath(); 
}


// 根据鼠标来进行加速
function changeSpeed(){
        //加速
        if(mouseY>100 && mouseY<canvas.height-100 &&mouseX >100 &&mouseX<canvas.width-100){
            if(speedX <maxSpeed){
                speedX += maxSpeed *0.005;
            }
            if(speedY <maxSpeed){
                speedY +=maxSpeed *0.005;
            }
        }else{
            if(speedX >minSpeed){
                speedX -= maxSpeed *0.005;
            }
            if(speedY >minSpeed){
                speedY -=maxSpeed *0.005;
            }
        }
}
//更改大小，10%为超级巨星，有更好的层次感
function changeSize (){
    stars.forEach(star=>{
        var rate = star.isSuper ? 3 : 1;
        //小于最大大小时，逐渐增加
        if(star.size <starSizeMax *rate && !star.isSuper){
            star.size *=1.01;
        }else if(star.size <starSizeMax *rate && star.isSuper){
            star.size *=1.05;
        }
    });
}
//改变透明度
function changeOpacity(){
    //透明度逐渐降低
    stars.forEach(star=>{
        if(star.opacity>opacityMin){
            star.opacity -=0.001;
        }
    })
}

/**
 * 函数结束
 */




//执行代码

function interval (){
    //核心
    clearScreen();
    drawStars();
    createStars();
    window.requestAnimationFrame(interval);
    console.log(stars.length);
    //可选加速、更改大小以及透明度,不需要注释即可
     changeSpeed();
     changeSize();
     changeOpacity();
   
}
window.requestAnimationFrame(interval);











