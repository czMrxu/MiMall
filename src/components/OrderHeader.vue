<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>
          {{title}}
          <slot name="tip"></slot> 
        </h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'order-header',
        props:{
          title: String
        },
        computed: {
          ...mapState(['username']) 
        },
        methods: {
          // 退出登录
          logout(){
            this.axios.post('/user/logout').then(()=>{
            this.$message.success('退出成功');
            this.$cookie.set('userId', '', {expires: '-1'});
            this.$store.dispatch('saveUserName', '');
            this.$store.dispatch('saveCartCount', 0);
            window.location.href = '/#/login';
          })
        }
      },
    }
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  .order-header{
    border-bottom: 2px solid $colorA;
    .container{
      padding: 30px 0;
      .title, .username{
        display: inline-block;
        height: 55px;
        line-height: 55px;
        margin-left: 54px;
        h2{
          font-size: $fontC;
          color: $colorB;
          span{
            font-size: $fontJ;
            margin-left: 17px;
            color: $colorD;
            font-weight: 200;
          }
        }
      }
      .title{
        font-size: $fontC;
        color: $colorC;
      }
      .username{
        a{
          color: $colorC;
          font-size: $fontI;
          margin-right: 17px;
          &>:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>