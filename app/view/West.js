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
									text : "生成导入任务",
									url : "task_gen",
									leaf : true
								}, {
									text : "查询导入任务",
									url : "task_list",
									leaf : true
								}, {
									text : "单据",
									expanded : true,
									children : [{
												text : "单据生成",
												url : "yspz_list",
												leaf : true
											}]
								}, {
									text : "汇总查询",
									expanded : true,
									url : "sum_query",
									leaf : true
								}, {
									text : "银行接口配置",
									url : "bi_list",
									leaf : true
								},
								// {
								// text : "银行账号信息维护",
								// url : "acct_list",
								// leaf : true
								// },
								{
									text : "报表",
									expanded : true,
									children : [{
												text : "任务",
												url : "baobiao_task_list",
												leaf : true
											}]
								}, {
									text : "资金对账",
									expanded : true,
									children : [{
												text : "任务生成",
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
								}]
					}
				});
		me.on("itemclick", function(view, rec) {
			if (rec.data.leaf) {
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