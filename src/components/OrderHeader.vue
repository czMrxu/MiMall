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
    }
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  .order-header{
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
        }
      }
    }
  }
</style>