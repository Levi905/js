const page = {
    pagenum: "3",
    pagenow: 0
};

$('.col-2').on('click', '.card-body', function (e) {
    let arr = $('.tab');
    for (var i = 0; i < arr.length; i++) {
        if (e.target.innerText == arr[i].querySelector('h3').innerText) {
            arr[i].style.display = 'block';
        } else {
            arr[i].style.display = 'none';
        }
    }
});

function addStusent() {
    let studentId = $('#studentId').val();
    let studentName = $('#studentName').val();
    let studentAge = $('#studentAge').val();
    let studentClass = $('#studentClass').val();
    let studentAchievement = $('#studentAchievement').val();
    $.ajax({
        url: "student/addStu",
        type: "post",
        data: { studentId, studentName, studentAge, studentClass, studentAchievement },
        success(student) {
            if (student.code == 200) {
                alert("添加成功");
            } else {
                alert("添加有误");
            }
        }
    });
}

function listStudent() {
    $.ajax({
        url: "student/listStu",
        type: "post",
        data: page,
        success(student) {
            show(student.data);
        }
    });
}

function delStudent() {
    let a = event.target.parentNode.parentNode.querySelector("td:first-child").innerText;
    $.ajax({
        url: "student/delStu",
        type: "post",
        data: { studentId: a },
        success(student) {
            listStudent();
        }
    });
}

function updateStusent() {
    let arr = $('.tab');
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.display = 'none';
    }
    $('.upStu')[0].style.display = 'block';
    let a = event.target.parentNode.parentNode.querySelector("td:first-child").innerText;
    $.ajax({
        url: "student/updateStu",
        type: "post",
        data: { studentId: a },
        success(student) {
            $('#upstudentId').val(student.data[0].studentId);
            $('#upstudentName').val(student.data[0].studentName);
            $('#upstudentAge').val(student.data[0].studentAge);
            $('#upstudentClass').val(student.data[0].studentClass);
            $('#upstudentAchievement').val(student.data[0].studentAchievement);
        }
    });
}

function reupdate() {
    let studentId = $('#upstudentId').val();
    let studentName = $('#upstudentName').val();
    let studentAge = $('#upstudentAge').val();
    let studentClass = $('#upstudentClass').val();
    let studentAchievement = $('#upstudentAchievement').val();
    $.ajax({
        url: "student/reupdate",
        type: "post",
        data: { studentId, studentName, studentAge, studentClass, studentAchievement },
        success(student) {
            $('.upStu')[0].style.display = 'none';
            let arr = $('.tab');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].querySelector('h3').innerText == "学生列表") {
                    arr[i].style.display = 'block';
                } else {
                    arr[i].style.display = 'none';
                }
            }
            listStudent();
        }
    });
}

function pagelistStudent(){
    page.pagenum = $('.page').val();
    $.ajax({
        url: "student/listStu",
        type: "post",
        data: page,
        success(student) {
            show(student.data);
        }
    });
}

$('#nextPage').click(function(){
    page.pagenum = $('.page').val();
    page.pagenow++;
    $.ajax({
        url: "student/listStu",
        type: "post",
        data: page,
        success(student) {
            show(student.data);
        }
    });
})

function show(data) {
    let listStu = document.querySelector('.listStu table tbody');
    let a = data.map(item => (`<tbody>
    <tr>
        <td>${item.studentId}</td>
        <td>${item.studentName}</td>
        <td>${item.studentAge}</td>
        <td>${item.studentClass}</td>
        <td>${item.studentAchievement}</td>
        <td><button onclick="updateStusent()">修改</button><button onclick="delStudent()">删除</button></td>
    </tr>
</tbody>`)).join("");
    listStu.innerHTML = a;
}