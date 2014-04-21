Ext.define('yspz_gen.store.FStatus', {
	extend : 'yspz_gen.store.CBase',
	data : [{
				id : -1,
				name : '出错了'
			}, {
				id : 1,
				name : '文件不存在或不完整'
			}, {
				id : 2,
				name : '准备就绪'
			}, {
				id : 3,
				name : '校验中'
			}, {
				id : 4,
				name : '校验完成'
			}, {
				id : 5,
				name : '正在汇总生成'
			}, {
				id : 6,
				name : '正在导入数据库'
			}, {
				id : 7,
				name : '导入完成'
			}]
		// autoLoad : true,
		//
		// proxy : {
		// type : 'ajax',
		// url : 'base/status'
		// }
	});