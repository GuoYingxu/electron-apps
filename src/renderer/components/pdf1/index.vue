<template lang="pug">
  .page
    .mainPage(@click='showList',v-if= 'current_page == "main"')
    .listPage(v-if='current_page=="list"')
      Row
        Col(span=8)
          .button(@click="showpdf('中华人民共和国刑法')")
            img(src="./pics/01-1.png")
        Col(span=8)
          .button(@click="showpdf('公益诉讼法条')")
            img(src="./pics/02-1.png")
        Col(span=8)
          .button(@click="showpdf('固体废物污染环境防治法')")
            img(src="./pics/03-1.png")
      Row
        Col(span=8)
          .button(@click="showpdf('海洋环境保护法')")
            img(src="./pics/04-1.png")
        Col(span=8)
          .button(@click="showpdf('环境保护法')")
            img(src="./pics/05-1.png")
        Col(span=8)
          .button(@click="showpdf('矿产资源法')")
            img(src="./pics/06-1.png")
      Row
        Col(span=8)
          .button(@click="showpdf('生态法治（法条组合）')")
            img(src="./pics/07-1.png")
        Col(span=8)
          .button(@click="showpdf('野生动物保护法')")
            img(src="./pics/08-1.png")
        Col(span=8)
          .button(@click="showpdf('渔业法')")
            img(src="./pics/09-1.png")
      Row
        Col(span=8)
          .button(@click="showpdf('土地管理法')")
            img(src="./pics/10-1.png")
        Col(span=8)
          .button(@click="showpdf('中华人民共和国大气污染防治法')")
            img(src="./pics/11-1.png")
        Col(span=8)
          .button(@click="showpdf('中华人民共和国森林法')")
            img(src="./pics/12-1.png")
      Row
        Col(span=8)
          .button(@click="showpdf('中华人民共和国水污染防治法')")
            img(src="./pics/13-1.png")
        Col(span=16)
          .button(@click="showpdf('关于办理环境污染刑事案件适用法律若干问题的解释')")
            img(src="./pics/14-1.png")
    .viewer(v-if="current_page=='viewer'")
      webview(ref='pdfviewer',:src="viewUrl")
    .backButtonCon(v-if="current_page!='main'",@click='returnFunc')
      Button 返回
</template>

<script>
import path from 'path'
import {mapState} from 'vuex'
const PDF_JS_PATH = path.join(path.resolve(__dirname), '../../../pdfjs', 'web', 'viewer.html');
export default {
  data(){
    return {
      current_page: 'main',
      current_file: ''
    }
  },
  methods:{
    showList(){
      this.current_page = 'list'
    },
    showpdf(name){
      this.current_file = this.configPath + '/' + name +'.pdf' 
      this.current_page = 'viewer';
      this.$nextTick(()=>{
        console.log(this.$refs)
      console.log(this.$refs.pdfviewer)
      this.$refs.pdfviewer.src=this.viewUrl

      })
    },
    returnFunc(){
      if(this.current_page == 'viewer'){
        this.current_page = 'list'
      }else
      if(this.current_page === 'list'){
        this.current_page ='main'
      }
    }

  },
  computed:{
    ...mapState({
      configPath: state => state.App.configPath
    }),
    viewUrl(){
      return this.current_file === '' ? '' :  `file://${PDF_JS_PATH}?file=file://${this.current_file}`
    }
  }
}
</script>
<style lang="scss">
  @import './index.scss';
</style>

