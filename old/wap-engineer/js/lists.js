
$("#fakerstar").on("change",function () {
    if($(this).val()){
        $("#fakerstarplar").hide();
    }else {
        $("#fakerstarplar").show();
    }
});
$("#fakerstarbor").on("change",function () {
    if($(this).val()){
        $("#fakerstarborplar").hide();
    }else {
        $("#fakerstarborplar").show();
    }
});

$('.hot').on("touchmove scroll",function () {
    if ($(this)[0].clientHeight + $(this)[0].scrollTop >=  $(this)[0].scrollHeight && $("#gifForlist").css("display")==="none") {
        $("#gifForlist").show();
        setTimeout(function () {
            $("#alists").append("<li><h1>"+Math.random()+"</h1></li>");
            $("#gifForlist").hide();
        },3000);
    }
    if($("#alists").height()<$(".hot").height()-$(".hot").css("top").split("px")[0]){
        /*当初始记录没有滚动条，走此逻辑*/
    }
});


var c="2017年10月16日 上午10:30";
if(c.indexOf("年")!==-1){
    c.replace("年","-").replace("月","-").replace("日","").replace("上午","").replace("下午","")
}else if(c.indexOf("上午")!==-1){

}