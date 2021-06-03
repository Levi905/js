window.addEventListener("load",function(){
    window.addEventListener("resize",function(){
        adjust();
    })
    function adjust(){
        var width = window.innerWidth;
        if(width>=375){
            document.documentElement.style.fontSize = 100/750*width + "px"
        }
    }
    adjust();
})