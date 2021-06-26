<template>
  <div class="product">
    <product-parma :title="product.name">
      <template slot="buy">
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-parma>
    <div class="item-bg">
      <div class="container">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="javascript:;">全球首款双频 GP</a>
          <span>|</span>
          <a href="javascript:;">骁龙845</a>
          <span>|</span>
          <a href="javascript:;">AI 变焦双摄</a>
          <span>|</span>
          <a href="javascript:;">红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>{{product.price}}</em>
          </span>
        </div>
      </div>
    </div>
    <div class="item-bg-2 container"></div>
    <div class="item-bg-3"></div>
    <div class="item-swiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="../../public/imgs/product/gallery-2.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/imgs/product/gallery-3.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/imgs/product/gallery-4.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/imgs/product/gallery-5.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/imgs/product/gallery-6.jpg" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <p class="desc">小米8 AI变焦双摄拍摄</p>
    </div>
    <div class="item-video">
      <h2>
        60帧超慢动作摄影
        <br>
        慢慢回味每一瞬间的精彩
      </h2>
      <p>
        后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
        <br>
        更能AI 精准分析视频内容，15个场景智能匹配背景音效。
      </p>
      <div class="bg-video container" @click="showSlide=true"></div>
      <div class="video-box">
        <div class="overlay" v-show="showSlide"></div>
        <div class="video" :class="{'slide': showSlide}">
          <span class="icon-close" @click="showSlide=false"></span>
          <video src="../../public/imgs/product/video.mp4" controls="controls" muted autoplay></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ProductParma from '../components/ProductParam.vue';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    export default {
        name: 'product',
        data() {
          return {
            showSlide: false,   // 控制动画效果
            product: {},   // 商品信息
            swiperOption: {
              autoplay: true,
              slidesPerView: 3,
              spaceBetween: 30,
              freeMode: true,
              pagination: {
                el: '.swiper-pagination',
                clickable :true,
              }
            },

          }
        },
        components: {
          ProductParma,
          swiper,
          swiperSlide
        },
        mounted () {
          this.getProductInfo();
        },
        methods: {
          getProductInfo() {
            let id = this.$route.params.id;
            this.axios.get(`/products/${id}`).then((res)=>{
              this.product = res;
            })
          },
          buy(){
            let id = this.$route.params.id;
            this.$router.push(`/detail/${id}`);
          }
        },
    }
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  .product{
    button{
      margin-left: 10px;
    }
    &>.item-bg{
      height: 718px;
      min-width: 1226px;
      padding-top: 55px;
      color: $colorB;
      text-align: center;
      box-sizing: border-box;
      @include bgImg(100%, 718px, '../../public/imgs/product/product-bg-1.png', cover);
      &>.container{
        &>h2{
          line-height: 106px;
          font-size: $fontA;
          font-weight: bold;
        }
        &>h3{
          line-height: 31px;
          font-size: $fontE;
          letter-spacing: $fontK;
          font-weight: bold;
        }
        &>p{
          margin: 21px 0 40px;
          line-height: 21px;
          &>a{
            font-size: $fontI;
            color: $colorB;
          }
          &>span{
            margin: 0 15px;
          }
        }
        &>.price{
          line-height: 43px;
          &>span{
            line-height: 33px;
            font-size: 30px;
            &>em{
              line-height: 42px;
              font-size: $fontB;
            }
          }
        }
      }
    }
    &>.item-bg-2{
      height: 480px;
      background: url('../../public/imgs/product/product-bg-2.png') no-repeat center;
      background-size: contain;
    }
    &>.item-bg-3{
      height: 638px;
      min-width: 1226px;
      @include bgImg(100%, 638px, '../../public/imgs/product/product-bg-3.png', cover);
    }
    &>.item-swiper{
      color: $colorB;
      margin: 36px 0 52px;
      img{
        width: 100%;
      }
      &>.desc{
        line-height: 24px;
        font-size: $fontH;
        text-align: center;
      }
    }
    &>.item-video{
      margin-bottom: 76px;
      padding: 82px 0 100px;
      color: $colorG;
      text-align: center;
      background-color: #070708;
      &>h2{
        line-height: 79px;
        font-size: 60px;
        margin-bottom: 47px;
      }
      &>p{
        line-height: 31px;
        font-size: $fontE;
        margin-bottom: 58px;
      }
      &>.bg-video{
        height: 540px;
        background: url('../../public/imgs/product/gallery-1.png') no-repeat center;
        background-size: contain;
      }
      .video-box{
        .overlay{
          @include position(fixed);
          background-color: $colorB;
          opacity: .4;
          z-index: 10;
        }
        .video{
          position: fixed;
          top: -50%;
          left: 50%;
          z-index: 10;
          width: 1000px;
          height: 536px;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: .6s;
          &.slide{
            top: 50%;
            opacity: 1;
          }
          .icon-close{
            position: absolute;
            top: 20px;
            right: 20px;
            @include bgImg(20px, 20px, '../../public/imgs/icon-close.png');
            cursor: pointer;
            z-index: 11;
          }
          video{
            width: 100%;
            height: 100%;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
</style>