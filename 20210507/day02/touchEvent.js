
/**
 * //示例
 * touch(document.body,'slideDown',function(e){
         console.log('下滑');
         console.log(e);
     });
 */



/**
 * 吧touch代码优化成一个函数，方便处理给HTML元素设置触摸事件 
 * 支持 单击 双击 长按  滑动（上下左右）
 * @param {*} elem  需要设置事件的HTML元素
 * @param {*} type  事件类型
 * @param {*} handler  事件处理程序
 */
function touch(elem,type,handler){
    //支持的事件列表
    var types = ['click','dbclick','press','slideUp','slideDown','slideLeft','slideRight'];
    var index =-1;//用于判断type是否合法
    //判断type是否合法
    for(var i=0;i<types.length;i++){
        if(types[i]==type){
            index=i;
            break;
        }
    }
    //判断index是否等于-1 ，-1表示type不合法,报错或者退出函数
    if(index==-1){return;}//返回
    // handler 必须是一个函数
    if(typeof handler !='function'){return;}//handler必须是一个函数

    var point = {
        timer: -1 // 保存定时器id
      }; //保存当前触摸点的状态
      elem.addEventListener("touchstart", function(e) {
        //当前touchstart事件中使用的touch对象（获取触摸点）
        var p = e.changedTouches[0]; //当前触摸点对象
        // 设置数据
        point.startX = p.clientX; //获取触摸点在网页中的所在x坐标
        point.startY = p.clientY; //y坐标
        point.ismove = false; //假设当前触点没有滑动
        point.startime = new Date().getTime(); //获取事件触发时间
      });
      //指定move事件，保存当前触摸点的xy坐标和start事件中保存的开始下标的差值
      elem.addEventListener('touchmove',function(e){
          var p = e.changedTouches[0];
          // 获取差值,
          point.changeX =p.clientX- point.startX;
          point.changeY =p.clientY - point.startY;
          //判断是否滑动，绝对值,判断差距是否大于10,10是一个误差值
          if(Math.abs(point.changeX)>10 || Math.abs(point.changeY)>10){
              //滑动
              point.ismove=true;
          }
      });


      //
      elem.addEventListener("touchend", function(e) {
        //判断是否移动
        if (point.ismove) {
          //滑动
          //根据changex和changey的值是正负可以判断往那一个方向滑动
          var x = point.changeX;
          var y =point.changeY;
          //上滑 x不变y减少
          if(y<0&&Math.abs(y)>Math.abs(x)){
              if(type=="slideUp"){
                  handler(e);
              }
          }else if(y>0&&Math.abs(y)>Math.abs(x)){
            if(type=="slideDown"){
                handler(e);
            }
          }else if(x<0&&Math.abs(x)>Math.abs(y)){
            if(type=="slideLeft"){
                handler(e);
            }
          }else{
            if(type=="slideRight"){
                handler(e);
            }
          }
        } else {
          //长按
          var endtime = new Date().getTime();
          //获取触摸点留在屏幕的时间如果超过了700ms，那就是长按操作
          if (endtime - point.startime > 700) {
            if(type=="press"){
                handler(e);
            }
          } else {
            //点击
            //未滑动  单击   双击：300ms点击了2次
            // 如果是第一次点击那么timer是-1的。如果300ms内再一次单击，因为定时器还没有执行。所以timer
            //是不等于-1的。认为是双击操作。
            if (point.timer == -1) {
              point.timer = setTimeout(function() {
                //单击操作
                if(type=="click"){
                    handler(e);
                }
                point.timer = -1; //重置定时器
              }, 300);
            } else {
              //双击 操作
              if(type=="dbclick"){
                handler(e);
            }
              clearTimeout(point.timer); //停止定时器
              point.timer = -1;
            }
          }
        }
      });
}