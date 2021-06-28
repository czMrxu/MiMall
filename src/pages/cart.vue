<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked': allChecked}" @click="toggleAll"></span>
              全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked': item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>
                  {{item.productName}}，{{item.productSubtitle}}
                </span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="addDelItem(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap">
          <div class="cart-tip">
            <a href="/#/index">继续购物</a>
            共
            <span>{{cartTotalNum}}</span>
            件商品，已选择
            <span>{{checkedNum}}</span>
            件
          </div>
          <div class="total">
            合计：
            <span>{{cartTotalPrice}}</span>
            元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    <modal :title="'提示'" :btnType="'3'" :showModal="showModal" @cancel="showModal = !showModal" @submit="delCart(delItem)">
      <template #body>确定要删除购物车中的{{delItem.productName}}吗？</template>
    </modal>
  </div>
</template>

<script>
    import OrderHeader from '../components/OrderHeader.vue';
    import ServiceBar from '../components/ServiceBar.vue';
    import NavFooter from '../components/NavFooter.vue';
    import Modal from '../components/Modal.vue';
    export default {
        name: 'cart',
        data() {
          return {
            showModal: false,   // 删除确认框
            delItem: '',   // 要删除的项
            list: [],   // 商品列表
            allChecked: false,   // 是否全选
            cartTotalPrice: 0,   //购物车总金额
            cartTotalNum: 0,   // 购物车总数量
            checkedNum: 0,   // 选中商品数量
          }
        },
        components: {
            OrderHeader,
            ServiceBar,
            NavFooter,
            Modal
        },
        mounted () {
          this.getCartList();
        },
        methods: {
          // 获取购物车列表
          getCartList(){
            this.axios.get('/carts').then((res)=>{
              this.renderData(res);
            });
          },
          // 更新购物车列表
          updateCart(item, type){
            let quantity = item.quantity;
            let selected = item.productSelected;
            if(type=='+'){
              if(quantity==item.productStock){
                this.$message.warning('商品剩余库存不足');
                return;
              }else{
                quantity++;
                this.getCartCount();
              }
            }else if(type=='-'){
              if(quantity==1){
                this.$message.warning('商品最少保留一件');
                return;
              }else{
                quantity--;
                this.getCartCount();
              }
            }else{
              selected = !selected;
            }
            this.axios.put(`/carts/${item.productId}`, {
              quantity,
              selected
            }).then((res)=>{
              this.renderData(res);
            });
          },
          // 删除购物车商品
          delCart(item){
            this.axios.delete(`/carts/${item.productId}`).then((res)=>{
              this.renderData(res);
              this.showModal = false;
              this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
              this.$message.success('删除成功');
            });
          },
          // 改变全选状态
          toggleAll(){
            let path = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll';
            this.axios.put(path).then((res)=>{
              this.renderData(res);
            });
          },
          // 添加要删除的项
          addDelItem(item){
            this.delItem = item;
            this.showModal = true;
          },
          // 公共数值赋值
          renderData(res){
            this.list = res.cartProductVoList || [];
            this.allChecked = res.selectedAll;
            this.cartTotalPrice = res.cartTotalPrice;
            this.list.map((item)=>{
              this.cartTotalNum += item.quantity;
            })
            let checkedList = this.list.filter(item=>item.productSelected);
            checkedList.map((item)=>{
              this.checkedNum += item.quantity;
            })
          },
          // 购物车下单
          order(){
            let isCheck = this.list.every(item=>!item.productSelected);
            if(isCheck){
              this.$message.warning('至少选择一件商品');
            }else{
              this.$router.push('order/confirm');
            }
          },
          // 更新购物车数量
          getCartCount(){
            this.axios.get('/carts/products/sum').then((res=0)=>{
            // to-do 保存到 vuex 里面
            this.$store.dispatch('saveCartCount', res);
          })
      }
        }
    }
</script>

<style lang="scss">
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/config.scss';
  .cart{
    .wrapper{
      background-color: rgb(245, 245, 245);
      .container{
        padding: 30px 0 114px;
        .cart-box{
          background-color: $colorG;
          .checkbox{
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-right: 17px;
            cursor: pointer;
            border: 1px solid rgb(229, 229, 229);
            @include bgImg(22px, 22px, '../../public/imgs/icon-gou.png', 16px 12px);
            &.checked{  
              background-color: $colorA;
            }
          }
          .cart-item-head{
            height: 80px;
            color: $colorD;
            font-size: $fontJ;
            text-align: center;
            @include flex();
            .col-1{
              flex: 1;
              @include flex(center);
            }
            .col-2{
              flex: 2;
            }
            .col-3{
              flex: 3;
            }
          }
          .cart-item-list{
            .cart-item{
              height: 126px;
              text-align: center;
              border-top: 1px solid $colorH;
              box-sizing: border-box;
              @include flex();
              .item-check{
                flex: 1;
              }
              .item-name{
                flex: 3;
                @include flex(flex-start);
                img{
                  height: 80px;
                }
                span{
                  margin-left: 30px;
                  line-height: $fontC;
                  font-size: $fontH;
                }
              }
              .item-price{
                flex: 1;
                line-height: $fontH;
                font-size: $fontI;
              }
              .item-num{
                flex: 2;
                font-size: $fontJ;
                a{
                  display: inline-block;
                  line-height: 40px;
                  width: 50px;
                  color: $colorB;
                  border: 1px solid $colorH;
                  box-sizing: border-box;
                  &:first-child{
                    border-right: none;
                  }
                  &:last-child{
                    border-left: none;
                  }
                }
                span{
                  display: inline-block;
                  line-height: 40px;
                  width: 50px;
                  border-top: 1px solid $colorH;
                  border-bottom: 1px solid $colorH;
                  box-sizing: border-box;
                }
              }
              .item-total{
                flex: 1;
                line-height: $fontH;
                font-size: $fontI;
                color: $colorA;
              }
              .item-del{
                flex: 1;
                cursor: pointer;
                @include bgImg(100%, 100%, '../../public/imgs/icon-close.png', 14px 12px)
              }
            }
          }
        }
        .order-wrap{
          margin-top: 20px;
          @include flex();
          .cart-tip{
            margin-left: 29px;
            line-height: 50px;
            font-size: $fontJ;
            color: $colorC;
            a{
              line-height: $fontI;
              color: $colorC;
              margin-right: 37px;
            }
            span{
              color: $colorA;
            }
          }
          .total{
            line-height: 50px;
            color: $colorA;
            font-size: $fontJ;
            span{
              font-size: $fontE;
            }
            a{
              margin-left: 37px;
              height: 50px;
              line-height: 50px;
              width: 202px;
              font-size: $fontH;
            }
          }
        }
      }
    }
  }
</style>