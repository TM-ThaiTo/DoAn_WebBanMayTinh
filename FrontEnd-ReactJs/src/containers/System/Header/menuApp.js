export const adminMenu = [
    { // trang chủ
        name: 'Trang chủ',
        menus: [
            {
                name: 'Trang chủ', link: '/system/home-admin',
                // link: '/system/user-manage',
            },
        ]
    },
    { //quản lý người dùng
        name: 'Người dùng',
        menus: [
            {
                name: 'Quản lý người dùng', link: "/system/user-manage",
                //'/system/user-redux',
            },
        ]
    },
    { //quản lý chủ shop
        name: 'Chủ shop',
        menus: [
            {
                name: 'Quản lý chủ shop', link: '/system/shop-manage',
                // link: '/system/user-manage',
            },
        ]
    },
    { //quản lý sản phẩm
        name: 'Sản phẩm',
        menus: [
            {
                name: 'Quản lý sản phẩm', link: '/system/product-manage',
            },
        ]
    },
    { //quản lý đơn hàng 
        name: 'Đơn hàng',
        menus: [
            {
                name: 'Quản lý đơn hàng', link: '/system/order-manage',
            },
        ]
    },
    { //quản lý nội dung web
        name: 'Trang Web',
        menus: [
            {
                name: 'Quản lý trang web', link: '/system/web-manage',
            },
        ]
    },
    // { //quản lý bài đăng
    //     name: 'menu.admin.handbook',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
    //         },
    //     ]
    // },
];