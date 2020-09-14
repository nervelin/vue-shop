import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Container, Header, Aside, Main } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
    // 原型挂载
Vue.prototype.$message = Message