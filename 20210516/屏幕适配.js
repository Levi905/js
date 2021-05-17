window.addEventListener('load', function () {
    //给body设置尺寸变化事件
    window.addEventListener('resize', function () {
        //根据当前屏幕的宽度来设置font-size
        var device_width = window.innerWidth;
        if(device_width >=375) {
            document.documentElement.style.fontSize = 100/750 *device_width +"px";
        }
        
    });
})