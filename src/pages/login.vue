<template>
    <div class="login">
        <div class="login-header container">
            <a href="/#/index">
                <img src="../../public/imgs/login-logo.png" alt="">
            </a>
        </div>
        <div class="login-main">
            <div class="container">
                <form action="">
                    <h3>
                        <span class="checked">账号登录</span>
                        <span class="sep-line">|</span>
                        <span>扫码登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入账号"
                        v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码"
                        v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="login">
                            登录
                        </a>
                    </div>
                    <div class="sms" @click="register">
                        手机短信登录/注册
                    </div>
                </form>
            </div>
        </div>
        <div class="login-footer container">
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
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return{
                username: '',
                password: '',
                userId: ''
            }
        },
        methods: {
            login() {
                let {username, password} = this;
                this.axios.post('/user/login', {
                    username,
                    password
                }).then((res)=>{
                    this.$cookie.set('userId', res.id, {expires: '1M'});
                    // to-do 保存用户名
                    this.$router.push('/index');
                });
            },
            register(){
                this.axios.post('/user/register', {
                    username: 'admin1',
                    password: 'admin1',
                    email: 'admin1@163.com'
                }).then(()=>{
                    alert('注册成功');
                })
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .login{
        &>.login-header{
            height: 113px;
            &>a{
                height: 100%;
                display: inline-block;
            }
        }
        &>.login-main{
            height: 576px;
            min-width: 1226px;
            @include bgImg(100%, 576px, '../../public/imgs/login-bg.jpg', cover);
            &>.container{
                height: 100%;
                @include flex(flex-end, center);
                &>form{
                    width: 410px;
                    height: 510px;
                    padding: 40px 31px 0;
                    box-sizing: border-box;
                    background-color: $colorG;
                    &>h3{
                        line-height: 24px;
                        font-size: $fontE;
                        color: $colorB;
                        margin-bottom: 49px;
                        text-align: center;
                        &>span{
                            &.checked{
                                color: $colorA;
                            }
                            &.sep-line{
                                margin: 0 32px;
                            }
                        }
                    }
                    &>.input{
                        width: 350px;
                        height: 52px;
                        box-sizing: border-box;
                        border: 1px solid $colorH;
                        margin-bottom: 20px;
                        &>input{
                            width: 100%;
                            height: 100%;
                            outline: none;
                            border: none;
                            padding: 18px;
                            box-sizing: border-box;
                        }
                    }
                    &>.btn-box{
                        height: 60px;
                        padding-top: 10px;
                        box-sizing: border-box;
                        &>.btn{
                            width: 100%;
                            height: 100%;
                            line-height: 50px;
                            font-size: $fontI;
                            cursor: pointer;
                        }
                    }
                    &>.sms{
                        display: inline-block;
                        line-height: 14px;
                        margin-top: 14px;
                        color: $colorA;
                        font-size: $fontJ;
                        cursor: pointer;
                    }
                }
            }
        }
        &>.login-footer{
            height: 160px;
            padding-top: 60px;
            box-sizing: border-box;
            &>.footer-link{
                font-size: $fontI;
                color: $colorD;
                text-align: center;
                &>a{
                    color: $colorD;
                }
                &>span{
                    margin: 0 17px;
                }
            }
            &>.copyright{
                margin-top: 13px;
                color: $colorD;
                font-size: $fontI;
                text-align: center;
                &>.domain{
                    color: $colorA;
                }
            }
        }
    }
</style>