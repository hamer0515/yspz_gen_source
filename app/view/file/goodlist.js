Ext.define('yspz_gen.view.file.goodlist', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.goodlist',
			border : true,

			initComponent : function() {
				var me = this, store;
				me.store = store = Ext.create('widget.mystore', {
							fields : ['clear_date', 'fch', 'fyw_type',
									'ftx_date', 'fhw_type', 'f_rate', 'f_ssn',
									'ftx_amt', 'fch_amt', 'chtx_amt'],
							autoLoad : true,
							proxy : {
								type : 'ajax',
								api : {
									read : 'good/list'
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
							dataIndex : 'clear_date',
							flex : 1
						}, {
							text : "销卡通道编号",
							dataIndex : 'fch',
							flex : 1
						}, {
							text : "业务类型",
							dataIndex : 'fyw_type',
							flex : 1
						}, {
							text : "交易日期",
							dataIndex : 'ftx_date',
							flex : 1
						}, {
							text : "货物类型",
							dataIndex : 'fhw_type',
							flex : 1
						}, {
							text : "销卡结算折扣率",
							dataIndex : 'f_rate',
							flex : 1
						}, {
							text : "唯一销卡编号",
							dataIndex : 'f_ssn',
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