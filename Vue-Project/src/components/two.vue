<template>
  <div id="fulltwo" class="two" :class="{fulls:isfulls}" @keyup.up="forLeftVertical(arr)">
    <div v-show="mask" class="mask">
        <h1>2048</h1>
        <h1 @click="mask=!mask" style="cursor:pointer;">开始游戏</h1>
        <h2>选择难度：
            <select v-model="diff">
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </h2>
        <h2 @click="isfulls=!isfulls;mask=!mask" style="cursor:pointer;">全屏模式</h2>
    </div>

    <h1>总分数：{{score}}</h1>
    <table>
      <tr id="art" v-for="(tr,index) in arr" :key="index">
        <td :style="td|bgColor" v-for="(td,ind) in tr" :key="ind" >{{td==0?null:td}}</td>
      </tr>
    </table><br />
    <table id="control">
        <tr><td></td><td @click='forLeftVertical(arr)' id="up">上</td><td></td></tr>
        <tr><td @keyup.left='forUpRow(arr,true)' @click='forUpRow(arr,true)' id="left">左</td><td></td><td @click='forDownRow(arr,true)' @keyup.right='forDownRow(arr,true)' id="right">右</td></tr>
        <tr><td></td><td @keyup.down='forRightVertical(arr)' @click='forRightVertical(arr)' id="down">下</td><td></td></tr>
    </table>
    <h2 v-show="isfulls" @click="isfulls=!isfulls;mask=!mask" style="cursor:pointer;">退出全屏</h2>
    <h2 v-show="!isfulls" @click="mask=!mask" style="cursor:pointer;">结束游戏</h2>
  </div>
</template>

