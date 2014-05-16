Ext.define('yspz_gen.view.task.gen', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.task_gen',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), store = new Ext.data.TreeStore(
				{
					autoLoad : true,
					fields : ['text', 'credentialCode'],
					proxy : {
						type : 'ajax',
						url : Ext.urls.GET_CREDENTIAL_TREE
					}
				}), gcolumns = [{
					text : "编号",
					dataIndex : 'id',
					flex : 1
				}, {
					text : "流水文件来源",
					dataIndex : 'credentialPath',
					editor : {
						allowBlank : false
					},
					flex : 1
				}, {
					text : "凭证编号",
					dataIndex : 'code',
					flex : 1
				}, {
					text : "生成日期",
					dataIndex : 'importDate',
					flex : 1
				}, {
					text : "文件状态",
					dataIndex : 'status',
					renderer : function(value, meta, record, rowIndex,
							colIndex, store, view) {
						var text = Ext.data.StoreManager.lookup('FStatus')
								.$render(value, meta, record, rowIndex,
										colIndex, store, view);
						return value < 0 ? "<div title=\"" + record.data.error
								+ "\">" + text + "</div>" : text;
					},
					flex : 1
				}], items = [{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'datefield',
								anchor : '100%',
								margin : '0 20 0 0',
								flex : 1,
								fieldLabel : '生成日期',
								name : 'date',
								allowBlank : false,
								value : new Date()
							}, {
								flex : 1,
								xtype : 'yspz_dict',
								anchor : '100%',
								store : store
							}]
				}], fields = ['id', 'credentialPath', 'code', 'importDate',
				'status', 'error'];
		Ext.apply(me, {
			formConfig : {
				formCheck : function() {
					var me = this, invalid = me.isValid();;
					if (!invalid) {
						return invalid;
					}
					var form = me.getForm(), items = [], records = me
							.down('treepanel').getChecked();
					if (records.length == 0) {
						Ext.error('错误', '至少选择一个原始凭证', Ext.Msg.OK);
						return false;
					}
					return true;
				},
				_getValues : function() {
					var me = this, values = me.getValues();
					var items = [], records = me.down('treepanel').getChecked();
					records.forEach(function(element, index, array) {
								element.data.credentialCode
										&& items
												.push(element.data.credentialCode);
							});
					return Ext.Object.merge(values, {
								items : items
							});
				}
			},
			gridConfig : {
				minHeight : 200,
				selType : 'checkboxmodel',
				plugins : [{
							xclass : 'Ext.grid.plugin.RowEditing',
							clicksToMoveEditor : 1,
							saveBtnText : '保存',
							cancelBtnText : "取消",
							autoCancel : false
						}],
				viewConfig : {
					stripeRows : true,
					getRowClass : function(record) {
						var color, status = record.data.status;
						if (status == 1) {
							color = 'red';
						}
						return color;
					}
				},
				tbar : ["->", {
					iconCls : 'useradd',
					text : '开始校验',
					tooltip : '开始执行文件格式检查，校验和导入',
					handler : function() {
						var grid = me.down('grid'), gsm = grid
								.getSelectionModel(), rows = gsm.getSelection(), items = [];
						if (rows.length == 0) {
							Ext.error('错误', '至少选择一个原始凭证', Ext.Msg.OK);
							return;
						}
						rows.forEach(function(element, index, array) {
									items.push(element.data.id);
								});
						Ext.asyncRequest(Ext.urls.SUBMIT_TASK_START_FOR_CHECK,
								{
									task : items
								}, function() {
									me.down('grid').store.reload();
								});
					}
				}],
				listeners : {
					edit : function(editor, e) {
						var rowIndex = e.rowIdx;
						Ext.asyncRequest('task/fix', e.record.data, function() {
									e.store.reload();
								});
					},
					beforeselect : function(me, record, index, eOpts) {
						return record.data.status == 2
								|| record.data.status == 4
								|| record.data.status == 7;
					}
				}
			},
			_url : Ext.urls.QUERY_TASK_STATUS,
			_fields : fields,
			_items : items,
			_gcolumns : gcolumns
		})
		me.callParent(arguments);
	}
});
