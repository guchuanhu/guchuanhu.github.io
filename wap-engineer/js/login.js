$(function(){

    var wapAdminLogin = {
        userName:$('.user-name'),
        password:$('.user-password'),
        remeberMe:$('.remember-me'),
        remeber:$('.remember'),
        loginBtn:$('.login-btn'),
        submitToken:$('.submitToken').val(),
        tiphtml:$('.repair-bg-wrong-tip'),
        init:function(){
            wapAdminLogin.userExist();
            wapAdminLogin.passwordEmpty();
            wapAdminLogin.rememberTo();
            wapAdminLogin.login();
        },

        userExist:function(){
            wapAdminLogin.userName.on('change',function(){
                FormValidation(wapAdminLogin.userName,regConfig.empty,'用户名不能为空','用户名不能为空');
                $.post('/?c=Login&a=AjaxUserExist',
                    {userName:wapAdminLogin.userName.val(),
                        submitToken:wapAdminLogin.submitToken
                    },function(dat){
                        if(dat.status !== '1'){
                            wapAdminLogin.tip(wapAdminLogin.tiphtml,dat.msg,2000);
                        }
                    },'json');
                return false;
            });
        },
        passwordEmpty:function(){
            wapAdminLogin.password.on('change',function(){
                FormValidation(wapAdminLogin.password,regConfig.empty,'密码不能为空','密码不能为空');
            });
            return false;
        },
        rememberTo:function(){
            wapAdminLogin.remeber.on('click',function(){
                if(wapAdminLogin.remeberMe.val() === '1'){
                    wapAdminLogin.remeberMe.val(0);
                }else if(wapAdminLogin.remeberMe.val() === '0'){
                    wapAdminLogin.remeberMe.val(1);
                }
            });
        },
        login:function(){
            wapAdminLogin.loginBtn.on('click',function(){
                if(wapAdminLogin.userName.val() === '' || wapAdminLogin.password.val() === '' ){
                    wapAdminLogin.tip(wapAdminLogin.tiphtml,"用户名或者密码不能为空",2000);
                    return false;
                }
                $.post('/?c=Login&a=AjaxLogin',
                    {userName:wapAdminLogin.userName.val(),
                        password:wapAdminLogin.password.val(),
                        remeberMe:wapAdminLogin.remeberMe.val(),
                        submitToken:wapAdminLogin.submitToken
                    },function(dat){
                        if(dat.status === '1'){
                            location.href = '/?c=Index';
                        }else{
                            wapAdminLogin.tip(wapAdminLogin.tiphtml,dat.msg,2000);
                        }
                    },'json');
                return false;
            });
        },
        tip:function(tip,msg,second){
            tip.html(msg)
            tip.addClass("focus");
            setTimeout(function(){
                tip.removeClass('focus');
            },second);
        }
    }

    wapAdminLogin.init();

});