<script>
export default {
  name: 'two',
  data(){
    return {
      arr: [],
      diff: 3,
      mask:true,
      isfulls:false,
      score:0
    };
  },
  mounted(){
    this.arrayMaker();
    this.randomForArr(this.arr,1);
    this.actionEvent();
  },
  watch:{
    diff(n,o){
        this.arrayMaker();
    }
  },
  methods: {
    arrayMaker(){
      var num = this.diff;
      var i,j,auto=[];
      for(i=0;i<num;i++) {
          for(j=0;j<num;j++) {
              if(auto[i] === undefined){
                  auto[i] = [];
              }
              auto[i][j]=0;
          }
      }
      this.$data.arr = auto;

    },
    randomForArr(arr,index){//给arr随机生成index+1个4（20%）或2（80%）
      if(index === undefined){
          if(arr.length>5){//矩阵长度大于5，每次操作增加2个
              index = 1;
          }
          if(arr.length>9){//矩阵长度大于9，每次操作增加4个
              index = 3;
          }
      }

      var whichArr = [],score = 0;
      for(var i=0;i<arr.length;i++){
          for(var j=0;j<arr[i].length;j++){
              if(arr[i][j]===0){
                  whichArr.push({i:i,j:j});
              }
              score += arr[i][j];
          }
      }
      this.$data.score = score;

      if(whichArr.length){
          var a = whichArr[parseInt(whichArr.length*Math.random())];
          arr[a.i][a.j] = Math.random()>0.8?4:2;
      }else{
          if(this.checkGameOk(this.$data.arr)){
              var firm = confirm(" 游戏结束！ \n \n 点击确定重新开始。 \n ");
              if(firm){
                  setTimeout(function(){
                      console.log("initGame(init)");
                  },0);
              }
          }
      }
      if(index&&whichArr.length){
          return this.randomForArr(this.$data.arr,index-1);
      }else{
        return arr;
      }
    },
    forLeftVertical(arr){
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

        this.$data.arr = this.randomForArr(arrlike);
    },
    forRightVertical(arr){
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
        for(i=0 ;i<arr.length;i++){//规整 i 0->3
            for(k=0;k<arr[i].length;k++){//  k 0->3
                arrlike[k][i] = arr[i][k];
            }
        }
        this.$data.arr = this.randomForArr(arrlike);
    },
    forDownRow(arr,stop){
        arr = this.arrange(arr,true);
        for(var i=0 ;i<arr.length;i++){
            for(var k=arr[i].length;k>0;k--){
                if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                    arr[i][k]+=arr[i][k-1];
                    arr[i].splice(k-1,1);
                    arr[i].unshift(0);
                }
            }
        }
        if(stop){//无矩阵操作
          this.$data.arr = this.randomForArr(arr);
        }else{//有矩阵操作
          return arr;
        }
    },
    forUpRow(arr,stop){
        arr = this.arrange(arr,false);
        for(var i=0 ;i<arr.length;i++){
            for(var k=0;k<arr[i].length;k++){
                if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                    arr[i][k]+=arr[i][k-1];
                    arr[i].splice(k-1,1);
                    arr[i].push(0);
                }
            }
        }
        if(stop){//无矩阵操作
          this.$data.arr = this.randomForArr(arr);
        }else{//有矩阵操作
          return arr;
        }
    },
    arrange(arr,down){
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
    },
    checkGameOk(arr){//检查游戏是否结束
        for(var i=0;i<arr.length;i++){//相邻数，右下检查
            for(var j=0;j<arr.length;j++){
                if(arr[i][j]===arr[i][j+1] || arr[i][j]===(arr[i+1]?arr[i+1][j]:undefined)){
                    return false;
                }
            }
        }
        return true;
    },
    actionEvent(){
      if("ontouchend" in document){//手机端


        let tsX,tsY,x,y;

        document.getElementById("fulltwo").addEventListener("touchstart",event=>{
            tsX = event.changedTouches[0].clientX;
            tsY = event.changedTouches[0].clientY;
        });
        document.getElementById("fulltwo").addEventListener("touchend",event=>{
            x = tsX-event.changedTouches[0].clientX;//负右正左
            y = tsY-event.changedTouches[0].clientY;//负下正上
            if(Math.abs(x)>Math.abs(y)){//横向
                if(x>60){//向左移动60px以上
                    this.forUpRow(this.arr,true);

                }else if(x<-60){//向右移动60px以上
                    this.forDownRow(this.arr,true);

                }
            }else{//纵向
                if(y>60){//向上移动60px以上
                    this.forLeftVertical(this.arr);

                }else if(y<-60){//向下移动60px以上
                    this.forRightVertical(this.arr);

                }
            }
        });
      }else{//pc端
      
      }
    }
  },
  filters:{
    bgColor(num){
      var n = Math.log(num)/Math.LN2>0?Math.log(num)/Math.LN2:0;
      n = n>15?15:n;//n的范围0-15
      var rgbOrg = ((15-n)/15)*230;
      return {backgroundColor:'rgb(250,'+parseInt(240-(230-rgbOrg)/2)+','+parseInt(rgbOrg)+')'};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.two{
    position: relative;
    background-color: white;
}
  #control{
      margin: auto;
      width: 240px;
      height: 240px;
  }
  #control td{
      width:80px;
      height:80px;
      text-align: center;
      font-size: 24px;
  }
  #up,#right,#down,#left{
      cursor: pointer;
  }
  #art{
      margin: auto;
  }
  #art td{
      width:100px;
      height:100px;
      text-align: center;
      font-size: 24px;
      border: 1px solid white;
  }
  .scoreShow{
      width:100%;
      margin:auto;
      margin-bottom: 10px;
  }
  .scoreShow td{
      text-align:center;
      width:33.33%;
  }
  .ball-down{
      width:200px;
      height:100px;
      border-radius: 0 0 100px 100px;
      background:white;
  }
  .ball-line{
      height: 10px;
      width: 200px;
      background-color: black;
  }
  .ball-small{
      position: absolute;
      top: 87px;
      left: 82px;
      height: 40px;
      width: 40px;
      border-radius: 25px;
      background-color: black;
  }
  .ball-small-small{
      margin: auto;
      margin-top: 7px;
      height: 25px;
      width: 25px;
      border-radius: 25px;
      background-color: white;
  }
  .fulls,.mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .fulls table{
      margin: auto;
  }
  .mask{
      position: absolute;
      background-color: #eeddad;
      padding-top: 50px;
  }
  .two h1{
    text-align: center;
    line-height: 60px;
    font-size: 30px;
  }
  .two h2{
      margin-top: 20px;
    text-align: center;
  }
</style>