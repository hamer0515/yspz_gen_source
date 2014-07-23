Ext.define('yspz_gen.view.task.badlist', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.bad_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "Key",
					dataIndex : 'lineNu',
					width : 80
				}, {
					text : '单据内容',
					dataIndex : 'lineData',
					flex : 2,
					editor : 'textfield'
				}, {
					text : '错误信息',
					dataIndex : 'errorMsg',
					flex : 1
				}], fields = ['id', 'credentialId', 'importDate', 'lineNu',
				'lineData', 'errorMsg'];
		Ext.apply(me, {
					_disablePaging : true,
					gridConfig : {
						selType : 'rowmodel',
						plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
									pluginId : 'rowEditing',
									saveBtnText : '保存',
									cancelBtnText : "取消",
									autoCancel : false,
									clicksToEdit : 2
								})],
						listeners : {
							edit : function(editor, e) {
								var rowIndex = e.rowIdx;
								Ext.asyncRequest(
										Ext.urls.SUBMIT_FIXED_BAD_RECORD,
										e.record.data, function() {
											me.getStore().reload();
										}, undefined, undefined, me);
							}
						}
					},
					_url : Ext.urls.GET_ALL_BAD_RECORDS,
					_fields : fields,
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
