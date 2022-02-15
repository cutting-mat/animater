export default [{
    path: '/data-v',
    name: '数据可视化',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/data-v/visual',
    children: [{
        path: 'visual',
        name: '演示1',
        meta: {
            title: '可视化大屏'
        },
        component: (resolve) => require(['./views/Visual.vue'], resolve),
    }, {
        path: 'visual2',
        name: '演示2',
        meta: {
            title: '可视化大屏'
        },
        component: (resolve) => require(['./views/Visual2.vue'], resolve),
    }, {
        path: 'visual3',
        name: '演示3',
        meta: {
            title: '可视化大屏'
        },
        component: (resolve) => require(['./views/Visual3.vue'], resolve),
    }, {
        path: 'visual4',
        name: '演示4',
        component: (resolve) => require(['./views/List.vue'], resolve),
    }]
}]