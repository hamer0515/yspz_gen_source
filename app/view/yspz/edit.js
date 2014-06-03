Ext.define('yspz_gen.view.yspz.edit', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.yspz_edit',
	border : false,

	initComponent : function() {
		var me = this, formpanel = Ext.create('Ext.form.Panel', {
			layout : 'anchor',
			bodyPadding : 5,
			// border : false,
			defaults : {
				anchor : '40%'
			},
			defaultType : 'textfield',
			items : [{
				xtype : 'fieldset',
				// columnWidth : 0.5,
				title : '基本信息',
				defaultType : 'textfield',
				defaults : {
					anchor : '100%'
				},
				layout : 'anchor',
				items : [{
							fieldLabel : '所属类别',
							xtype : 'treepicker',
							name : '_type',
							displayField : 'text',
							valueField : 'id',
							store : new Ext.data.TreeStore({
										fields : ['id', 'text'],
										proxy : {
											type : 'ajax',
											url : Ext.urls.GET_ALL_CREDENTIAL_TYPES
										},
										root : {
											expanded : true,
											id : '',
											text : '所有类别'
										},
										autoLoad : true
									}),
							allowBlank : false
						}, {
							fieldLabel : '凭证编号',
							margin : '5 0 0 0',
							maxLength : 5,
							name : '_code',
							allowBlank : false
						}, {
							fieldLabel : '凭证名称',
							margin : '5 0 5 0',
							name : '_name',
							allowBlank : false
						}, {
							fieldLabel : '计费模块参数',
							margin : '5 0 5 0',
							name : '_calcParams'
							// allowBlank : false
					}	, {
							xtype : 'label',
							text : '计费模块参数填写说明：1、外部部门编号，外部部门银行接口编号，银行成功日期，银行清算日期，交易金额，matcher；如dept,bi,period,clear_date,amt,matcher 2、外部部门编号，外部部门银行接口编号；如：31，bi',
							margin : '5 0 5 0'
						}]
			}]
				// buttons : [{
				// text : '提交',
				// handler : function(btn) {
				// var form = formpanel.getForm();
				// if (form.isValid()) {
				// }
				// }
				// }]
		}), store = Ext.create('Ext.data.Store', {
					fields : ['colname', 'type', 'notnull', 'primarykey',
							'comment', 'text', 'validation', 'value',
							'default', 'vfrom', 'preprocess', 'isMoney'],
					proxy : {
						type : 'memory'
					},
					listeners : {
						add : function(store) {
							if (store.getCount() > 0) {
								grid.down('#submit').setDisabled(false);
							}
						},
						remove : function() {
							if (store.getCount == 0) {
								grid.down('#submit').setDisabled(true);
							}
						}
					}
				}), rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					pluginId : 'rowEditing',
					saveBtnText : '保存',
					cancelBtnText : "取消",
					autoCancel : false,
					clicksToEdit : 2,
					errorSummary : false
				}), grid = Ext.create('Ext.grid.Panel', {
			selType : 'rowmodel',
			plugins : [rowEditing],
			store : store,
			listeners : {
				'selectionchange' : function(view, records) {
					grid.down('#removeColumn').setDisabled(!records.length);
				}
			},
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragText : '拖拽排序'
				},
				listeners : {
					drop : function() {
						grid.getView().refresh();
					}
				}
			},
			tbar : [{
						text : '添加',
						iconCls : 'add',
						handler : function() {
							var view = Ext.widget('yspz_input', {
										_store : store
									});
						}
					}, '-', {
						itemId : 'removeColumn',
						text : '删除',
						iconCls : 'delete',
						handler : function() {
							var sm = grid.getSelectionModel();
							rowEditing.cancelEdit();
							store.remove(sm.getSelection());
							if (store.getCount() > 0) {
								sm.select(0);
							}
						},
						disabled : true
					}, '->', '-', {
						text : '提交',
						itemId : 'submit',
						disabled : true,
						handler : function(btn) {
							if (!formpanel.isValid()) {
								return;
							}
							var data = [];
							var store = btn.up('gridpanel').store;
							store.each(function(rec) {
										data.push(rec.data);
										return true;
									});
							Ext.MessageBox.confirm('提示', '确定要提交吗', function(
									optional) {
								if (optional === 'yes') {
									var sendData = formpanel.getValues();
									sendData["items"] = data;
									// sendData["type"] = me._type;
									// sendData["code"] = me._code;
									// sendData["name"] = me._name;
									Ext.asyncRequest(
											Ext.urls.SUBMIT_CREDENTIAL_META, {
												data : Ext.JSON
														.encode(sendData),
												type : sendData._type,
												code : sendData._code,
												name : sendData._name,
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
			height : 'auto',
			aotoScroll : true,
			border : false,
			columns : [{
						xtype : 'rownumberer',
						width : 40
					}, {
						text : "列名",
						dataIndex : 'colname',
						flex : 1
					}, {
						text : "数据类型",
						dataIndex : 'type',
						flex : 1,
						editor : {
							xtype : 'datatype',
							allowBlank : false
						}
					}, {
						text : "Primary Key",
						dataIndex : 'primarykey',
						width : 70,
						renderer : function(v) {
							return v ? "是" : "否"
						},
						editor : {
							xtype : 'checkbox',
							inputValue : true,
							uncheckedValue : false
						}
					}, {
						text : "Not Null",
						dataIndex : 'notnull',
						width : 50,
						renderer : function(v) {
							return v ? "是" : "否"
						},
						editor : {
							xtype : 'checkbox',
							inputValue : true,
							uncheckedValue : false
						}
					}, {
						text : "备注",
						dataIndex : 'comment',
						flex : 1,
						editor : {
							xtype : 'textfield'
						}
					}, {
						text : "显示为",
						dataIndex : 'text',
						flex : 1,
						editor : {
							xtype : 'textfield',
							allowBlank : false
						}
					}, {
						text : "默认值",
						dataIndex : 'default',
						flex : 1
					}, {
						text : "取值方式",
						dataIndex : 'vfrom',
						flex : 1,
						renderer : function(v) {
							if (!v)
								return v;
							return ['流水文件', '计费模块', 'Matcher', '其他'][parseInt(v)
									- 1];
						}
					}, {
						text : "金额",
						dataIndex : 'isMoney',
						width : 70,
						renderer : function(v) {
							return v ? "是" : "否"
						},
						editor : {
							xtype : 'checkbox',
							inputValue : true,
							uncheckedValue : false
						}
					}, {
						text : "值",
						dataIndex : 'value',
						flex : 1,
						renderer : function(v, m, r) {
							if (!v)
								return v;
							if (r.data.vfrom == 1) {
								return "流水["
										+ v
										+ "]"
										+ "校验["
										+ ['不校验', '金额', '日期'][parseInt(r.data.validation)
												- 1]
										+ "]预处理["
										+ ['时间戳转日期', '元转分'][parseInt(r.data.preprocess)
												- 1] + "]";
							} else if (r.data.vfrom == 3) {
								return "Matcher由[" + v + "]列" + "组成";
							}
							return v;
						}
					}]
		});
		grid.on('edit', function(editor, e) {
					store.sync();
				});

		me.items = [formpanel, grid];
		me.callParent(arguments);
		// var journalentry = Ext.createByAlias('widget.journalentry', {
		// // 设置id时用，作为区分凭证的后缀构成部分
		// // _set : me._set,
		// _type : me._type,
		// _code : me._code,
		// _name : me._name,
		// _store : store
		// });
		// me.add(journalentry);
	}
});