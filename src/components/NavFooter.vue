<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="../../public/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">早入林</a><span>|</span>
      <a href="javascript:;">轮回之王</a><span>|</span>
      <a href="javascript:;">吖焦焦邋雷</a><span>|</span>
      <a href="javascript:;">牛逼普鲁士</a>
    </div>
    <div class="copyright">
      copyright &copy;2019 <span class="domain">mi.51purse.com</span> All Rights Reserved
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  .footer{
    height: 234px;
    border-top: 4px solid $colorA;
    background-color: $colorB;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: $colorD;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
    .copyright{
      .domain{
        color: $colorA;
      }
    }
  }
</style>