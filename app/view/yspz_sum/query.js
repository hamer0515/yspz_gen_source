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
						onChangeEvent : function(combo, newValue, oldValue,
								eOpts) {
							var rule = this.up("fieldcontainer").down("rule");
							if (newValue) {
								rule.store.proxy.extraParams = {
									credentialCode : newValue
								};
								rule.store.reload()
							} else {
								rule.fireEvent("change", {
											newValue : ""
										});
								rule.setValue("");
								rule.store.removeAll();
							}
						}
					}, {
						xtype : 'rule',
						allowBlank : false,
						margin : '0 5 0 0',
						onChangeEvent : function(combo, newValue, oldValue,
								eOpts) {
							var yspz = this.up("fieldcontainer").down("yspz");
							if (newValue) {
								Ext.asyncRequest("base/rule_info", {
											rule : combo.getValue(),
											credentialCode : yspz.getValue()
										}, undefined, undefined, function(res) {
											var response = Ext
													.decode(res.responseText), grid = me
													.down("gridpanel"), columns = [];
											grid.store.removeAll();
											grid.store.proxy.getModel()
													.setFields(Ext.Object
															.getKeys(response))
											for (var i in response) {
												columns.push({
															text : response[i],
															dataIndex : i,
															flex : 1
														});
											}
											grid.reconfigure(grid.store,
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
						fieldLabel : '生成日期',
						name : 'date',
						allowBlank : false
					}]
		}], fields = ['id'];
		Ext.apply(me, {
					_url : "base/get_gsum_result",
					_fields : fields,
					_items : items,
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
