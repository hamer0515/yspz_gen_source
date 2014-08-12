Ext.define("yspz_gen.view.baobiao.task.check_add", {
	extend : "Ext.window.Window",
	alias : "widget.baobiao_task_check_add",
	title : "新增人工校验规则",
	layout : "fit",
	closable : false,
	resizable : false,
	width : 600,
	height : 385,
	modal : true,
	autoShow : true,
	initComponent : function() {
		var me = this, count = 1;
		me.items = {
			xtype : "form",
			overflowY : "auto",
			bodyPadding : 5,
			// layout : "anchor",
			url : Ext.urls.ADD_BAOBIAO_TASK_CHECK,
			// defaults : {
			// anchor : "100%"
			// },
			items : [{
				xtype : 'fieldset',
				title : '字段',
				// height : 150,
				_count : 1,
				items : [{
					xtype : "fieldcontainer",
					layout : {
						type : 'hbox',
						defaultMargins : {
							right : 5
						}
					},
					items : [{
						xtype : 'baobiao_component_tables',
						name : "table_0",
						allowBlank : false,
						margin : '0 5 0 0',
						flex : 1,
						onChangeEvent : function(combo, newValue, oldValue,
								eOpts) {
							var fields = this.up("fieldcontainer")
									.down("baobiao_component_fields");
							fields.setValue("");
							fields.store.removeAll();
							if (newValue) {
								fields.store.proxy.extraParams = {
									table : newValue
								};
								fields.store.reload()
							}
						}
					}, {
						xtype : 'baobiao_component_fields',
						flex : 1,
						name : "field_0",
						allowBlank : false,
						margin : '0 5 0 0'
					}, {
						xtype : 'checkboxfield',
						boxLabel : 'sum',
						name : "isSum_0",
						inputValue : true
					}]
				}, {
					xtype : "button",
					text : "添加字段",
					margin : '0 0 5 0',
					colspan : 7,
					handler : function() {
						var fieldset = this.up("fieldset");
						var count = fieldset._count++;
						var fieldContainer = Ext.create(
								'widget.fieldcontainer', {
									layout : {
										type : 'hbox',
										defaultMargins : {
											right : 5
										}
									},
									_count : count,
									items : [{
												xtype : 'baobiao_component_cal',
												flex : 1,
												name : "cal_" + count,
												allowBlank : false,
												margin : '0 5 0 0'
											}, {
												xtype : 'baobiao_component_tables',
												name : "table_" + count,
												allowBlank : false,
												margin : '0 5 0 0',
												flex : 1,
												onChangeEvent : function(combo,
														newValue, oldValue,
														eOpts) {
													var fields = this
															.up("fieldcontainer")
															.down("baobiao_component_fields");
													fields.setValue("");
													fields.store.removeAll();
													if (newValue) {
														fields.store.proxy.extraParams = {
															table : newValue
														};
														fields.store.reload()
													}
												}
											}, {
												xtype : 'baobiao_component_fields',
												flex : 1,
												name : "field_" + count,
												allowBlank : false,
												margin : '0 5 0 0'
											}, {
												xtype : 'checkboxfield',
												boxLabel : 'sum',
												name : "isSum_" + count,
												inputValue : true
											}, {
												xtype : "button",
												text : "删除",
												handler : function() {
													this
															.up("fieldset")
															.remove(this
																	.up("fieldcontainer"));
												}
											}]
								});
						fieldset.add(fieldContainer);
					}
				}]
			}, {
				xtype : "fieldcontainer",
				layout : {
					type : 'hbox',
					defaultMargins : {
						right : 5
					}
				},
				items : [{
							xtype : 'baobiao_component_with0',
							name : "with0",
							allowBlank : false,
							margin : '0 5 0 0',
							flex : 1
						}, {
							xtype : 'baobiao_component_errorLevel',
							flex : 1,
							name : "level",
							allowBlank : false,
							margin : '0 5 0 0'
						}]
			}, {
				xtype : "fieldcontainer",
				layout : {
					type : 'hbox',
					defaultMargins : {
						right : 5
					}
				},
				items : [{
							xtype : 'baobiao_component_ruleType',
							name : "type",
							allowBlank : false,
							margin : '0 5 0 0',
							flex : 1
						}]
			}, {
				xtype : "fieldcontainer",
				layout : {
					type : 'hbox',
					defaultMargins : {
						right : 5
					}
				},
				items : [{
					xtype : 'textareafield',
					labelAlign : "top",
					readOnly : true,
					rows : 10,
					cols : 75,
					// grow : true,
					name : 'message',
					fieldLabel : '报表规则展示'
						// anchor : '100%'
					}]
			}],
			buttons : [{
						text : "查看规则",
						handler : function() {
							var form = this.up("form");
							if (form.isValid()) {
								form.down("textarea").setValue(getRule());
							}
						}
					}, {
						text : "確定",
						handler : function() {
							var form = this.up("form");
							if (form.isValid()) {
								Ext.asyncRequest(
										Ext.urls.ADD_BAOBIAO_TASK_CHECK, {
											content : Ext.encode(getContent())
										}, function() {
											form.up("window").close();
											me._panel.down("grid").store
													.reload();
										}, undefined, undefined, form);
							}
						}
					}, {
						text : "取消",
						handler : function() {
							this.up("window").close()
						}
					}]
		};
		var getRule = function() {
			var values = me.down("form").getValues(), count = me
					.down("fieldset")._count, rule = "";
			if (values.type === "0") {
				for (var i = 0; i < count; i++) {
					rule += (values["cal_" + i] || "")
							+ (values["table_" + i]
									? me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
											+ "的" + values["field_" + i]
									: "");
				}
			} else {
				for (var i = 0; i < count; i++) {
					rule += (values["cal_" + i] || "")
							+ (values["table_" + i]
									? me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
											+ "的"
											+ (values["isSum_" + i]
													? values["field_" + i]
															+ "合计"
													: values["field_" + i])
									: "");
				}

			}
			rule += values.with0
			return rule;
		}
		var getContent = function() {
			var values = me.down("form").getValues(), count = me
					.down("fieldset")._count, rule = "", content = {
				type : values.type,
				level : values.level
			}, list = {}, dbList = [];
			if (values.type === "0") {
				for (var i = 0; i < count; i++) {
					rule += (values["cal_" + i] || "")
							+ (values["table_" + i]
									? me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
											+ "的" + values["field_" + i]
									: "");
					list[values["table_" + i]]
							|| (list[values["table_" + i]] = "");
					list[values["table_" + i]] += values["field_" + i]
							+ " as "
							+ me.down("baobiao_component_tables[name=\"table_"
									+ i + "\"]").getRawValue() + "的"
							+ values["field_" + i] + ",";
				}
				for (var i in list) {
					dbList.push({
								table : i,
								column : list[i] + "acct_num ACCOUNT"
							});
				}
			} else {
				for (var i = 0; i < count; i++) {
					rule += (values["cal_" + i] || "")
							+ (values["table_" + i]
									? me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
											+ "的"
											+ (values["isSum_" + i]
													? values["field_" + i]
															+ "合计"
													: values["field_" + i])
									: "");
					list[values["table_" + i]]
							|| (list[values["table_" + i]] = "");
					list[values["table_" + i]] += (values["isSum_" + i]
							? "sum("
									+ values["field_" + i]
									+ ") as "
									+ me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
									+ "的" + values["field_" + i] + "合计,"
							: values["field_" + i]
									+ " as "
									+ me
											.down("baobiao_component_tables[name=\"table_"
													+ i + "\"]").getRawValue()
									+ "的" + values["field_" + i] + ",");
				}
				for (var i in list) {
					dbList.push({
								table : i,
								column : list[i].substr(0, list[i].length - 1)
							});
				}

			}
			rule += values.with0;
			content.rule = rule;
			content.dbList = dbList;
			return content;

		}
		this.callParent(arguments);
	}

});