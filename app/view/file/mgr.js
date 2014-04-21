Ext.define('yspz_gen.view.file.mgr', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.file_mgr',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "文件名",
					dataIndex : 'filename',
					flex : 1
				}, {
					text : "合计",
					dataIndex : 'total',
					flex : 1
				}, {
					text : "Good",
					dataIndex : 'good',
					flex : 1
				}, {
					text : "Bad",
					dataIndex : 'bad',
					flex : 1
				}, {
					text : "状态",
					dataIndex : 'status',
					renderer : Ext.data.StoreManager.lookup('Status').$render,
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : 'Good列表',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 2) {
								return 'good';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), center = grid
									.up('center'), id = 'list_good_'
									+ rec.data.filename, cmp = Ext.getCmp(id);

							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								var list = Ext.createByAlias('widget.goodlist',
										{
											filename : rec.data.filename
										});
								list.store.load({
											params : {
												file : rec.data.filename
											}
										});
								center.add({
									closable : true,
									xtype : 'panel',
									items : list,
									id : id,
									title : '文件[' + rec.data.filename
											+ ']Good列表'
								}).show();
							}
						}
					}, {
						tooltip : 'Bad列表',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 2 && rec.data.bad > 0) {
								return 'bad';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), center = grid
									.up('center'), id = 'list_bad_'
									+ rec.data.filename, cmp = Ext.getCmp(id);

							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								var list = Ext.createByAlias('widget.badlist');
								list.store.load({
											params : {
												file : rec.data.filename
											}
										});
								center.add({
									closable : true,
									xtype : 'panel',
									items : list,
									id : id,
									title : '文件[' + rec.data.filename
											+ ']Bad列表'
								}).show();
							}
						}
					}]
				}], items = [{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					items : [{
								xtype : 'filefield',
								name : 'file',
								fieldLabel : '请选择需要上传的文件',
								msgTarget : 'side',
								allowBlank : false,
								buttonText : '浏览...'
							}]

				}], fields = ['filename', 'total', 'good', 'bad', 'status'];
		Ext.apply(me, {
					submitText : '提交',
					submitHandler : function(button) {
						var formpanel = button.up('form'), form = formpanel
								.getForm();
						if (form.isValid()) {
							form.submit({
										url : 'file/upload',
										waitMsg : '文件上传中...',
										success : function(form, action) {
											formpanel.up('panel').down('grid').store
													.reload();
										},
										failure : function(form, action) {
											Ext.Msg.alert('失败',
													action.result.msg);
										}
									});
						}
					},
					_url : 'file/list',
					_fields : fields,
					_items : items,
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
