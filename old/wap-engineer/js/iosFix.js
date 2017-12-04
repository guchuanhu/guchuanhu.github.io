/**
 * Created by guchuan on 2017/9/29.
 * 修复iOS下fixedbug
 */

$(document).on("focus","input",function(){
    $("#fix_btn").css({"position":"relative"});
}).on("blur","input",function(){
    $("#fix_btn").css({"position":"fixed"});
});