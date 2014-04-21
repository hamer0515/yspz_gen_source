Ext.define('yspz_gen.view.component.JournalEntry', {
	extend : 'Ext.form.Panel',
	alias : 'widget.journalentry',

	border : true,
	fieldDefaults : {
		labelWidth : 150
	},
	layout : {
		type : 'vbox',
		align : 'center'
	},
	bodyPadding : 10,
	initComponent : function() {
		var me = this, suffix = me._set.toString() + me._line.toString()
				+ me._code.toString(), editor = "Ext.create('yspz_gen.view.component.base.ComboBox', {store : me._store,valueField : 'colname',displayField : 'text', submitValue : false})", amt_editor = "Ext.createByAlias('widget.money', {submitValue : false})";
		me.fields = [];
		Ext.Ajax.request({
					async : false,
					url : 'checking_findAllChecking.action',
					success : function(response) {
						me.names = Ext.decode(response.responseText).success;
					}
				});
		me.items = [{
			xtype : 'fieldcontainer',
			layout : 'vbox',
			items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'numberfield',
									anchor : '100%',
									value : 1.1,
									maxValue : 99,
									minValue : 1,
									fieldLabel : '分录编号',
									id : 'journalentry_code' + suffix,
									submitValue : false,
									width : 360,
									allowBlank : false
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'books',
									margin : '0 10 0 0',
									id : 'journalentry_jbook' + suffix,
									submitValue : false,
									_set : me._set,
									allowBlank : false,
									fieldLabel : '借方科目'
								}, {
									xtype : 'books',
									submitValue : false,
									_set : me._set,
									allowBlank : false,
									fieldLabel : '贷方科目',
									id : 'journalentry_dbook' + suffix
								}]

					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
							xtype : 'button',
							text : '添加',
							margin : '0 20 0 0',
							handler : function(button) {
								if (!me.getForm().isValid()) {
									return;
								}
								var j_comp = Ext.getCmp('journalentry_jbook'
										+ suffix);
								var d_comp = Ext.getCmp('journalentry_dbook'
										+ suffix);
								var fl_comp = Ext.getCmp('journalentry_code'
										+ suffix);
								var j = j_comp.getValue();
								var d = d_comp.getValue();
								var fl = fl_comp.getValue();
								if (!Ext.Array.every(me.fields, function(item) {
											return item[0] == fl ? false : true;
										})) {
									Ext.MessageBox.alert('警告', '[分录' + fl
													+ ']已经存在');
									return;

								}
								var j_data = j_comp.store.getAt(j_comp.store
										.findExact('id', j));
								var d_data = d_comp.store.getAt(d_comp.store
										.findExact('id', d));
								var j_properties = j_data.data.checkingList.split(',');
								var d_properties = d_data.data.checkingList.split(',');
								var j_source = {
									'amt' : ''
								};
								var d_source = {
									'amt' : ''
								};
								var j_sourceConfig = {
									'amt' : {
										"editor" : eval(editor),
										"displayName" : "金额"
									}
								};
								var d_sourceConfig = {
									'amt' : {
										"editor" : eval(editor),
										"displayName" : "金额"
									}
								};
								for (var property in j_properties) {
									var v = j_properties[property];
									j_source[v] = '';
									j_sourceConfig[v] = {};
									j_sourceConfig[v]["editor"] = eval(editor);
									j_sourceConfig[v]["displayName"] = me.names[v];
								}
								for (var property in d_properties) {
									var v = d_properties[property];
									d_source[v] = '';
									d_sourceConfig[v] = {};
									d_sourceConfig[v]["editor"] = eval(editor);
									d_sourceConfig[v]["displayName"] = me.names[v];
								}
								var jbook = Ext.create(
										'Ext.grid.property.Grid', {
											_type : j,
											title : "借方科目：" + j_data.data.name,
											width : 516,
											margin : '0 10 0 0',
											sourceConfig : j_sourceConfig,
											source : j_source,
											clicksToEdit : 1,
											disableSelection : true
										});
								// 禁用排序
								jbook.columns[0].sortable = false;
								jbook.columns[1].sortable = false;
								var dbook = Ext.create(
										'Ext.grid.property.Grid', {
											_type : d,
											title : "贷方科目：" + d_data.data.name,
											width : 516,
											sourceConfig : d_sourceConfig,
											source : d_source,
											clicksToEdit : 1,
											disableSelection : true
										});
								// 禁用排序
								dbook.columns[0].sortable = false;
								dbook.columns[1].sortable = false;
								me.fields.push([fl, jbook, dbook]);
								var header = Ext.createByAlias(
										'widget.fieldcontainer', {
											fl_id : fl,
											layout : 'vbox',
											items : [{
												xtype : 'fieldcontainer',
												layout : 'hbox',
												items : [{
															xtype : 'displayfield',
															value : '分录' + fl
														}, {
															xtype : 'button',
															margin : '0 0 0 200',
															text : '删除',
															handler : function(
																	button) {
																me.fields = Ext.Array
																		.filter(
																				me.fields,
																				function(
																						item) {
																					if (item[0] === header.fl_id) {
																						return false;
																					}
																					return true;
																				});
																me.items.items[0]
																		.remove(header);
															}
														}]
											}, {
												xtype : 'fieldcontainer',
												layout : {
													type : 'hbox',
													align : 'top'
												},
												items : [jbook, dbook]
											}]
										});
								me.items.items[0].insert(3, header)
							}
						}, {
							xtype : 'button',
							text : '提交',
							handler : function(button) {
								if (me.getForm().isValid()) {
									var data = me.check();
									var ys_data = [];
									me._store.each(function(rec) {
												return me.checkRow(rec.data,
														ys_data);
											});
									if (typeof(data) === "boolean") {
										return;
									}
									Ext.MessageBox.confirm('提示', '确定要提交吗',
											function(optional) {
												if (optional === 'yes') {
													var value = me.getForm()
															.getValues();
													var sendData = {};
													sendData["entrys"] = data;
													sendData["items"] = ys_data;
													sendData["set"] = me._set;
													sendData["line"] = me._line;
													sendData["code"] = me._code;
													sendData["name"] = me._name;
													me
															.getForm()
															.setValues(sendData);
													me.getForm().submit({
														clientValidation : true,
														url : 'credential_createCredentialAudit.action',
														params : {
															data : Ext.JSON
																	.encode(sendData),
															set : me._set,
															line : me._line,
															code : me._code,
															name : me._name
														},
														success : function(f,
																action) {
															Ext.MessageBox
																	.show({
																		title : '提示',
																		msg : '添加成功',
																		closable : false,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.INFO,
																		fn : function() {
																			me
																					.getForm()
																					.reset();
																			me.fields = [];
																			var c = me.items.items[0];
																			var count = c.items.items.length;
																			for (var i = count
																					- 1; i > 2; i--) {
																				c
																						.remove(c.items.items[i]);
																			}
																			me._store
																					.removeAll();
																		}
																	});
														},
														failure : function(
																form, action) {
															Ext.MessageBox
																	.show({
																		title : '警告',
																		msg : action.result.msg,
																		buttons : Ext.Msg.YES,
																		icon : Ext.Msg.ERROR
																	});
														},
														waitMsg : '请求提交中...',
														waitTitle : '请稍等'
													});
												}
											})
								}
							}

						}]

					}]
		}];
		me.checkRow = function(data, ys_data) {
			ys_data.push(data);
			return true;
		};
		me.check = function() {
			var fields = me.fields, data = [], empty = true;
			// 检查原始凭证配置
			for (var index in fields) {
				var d = {
					"books" : []
				}, j_book = {
					"lending" : "J",
					"checkings" : []
				}, d_book = {
					"lending" : "D",
					"checkings" : []
				};
				if (fields[index] == undefined) {
					continue;
				}
				var field = fields[index];
				var fl = field[0];
				var jbook = field[1].getSource();
				var dbook = field[2].getSource();
				if (empty) {
					empty = false;
				}
				d.id = fl;
				// d[fl] = {};
				// d[fl]["j_book"] = {};
				j_book.id = field[1]["_type"];
				// d[fl]["j_book"]["_type"] = field[1]["_type"];
				for (var f in jbook) {
					if (jbook[f] == '') {
						Ext.MessageBox.alert('警告', '[分录' + fl + '][借方科目]['
										+ me.names[f] + ']值为空');
						return false;
					}
					j_book.checkings.push({
								"name" : f,
								"colname" : jbook[f]
							});
					// d[fl]["j_book"][f] = jbook[f];
				}
				// d[fl]["d_book"] = {};
				d_book.id = field[2]["_type"];
				// d[fl]["d_book"]["_type"] = field[2]["_type"];
				for (var f in dbook) {
					if (dbook[f] == '') {
						Ext.MessageBox.alert('警告', '[分录' + fl + '][贷方科目]['
										+ me.names[f] + ']值为空');
						return false;
					}
					d_book.checkings.push({
								"name" : f,
								"colname" : dbook[f]
							});
					// d[fl]["d_book"][f] = dbook[f];
				}
				d.books.push(j_book, d_book);
				data.push(d);
			}
			if (empty) {
				Ext.MessageBox.alert('警告', '没有任何分录');
				return false;
			}
			return data;
		};
		me.callParent(arguments);
	}
});