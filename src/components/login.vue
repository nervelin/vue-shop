<template>
  <div class="login">
      <div class="login_box">
          <!-- logo区域 -->
          <div class="logo"><img src="../assets/logo.png" alt=""></div>
          <!-- 表单区域 -->
          <el-form class="form" :model="formmsg" :rules="loginRules" ref="loginformRef">
              <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="formmsg.username"><i slot="prefix" class="el-input__icon el-icon-user-solid"></i></el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <el-form-item prop="password">
                <el-input v-model="formmsg.password"><i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
                <el-button type="success" @click="login">登录</el-button>
                <el-button type="info" @click="resetLogin">重置</el-button>
            </el-form-item>
          </el-form> 
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            formmsg:{
                username:"admin",
                password:"123456"
            },
            loginRules:{
                username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ]
            }
        }
    },
    methods:{
        // 重置
        resetLogin(){
            //resetFields() 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            console.log(this.$refs);
            this.$refs.loginformRef.resetFields();
        },
        // 登录
        login(){
            // 发送请求之前先对表单进行预校验
            this.$refs.loginformRef.validate(async (valid)=>{
                // valid是一个布尔值，true表示表单预校验通过，可以发送请求，false表示没有通过表单验证，不允许发送请求
                if(!valid) return;
                // console.log(this);
                const {data:res} = await this.$http.post("login",this.formmsg)
                if(res.meta.status !=200) return this.$message.error("登陆失败");
                this.$message.success("登陆成功")
                // 登录成功之后将token保存到本地
                sessionStorage.setItem("token",res.data.token)
                // console.log(res);
                // 跳转到home页面,编程式导航
                this.$router.push("/home")
            })
        }
    }
}
</script>

<style lang='less' scope>
    .login {
        width: 100%;
        height: 100%;
        background-color: #2b4b6b;
        .login_box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 450px;
            height: 300px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 2px 3px 3px rgba(255, 255, 255, .6);
            .logo {
                position: absolute;
                left: 50%;
                top: -75px;
                transform: translateX(-50%,);
                width: 130px;
                height: 130px;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 50%;
                overflow: hidden;
                padding: 10px;
                img {
                    width: 100%;
                    background-color: #ccc;
                    border-radius: 50%;
                }
            }
            .form {
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                .btns {
                    float: right;
                }
            }
        }
    }
</style>