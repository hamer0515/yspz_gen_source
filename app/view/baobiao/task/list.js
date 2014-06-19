Ext.define('yspz_gen.view.baobiao.task.list', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.baobiao_task_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "任务ID",
					dataIndex : 'id',
					flex : 1
				}, {
					text : "起始日期",
					dataIndex : 'begin_date',
					flex : 1
				}, {
					text : "截止日期",
					dataIndex : 'end_date',
					flex : 1
				}, {
					text : "数据源准备情况",
					dataIndex : 'ready_or_no',
					renderer : function(value) {
						return ['未查询', '准备好了', '未准备好'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "导入",
					dataIndex : 'import_status',
					renderer : function(value) {
						return ['未导入', '导入成功', '导入失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "计算",
					dataIndex : 'cal_status',
					renderer : function(value) {
						return ['未计算', '计算成功', '计算失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "人工校验",
					dataIndex : 'check_status',
					renderer : function(value) {
						return ['未人工校验', '人工校验成功', '人工校验失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "核对",
					dataIndex : 'match_status',
					renderer : function(value) {
						return ['未核对', '核对成功', '核对失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "报备",
					dataIndex : 'report_status',
					renderer : function(value) {
						return ['未报备', '报备中', '报备成功', '报备失败'][parseInt(value)];
					},
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '进入',
						margin : '0 10 0 0',
						getClass : function(v, meta, rec) {
							if (rec.data.report_status == 0
									|| rec.data.report_status == 3) {
								return 'bad';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex, item, e,
								rec) {
							var viewport = grid.up('viewport'), center = viewport
									.down('center'), id = 'center_baobiao_task_'
									+ rec.data.id, cmp = Ext.getCmp(id);
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								center.add({
											closable : true,
											xtype : 'panel',
											layout : 'fit',
											items : {
												xtype : "baobiao_task_edit",
												_record : rec
											},
											id : id,
											title : "报表-任务" + rec.data.id
										}).show();
							}
						}
					}, {
						tooltip : '查看',
						getClass : function(v, meta, rec) {
							if (rec.data.report_status === 1
									|| rec.data.report_status == 2) {
								return 'good';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex, item, e,
								rec) {
							var viewport = grid.up('viewport'), center = viewport
									.down('center'), id = 'center_baobiao_task_'
									+ rec.data.id, cmp = Ext.getCmp(id);
							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								center.add({
											closable : true,
											xtype : 'panel',
											layout : 'fit',
											items : {
												xtype : "baobiao_task_edit",
												_record : rec,
												_readOnly : true
											},
											id : id,
											title : "报表-任务" + rec.data.id
										}).show();
							}
						}
					}]
				}], fields = ['id', 'begin_date', 'end_date', 'ready_or_no',
				'import_status', 'cal_status', 'check_status', 'match_status',
				'report_status', 'file_type'];
		Ext.apply(me, {
					_url : Ext.urls.GET_ALL_BAOBIAO_TASK,
					_fields : fields,
					_items : [{
								xtype : "fieldcontainer",
								fieldLabel : "交易日期",
								layout : {
									type : 'hbox',
									defaultMargins : {
										right : 10
									}
								},
								items : [{
											xtype : 'datefield',
											name : 'begin_date',
											width : 180
										}, {
											xtype : 'datefield',
											name : 'end_date',
											width : 180
										}, {
											xtype : 'numberfield',
											width : 516,
											name : 'id',
											fieldLabel : "任务ID"
										}]
							}],
					_gcolumns : gcolumns,
					gridConfig : {
						tbar : ['-', {
									xtype : 'button',
									text : '新建任务',
									handler : function() {
										Ext.widget("baobiao_task_add");
									}
								}, '-']
					}
				})
		me.callParent(arguments);
	}
});
