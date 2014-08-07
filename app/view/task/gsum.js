Ext.define('yspz_gen.view.task.gsum', {
	extend : 'Ext.window.Window',
	alias : 'widget.task_gsum',
	layout : 'fit',
	width : 400,
	closable : false,
	resizable : false,
	modal : true,
	autoShow : true,
	initComponent : function() {
		var me = this, items = me._items, fields = [], rules = [];
		for (var i in items.meta) {
			fields.push({
						boxLabel : Ext.util.Format.ellipsis(items.meta[i], 14),
						name : "fields",
						boxLabelAttrTpl : "title = \"" + items.meta[i] + "\"",
						inputValue : i
					});
		}
		for (var j in items.rules) {
			rules.push({
						boxLabel : items.rules[j].id,
						name : "fields",
						boxLabelAttrTpl : "title = \"汇总列："
								+ Ext.Object.getValues(items.rules[j].group)
										.join(" ,")
								+ "&#10;求和列："
								+ Ext.Object.getValues(items.rules[j].sum)
										.join(" ,") + "\"",
						inputValue : items.rules[j].id
					});
		}
		me.items = {
			xtype : 'form',
			bodyPadding : 5,
			layout : 'anchor',
			defaults : {
				anchor : '100%'
			},
			items : [{
						xtype : 'fieldset',
						columnWidth : 0.5,
						title : '汇总方案',
						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'anchor',
						items : [{
									xtype : 'radiogroup',
									columns : 6,
									vertical : true,
									items : rules
								}]
					}, {
						xtype : 'fieldset',
						columnWidth : 0.5,
						title : '方案设置',
						defaults : {
							anchor : '100%'
						},
						layout : 'anchor',
						items : [{
							xtype : 'textarea',
							fieldLabel : '汇总列',
							allowBlank : false,
							readOnly : true,
							listeners : {
								focus : function(i, The, eOpts) {
									Ext.widget('window', {
										_textarea : i,
										width : 600,
										height : 160,
										layout : 'fit',
										closable : false,
										resizable : false,
										modal : true,
										autoShow : true,
										items : {
											xtype : 'form',
											bodyPadding : 5,
											layout : 'anchor',
											overflowY : "scroll",
											defaults : {
												anchor : '100%'
											},
											items : {
												xtype : 'checkboxgroup',
												columns : 3,
												vertical : true,
												items : fields
											},
											buttons : [{
												text : '添加',
												handler : function() {
													var window = this
															.up('window'), formpanel = window
															.down('form');
													var cboxes = formpanel.items.items[0]
															.getChecked(), value = [], svalue = [];
													for (var i in cboxes) {
														var citem = cboxes[i];
														svalue
																.push(citem
																		.getSubmitValue());
														value
																.push(citem.boxLabel);
													}
													window._textarea
															.setValue(value
																	.join(","))._submitValue = svalue
															.join(",");
													window.close();
												}
											}, {
												text : '取消',
												handler : function() {
													this.up('window').close()
												}
											}, {
												text : '重置',
												handler : function() {
													this.up('window')
															.down('form')
															.getForm().reset();
												}
											}]
										}
									});
								}
							},
							name : 'group'
						}, {
							xtype : 'textarea',
							fieldLabel : '求和列',
							allowBlank : false,
							readOnly : true,
							listeners : {
								focus : function(i, The, eOpts) {
									Ext.widget('window', {
										_textarea : i,
										width : 600,
										height : 160,
										layout : 'fit',
										closable : false,
										resizable : false,
										modal : true,
										autoShow : true,
										items : {
											xtype : 'form',
											bodyPadding : 5,
											layout : 'anchor',
											overflowY : "scroll",
											defaults : {
												anchor : '100%'
											},
											items : {
												xtype : 'checkboxgroup',
												columns : 3,
												vertical : true,
												items : fields
											},
											buttons : [{
												text : '添加',
												handler : function() {
													var window = this
															.up('window'), formpanel = window
															.down('form');
													var cboxes = formpanel.items.items[0]
															.getChecked(), value = [], svalue = [];
													for (var i in cboxes) {
														var citem = cboxes[i];
														svalue
																.push(citem
																		.getSubmitValue());
														value
																.push(citem.boxLabel);
													}
													window._textarea
															.setValue(value
																	.join(","))._submitValue = svalue
															.join(",");
													window.close();
												}
											}, {
												text : '取消',
												handler : function() {
													this.up('window').close()
												}
											}, {
												text : '重置',
												handler : function() {
													this.up('window')
															.down('form')
															.getForm().reset();
												}
											}]
										}
									});
								}
							},
							name : 'sum'
						}]
					}],
			buttons : [{
				text : '添加',
				handler : function() {
					var form = this.up("form"), sumField = form
							.down("textarea[name=\"sum\"]"), groupField = form
							.down("textarea[name=\"group\"]"), rec = this
							.up("window")._rec;
					if (sumField.isValid() && groupField.isValid()) {
						Ext.asyncRequest(Ext.urls.ADD_YSPZ_RULE, {
									credentialId : rec.data.credentialId,
									importDate : rec.data.importDate,
									id : rec.data.id,
									sum : sumField._submitValue,
									group : groupField._submitValue
								}, function() {
									Ext.asyncRequest(
											Ext.urls.GET_YSPZ_INFO_AND_RULES, {
												credentialId : rec.data.credentialId
											}, undefined, undefined, function(
													response) {
												var res = Ext
														.decode(response.responseText), rules = [], checkboxgroup = form
														.down("checkboxgroup");
												if (Object.keys(res).length > 0) {
													for (var j in res) {
														rules.push({
															boxLabel : res[j].id,
															name : "fields",
															boxLabelAttrTpl : "title = \"汇总列："
																	+ Ext.Object
																			.getValues(res[j].group)
																			.join(" ,")
																	+ "&#10;求和列："
																	+ Ext.Object
																			.getValues(res[j].sum)
																			.join(" ,")
																	+ "\"",
															inputValue : res[j].id
														});
													}
													checkboxgroup.removeAll();
													checkboxgroup.add(rules);
													groupField.setValue("");
													sumField.setValue("");
												} else {
													Ext.error('获取单据信息失败:'
															+ res.msg);
												}
											});
								}, undefined, undefined, me);
					}
				}
			}, {
				text : '取消',
				handler : function() {
					this.up('window').close()
				}
			}, {
				text : '重置',
				handler : function() {
					this.up('window').down('form').getForm().reset();
				}
			}, {
				text : '提交',
				handler : function() {
					var window = this.up("window"), rec = window._rec, grid = window._grid, form = this
							.up("form"), checkbox = form.down("checkboxgroup"), checked = checkbox
							.getChecked(), values = [];
					if (checked.length > 0) {
						for (var i in checked)
							values.push(checked[i].getSubmitValue());
					} else {
						Ext.info("请选择一个求和汇总方案");
						return;
					}
					Ext.asyncRequest(Ext.urls.SUBMIT_YSPZ_SUMMARY, {
								credentialId : rec.data.credentialId,
								importDate : rec.data.importDate,
								id : rec.data.id,
								rules : values
							}, function() {
								window.close();
								grid.store.reload();
							}, undefined, undefined, me);
				}
			}]
		}
		me.callParent(arguments);
	}
});