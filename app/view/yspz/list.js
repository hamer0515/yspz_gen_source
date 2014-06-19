Ext.define("yspz_gen.view.yspz.list", {
	extend : "Ext.panel.Panel",
	alias : "widget.yspz_list",
	border : false,

	initComponent : function() {
		var me = this, formpanel = Ext.create("Ext.form.Panel", {
			layout : "anchor",
			bodyPadding : 5,
			defaults : {
				anchor : "100%"
			},
			items : [{
				xtype : "fieldset",
				title : "基本信息",
				defaultType : "textfield",
				layout : "column",
				items : [{
							columnWidth : 0.5,
							fieldLabel : "所属类别",
							xtype : "treepicker",
							name : "_type",
							displayField : "text",
							valueField : "id",
							store : new Ext.data.TreeStore({
										fields : ["id", "text"],
										proxy : {
											type : "ajax",
											url : Ext.urls.GET_ALL_CREDENTIAL_TYPES
										},
										root : {
											expanded : true,
											id : "",
											text : "所有类别"
										},
										autoLoad : true
									}),
							allowBlank : false
						}, {
							fieldLabel : "凭证编号",
							margin : "5 0 0 5",
							maxLength : 5,
							columnWidth : 0.5,
							name : "_code",
							allowBlank : false
						}, {
							fieldLabel : "凭证名称",
							margin : "5 0 0 0",
							name : "_name",
							columnWidth : 0.5,
							allowBlank : false
						}, {
							fieldLabel : "计费模块参数",
							margin : "5 0 5 5",
							columnWidth : 0.5,
							name : "_calcParams"
						}, {
							fieldLabel : "流水文件列数",
							margin : "5 0 5 0",
							columnWidth : 0.5,
							name : "_fileColCount"
						}, {
							xtype : "label",
							columnWidth : 1,
							html : "可用模板：<br\>\
调用模板1（外部部门编号 外部接口编号 银行成功日期 银行清算日期 交易金额 matcher 本金银行账号）<br\>\
调用模板2（外部部门编号 外部接口编号）<br\>\
<br\>\
输入规则：<br\>\
若调用模板2则输入：‘31’（固定编码用‘’号），dept_bi（对应字段取下表生成的列名），字段间用英文‘,’分隔，结尾无需加任何符号。<br\>",
							margin : "5 0 5 0"
						}]
			}]
		}), store = Ext.create("Ext.data.Store", {
					fields : ["colname", "type", "notnull", "primarykey",
							"comment", "text", "validation", "value",
							"default", "vfrom", "preprocess", "isMoney"],
					proxy : {
						type : "memory"
					},
					listeners : {
						add : function(store) {
							if (store.getCount() > 0) {
								grid.down("#submit").setDisabled(false);
							}
						},
						remove : function() {
							if (store.getCount == 0) {
								grid.down("#submit").setDisabled(true);
							}
						}
					}
				}), grid = Ext.create("Ext.grid.Panel", {
			selType : "rowmodel",
			store : store,
			listeners : {
				"selectionchange" : function(view, records) {
					grid.down("#removeColumn").setDisabled(!records.length);
				}
			},
			viewConfig : {
				plugins : {
					ptype : "gridviewdragdrop",
					dragText : "拖拽排序"
				},
				listeners : {
					drop : function() {
						grid.getView().refresh();
					}
				}
			},
			tbar : [{
						text : "添加",
						iconCls : "add",
						handler : function() {
							var view = Ext.widget("yspz_input", {
										_store : store
									});
						}
					}, "-", {
						itemId : "removeColumn",
						text : "删除",
						iconCls : "delete",
						handler : function() {
							var sm = grid.getSelectionModel();
							store.remove(sm.getSelection());
							if (store.getCount() > 0) {
								sm.select(0);
							}
						},
						disabled : true
					}, "->", "-", {
						text : "提交",
						itemId : "submit",
						disabled : true,
						handler : function(btn) {
							if (!formpanel.isValid()) {
								return;
							}
							var data = [];
							var store = btn.up("gridpanel").store;
							store.each(function(rec) {
										data.push(rec.data);
										return true;
									});
							Ext.MessageBox.confirm("提示", "确定要提交吗", function(
									optional) {
								if (optional === "yes") {
									var sendData = formpanel.getValues();
									sendData["items"] = data;
									Ext.asyncRequest(
											Ext.urls.SUBMIT_CREDENTIAL_META, {
												data : Ext.JSON
														.encode(sendData),
												type : sendData._type,
												code : sendData._code,
												name : sendData._name,
												fileColCount : sendData._fileColCount,
												calcParams : sendData._calcParams
											}, function() {
												store.removeAll();
												formpanel.getForm().reset();
											});
								}
							})
						}
					}],
			minHeight : 200,
			maxHeight : 270,
			columns : [{
						xtype : "rownumberer",
						width : 40
					}, {
						text : "列名",
						dataIndex : "colname",
						flex : 1
					}, {
						text : "数据类型",
						dataIndex : "type",
						flex : 1
					}, {
						text : "Primary Key",
						dataIndex : "primarykey",
						width : 70,
						renderer : function(v) {
							return v ? "是" : "否"
						}
					}, {
						text : "Not Null",
						dataIndex : "notnull",
						width : 50,
						renderer : function(v) {
							return v ? "是" : "否"
						}
					}, {
						text : "备注",
						dataIndex : "comment",
						flex : 1,
						editor : {
							xtype : "textfield"
						}
					}, {
						text : "显示为",
						dataIndex : "text",
						flex : 1,
						editor : {
							xtype : "textfield",
							allowBlank : false
						}
					}, {
						text : "默认值",
						dataIndex : "default",
						flex : 1
					}, {
						text : "取值方式",
						dataIndex : "vfrom",
						flex : 1,
						renderer : function(v) {
							if (!v)
								return v;
							return ["流水文件", "计费模块", "Matcher", "其他"][parseInt(v)
									- 1];
						}
					}, {
						text : "金额",
						dataIndex : "isMoney",
						width : 70,
						renderer : function(v) {
							return v ? "是" : "否"
						}
					}, {
						text : "值",
						dataIndex : "value",
						flex : 1,
						renderer : function(v, m, r) {
							if (!v)
								return v;
							if (r.data.vfrom == 1) {
								return "流水["
										+ v
										+ "]"
										+ "校验["
										+ ["不校验", "金额", "日期"][parseInt(r.data.validation)
												- 1]
										+ "]预处理["
										+ ["时间戳转日期", "元转分"][parseInt(r.data.preprocess)
												- 1] + "]";
							} else if (r.data.vfrom == 2) {
								var ds = Ext.data.StoreManager
										.lookup('CalcValue'), index = ds
										.findExact('code', v);
								if (index == -1) {
									index = ds.findExact('code', v + '');
								}
								if (index == -1) {
									meta.style = 'color:red';
								}
								return index == -1 ? '无效的数据(' + v + ')' : ds
										.getAt(index).data.name;
							} else if (r.data.vfrom == 3) {
								return "Matcher由[" + v + "]列" + "组成";
							}
							return v;
						}
					}]
		});
		grid.on("edit", function(editor, e) {
					store.sync();
				});
		grid.on("itemdblclick", function(grid, record, item, index, e, eOpts) {
					var view = Ext.widget("yspz_edit", {
								_index : index,
								_store : store
							});
		(function	(rec) {
						this.loadRecord(rec);
						this.getForm().getFields().findBy(function(f) {
									return f.getName() === "value"
											&& !f.disabled;
								}).setValue(rec.data.value);
					}).call(view.down("form"), record);
				});
		me.items = [formpanel, grid];
		me.callParent(arguments);
	}
});