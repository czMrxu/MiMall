<template>
    <div class="order-pay">
        <order-header title="订单支付">
            <template #tip>
                请谨防钓鱼链接或诈骗电话，了解更多>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-wrap">
                    <div class="item-order">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <p>
                                请在
                                <span>30分</span>
                                内完成支付, 超时后将取消订单
                            </p>
                            <p>收货信息：{{shippingInfo}}</p>
                        </div>
                        <div class="order-total">
                            <p>
                                应付总额：
                                <span>{{totalPay}}</span>
                                元
                            </p>
                            <p>
                                订单详情
                                <em class="icon-down" :class="{'isshow': showDetail}" @click="showDetail = !showDetail"></em>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="product-warp" v-show="showDetail">
                    <div class="item-order">
                        <div class="item">
                            <span>订单号：</span>
                            {{orderNo}}
                        </div>
                        <div class="item">
                            <span>收货信息：</span>
                            {{shippingInfo}}
                        </div>
                        <div class="item">
                            <span>商品名称：</span>
                            <ul>
                                <li v-for="(item, index) in productList" :key="index">
                                    <img v-lazy="item.productImage" alt="">
                                    {{item.productName}}×{{item.quantity}}
                                </li>
                            </ul>
                        </div>
                        <div class="item">
                            <span>发票信息：</span>
                            电子发票 个人
                        </div>
                    </div>
                </div>
                <div class="item-pay">
                    <h3>选择以下支付方式付款</h3>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <div class="pay pay-ali" :class="{'checked': payType==1}" @click="aliPay"></div>
                        <div class="pay pay-wechat" :class="{'checked': payType==2}" @click="wechatPay"></div>
                    </div>
                </div>
            </div>
        </div>
        <scan-pay-code v-show="showWechatCode" :payImg="payImg" @close="closeWechatCode"></scan-pay-code>
        <modal :showModal="showModal" btnType="3" sureText="查看订单" cancelText="未支付" title="支付确认" @submit="goOrderList" @cancel="showModal = false">
            <template #body>您确认是否完成支付</template>
        </modal>
    </div>
</template>

<script>
    import QRCode from 'qrcode';
    import OrderHeader from '../components/OrderHeader.vue';
    import ScanPayCode from '../components/ScanPayCode.vue';
    import Modal from '../components/Modal.vue';
    export default {
        name: 'order-pay',
        data() {
            return {
                orderNo: this.$route.query.orderNo,   // 订单编号
                shippingInfo: '',   // 收货人信息
                totalPay: '',   //总共要付多少钱
                productList: '',   // 购买的商品列表
                showDetail: false,   // 订单详情的展开与隐藏
                payType: 0,   //支付方式
                showWechatCode: false,   // 控制微信收款码弹框
                payImg: '',   // 微信二维码
                showModal: false,   // 支付确认窗口
                T: '',   // 轮询定时器
            }
        },
        components: {
            OrderHeader,
            ScanPayCode,
            Modal
        },
        mounted () {
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
                    let shipping = res.shippingVo;
                    this.shippingInfo = `${shipping.receiverName} ${shipping.receiverMobile} ${shipping.receiverProvince} ${shipping.receiverCity} ${shipping.receiverDistrict} ${shipping.receiverAddress}`;
                    this.totalPay = res.payment;
                    this.productList = res.orderItemVoList;
                })
            },
            // 支付宝支付
            aliPay(){
                this.payType = 1;
                window.open('/#/order/alipay?orderNo='+this.orderNo, '_blank');
            },
            // 微信支付
            wechatPay(){
                this.payType = 2;
                this.axios.post('/pay', {
                    orderId: this.orderNo,
                    orderName: '小米商城订单',
                    amount: 0.01,
                    payType: 2
                }).then((res)=>{
                    QRCode.toDataURL(res.content).then(url => {
                        this.showWechatCode = true;
                        this.payImg = url;
                        this.loopOrderState();
                    }).catch(()=>{
                        this.$message.error('微信二维码失效，请稍后再试');
                    })
                })
            },
            // 关闭微信支付
            closeWechatCode(){
                this.showWechatCode = false;
                this.showModal = true;
                clearInterval(this.T);
            },
            // 跳转到订单列表页面
            goOrderList(){
                this.$router.push('/order/list');
            },
            // 轮询当前订单支付状态
            loopOrderState(){
                this.T = setInterval(()=>{
                    this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
                        if(res.status == 20){
                            clearInterval(this.T);
                            this.goOrderList();
                        }
                    })
                }, 1000)
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .order-pay{
        &>.wrapper{
            padding: 30px 0 61px;
            background-color: $colorJ;
        }
        .container{           
            &>.order-wrap{
                height: 214px;
                padding: 62px 50px;
                background-color: $colorG;
                box-sizing: border-box;
                &>.item-order{
                    @include flex(flex-start);
                    &>.icon-succ{
                        width: 90px;
                        height: 90px;
                        margin-right: 40px;
                        border-radius: 50%;
                        @include bgImg(90px, 90px, '../../public/imgs/icon-gou.png', 60px);
                        background-color: #80c58a;
                    }
                    &>.order-info{
                        margin-right: 240px;
                        &>h2{
                            line-height: 30px;
                            font-size: $fontE;
                            margin-bottom: 20px;
                        }
                        &>p{
                            line-height: 20px;
                            font-size: $fontJ;
                            color: $colorC;
                            &>span{
                                color: $colorA;
                            }
                        }
                    }
                    &>.order-total{
                        &>p{
                            font-size: $fontJ;
                            &:first-child{
                                margin-bottom: 30px;
                            }
                            &>span{
                                font-size: $fontC;
                                color: $colorA;
                            }
                            &>em{
                                margin-left: 9px;
                                cursor: pointer;
                                transition: .6s;
                                @include bgImg(14px, 10px, '../../public/imgs/icon-down.png');
                                &.isshow{
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }
                }
            }
            &>.product-warp{
                padding: 0 50px 62px;
                background-color: $colorG;
                &>.item-order{
                    padding-left: 130px;
                    padding-top: 50px;
                    border-top: 1px solid $colorF;
                    &>.item{
                        font-size: $fontJ;
                        line-height: 50px;
                        @include flex(flex-start);
                        &>span{
                            display: inline-block;
                            width: 100px;
                        }
                        &>ul{
                            @include flex(flex-start);
                            &>li{
                                margin-right: 20px;
                                &>img{
                                    height: 30px;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
            &>.item-pay{
                padding: 26px 50px 72px;
                box-sizing: border-box;
                margin-top: 30px;
                background-color: $colorG;
                &>h3{
                    line-height: 26px;
                    font-size: $fontG;
                    font-weight: 200;
                    padding-bottom: 24px;
                    margin-bottom: 26px;
                    border-bottom: 1px solid $colorF;
                }
                &>.pay-way{
                    &>p{
                        line-height: 24px;
                        font-size: $fontH;
                    }
                    &>.pay{
                        width: 190px;
                        height: 66px;
                        margin-top: 20px;
                        cursor: pointer;
                        box-sizing: border-box;
                        border: 1px solid $colorF;
                        &.checked{
                            border: 1px solid $colorA;
                        }
                    }
                    &>.pay-ali{
                        @include bgImg(188px, 64px, '../../public/imgs/pay/icon-ali.png', 103px 38px);
                    }
                    &>.pay-wechat{
                        margin-left: 20px;
                        @include bgImg(188px, 64px, '../../public/imgs/pay/icon-wechat.png', 103px 38px);
                    }
                }
            }
        }
    }
</style>