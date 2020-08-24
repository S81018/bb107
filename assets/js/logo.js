// -----------------完成登录功能----------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // 收集账号，密码
    var data = $(this).serialize();
    // 用ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 把token保存到本地存储
                localStorage.setItem('token', res.token)
                // 跳转到index.html页面
                location.href = '/index.html';
            }
        }
    })
})