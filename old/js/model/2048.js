/**
 * Created by dell on 2017/6/7.
 */
$(function(){

    console.log($("#iptJc"));

    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);

    if("ontouchend" in document){
        $("#control").hide();
        $("body").height(window.innerHeight-16);
    }else{
        $("#control").show();
    }

    var tsX,tsY,x,y;

    $("body").on("touchstart",function(){
        tsX = event.changedTouches[0].clientX;
        tsY = event.changedTouches[0].clientY;
    });

    $("body").on("touchend",function(){
        x = tsX-event.changedTouches[0].clientX;//负右正左
        y = tsY-event.changedTouches[0].clientY;//负下正上
        if(Math.abs(x)>Math.abs(y)){//横向
            if(x>60){//向左移动60px以上
                arr = roll.forLeftVertical(arr);
                arr = randomForArr(arr);

            }else if(x<-60){//向右移动60px以上
                arr = roll.forRightVertical(arr);
                arr = randomForArr(arr);

            }
        }else{//纵向
            if(y>60){//向上移动60px以上
                arr = roll.forUpRow(arr);
                arr = randomForArr(arr);

            }else if(y<-60){//向下移动60px以上
                arr = roll.forDownRow(arr);
                arr = randomForArr(arr);

            }
        }
        showArr("#art",arr);//展示结果
    });

    var arr;

    function arrayMaker(num){
        var i,j,auto=[];
        for(i=0;i<num;i++) {
            for(j=0;j<num;j++) {
                if(auto[i] === undefined){
                    auto[i] = [];
                }
                auto[i][j]=0;
            }
        }
        return auto;
    }

    function tableMaker(len,item){//根据len生成item表单内容
        var i,j,tableBody='',tableTr='';
        for(i=0;i<len;i++) {
            tableTr += "<td></td>"
        }
        tableTr = "<tr>"+tableTr+"</tr>";
        for(i=0;i<len;i++) {
            tableBody += tableTr;
        }
        $(item).html(tableBody);
    }

    var roll = function(){//上下左右执行数字累加
        return {
            forLeftVertical:function(arr){
                var arrlike = [];
                for(var i=0 ;i<arr.length;i++){//规整 i 0->3
                    for(var k=0;k<arr[i].length;k++){//  k 0->3
                        if(!arrlike[k]){
                            arrlike[k] = [];
                        }
                        arrlike[i][k] = arr[k][i];
                    }
                }
                arr = this.forUpRow(arrlike);

                for(var i=0 ;i<arr.length;i++){// i 0->3
                    for(var k=0;k<arr[i].length;k++){//  k 0->3
                        arrlike[i][k] = arr[k][i];//横向赋值给竖行
                    }
                }

                return arrlike;
            },
            forRightVertical:function(arr){
                var arrlike = [];
                for(var i=0 ;i<arr.length;i++){//规整 i 0->3
                    for(var k=0;k<arr[i].length;k++){//  k 0->3
                        if(!arrlike[k]){
                            arrlike[k] = [];
                        }
                        arrlike[i][k] = arr[k][i];
                    }
                }
                arr = this.forDownRow(arrlike);
                for(var i=0 ;i<arr.length;i++){//规整 i 0->3
                    for(var k=0;k<arr[i].length;k++){//  k 0->3
                        arrlike[k][i] = arr[i][k];
                    }
                }
                return arrlike;
            },
            forDownRow:function(arr){
                arr = this.arrange(arr,true);
                for(i=0 ;i<arr.length;i++){
                    for(k=arr[i].length;k>0;k--){
                        if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                            arr[i][k]+=arr[i][k-1];
                            arr[i].splice(k-1,1);
                            arr[i].unshift(0);
                        }
                    }
                }
                return arr;
            },
            forUpRow:function(arr){
                arr = this.arrange(arr,false);
                for(i=0 ;i<arr.length;i++){
                    for(k=0;k<arr[i].length;k++){
                        if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                            arr[i][k]+=arr[i][k-1];
                            arr[i].splice(k-1,1);
                            arr[i].push(0);
                        }
                    }
                }
                return arr;
            },
            arrange:function(arr,down){
                var cloneArr = [],len;
                for(var i=0 ;i<arr.length;i++){//规整
                    for(var k=0;k<arr[i].length;k++){
                        if(!cloneArr[i]){cloneArr[i] = [];}
                        if(arr[i][k]!==0){
                            cloneArr[i].push(arr[i][k]);
                        }
                    }
                }

                for(i=0 ;i<arr.length;i++){
                    if(!cloneArr[i]){console.log(cloneArr,i);}
                    len = arr.length - cloneArr[i].length;
                    for(k=0;k<len;k++){
                        if(down){
                            cloneArr[i].unshift(0);
                        }else{
                            cloneArr[i].push(0);
                        }
                    }
                }
                return cloneArr;
            }
        }
    }();

    var n,rgbOrg;

    function showArr(it,arr){//展示结果
        $(it).find("tr").each(function(i,tr){
            $(tr).find("td").each(function(j,td){//展示
                n = Math.log(arr[j][i])/Math.LN2>0?Math.log(arr[j][i])/Math.LN2:0;
                n = n>15?15:n;//n的范围0-15
                rgbOrg = ((15-n)/15)*230;

                $(td).css({"background-color":"rgb(250,"+parseInt(240-(230-rgbOrg)/2)+","+parseInt(rgbOrg)+")"})
                    .text(arr[j][i]===0?'':arr[j][i]);
            });
        });
    }

    var whichArr = [],score = 0;

    function randomForArr(arr,index){//给arr随机生成index+1个4（20%）或2（80%）
        if(index === undefined){
            if(arr.length>5){//矩阵长度大于5，每次操作增加2个
                index = 1;
            }
            if(arr.length>9){//矩阵长度大于9，每次操作增加4个
                index = 3;
            }
        }

        whichArr = [],score = 0;
        for(var i=0;i<arr.length;i++){
            for(var j=0;j<arr[i].length;j++){
                if(arr[i][j]===0){
                    whichArr.push({i:i,j:j});
                }
                score += arr[i][j];
            }
        }
        $("#score").text(score);

        if(whichArr.length){
            a = whichArr[parseInt(whichArr.length*Math.random())];
            arr[a.i][a.j] = Math.random()>0.8?4:2;
        }else{
            if(checkGameOk()){
                var firm = confirm(" 游戏结束！ \n \n 点击确定重新开始。 \n ");
                if(firm){
                    setTimeout(function(){
                        initGame(init);
                    },0);
                }
            }
        }
        if(index&&whichArr.length){
            return randomForArr(arr,index-1);
        }else{
            return arr;
        }
    }

    function checkGameOk(){//检查游戏是否结束
        for(var i=0;i<arr.length;i++){//相邻数，右下检查
            for(var j=0;j<arr.length;j++){
                if(arr[i][j]===arr[i][j+1] || arr[i][j]===(arr[i+1]?arr[i+1][j]:undefined)){
                    return false;
                }
            }
        }
        return true;
    }

    function actionChoice(item){
        var a;
        switch(item){//根据dom的ID判断上下左右动作
            case "#up":
                arr = roll.forUpRow(arr);
                arr = randomForArr(arr);
                break;
            case "#right":
                arr = roll.forRightVertical(arr);
                arr = randomForArr(arr);
                break;
            case "#down":
                arr = roll.forDownRow(arr);
                arr = randomForArr(arr);
                break;
            case "#left":
                arr = roll.forLeftVertical(arr);
                arr = randomForArr(arr);
                break;
            default:
                console.log("绑定事件错误");
        }
        showArr("#art",arr);//展示结果
    }

    function bindClick(item,move,action){//绑定事件move给item，触发move后执行action
        $(item).on(move,function(){
            action(item,this);
        });
    }

    function initGame(initData){
        $("#iptJc").val(initData.arrLength);//给select赋值

        arr = arrayMaker(initData.arrLength);

        tableMaker(arr.length,initData.showTable);

        arr = randomForArr(arr,initData.randomNum);

        showArr(initData.showTable,arr);

        bindClick("#up","click",actionChoice);
        bindClick("#right","click",actionChoice);
        bindClick("#down","click",actionChoice);
        bindClick("#left","click",actionChoice);
    }

    var init = {
        arrLength:3,//矩阵长度
        randomNum:2,//初始数目
        showTable:"#art"//展示到此table
    },arrLenJc;

    initGame(init);

    bindClick("#iptJc","change",function(item,that){
        console.log($(that).val());
        if(typeof ($(that).val()-0) === "number"){
            arrLenJc = parseInt($(that).val());
        }else{
            arrLenJc = init.arrLength;
        }
        console.log(arrLenJc);
        initGame({
            arrLength:arrLenJc,
            randomNum:2,
            showTable:"#art"
        });
    });

});