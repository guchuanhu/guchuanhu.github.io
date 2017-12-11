<template>
  <ul>
    <li v-for="item in menus" :key="item.href">
      <a :href="item.href">{{item.name}}</a>
      </li>
  </ul>
</template>

<script>
export default {
  name: 'menus',
  data(){
    return {
      menus:[
        {
          name:"首页",
          href:"#/"
        },
        {
          name:"小游戏",
          href:"#/two"
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  width: 100%;
}
</style>
