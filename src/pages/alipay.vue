<template>
  <div class="alipay">
    <loading></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
    import Loading from '../components/Loading.vue';
    export default {
        name: 'alipay',
        data() {
          return {
            orderNo: this.$route.query.orderNo,
            content: '',   // 接收支付宝接口返回的html
          }
        },
        components: {
          Loading,
        },
        mounted () {
          this.paySubmit();
        },
        methods: {
          paySubmit() {
            this.axios.post('/pay', {
              orderId: this.orderNo,
              orderName: '小米商城订单',
              amount: 0.01,
              payType: 1
            }).then((res)=>{
              this.content = res.content;
              setTimeout(()=>{
                document.forms[0].submit();
              }, 100);
            })
          }
        },
    }
</script>

<style scoped>
</style>