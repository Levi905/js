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
        success(student) {
            let listStu = document.querySelector('.listStu table tbody');
            let data = student.data;
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
    });
}

function delStudent() {
    let a = event.target.parentNode.parentNode.querySelector("td:first-child").innerText;
    $.ajax({
        url: "student/delStu",
        type: "post",
        data:{studentId:a},
        success(student) {
            listStudent();
        }
    });
}