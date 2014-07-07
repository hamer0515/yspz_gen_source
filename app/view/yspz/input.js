Ext.define("yspz_gen.view.yspz.input", {
	extend : "Ext.window.Window",
	alias : "widget.yspz_input",
	title : "添加",
	layout : "fit",
	closable : false,
	resizable : false,
	modal : true,
	autoShow : true,
	initComponent : function() {
		var me = this;
		me.items = {
			xtype : "form",
			bodyPadding : 5,
			width : 350,
			layout : "anchor",
			defaults : {
				anchor : "100%"
			},
			defaultType : "textfield",
			items : [{
				xtype : "fieldset",
				title : "导入",
				defaultType : "textfield",
				defaults : {
					anchor : "100%"
				},
				layout : "anchor",
				items : [Ext.create("yspz_gen.view.component.base.ComboBox", {
									fieldLabel : "导入列",
									store : me._store,
									displayField : "text",
									valueField : "colname"
								}), {
							xtype : "button",
							text : "导入",
							anchor : "25%",
							margin : "0 0 5 0",
							handler : function() {
								var store = me._store, value = me
										.down("fieldset[title=\"导入\"]")
										.down("combo").getValue(), rec;
								if (value) {
									rec = store.findRecord("colname", value);
									(function(rec) {
										this.loadRecord(rec);
										this.getForm().getFields().findBy(
												function(f) {
													return f.getName() === "value"
															&& !f.disabled;
												}).setValue(rec.data.value);
									}).call(me.down("form"), rec);
								}
							}
						}]
			}, {
				xtype : "fieldset",
				title : "定义",
				defaultType : "textfield",
				defaults : {
					anchor : "100%"
				},
				layout : "anchor",
				items : [{
							fieldLabel : "列名",
							allowBlank : false,
							validator : function(v) {
								if (v != "") {
									var store = this.up("window")._store;
									var index = store.findExact("colname", v);
									if (index != -1) {
										return "已经存在的列";
									}
								}
								return true
							},
							name : "colname"
						}, {
							fieldLabel : "数据类型",
							xtype : "datatype",
							name : "type",
							allowBlank : false
						}, {
							xtype : "checkboxgroup",
							fieldLabel : "主键、非空",
							submitValue : false,
							columns : 2,
							vertical : true,
							items : [{
										boxLabel : "Primary Key",
										inputValue : true,
										uncheckedValue : false,
										name : "primarykey"
									}, {
										boxLabel : "Not NULL",
										inputValue : true,
										uncheckedValue : false,
										name : "notnull",
										checked : true
									}]
						}, {
							fieldLabel : "备注",
							name : "comment"
						}, {
							fieldLabel : "显示为",
							name : "text",
							allowBlank : false
						}]
			}, {
				xtype : "fieldset",
				title : "取值",
				defaults : {
					anchor : "100%"
				},
				layout : "anchor",
				items : [{
							xtype : "radiogroup",
							columns : 2,
							fieldLabel : "是否为金额",
							vertical : true,
							items : [{
										boxLabel : "否",
										name : "isMoney",
										inputValue : 0,
										checked : true
									}, {
										boxLabel : "是",
										name : "isMoney",
										inputValue : 1
									}]
						}, {
							xtype : "textfield",
							fieldLabel : "默认值",
							name : "default"
						}, {
							xtype : "radiogroup",
							fieldLabel : "取值方式",
							columns : 3,
							vertical : true,
							items : [{
										boxLabel : "流水文件",
										name : "vfrom",
										checked : true,
										inputValue : 1
									}, {
										boxLabel : "计费模块",
										name : "vfrom",
										inputValue : 2
									}, {
										boxLabel : "Matcher",
										name : "vfrom",
										inputValue : 3
									}, {
										boxLabel : "其他",
										name : "vfrom",
										inputValue : 4
									}],
							listeners : {
								change : function(field, newValue, oldValue) {
									if (newValue.vfrom == 1) {
										Ext.getCmp("vfrom_10").show();
										Ext.getCmp("vfrom_10").enable();
										Ext.getCmp("vfrom_11").show();
										Ext.getCmp("vfrom_11").enable();
									}
									if (oldValue.vfrom == 1) {
										Ext.getCmp("vfrom_10").hide();
										Ext.getCmp("vfrom_10").disable();
										Ext.getCmp("vfrom_11").hide();
										Ext.getCmp("vfrom_11").disable();
									}
									if (newValue.vfrom != 4) {
										Ext.getCmp("vfrom_" + newValue.vfrom)
												.show();
										Ext.getCmp("vfrom_" + newValue.vfrom)
												.enable();
									}
									if (oldValue.vfrom != 4) {
										Ext.getCmp("vfrom_" + oldValue.vfrom)
												.hide();
										Ext.getCmp("vfrom_" + oldValue.vfrom)
												.disable();
									}
								}
							}
						}, {
							xtype : "numberfield",
							fieldLabel : "取自流水第几列",
							id : "vfrom_1",
							anchor : "100%",
							maxValue : 100,
							minValue : 1,
							name : "value",
							allowBlank : false
						}, {
							xtype : "calcvalue",
							fieldLabel : "值",
							id : "vfrom_2",
							allowBlank : false,
							hidden : true,
							disabled : true,
							name : "value"
						}, {
							xtype : "textfield",
							fieldLabel : "值",
							emptyText : "取值于流水如:2,3,4",
							validateOnChange : false,
							validator : function(v) {
								if (v != "") {
									var store = this.up("window")._store;
									var index = store.findExact("vfrom", 3);
									if (index != -1) {
										return "Matcher已经存在";
									}
								}
								return true
							},
							regex : /[I|O](,\d)+/,
							regexText : "格式不正确，参照：I/O,1,2,3",
							id : "vfrom_3",
							hidden : true,
							disabled : true,
							allowBlank : false,
							name : "value"
						}, {
							xtype : "validation",
							id : "vfrom_10",
							fieldLabel : "流水校验规则",
							name : "validation"
						}, {
							xtype : "preprocess",
							id : "vfrom_11",
							fieldLabel : "处理方式",
							name : "preprocess"
						}]
			}],
			buttons : [{
						text : "確定",
						handler : function() {
							var formpanel = this.up("window").down("form");
							if (formpanel.isValid()) {
								var store = this.up("window")._store;
								store.add(formpanel.getForm().getValues());
								// formpanel.getForm().reset();
							}
						}
					}, {
						text : "取消",
						handler : function() {
							this.up("window").close()
						}
					}, {
						text : "重置",
						handler : function() {
							this.up("window").down("form").getForm().reset();
						}
					}]
		};
		this.callParent(arguments);
	}

});