Ext.define('yspz_gen.view.file.badlist', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.badlist',
	minHeight : 200,

	initComponent : function() {
		var me = this, store, fields = ['id', 'credentialId', 'importDate',
				'lineNu', 'lineData', 'errorMsg'], columns = [{
					text : "Key",
					dataIndex : 'lineNu',
					width : 80
				}, {
					text : '凭证内容',
					dataIndex : 'lineData',
					flex : 2,
					editor : 'textfield'
				}, {
					text : '错误信息',
					dataIndex : 'errorMsg',
					flex : 1
				}];
		// Ext.asyncRequest('base/fields', {
		// ys_id : ys_id
		// }, function(response) {
		// var res = Ext.decode(response.responseText);
		// if (res.success) {
		// for (var i in res.data) {
		// fields.push(i);
		// columns.push({
		// text : res.data[i],
		// dataIndex : i,
		// flex : 1,
		// editor : 'textfield'
		// });
		// }
		// } else {
		// Ext.error('错误', '获取原始凭证原数据失败:' + res.error, Ext.Msg.OK);
		// }
		// });
		store = Ext.create('Ext.data.Store', {
			fields : fields,
			// autoLoad : true,
			proxy : {
				type : 'ajax',
				api : {
					read : 'credential/CredentialServlet.action?method=getUpdateCredential'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			}
		}), rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					pluginId : 'rowEditing',
					saveBtnText : '保存',
					cancelBtnText : "取消",
					autoCancel : false,
					clicksToEdit : 2
				});
		Ext.apply(me, {
					selType : 'rowmodel',
					plugins : [rowEditing],
					store : store,
					columns : columns
				});
		me.on('edit', function(editor, e) {
			var rowIndex = e.rowIdx;
			Ext
					.asyncRequest(
							'credential/CredentialServlet.action?method=updateCredential',
							e.record.data, function(response) {
								var res = Ext.decode(response.responseText);
								if (res.success) {
									Ext.info('消息', '修改提交成功', Ext.Msg.OK,
											function() {
												me.getStore().reload();

											});
								} else {
									Ext.error('错误', '修改提交失败', Ext.Msg.OK);
								}
							});
		});
		me.callParent(arguments);
	}
});