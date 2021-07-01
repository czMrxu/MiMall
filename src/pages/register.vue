<template>
    <div class="register">
        <div class="register-header container">
            <a href="/#/index">
                <img src="../../public/imgs/login-logo.png" alt="">
            </a>
        </div>
        <div class="register-main">
            <div class="container">
                <form action="">
                    <h3>
                        <span class="checked">账号注册</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入账号"
                        v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码"
                        v-model="password">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="请输入邮箱"
                        v-model="email">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="register">
                            注册
                        </a>
                    </div>
                    <div class="sms" @click="goLogin">
                        账号登录
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
        name: 'register',
        data() {
            return {
                username: '',
                password: '',
                email: '',
            }
        },
        methods: {
            goLogin() {
                this.$router.push('/login');
            },
            register(){
                if(this.username.trim().length<4){
                    this.$message.error('账号长度至少4位');
                }else if(this.password.trim().length<4){
                    this.$message.error('密码长度至少4位');
                }else if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
                    this.$message.error('请填写正确的邮箱');
                }else{
                    this.axios.post('/user/register', {
                        username: this.username.trim(),
                        password: this.password.trim(),
                        email: this.email
                    }).then(()=>{
                        this.$message.success('注册成功');
                        this.$router.push('/login');
                    })
                }
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .register{
        &>.register-header{
            height: 113px;
            &>a{
                height: 100%;
                display: inline-block;
            }
        }
        &>.register-main{
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