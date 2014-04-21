Ext.define('yspz_gen.view.yspz.edit', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.yspz_edit',
	border : false,

	initComponent : function() {
		var me = this, store = Ext.create('Ext.data.Store', {
					fields : ['text', 'colname', 'col', 'type', 'primarykey',
							'notnull', 'default', 'comment', 'validation',
							'sum', 'group'],
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
							grid.down('#removeColumn')
									.setDisabled(!records.length);
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
									if (rowEditing.editing) {
										return;
									}
									var row = store.getCount();
									store.insert(row, {
												text : '',
												colname : '',
												type : '',
												display : '',
												isprimary : false,
												isnull : false,
												'default' : ''
											});
									rowEditing.startEdit(row, 0);
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
								text : "对应流水列",
								dataIndex : 'col',
								width : 80,
								editor : {
									xtype : 'numberfield',
									anchor : '100%',
									maxValue : 99,
									minValue : 1,
									allowBlank : false
								}
							}, {
								text : "列名",
								dataIndex : 'colname',
								flex : 1,
								editor : {
									xtype : 'textfield',
									allowBlank : false
								}
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
								editor : {
									xtype : 'checkbox'
								}
							}, {
								text : "Not Null",
								dataIndex : 'notnull',
								width : 50,
								editor : {
									xtype : 'checkbox'
								}
							}, {
								text : "默认值",
								dataIndex : 'default',
								flex : 1,
								editor : {
									xtype : 'textfield'
								}
							}, {
								text : "备注",
								dataIndex : 'comment',
								flex : 1,
								editor : {
									xtype : 'textfield'
								}
							}, {
								text : "名称",
								dataIndex : 'text',
								flex : 1,
								editor : {
									xtype : 'textfield',
									allowBlank : false
								}
							}, {
								text : "校验",
								dataIndex : 'validation',
								flex : 1,
								renderer : function(v) {
									if (!v)
										return v;
									return ['不校验', '金额', '日期'][parseInt(v) - 1];
								},
								editor : {
									xtype : 'validation',
									allowBlank : false
								}
							}, {
								text : "汇总",
								dataIndex : 'group',
								width : 40,
								editor : {
									xtype : 'checkbox'
								}
							}, {
								text : "求和",
								dataIndex : 'sum',
								width : 40,
								editor : {
									xtype : 'checkbox'
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