Ext.define('yspz_gen.view.West', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.west',
	width : 200,
	autoShow : true,
	disableSelection : true,
	rootVisible : false,
	cls : 'x-unselectable',
	collapseMode : 'header',

	initComponent : function() {
		var me = this;
		me.store = new Ext.data.TreeStore({
					fields : ['text', 'url'],
					root : {
						expanded : true,
						children : [{
									text : "易宝帐套",
									expanded : true,
									children : [{
												text : "单据定义管理",
												expanded : true,
												children : [{
															text : "单据新增",
															url : "yspz_list",
															leaf : true
														}, {
															text : "单据修改",
															// url :
															// "yspz_list",
															leaf : true
														}, {
															text : "单据查看",
															// url :
															// "yspz_list",
															leaf : true
														}]
											}, {
												text : "导入任务管理",
												expanded : true,
												children : [{
															text : "导入任务生成",
															url : "task_gen",
															leaf : true
														}, {
															text : "导入任务查看",
															url : "task_list",
															leaf : true
														}, {
															text : "导入数据管理",
															// url :
															// "yspz_list",
															leaf : true
														}]
											}, {
												text : "汇总任务管理",
												expanded : true,
												children : [{
															text : "汇总方案管理",
															// url : "task_gen",
															leaf : true
														}, {
															text : "汇总任务查看",
															url : "sum_query",
															leaf : true
														}, {
															text : "汇总数据管理",
															// url :
															// "yspz_list",
															leaf : true
														}]
											}, {
												text : "银行信息管理",
												expanded : true,
												children : [{
															text : "银行接口协议管理",
															url : "bi_list",
															leaf : true
														}, {
															text : "银行帐号信息管理",
															// url :
															// "yspz_list",
															leaf : true
														}]
											},
											// {
											// text : "报表",
											// expanded : true,
											// children : [{
											// text : "任务",
											// url : "baobiao_task_list",
											// leaf : true
											// }]
											// },
											{
												text : "资金对账管理",
												expanded : true,
												children : [{
															text : "对账任务生成",
															url : "zjdz_task_gen",
															leaf : true
														}, {
															text : "对账状态改写",
															url : "zjdz_task_reset",
															leaf : true
														}, {
															text : "对账任务查看",
															url : "zjdz_task_list",
															leaf : true
														}]
											}, {
												text : "报表任务管理",
												expanded : true,
												children : [{
															text : "查询报表任务",
															url : "baobiao_task_list",
															leaf : true
														},
														// , {
														// text : "查询报表任务",
														// // url :
														// // "zjdz_task_reset",
														// leaf : true
														// },
														// {
														// text : "执行报表任务",
														// // url :
														// // "zjdz_task_list",
														// leaf : true
														// },
														{
															text : "发送报表任务",
															// url :
															// "zjdz_task_list",
															leaf : true
														}]
											}]
								}]
					}
				});
		me.on("itemclick", function(view, rec) {
			if (rec.data.leaf && rec.data.url) {
				var viewport = view.up('viewport'), center = viewport
						.down('center'), id = 'center_' + rec.data.url, cmp = Ext
						.getCmp(id);
				if (cmp) {
					center.setActiveTab(cmp);
				} else {
					center.add({
								closable : true,
								xtype : 'panel',
								layout : 'anchor',
								items : {
									xtype : rec.data.url,
									anchor : "100% 100%"
								},
								id : id,
								title : rec.data.text
							}).show();
				}
			}
		}, me);
		me.callParent(arguments);
	}
});