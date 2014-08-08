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
		var me = this, items = me._items, fields = [], rules = [], tips = [];
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
						// boxLabelAttrTpl : "title = \"汇总列："
						// + Ext.Object.getValues(items.rules[j].group)
						// .join(" ,")
						// + "&#10;求和列："
						// + Ext.Object.getValues(items.rules[j].sum)
						// .join(" ,") + "\"",
						inputValue : items.rules[j].id
					});
			tips.push("汇总列："
					+ Ext.Object.getValues(items.rules[j].group).join(" ,")
					+ "<br/>求和列："
					+ Ext.Object.getValues(items.rules[j].sum).join(" ,"));
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
														.decode(response.responseText), rules = [], radiogroup = form
														.down("radiogroup");
												// 清空tips
												tips = [];
												if (res.rules) {
													for (var j in res.rules) {
														rules.push({
															boxLabel : res.rules[j].id,
															name : "fields",
															// boxLabelAttrTpl :
															// "title = \"汇总列："
															// + Ext.Object
															// .getValues(res.rules[j].group)
															// .join(" ,")
															// + "&#10;求和列："
															// + Ext.Object
															// .getValues(res.rules[j].sum)
															// .join(" ,")
															// + "\"",
															inputValue : res.rules[j].id
														});
														tips
																.push("汇总列："
																		+ Ext.Object
																				.getValues(res.rules[j].group)
																				.join(" ,")
																		+ "<br/>求和列："
																		+ Ext.Object
																				.getValues(res.rules[j].sum)
																				.join(" ,"));
													}
													radiogroup.removeAll();
													radiogroup.add(rules);
													groupField.setValue("");
													sumField.setValue("");
													// initTip(radiogroup.items,
													// tips);
													// for (var i in tips) {
													// Ext
													// .create(
													// 'Ext.tip.ToolTip',
													// {
													// target : radiogroup.items
													// .get(parseInt(i))
													// .getEl(),
													// // title
													// // :
													// // 'Mouse
													// // Track',
													// width : 200,
													// html : tips[i],
													// trackMouse : true
													// });
													// }
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
						Ext.warn("请选择一个求和汇总方案");
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
		var initTip = function(collection, tips) {
			if (collection.getCount() > 0) {
				for (var i in tips) {
					Ext.create('Ext.tip.ToolTip', {
								target : collection.get(parseInt(i)).getEl(),
								width : 350,
								html : tips[i],
								trackMouse : true
							});
				}
			}
		}
		me.callParent(arguments);
		me.down("radiogroup").on("afterlayout", function() {
					initTip(me.down("radiogroup").items, tips);
				})
	}
});