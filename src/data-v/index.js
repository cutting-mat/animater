export default [{
    path: '/data-v',
    name: '数据可视化',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'visual',
        name: '演示1',
        meta: {
            title: '匿名模式'
        },
        component: (resolve) => require(['./views/Visual.vue'], resolve),
    }, {
        path: 'visual2',
        name: '演示2',
        meta: {
            title: '受控模式'
        },
        component: (resolve) => require(['./views/Visual2.vue'], resolve),
    }, {
        path: 'visual3',
        name: '演示3',
        meta: {
            title: '编排模式'
        },
        component: (resolve) => require(['./views/Visual3.vue'], resolve),
    }, {
        path: 'visual4',
        name: '演示4',
        component: (resolve) => require(['./views/visual4.vue'], resolve),
        meta: {
            title: '页面离场动画'
        }
    }]
}]