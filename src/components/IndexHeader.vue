<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // ToDo Contact and privacy modals
})
</script>



<template>
  <img class="TX" src="./icons/TX.svg" alt="Team Xerbutri Logo">
  <h1 class="logo">Team Xerbutri</h1>
	
	<div class="menu" id="menu">
		<!--<a href="map" title="Team Xerbutri Maps"> Maps</a>
		<a href="avontuur/TXATX" title="Over Team Xerbutri urban exploring"> Over TX</a>
		<a href="avontuur/TXAUE" title="Over Urban exploring">Over UE</a>-->
		<a id="contact" title="Neem contact met ons op">Contact</a>
        <a id="privacy" title="Onze privacy declaratie">Privacy</a>
		<!--<a href="vier/xerbutri.php?lang=2" title="Visit the team xerbutri page version 4 in English" >EN</a>-->
	</div>
    <div id="contactpanel">
        <p>Voor op- of aanmerkingen, maak een issue op GitHub <a href="https://github.com/TeamXerbutri/teamxerbutri.github.io/issues">Team Xerbutri GitHub</a> </p>
    </div>
    <div id="privacypanel">
        <p>We respecteren privacy, deze site is gehost onder GitHub Pages en valt onder die privacy policy.</p>
    </div>

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

/*Uitzoeken!!*/
#contactpanel,#privacypanel{display:none;border-style:solid;width:180px;position:absolute;right:0;top:52px;color:#fff;border-color:#242424;border-width:4px;background-color:#303030;font-size:.85em;margin-top:2px;margin-right:4px;padding-left:8px;padding-right:8px}#contactpanel p span{display:none}#back-to-top{background-color:rgba(0,0,0,.25);border-radius:0;box-shadow:0 0 1px #fff;color:#fff;display:none;padding:5px 12px;position:fixed;right:3px;text-align:center;text-decoration:none;text-transform:uppercase;top:85%;transition:all 0.3s ease 0s;font-size:1.1em}#map{display:none}#oi{padding-top:50px;color:#fff;background-color:#242424;overflow:hidden;border:solid #242424 5px}#oc{margin-left:auto;margin-right:auto}#oi a{text-decoration:none;color:#fff}.filteren{position:fixed;padding:1px;top:3px;right:52px;z-index:2}

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

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>