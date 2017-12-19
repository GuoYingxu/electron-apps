<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {ipcRenderer} from 'electron'
  export default {
    name: 'electron-apps',
    computed:{
      ...mapState({
        configPath:state => state.App.configPath
      })
    },
    mounted(){
      if(this.configPath.length === 0){
        ipcRenderer.send('getConfigPath')
      }
      ipcRenderer.on('setConfigPath',(event,data)=> {
        console.log(data)
        this.$store.commit('SET_CONFIG_PATH',data)
      })
    },
  }
</script>

<style>
  /* CSS */
</style>