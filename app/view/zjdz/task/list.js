Ext.define('yspz_gen.view.zjdz.task.list', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.zjdz_task_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "银行帐号",
					dataIndex : 'b_acct',
					flex : 1
				}, {
					text : "银行名称",
					dataIndex : 'b_name',
					flex : 1
				}, {
					text : "开户银行",
					dataIndex : 'opening_bank',
					flex : 1
				}, {
					text : "银行账户编号",
					dataIndex : 'bank_code',
					flex : 1
				}, {
					text : "资金对账日期",
					dataIndex : 'zjdz_date',
					flex : 1
				}, {
					text : "对账状态",
					dataIndex : 'dz_status',
					renderer : function(value) {
						return ['未对账', '对账完成', '重新对账'][parseInt(value) - 1];
					},
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '资金对账',
						getClass : function(v, meta, rec) {
							if (rec.data.dz_status == 1
									|| rec.data.dz_status == 3) {
								return 'bad';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex, item, e,
								rec) {
							var viewport = grid.up('viewport'), center = viewport
									.down('center'), id = 'zjdz_task_dz_'
									+ rec.data.id, cmp = Ext.getCmp(id);
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								var task_dz = Ext
										.createByAlias('widget.zjdz_task_dz');
								task_dz.store.load({
											params : {
												task : rec.data.id
											}
										});
								center.add({
											closable : true,
											xtype : 'panel',
											layout : 'fit',
											items : task_dz,
											id : id,
											title : "资金对账[" + rec.data.id + "]"
										}).show();
							}
						}
					}]
				}], fields = ['id', 'b_acct', 'opening_bank', 'b_name',
				'bank_code', 'zjdz_date', 'dz_status'];
		Ext.apply(me, {
					_url : Ext.urls.GET_ZJDZ_TASK_LIST,
					_fields : fields,
					storeConfig : {
						autoLoad : true
					},
					_items : [{
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : "bank",
											margin : '0 20 0 0',
											width : 516
										}, {
											xtype : "bfj_acct",
											width : 516
										}, {
											xtype : "hidden",
											name : "dz_status",
											value : 2
										}]
							}, {
								fieldLabel : "资金对账日期",
								xtype : 'datefield',
								maxValue : new Date(),
								name : "zjdz_date"
							}],
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
