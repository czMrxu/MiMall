<template>
    <div class="scan">
        <div class="mask"></div>
        <div class="item-warp">
            <div class="img-scan"></div>
            <div class="img-pay">
                <div class="title">
                    微信支付
                    <em @click="close"></em>
                </div>
                <div class="qrcode">
                    <img :src="payImg" alt="">
                </div>
                <div class="tip">
                    <p>请使用微信扫一扫</p>
                    <p>二维码完成支付</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'scanpaycode',
        props: ['payImg'],
        methods: {
            close() {
                this.$emit('close');
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .scan{
        &>.mask{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: .6;
            background-color: #000;
        }
        &>.item-warp{
            @include flex();
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            &>.img-scan{
                @include bgImg(296px, 485px, '../../public/imgs/pay/icon-scan.png');
                display: block;
            }
            &>.img-pay{
                width: 370px;
                height: 440px;
                background-color: $colorG;
                &>.title{
                    height: 60px;
                    line-height: 60px;
                    width: 100%;
                    font-size: $fontG;
                    padding: 0 18px;
                    box-sizing: border-box;
                    background-color: $colorJ;
                    position: relative;
                    &>em{
                        cursor: pointer;
                        @include bgImg(13px, 13px, '../../public/imgs/icon-close.png');
                        position: absolute;
                        right: 18px;
                        top: 50%;
                        margin-top: -6.5px;
                    }
                }
                &>.qrcode{
                    padding-top: 44px;
                    padding-bottom: 26px;
                    &>img{
                        display: block;
                        width: 240px;
                        margin: 0 auto;
                    }
                }
                &>.tip{
                    &>p{
                        text-align: center;
                        line-height: $fontG;
                        font-size: $fontJ;
                    }
                }
            }
        }
    }
</style>