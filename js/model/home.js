$(function(){
	console.log('首页');
	$('#submit').click(function(){
		var name = $('#name').val();
		if(name===''){
			alert('请输入名称')
		}
		var param = {
			name : name
		};
		location.hash = vipspa.stringify('contact',param);
	});

	$('#submit1').click(function(){
		var tel = $('telno').val();
		if(tel===''){
			alert('请输入手机号码')
		}
		
		var msg = {
			id : "home_content",
			content: {
				tel : tel
			}
		}
		vipspa.setMessage(msg);
		location.hash = 'content';
	});
	
	$.sliderForUs({
            id:"slider1",
            tips:["验证成功","向右滑动验证"],
            style:"slider-auth",
            success:function(){
                alert("You are allowed to pass!");
            }
        }).init();
})
