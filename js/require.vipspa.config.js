$(function(){
	vipspa.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'home': {
                templateUrl: '../html/model/home.html',
                controller: '../js/model/home.js'
            },
            'site_list': {
                templateUrl: '../html/model/site_list.html',
                controller: '../js/model/site_list.js'
            },
            'user_center': {
                templateUrl: '../html/model/user_center.html',
                controller: '../js/model/user_center.js'
            },
            'my_wallet': {
                templateUrl: '../html/model/my_wallet.html',
                controller: '../js/model/my_wallet.js'
            },
            '2048': {
                templateUrl: '../html/model/2048.html',
                controller: '../js/model/2048.js'
            },
            'defaults': 'home' //默认路由
        }
    });

});