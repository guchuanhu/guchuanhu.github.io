<template>
  <div id="app">
    <div class="menus">
      <menus/>
    </div>
    <div class="container">
      <router-view/>
    </div>
    
    <!-- <img src="./assets/logo.png"> -->
    
  </div>
</template>

<script>
import "./assets/css/init.css";
import menus from './components/menus.vue';
import two from './components/two.vue';
export default {
  name: 'apps',
  data(){
    return {
      selfSay:"I'm app.vue"
    }
  },
  components: { menus,two },
  created(){
    
    this.$http.get("/api/Order_Detail/AjaxOrder/",{params:{mobile:18335831710,page:3}}).then((response) => {
      console.log(response.data)
    });
    this.$http.post("/api/Order_Detail/AjaxPost/",{submitToken:18335831710,orderSn:3,postId:3,serverId:3}).then((response) => {
      console.log(response.data)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  height: 100%; 
  width: 100%;
  position: fixed;
}
.menus{
  width: 200px;
  height: 100%;
  position: absolute;
  overflow: auto;
}
.container{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 200px;
  overflow: auto;
}
</style>