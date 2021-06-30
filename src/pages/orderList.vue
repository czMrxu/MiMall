<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template #tip>
        请谨防钓鱼链接或诈骗电话，了解更多>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, o) in orderList" :key="o">
            <div class="order-title">
              <div class="item-info">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content">
              <div class="good-box">
                <div class="good-list" v-for="(item, index) in order.orderItemVoList" :key="index">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice}}元X{{item.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state">
                <a :href="order.status==20 ? 'javascipt:;' : `/#/order/pay?orderNo=${order.orderNo}`">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <div v-show="showMore" class="scroll-more" v-infinite-scroll="scrollMore" infinite-scroll-disabled="busy" infinite-scroll-distance="410">
            <img src="../../public/imgs/loading-svg/loading-spinning-bubbles.svg" alt="">
          </div>
          <no-data v-if="showNoData"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import OrderHeader from '../components/OrderHeader.vue';
    import Loading from '../components/Loading.vue';
    import NoData from '../components/NoData.vue';
    import infiniteScroll from 'vue-infinite-scroll';
    export default {
        name: 'order-list',
        data() {
          return {
            orderList: [],   // 订单列表
            loading: false,   // 加载框
            showNoData: false,   // 无数据显示此组件
            busy: false,   // 滚动加载触发控制
            pageNum: 1,   // 当前页
            showMore: false,   // 控制加载更多
          }
        },
        components: {
          NoData,
          OrderHeader,
          Loading
        },
        directives: {infiniteScroll},
        mounted () {
          this.getOrderList();
        },
        methods: {
          getOrderList() {
            this.busy = true;
            this.loading = true;
            this.axios('/orders').then((res)=>{
              this.orderList = res.list;
              this.loading = false;
              this.busy = false;
              this.showMore = true;
              if(this.orderList.length==0){
                this.showNoData = true;
              }
            }).catch(()=>{
              this.loading = false;
            })
          },
          // 滚动加载
          scrollMore(){
            this.busy = true;
            setTimeout(()=>{
              this.pageNum++;
              this.getList();
            }, 500)
          },
          // 供 scrollMore 使用的实时加载
          getList(){
            this.axios.get('/orders', {
              params: {
                pageSize: 10,
                pageNum: this.pageNum
              }
            }).then((res)=>{
              this.orderList = this.orderList.concat(res.list);
              if(res.hasNextPage){
                this.busy = false;
              }else{
                this.busy = true;
                this.showMore = false;
              }
            })
          }
        },
    }
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  .order-list{
    &>.wrapper{
      padding-top: 33px;
      padding-bottom: 110px;
      background-color: rgb(245, 245, 245);
      &>.container{
        &>.order-box{
          &>.order{
            box-sizing: border-box;
            background-color: $colorG;
            border: 1px solid rgb(215, 215, 215);
            margin-bottom: 31px;
            &>.order-title{
              height: 74px;
              padding: 0 43px;
              font-size: $fontI;
              color: $colorC;
              background-color: rgb(255, 250, 247);
              box-sizing: border-box;
              @include flex();
              &>.item-info{
                &>span{
                  margin: 0 9px;
                }
              }
              &>.item-money{
                &>.money{
                  font-size: $fontD;
                  color: $colorB;
                }
              }
            }
            &>.order-content{
              padding: 0 43px;
              @include flex();
              &>.good-box{
                &>.good-list{
                  height: 145px;
                  @include flex(flex-start);
                  &>.good-img{
                    height: 112px;
                    &>img{
                      height: 100%;
                    }
                  }
                  &>.good-name{
                    &>div{
                      line-height: 25px;
                      font-size: $fontG;
                    }
                  }
                }
              }
              &>.good-state{
                &>a{
                  color: $colorA;
                  font-size: $fontG;
                }
              }
            }
          }
          &>.scroll-more{
            text-align: center;
          }
        }
      }
    }
  }
</style>