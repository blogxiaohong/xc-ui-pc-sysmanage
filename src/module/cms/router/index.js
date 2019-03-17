import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';

export default [{
  path: '/cms',
  component: Home,
  name: 'CMS内容管理',
  hidden: false,
  children:[
    {
      path: '/cms/page/list',
      component: page_list,
      name: '页面列表',
      hidden: false
    },
    {
      path: '/cms/page/add',
      component: page_add,
      name: '新增页面',
      hidden: true
    },
    {
      path: '/cms/page/edit/:pageId',
      component: page_edit,
      name: '修改页面',
      hidden: true
    }
  ]
  // ,
  // redirect: '/home',
  // children: [
  //   {path: 'home', component: Home}
  // ]
}/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
