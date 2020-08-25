// -----------------------到达index页面，渲染头像和欢迎语----------------
function getUserInfo() {
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 1.设置欢迎你
                var name = res.data.nickname || res.data.username;
                $('.username').text(name);
                // 2.设置头像
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    var first = name.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(first).css('display', 'inline-block');
                }
            }
        },
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}
getUserInfo();



// --------------------------------退出功能----------------------
$('#logout').click(function () {
    layer.confirm('确定要退出吗？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
})