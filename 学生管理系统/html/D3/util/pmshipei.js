window.addEventListener("load",function(){
    window.addEventListener("resize",function(){
        adjust();
    });
    function adjust(){
        var dang = window.innerWidth;
        if(dang>=375){
            document.documentElement.style.fontSize = 100/750*dang + "px";
        }
    }

});