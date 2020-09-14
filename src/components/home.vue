<template>
  <el-container class="home_container">
  <el-header>
      <div>
          <div class="left">
              <img src="../assets/heima.png" alt="">电商后台管理系统
          </div>
          <el-button type="info" @click="logout">退出</el-button>
      </div>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle_btn" @click="isCollapse = !isCollapse">| | |</div>
         <el-menu
          background-color="#333744" text-color="#fff" active-text-color="skyblue" unique-opened :default-active="activePath"
            :collapse="isCollapse"
            :collapse-transition="false"
         >
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]" class="icon"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="savePath('/'+subItem.path)"><span class="el-icon-menu"></span>{{subItem.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
    </el-aside>
    <el-main>
        <!-- 路由占位 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return {
            menulist:[],
            iconObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            // 激活路径
            activePath:'',
            // 控制菜单展开折叠
            isCollapse:false
        }
    },
    created(){
        // 在钩子函数中调用获取菜单列表数据
        this.getMenuList()
        this.activePath = sessionStorage.getItem('path')
    },
    methods:{
        logout(){
            // 跳转到登录页面、清除token、退出成功提示
            this.$router.push('/login')
            sessionStorage.clear()
            this.$message.success("退出成功")

        },
        // 获取菜单列表数据
        async getMenuList(){
            const {data:res} = await this.$http('menus')
            if(res.meta.status !==200) return this.$message.error();('数据获取失败，请稍后重试')
            // 获取到的数据赋值给menulist
            this.menulist = res.data   
            // console.log(this.menulist);
        },
        // 修改激活路径
        savePath(path) {
            this.activePath = path
            sessionStorage.setItem('path',path)
        }
    }
}
</script>

<style lang="less" scope>
.home_container {
    height: 100%;
    .el-header{
        background-color: #373d41;
        padding-left: 0;
        >div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .left {
            font-size: 20px;
            color: #fff;
            img {
                vertical-align: middle;
                margin-right: 20px;
            }
        }
      
    }
    .el-aside {
        background-color: #333744;
        .icon {
            margin-right: 10px;
        }
        .toggle_btn {
            color: #ffffff;
            text-align: center;
            cursor: pointer;
        }
        .el-menu {
            border-right: 0;
        }
    }
}
.el-main {
    background-color: #eaedf1;
}
</style>