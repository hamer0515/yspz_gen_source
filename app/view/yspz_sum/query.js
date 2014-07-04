Ext.define('yspz_gen.view.yspz_sum.query', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.sum_query',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "请选择汇总求和方案",
					dataIndex : 'id',
					flex : 1
				}], items = [{
			xtype : 'fieldcontainer',
			layout : 'hbox',
			items : [{
						xtype : 'yspz',
						allowBlank : false,
						margin : '0 5 0 0',
						flex : 1,
						onChangeEvent : function(combo, newValue, oldValue,
								eOpts) {
							var rule = this.up("fieldcontainer").down("rule");
							rule.setValue("");
							rule.store.removeAll();
							if (newValue) {
								rule.store.proxy.extraParams = {
									credentialId : newValue
								};
								rule.store.reload()
							}
						}
					}, {
						xtype : 'rule',
						flex : 1,
						allowBlank : false,
						margin : '0 5 0 0',
						onChangeEvent : function(combo, newValue, oldValue,
								eOpts) {
							var yspz = this.up("fieldcontainer").down("yspz");
							if (newValue) {
								Ext
										.asyncRequest(
												"summary/summary_getSummaryTitle.action",
												{
													rule : combo.getValue(),
													credentialId : yspz
															.getValue()
												}, undefined, undefined,
												function(res) {
													var response = Ext
															.decode(res.responseText), grid = me
															.down("gridpanel"), columns = [];
													grid.store.removeAll();
													grid.store.proxy
															.getModel()
															.setFields(Ext.Object
																	.getKeys(response))
													for (var i in response) {
														columns.push({
																	text : response[i],
																	dataIndex : i,
																	flex : 1
																});
													}
													grid
															.reconfigure(
																	grid.store,
																	columns);
												});
							} else {
								var grid = me.down("gridpanel"), columns = [{
											text : "请选择汇总求和方案",
											dataIndex : 'id',
											flex : 1
										}];
								grid.store.removeAll();
								grid.reconfigure(grid.store, columns);
							}
						}
					}, {
						xtype : 'datefield',
						flex : 1,
						fieldLabel : '生成日期',
						name : 'importDate',
						allowBlank : false
					}]
		}], fields = ['id'];
		Ext.apply(me, {
			_buttons : [{
				text : '导出到Oralcle',
				handler : function(btn) {
					if (me.down("grid").store.getCount() > 0)
						Ext.Msg.confirm('确认', "确认查询结果导出到Oracle？", function(
										optional) {
									if (optional == 'yes') {
										Ext
												.asyncRequest(
														Ext.urls.SUBMIT_EXPORT_TO_ORACLE,
														me.down("form")
																.getValues(),
														function() {
															me.down('grid').store
																	.reload();
														});
									}
								});
				}
			}],
			_url : Ext.urls.GET_SUM_RESULT,
			_fields : fields,
			_items : items,
			_gcolumns : gcolumns
		})
		me.callParent(arguments);
	}
});
