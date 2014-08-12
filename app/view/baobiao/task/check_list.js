Ext.define('yspz_gen.view.baobiao.task.check_list', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.baobiao_task_check_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "规则编号",
					dataIndex : 'id',
					width : 100
				}, {
					text : "规则描述",
					dataIndex : 'content',
					flex : 1
				}, {
					text : "有效性",
					dataIndex : 'valid',
					renderer : function(value) {
						return ['无效', '有效'][parseInt(value)];
					},
					width : 100
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '更改有效性',
						getClass : function() {
							return 'bad';
						},
						handler : function(grid, rowIndex, colIndex, item, e,
								rec) {
							Ext.widget("baobiao_task_check_edit", {
										_panel : me
									}).down("form").loadRecord(rec);
						}
					}]
				}], fields = ['id', 'content', 'valid'];
		Ext.apply(me, {
					_url : Ext.urls.GET_ALL_BAOBIAO_TASK_CHECK_LIST,
					_fields : fields,
					_items : [{
								xtype : "fieldcontainer",
								layout : {
									type : 'hbox',
									defaultMargins : {
										right : 10
									}
								},
								items : [{
											xtype : "fieldcontainer",
											flex : 1,
											layout : {
												type : 'hbox',
												defaultMargins : {
													right : 10
												}
											},
											items : [{
														xtype : 'valid',
														fieldLabel : "有效性"
													}]
										}]
							}],
					_gcolumns : gcolumns,
					gridConfig : {
						tbar : ['-', {
									xtype : 'button',
									iconCls : 'add',
									text : '新建规则',
									handler : function() {
										Ext.widget("baobiao_task_check_add", {
													_panel : me
												});
									}
								}, '-']
					}
				})
		me.callParent(arguments);
	}
});
