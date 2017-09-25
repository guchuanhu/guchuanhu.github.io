$(function(){
	//点击记住密码变色
	var flag=true;
	var ret=true;
	$('.remember').on('click',function(){
		if(flag){
			
			$(this).addClass('remember-enter');
			flag=false;
		}
		else{
			
			$(this).removeClass('remember-enter');
			flag=true;
		}
		
	});
	//一键清除密码
	$('.clear-password').on('click',function(){
		$(this).siblings().val('');
	});
	
	//点击获取验证码
	$('.obtain-code').on('click',function(){
		var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
		var text1="手机号不能为空！";
		var text2="请输入正确的手机号!";
		FormValidation($('.phone-num'),reg,text1,text2);
	});
	//点击下一步验证验证码
	$('.next-step').on('click',function(){
		
		var reg=/^\d{4}$/;
		var text1="验证码不能为空！";
		var text2="请输入正确的验证码!";
		FormValidation($('.identifying-code'),reg,text1,text2);
	});
	
	//点击设置新密码
	$('.complete').on('click',function(){
		var tip=$('.repair-bg-wrong-tip');
		var aInput1=$(".new-password");
		var aInput2=$(".new-password2");
		if(aInput1.val()!=aInput2.val()){
			tip.addClass('focus');
			tip.text("两次密码输入不一致！");
			setTimeout(function(){
				tip.removeClass('focus');
			},1000);
		}

		
	});
});

var regConfig = {
    moible:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    telCode:/^\d{4}$/,
    empty:/\w/
};
//表单验证
function FormValidation(inputName,reg,text1,text2){
		var tip=$(".repair-bg-wrong-tip");
		var name=$.trim(inputName.val());
		var leg = name.length;
		var msg = null;
	    var telReg = !!name.match(reg);
		if (leg==0) {                                //验证手机号
			msg = text1;
			tip.addClass("focus");
			setTimeout(function(){
				tip.removeClass('focus');
			},1000);
			
		}
		else{
			if(telReg == false){
				msg = text2;
				tip.addClass("focus");
				setTimeout(function(){
					tip.removeClass('focus');
					
				},1000);
			
			}
			else{
				
				tip.removeClass("focus");
				
			}
			
			
		}
		tip.text(msg);
	return false;
}
