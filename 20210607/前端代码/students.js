const searchData = {
    type: 'name',
    value: ''
}

// 获取所有学生数据
showStudents();
async function showStudents() {
    const studentsData = await getStudents();
    renderStudents(studentsData);
}
function getStudents() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/students/getStudents',
            type: 'GET',
            data: {
                ...searchData
            },
            success({ code, data }) {
                if (code == 200) {
                    resolve(data);
                }
            }
        })
    })
}
function renderStudents(data) {
    // 渲染数据
    const html = data.map(item => (`
    <tr>
        <td>${item._id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.gender}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a href="#" data-id="${item._id}" class="deleteBtn">删除</a>
            <a href="#">修改</a>
        </td>
    </tr>
`)).join('');
    $('#studentsTb').html(html);
}

// 搜索
$('#searchValue').blur(function () {
    // 获取用户的搜索条件
    searchData.type = $('#searchType').val();
    searchData.value = $('#searchValue').val();
    showStudents();
})

// 新增学生
$('#addStudentsBtn').click(function () {
    const name = $('#addStudentsName').val();
    const age = $('#addStudentsAge').val();
    const gender = $('[name=addStudentsGender]:checked').val();

    $.ajax({
        url: '/students/addStudents',
        type: 'POST',
        data: { name, age, gender },
        success({ code }) {
            // console.log('新增学生结果', res);
            if (code == 200) {
                showStudents();
            }
        }
    })
})

// 删除学生
$('#studentsTb').on('click', '.deleteBtn', function () {
    const _id = $(this).data('id');
    $.ajax({
        url: '/students/deleteStudents',
        type: 'POST',
        data: { _id },
        success({ code }) {
            if (code == 200) {
                alert('删除成功');
                showStudents();
            }
        }
    })
})