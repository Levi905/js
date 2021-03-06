function msgeva(e) {
    var event = e || window.event;
    $box = $(".msgTit");
    //切换按钮状态
    $box.find("a").toggleClass("on");
    //切换标签页 
    var $imgs = $(".msgImgs");
    var $eva = $(".eva");
    if ($imgs.is(":hidden")) {
        $imgs.show();
        $eva.hide();
    } else {
        $imgs.hide();
        $eva.show();
    }
    //模拟数据
    Mock.mock("woniushop/commit", {
        'commits|0-10': [{
            'name': "@cname",
            'content': "@cword(50,100)",
            'imgs':[],
            'userimg|1':['01','02'],
            'data':'@date',
            'type':"颜色分类：大中小三件套(不含花)"
        }]
    });
    if ($eva.find(".per").size() == 0) {
        //没有评论，发送ajax请求并处理数据
        $.ajax({
            url: 'woniushop/commit',
            dataType: "json",
            success: function (data) {
                var html="";
                data.commits.forEach(elem => {
                    var imghtml ="";
                    
                    elem.imgs=randomarr(5);
                    elem.imgs.forEach(e=>{
                        imghtml = imghtml +`<p><img src="img/temp/eva${e}.jpg"></p>`;
                    });
                    // alert(imghtml);
                    html = html +`<div class="per clearfix"><img class="fl" src="img/temp/per${elem.userimg}.jpg"><div class="perR fl"><p>${elem.name}</p><p>${elem.content}</p><div class="clearfix">${imghtml}</div><p><span>${elem.date}</span><span>颜色分类：大中小三件套（不含花）</span></p></div></div>`;



                });
                $eva.html(html);
            }
        });
    }
}








function randomarr(num) {
    
    var arr = ["01", "02", "03", "04", "05", "06", "07"];
    if(num>0){
        arr.length =num;
    }
    
    arr.sort((a, b) => {
        return Math.random() > 0.5 ? -1 : 1;
    });
    return arr;
}

function setImgs() {

    var arr =randomarr();
    var $box = $(".msgImgs");

    var html = "";
    arr.forEach((v) => {
        html = html + "<img src='img/temp/det" + v + ".jpg'>";
    });
    $box.html(html);

}
setImgs();






// hover效果
function hoverSwitch() {
    //获取小图集合
    var $imgs = $(".proImg .smallImg img");
    $imgs.each(function () {
        //对每个小图进行hover处理
        $(this).hover(function () {
            //切换hover边框效果
            $(this).addClass("categ-active").siblings().removeClass("categ-active");
            var src = this.src;
            //创建大图src
            src = src.replace(".jpg", "_big.jpg");
            //alert(src);
            //设置大图src
            $(".det").attr("src", src);
        });
    });
}
hoverSwitch();
//事件委托
function clickSwitch(e) {
    var elem = e.target;
    var num;
    if (elem.src != "") {
        var start = elem.src.indexOf("small") + 5;
        var end = elem.src.indexOf(".jpg");
        //获取图片的编号
        num = elem.src.substring(start, end);
        //设置class 有点击效果
        elem.className = "categ-active";
    }

    //将其他同胞img元素的class设为""
    var $items = $(".categ img");
    $(elem).addClass("categ-active").siblings(".categ img").removeClass("categ-active");
    //拼成src并赋给大图src
    var $proimg = $(".det");
    var src = elem.src.substring(0, elem.src.indexOf("pro") + 3);
    src = src + "Big" + num + ".jpg";
    $proimg.attr("src", src);
}



function updateCount(elem) {
    //获取父元素
    var num = elem.parentNode;
    while (num != null && num.nodeType != 1) {
        num = num.parentNode;
    }
    var count = num.querySelectorAll(".count")[0];
    var oper = 0;
    if (elem.src.indexOf("add") > -1) {
        oper = 1;
    } else if (elem.src.indexOf("sub") > -1) {
        oper = -1;
    }
    var total = parseInt(count.innerText) + oper;
    if (total > 0) {
        count.innerText = total;
    }
}