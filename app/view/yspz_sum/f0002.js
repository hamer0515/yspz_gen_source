Ext.define('demo.view.yspz_sum.f0002', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.yspz_sum_f0002',
			border : true,

			initComponent : function() {
				var me = this, store;
				me.store = store = Ext.create('widget.mystore', {
							fields : ['fch', 'fyw_type', 'fhw_type', 'ftx_amt',
									'fch_amt', 'chtx_amt'],

							proxy : {
								type : 'ajax',
								api : {
									read : 'yspz_sum/f0002'
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
							text : "销卡通道编号",
							dataIndex : 'fch',
							flex : 1
						}, {
							text : "业务类型",
							dataIndex : 'fyw_type',
							flex : 1
						}, {
							text : "货物类型",
							dataIndex : 'fhw_type',
							flex : 1
						}, {
							text : "卡真实面值",
							dataIndex : 'ftx_amt',
							flex : 1
						}, {
							text : "销卡通道结算面值",
							dataIndex : 'fch_amt',
							flex : 1
						}, {
							text : "销卡通道结算金额",
							dataIndex : 'chtx_amt',
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