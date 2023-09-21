<script setup lang="ts">
  import { RouterLink } from "vue-router";
  const props = defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});
</script>



<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <img class="TX" src="./icons/TX.svg" alt="Team Xerbutri Logo">
      <h1 class="logo">Team Xerbutri</h1>

    </div>
  </nav>
</template>

<style scoped>
.logo{
  font: normal normal bold 1em sans-serif;
  color: #fff;
  text-align: center;
  display:inline-block;
  margin:0;
  width:0
}
.menu a{display:none}
.menu a{
  color:#fff;
  text-decoration:none;
  width:100px;
  background-color:#303030;
  padding:13px 8px 13px 8px;
  transition:background-color 0.4s;
  border-bottom:1px solid #000
}
.menu{
  background-image:url(../pics/menu.png);
  display:inline-block;
  position:absolute;
  right:0;
  margin-top:3px;
  margin-right:8px;
  overflow:visible
}
.TX{
  display:inline-block;
  padding-top:4px;
  padding-left:4px
}

/* Ik wil de panels naar modals*/
#contactpanel,#privacypanel{display:none;border-style:solid;width:180px;position:absolute;right:0;top:52px;color:#fff;border-color:#242424;border-width:4px;background-color:#303030;font-size:.85em;margin-top:2px;margin-right:4px;padding-left:8px;padding-right:8px}
#contactpanel p span{display:none}



.filteren{position:fixed;padding:1px;top:3px;right:52px;z-index:2}

@media only screen and (min-width: 756px){
  .logo{
    font: normal normal bold 2.7em sans-serif;
  }

  .menu a{
    display: inline-block;
    color: #fff;
    text-decoration: none;
    height: 50px;
    background-color: #303030;
    padding: 13px 8px 0px 8px;
    transition: background-color 0.4s;
  }
  a:hover{
    background-color: #404040;
  }
  .menu{
    display: inline-block;
    float: right;
    height: 50px;
    overflow: hidden;
  }
}

</style>