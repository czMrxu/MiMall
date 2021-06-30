<template>
    <div class="order-confirm">
        <order-header title="订单确认">
            <template #tip>请认真填写收货地址</template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div class="addr-info fl" v-for="(item, index) in list" :key="index" @click="checkedAddress = item" :class="{'checked': checkedAddress==item}">
                                <h2>{{item.receiverName}}</h2>
                                <div class="phone">{{item.receiverMobile}}</div>
                                <div class="street">{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</div>
                                <div class="action">
                                    <a href="javascript:;" @click.stop="delAddress(item)">
                                        <svg viewBox="0 0 32 32" width="20px" height="20px" fill="currentColor">
                                            <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
                                            <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                                            <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                                            <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" @click.stop="changeAddress(item)">
                                        <svg viewBox="0 0 32 32" width="20px" height="20px"  fill="currentColor">
                                            <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="addr-add fl" @click="addAddress({})">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-good">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item, index) in cartList" :key="index">
                                <div class="good-name">
                                    <img v-lazy="item.productMainImage" alt="">
                                    <span>{{item.productName+' '+item.productSubtitle}}</span>
                                </div>
                                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                                <div class="good-total">{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a href="javascript:;">电子发票</a>
                        <a href="javascript:;">个人</a>
                    </div>
                    <div class="item-detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{count}}件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
                        <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <modal :title="'删除收货地址提示'" :btnType="'3'" :showModal="showDelModal" @cancel="showDelModal = !showDelModal" @submit="handleAddress">
            <template #body>您是否要删除地址{{editAddress.receiverAddress}}</template>
        </modal>
        <modal :title="'收货地址'" :btnType="'3'" :showModal="showEditModal" @cancel="showEditModal = !showEditModal" @submit="handleAddress">
            <template #body>
                <div class="edit-warp">
                    <div class="item">
                        <input type="text" class="input" placeholder="姓名" v-model="editAddress.receiverName">
                        <input type="text" class="input" placeholder="手机号" v-model="editAddress.receiverMobile">
                    </div>
                    <div class="item">
                        <select name="province" id="" v-model="editAddress.receiverProvince">
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="河北">河北</option>
                        </select>
                        <select name="city" id="" v-model="editAddress.receiverCity">
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="石家庄">石家庄</option>
                        </select>
                        <select name="district" id="" v-model="editAddress.receiverDistrict">
                            <option value="昌平区">昌平区</option>
                            <option value="海淀区">海淀区</option>
                            <option value="东城区">东城区</option>
                            <option value="西城区">西城区</option>
                            <option value="顺义区">顺义区</option>
                            <option value="房山区">房山区</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea name="street" v-model="editAddress.receiverAddress"></textarea>
                    </div>
                    <div class="item">
                        <input type="text" class="input" placeholder="邮编" v-model="editAddress.receiverZip">
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
    import OrderHeader from '../components/OrderHeader.vue';
    import Modal from '../components/Modal.vue';
    export default {
        name: 'order-onfirm',
        data() {
            return {
                list: [],   // 收货地址列表
                cartList: [],   // 购物车中需要结算的商品列表
                cartTotalPrice: 0,   // 商品总金额
                count: 0,   // 结算商品总数量
                checkedAddress: '',   // 被选中的地址
                editAddress: {},   // 编辑地址
                showDelModal: false,   // 控制删除弹框
                showEditModal: false,   // 控制编辑弹框
                handleType: 0,   // 操作类型
            }
        },
        components: {
            OrderHeader,
            Modal,
        },
        mounted () {
            this.getAddressList();
            this.getCartList();
        },
        methods: {
            getAddressList() {
                this.axios.get('/shippings').then((res)=>{
                    this.list = res.list;
                    this.checkedAddress = this.list[0];
                })
            },
            getCartList(){
                this.axios.get('/carts').then((res)=>{
                    let list = res.cartProductVoList;   // 获取购物车中所有商品数据
                    this.cartTotalPrice = res.cartTotalPrice;   // 商品总金额
                    this.cartList = list.filter(item => item.productSelected);
                    this.cartList.map((item)=>{
                        this.count += item.quantity;
                    })
                })
            },
            // 删除收货地址
            delAddress(item){
                this.handleType = 1;
                this.editAddress = item;
                this.showDelModal = true;
            },
            // 修改收货地址
            changeAddress(item){
                this.handleType = 2;
                this.editAddress = item;
                this.showEditModal = true;
            },
            // 添加收货地址
            addAddress(item){
                this.handleType = 3;
                this.editAddress = item;
                this.showEditModal = true;
            },
            // 收货地址的操作
            handleAddress(){
                if(this.handleType == 1){
                    this.axios.delete(`/shippings/${this.editAddress.id}`).then(()=>{
                        this.$message.success('删除成功');
                        this.showDelModal = false;
                        this.getAddressList();
                    })
                }else{
                    let receiverPhone = '';
                    let {receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = this.editAddress;
                    if(!receiverName){
                        this.$message.error('请输入收货人');
                    }else if(!(/^1[3-9]\d{9}$/.test(receiverMobile))){
                        this.$message.error('请输入正确的手机号码');
                    }else if(!receiverProvince){
                        this.$message.error('请选择对应省市');
                    }else if(!receiverCity){
                        this.$message.error('请选择对应城市');
                    }else if(!receiverDistrict){
                        this.$message.error('请选择对应村镇');
                    }else if(!receiverAddress){
                        this.$message.error('请填写详细地址');
                    }else if(!(/^\d{6}$/.test(receiverZip))){
                        this.$message.error('请填写6位邮编');
                    }else{
                        if(this.handleType==3){
                            this.axios.post('/shippings', {
                                receiverName,
                                receiverPhone,
                                receiverMobile,
                                receiverProvince,
                                receiverCity,
                                receiverDistrict,
                                receiverAddress,
                                receiverZip
                            }).then(()=>{
                                this.$message.success('添加成功');
                                this.getAddressList();
                                this.showEditModal = false;
                            })
                        }else{
                            this.axios.put(`/shippings/${this.editAddress.id}`, {
                                receiverName,
                                receiverPhone,
                                receiverMobile,
                                receiverProvince,
                                receiverCity,
                                receiverDistrict,
                                receiverAddress,
                                receiverZip
                            }).then(()=>{
                                this.$message.success('地址更新成功');
                                this.getAddressList();
                                this.showEditModal = false;
                            })
                        }
                    }
                }
            },
            // 购物车结算
            orderSubmit(){
                if(!this.checkedAddress.id){
                    this.$message.error('请选择一个收货地址');
                    return;
                }
                this.axios.post('/orders', {
                    shippingId: this.checkedAddress.id
                }).then((res)=>{
                    this.$router.push({
                        path: '/order/pay',
                        query: {
                            orderNo: res.orderNo
                        }
                    })
                })
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .order-confirm{
        .wrapper{
            padding: 30px 0 84px;
            background-color: rgb(245, 245, 245);
            &>.container{
                background-color: $colorG;
                &>.order-box{
                    padding-left: 40px;
                    padding-bottom: 40px;
                    &>.item-address{
                        padding-top: 38px;
                        &>.addr-title{
                            line-height: $fontD;
                            font-size: $fontG;
                            font-weight: 200;
                            margin-bottom: 21px;
                        }
                        &>.addr-list{
                            &>.addr-info{
                                width: 270px;
                                height: 180px;
                                padding: 15px 24px;
                                cursor: pointer;
                                margin-right: 15px;
                                box-sizing: border-box;
                                border:1px solid rgb(229, 229, 229);
                                &.checked{
                                    border:1px solid $colorA;
                                }
                                &>h2{
                                    line-height: 27px;
                                    font-size: $fontH;
                                    font-weight: 300;
                                    margin-bottom: 10px;
                                }
                                &>.phone{
                                    line-height: $fontI;
                                    font-size: $fontJ;
                                    color: #757575;
                                }
                                &>.street{
                                    height: 50px;
                                    line-height: $fontG;
                                    font-size: $fontJ;
                                    color: #757575;
                                }
                                &>.action{
                                    height: 50px;
                                    @include flex();
                                    &>a{
                                        color: #757575;
                                        &:hover{
                                            color: $colorA;
                                        }
                                    }
                                }
                            }
                            &>.addr-add{
                                width: 270px;
                                height: 180px;
                                box-sizing: border-box;
                                padding: 15px 24px;
                                margin-right: 15px;
                                cursor: pointer;
                                border: 1px solid rgb(229, 229, 229);
                                &>.icon-add{
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 50%;
                                    margin: 45px auto 10px;
                                    background: url('../../public/imgs/icon-add.png') no-repeat center;
                                    background-size: 15px 15px;
                                    background-color: rgb(224, 224, 224);
                                }
                                &>div{
                                    line-height: 19px;
                                    font-size: $fontJ;
                                    color: $colorD;
                                    text-align: center;
                                }
                            }
                        }
                    }
                    &>.item-good{
                        margin-top: 34px;
                        padding-bottom: 12px;
                        border-bottom: 1px solid rgb(229, 229, 229);
                        &>h2{
                            line-height: $fontE;
                            font-size: $fontH;
                            padding-bottom: 5px;
                            border-bottom: 1px solid rgb(229, 229, 229);
                        }
                        &>ul{
                            &>li{
                                margin-top: 10px;
                                @include flex();
                                &>.good-name{
                                    flex: 5;
                                    @include flex(flex-start);
                                    img{
                                        height: 30px;
                                    }
                                    span{
                                        line-height: 17px;
                                        font-size: $fontI;
                                    }
                                }
                                &>.good-price{
                                    flex: 2;
                                    line-height: 40px;
                                    font-size: $fontI;
                                }
                                &>.good-total{
                                    line-height: 40px;
                                    font-size: $fontI;
                                    color: $colorA;
                                    padding-right: 44px;
                                }
                            }
                        }
                    }
                    &>.item-shipping{
                        height: 23px;
                        margin-top: 31px;
                        @include flex(flex-start);
                        &>h2{
                            width: 80px;
                            margin-right: 71px;
                            font-size: $fontG;
                        }
                        &>span{
                            margin-right: 23px;
                            font-size: $fontI;
                            color: $colorA;
                        }
                    }
                    &>.item-invoice{
                        height: 23px;
                        margin-top: 31px;
                        @include flex(flex-start);
                        &>h2{
                            width: 80px;
                            margin-right: 71px;
                            font-size: $fontG;
                        }
                        &>a{
                            font-size: $fontI;
                            color: $colorA;
                            margin-right: 23px;
                        }
                    }
                    &>.item-detail{
                        padding: 50px 44px 33px 0;
                        text-align: right;
                        border-bottom: 1px solid rgb(245, 245, 245);
                        &>.item{
                            margin-bottom: 12px;
                            &>.item-name{
                                line-height: $fontI;
                                font-size: $fontI;
                                color: $colorC;
                            }
                            &>.item-val{
                                display: inline-block;
                                width: 100px;
                                line-height: $fontI;
                                font-size: $fontI;
                                color: $colorA;
                            }
                        }
                        &>.item-total{
                            &>.item-name{
                                line-height: $fontI;
                                font-size: $fontI;
                                color: $colorC;
                            }
                            &>.item-val{
                                display: inline-block;
                                width: 100px;
                                line-height: 37px;
                                font-size: $fontC;
                                color: $colorA;
                            }
                        }
                    }
                    &>.btn-group{
                        margin-top: 37px;
                        @include flex(flex-end);
                    }
                }
            }

        }
        .edit-warp{
            font-size: $fontJ;
            .item{
                margin-bottom: 15px;
                .input{
                    display: inline-block;
                    width: 283px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                    border: 1px solid $colorH;
                    &+.input{
                        margin-left: 14px;
                    }
                }
                select{
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid $colorH;
                    margin-right: 15px;
                }
                textarea{
                    height: 62px;
                    width: 100%;
                    padding: 13px 15px;
                    box-sizing: border-box;
                    border: 1px solid $colorH;
                }
            }
        }
    }
</style>