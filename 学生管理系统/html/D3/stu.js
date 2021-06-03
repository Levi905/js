
// 标签页切换
$(document).ready(function(){
    $("#change").show();
    $("#change1").hide();
})

$("#xinStu").click(function(){
    $("#change").hide();
    $("#change1").show();
})

$("#stuList").click(function(){
    $("#change").show();
    $("#change1").hide();
})

//渲染数据
$.ajax({
    url:"http://47.98.128.191:3000/students/getStudents",
    success(res){
        const arr = res.data.result;
        console.log(res)
        for(let i =0 ;i<arr.length;i++){
            let student = arr[i];
            showData(student)
        }
    }
})

 //展示到页面上主页
 function showData(student){ 
    var htmlStr=`
                <tr>
                    <td>${student._id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.gender}</td>               
                    <td>xuesheng</td>
                    <td>xuesheng</td>
                    <td>xuesheng</td>
                    <td>xuesheng</td>
                </tr>
    `;
    var $tr = $(`<tr>${htmlStr}</tr>`);
    $("tbody").append($tr)
}
