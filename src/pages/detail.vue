<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper container">
      <div class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="../../public/imgs/detail/phone-1.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../../public/imgs/detail/phone-2.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../../public/imgs/detail/phone-3.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../../public/imgs/detail/phone-4.jpg" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="content">
        <h2 class="item-title">{{product.name}}</h2>
        <p class="item-info">
          相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
        </p>
        <div class="delivery">小米自营</div>
        <div class="item-price">
          {{product.price}}元
          <del class="del">{{product.price+100}}元</del>
        </div>
        <div class="line"></div>
        <div class="item-addr">
          <div class="addr">北京 北京市 朝阳区 安定门街道</div>
          <div class="stock">有现货</div>
          <i class="icon-loc"></i>
        </div>
        <div class="item-version clearfix">
          <h2>选择版本</h2>
          <div class="phone fl" :class="{'checked': version==1}" @click="version=1">6GB+64GB 全网通</div>
          <div class="phone fr" :class="{'checked': version==2}" @click="version=2">4GB+64GB 移动4G</div>
        </div>
        <div class="item-color">
          <h2>选择颜色</h2>
          <div class="phone checked">
            <span class="color"></span>
            深空灰
          </div>
        </div>
        <div class="item-total">
          <div class="phone-info clearfix">
            <div class="fl">{{product.name}} {{version==1 ? '6GB+64GB 全网通' : '4GB+64GB 移动4G'}} 深灰色</div>
            <div class="fr">{{product.price}}元</div>
          </div>
          <div class="phone-total">总计：{{product.price}}元</div>
        </div>
        <a href="javascript:;" class="btn btn-huge" @click="addCart">
          加入购物车
        </a>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="../../public/imgs/detail/item-price.jpeg" alt="">
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
    import ProductParam from '../components/ProductParam.vue';
    import ServiceBar from '../components/ServiceBar.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css'
    export default {
        name: 'detail',
        data() {
          return {
            id: this.$route.params.id,   // 获取商品id
            product: '',
            version: 1,
            swiperOption: {
              autoplay: true,
              loop: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              }
            }
          }
        },
        components: {
          swiper,
          swiperSlide,
          ProductParam,
          ServiceBar
        },
        mounted () {
          this.getProductInfo();
        },
        methods: {
          getProductInfo() {
            this.axios.get(`/products/${this.id}`).then((res)=>{
              this.product = res;
            });
          },
          addCart(){
            this.axios.post('/carts', {
              productId: this.id,
              selected: true
            }).then((res={cartProductVoList:0})=>{
              this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
              this.$router.push('/cart');
            });
          }
        },
    }
</script>

<style lang="scss">
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/config.scss';
  .detail{
    .wrapper{
      @include flex(space-between, flex-start);
      .swiper{
        width: 642px;
        margin-top: 8px;
        img{
          width: 100%;
        }
      }
      .content{
        flex: 1;
        color: $colorB;
        height: 870px;
        h2{
          line-height: $fontE;
          font-size: $fontH;  
          margin-bottom: 20px;  
        }
        .phone{
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: $fontI;
          text-align: center;
          border: 1px solid $colorH;
          box-sizing: border-box;
          cursor: pointer;
          &.checked{
            color: $colorA;
            border: 1px solid $colorA;
          }
        }
        h2.item-title{
          line-height: $fontD;
          padding: 30px 0 16px;
          font-size: $fontC;
        }
        .item-info{
          font-size: $fontJ;
          line-height: $fontH;
        }
        .delivery{
          margin: 26px 0 14px;
          line-height: 15px;
          font-size: $fontI;
          color: $colorA;
        }
        .item-price{
          line-height: 19px;
          font-size: $fontG;
          color: $colorA;
          .del{
            margin-left: 10px;
            line-height: 17px;
            font-size: $fontI;
            color: $colorD;
          }
        }
        .line{
          margin: 25px 0 28px;
          border-top: 1px solid $colorH;
        }
        .item-addr{
          padding-top: 31px;
          padding-left: 64px;
          height: 108px;
          border: 1px solid $colorH;
          background-color: #fafafa;
          box-sizing: border-box;
          position: relative;
          .addr{
            font-size: $fontJ;
            line-height: $fontJ;
            color: $colorC;
          }
          .stock{
            font-size: $fontJ;
            line-height: $fontJ;
            color: $colorA;
            margin-top: 15px;
          }
          .icon-loc{
            @include bgImg(20px, 20px, '../../public/imgs/icon-loc.png');
            @include position(absolute, -15px, 34px, 20px 20px);
          }
        }
        .item-version{
          margin-top: 30px;
        }
        .item-color{
          margin-top: 30px;
          span{
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-left: 15px;
            background-color: $colorC;
          }
        }
        .item-total{
          margin: 50px 0 30px 0;
          height: 108px;
          padding: 24px 33px 29px 30px;
          box-sizing: border-box;
          background-color: #fafafa;
          .phone-info{
            line-height: 19px;
            div{
              line-height: 19px;
              font-size: $fontJ;
            }
          }
          .phone-total{
            line-height: 31px;
            font-size: $fontE;
            color: $colorA;
            margin-top: 18px;
          }
        }
      }
    }
    .price-info{
      height: 340px;
      padding-top: 38px;
      background-color: #f3f3f3;
      box-sizing: border-box;
      .container{
        h2{
          line-height: 31px;
          font-size: $fontE;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>