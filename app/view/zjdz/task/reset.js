Ext.define('yspz_gen.view.zjdz.task.reset', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.zjdz_task_reset',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "银行帐号",
					dataIndex : 'b_acct',
					flex : 1
				}, {
					text : "开户银行",
					dataIndex : 'opening_bank',
					flex : 1
				}, {
					text : "银行名称",
					dataIndex : 'b_name',
					flex : 1
				}, {
					text : "银行账户编号",
					dataIndex : 'bank_code',
					flex : 1
				}, {
					text : "使用状态",
					dataIndex : 'acct_status',
					renderer : function(value) {
						return ['使用中', '销户'][parseInt(value) - 1];
					},
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
				}], fields = ['id', 'b_acct', 'opening_bank', 'b_name',
				'bank_code', 'acct_status', 'zjdz_date', 'dz_status'];
		Ext.apply(me, {
			gridConfig : {
				selModel : Ext.create('Ext.selection.CheckboxModel', {
							mode : "SIMPLE"
						})
			},
			_url : Ext.urls.GET_ZJDZ_TASK_LIST,
			_fields : fields,
			_buttons : [{
				text : '修改任务状态',
				handler : function(btn) {
					var grid = me.down('grid'), gsm = grid.getSelectionModel(), rows = gsm
							.getSelection(), items = [];
					if (rows.length == 0) {
						Ext.error('至少选择一项');
						return;
					}
					Ext.Msg.confirm('确认', "是否确认生成" + rows[0].data.zjdz_date
									+ "日对账任务？", function(optional) {
								if (optional == 'yes') {
									rows.forEach(
											function(element, index, array) {
												items.push(element.data.id);
											});
									Ext.asyncRequest(
											Ext.urls.SUBMIT_ZJDZ_TASK_RESET, {
												task : items
											}, function() {
												me.down('grid').store.reload();
											});
								}
							});
				}
			}],
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
							xtype : "bank",
							margin : '0 20 0 0',
							flex : 1
								// width : 516
							}, {
							xtype : "bfj_acct",
							flex : 1
								// width : 516
							}, {
							xtype : "hidden",
							name : "dz_status",
							value : 2
						}]
					}, {
						fieldLabel : "资金对账日期",
						xtype : 'datefield',
						maxValue : new Date(),
						allowBlank : false,
						name : "zjdz_date"
					}],
			_gcolumns : gcolumns
		})
		me.callParent(arguments);
	}
});
