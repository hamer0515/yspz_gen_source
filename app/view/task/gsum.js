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
		var me = this, items = me._items, fields = [];
		for (var i in items) {
			fields.push({
						boxLabel : items[i],
						name : "fields",
						inputValue : i
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
						items : []
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
										layout : 'fit',
										closable : false,
										resizable : false,
										modal : true,
										autoShow : true,
										items : {
											xtype : 'form',
											bodyPadding : 5,
											layout : 'anchor',
											defaults : {
												anchor : '100%'
											},
											items : {
												xtype : 'checkboxgroup',
												columns : 6,
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
																	.join(",")).submitValue = svalue
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
										layout : 'fit',
										closable : false,
										resizable : false,
										modal : true,
										autoShow : true,
										items : {
											xtype : 'form',
											bodyPadding : 5,
											layout : 'anchor',
											defaults : {
												anchor : '100%'
											},
											items : {
												xtype : 'checkboxgroup',
												columns : 6,
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
																	.join(",")).submitValue = svalue
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
					var formpanel = this.up('window').down('form');
					if (formpanel.isValid()) {
						var fields = formpanel.getForm().getFields().items;
						formpanel.items.items[0].add({
							xtype : 'fieldcontainer',
							layout : {
								type : 'hbox',
								align : 'center'
							},
							items : [{
								xtype : 'component',
								html : "<div title=\""
										+ fields[0].value
										+ "\">汇总列："
										+ Ext.util.Format.ellipsis(
												fields[0].value, 26)
										+ "</div><div title=\""
										+ fields[1].value
										+ "\">求和列："
										+ Ext.util.Format.ellipsis(
												fields[1].value, 26) + "</div>",
								submitValue : {
									group : fields[0].submitValue,
									sum : fields[1].submitValue
								}
							}, {
								xtype : 'button',
								margin : '0 0 0 10',
								iconCls : "delete",
								handler : function() {
									this.up('fieldset').remove(this
											.up('fieldcontainer'));
								}
							}]
						});
						formpanel.getForm().reset();
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
					var window = this.up('window'), fieldContainers = window
							.down('form').items.items[0].items.items, value = [], rec = window._rec, grid = window._grid;
					for (var i in fieldContainers) {
						value
								.push(Ext
										.encode(fieldContainers[i].items.items[0].submitValue));
					}
					Ext
							.asyncRequest(
									'credential/CredentialServlet.action?method=sumCredential',
									{
										credentialId : rec.data.credentialId,
										importDate : rec.data.importDate,
										id : rec.data.id,
										gsum : value
									}, function() {
										window.close();
										grid.store.reload();
									});
				}
			}]
		}
		me.callParent(arguments);
	}
});