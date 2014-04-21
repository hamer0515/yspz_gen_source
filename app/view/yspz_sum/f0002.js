Ext.define('yspz_gen.view.yspz_sum.f0002', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.yspz_sum_f0002',
	border : true,

	initComponent : function() {
		var me = this, store;
		me.store = store = Ext.create('widget.mystore', {
			fields : ["business_date", "fch", "business_type", "goods_type",
					"success_money"],
			autoLoad : true,
			proxy : {
				type : 'ajax',
				api : {
					read : 'credential/CredentialServlet.action?method=getSumMoneyDetail&code=F0002&suitCode=fhyd'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			}
		});
		me.columns = [{
					text : "业务处理日期",
					dataIndex : 'business_date',
					flex : 1
				}, {
					text : "销卡通道编号",
					dataIndex : 'fch',
					flex : 1
				}, {
					text : "业务类型",
					dataIndex : 'business_type',
					flex : 1
				}, {
					text : "货物类型",
					dataIndex : 'goods_type',
					flex : 1
				}, {
					text : "交易勾兑成功金额",
					dataIndex : 'success_money',
					renderer : function(value) {
						if (value == undefined)
							return 0.00;
						return Ext.util.Format
								.number(parseInt(value), '0,0.00');
					},
					flex : 1
				}];
		me.dockedItems = [{
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom'
				}];
		me.callParent(arguments);
	}
});