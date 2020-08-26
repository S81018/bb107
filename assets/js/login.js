// ---------------------------切换登录和注册的盒子--------------------
$('.login a').click(function () {
    $('.register').show().prev().hide();
});
$('.register a').click(function () {
    $('.login').show().next().hide();
});

// -----------------完成登录功能----------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // 收集账号，密码
    var data = $(this).serialize();
    // 用ajax提交
    $.ajax({
        type: 'POST',
        url: '/api/login',
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

// --------------------------注册功能------------------
// 表单提交，阻止默认行为，收集用户名和密码，用ajax注册接口
$('.register form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                $('.login').show().next().hide();
                // 清空注册的表单
                $('.register form')[0].reset();
            }
        }
    })
})

// -----------------------完成表单验证-------------------------
// 1.用户名，密码不能为空
// 密码，重复密码长度6~12位，切不能出现空格
// 密码重复密码必须一致
// layui自定义验证规则
// 1.加载form模块
var form = layui.form;
// console.log(form);
form.verify({
    // 键：值（验证的方法）；
    // 使用数组
    // changdu: ['正则表达式','验证失败时的提示信息']
    changdu: [/^\S{6,12}$/, '长度6~12位,不能有空格'],
    // 使用函数
    same: function (val) {
        // 形参val,使用验证规则的输入框的值
        // 获取密码
        var pwd = $('.pwd').val();
        if (pwd != val) {
            return '两次密码不一致呦';
        }
    }
});