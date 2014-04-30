Ext.define('yspz_gen.view.yspz.edit', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.yspz_edit',
	border : false,

	initComponent : function() {
		var me = this, store = Ext.create('Ext.data.Store', {
					fields : ['colname', 'type', 'notnull', 'primarykey',
							'comment', 'text',
							// 'group', 'sum',
							'validation', 'value', 'default', 'vfrom',
							'preprocess'],
					proxy : {
						type : 'memory'
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
					grid.down('#preView').setDisabled(!records.length);
					grid.down('#handle').setDisabled(!records.length);
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
					}, '->', {
						text : '预览',
						itemId : 'preView',
						iconCls : 'preview',
						disabled : true
					}, '-', {
						text : '处理',
						itemId : 'handle',
						iconCls : 'handle',
						disabled : true
					}],
			height : 200,
			border : true,
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
					},
					// {
					// text : "汇总、求和",
					// dataIndex : 'group',
					// width : 70,
					// renderer : function(v, m, r) {
					// return v ? "汇总" : r.data.sum ? "求和" : "";
					// }
					// },
					{
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
							return ['流水文件', '计费模块', 'Matcher'][parseInt(v) - 1];
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

		me.items = [grid];
		me.callParent(arguments);
		var journalentry = Ext.createByAlias('widget.journalentry', {
					// 设置id时用，作为区分凭证的后缀构成部分
					_set : me._set,
					_line : me._line,
					_code : me._code,
					_name : me._name,
					_store : store
				});
		me.add(journalentry);
	}
});