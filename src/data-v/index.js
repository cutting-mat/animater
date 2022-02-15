export default [{
    path: '/data-v',
    name: '数据可视化',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/data-v/visual',
    children: [{
        path: 'visual',
        name: '可视化大屏',
        component: (resolve) => require(['./views/Visual.vue'], resolve),
    },{
        path: 'list',
        name: '列表',
        component: (resolve) => require(['./views/List.vue'], resolve),
    }]
}]