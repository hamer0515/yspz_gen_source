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
					text : "交易日期",
					dataIndex : 'date',
					flex : 1
				}, {
					text : "导入状态",
					dataIndex : 'import_status',
					renderer : function(value) {
						return ['未导入', '导入成功', '导入失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "计算状态",
					dataIndex : 'cal_status',
					renderer : function(value) {
						return ['未计算', '计算成功', '计算失败'][parseInt(value)];
					},
					flex : 1
				}, {
					text : "人工校验状态",
					dataIndex : 'check_status',
					renderer : function(value) {
						return ['未人工校验', '人工校验成功', '人工校验失败'][parseInt(value)];
					},
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '进入',
						getClass : function() {
							return 'bad';
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
											title : "执行报表任务"
										}).show();
							}
						}
					}]
				}], fields = ['id', 'date', 'import_status', 'cal_status',
				'check_status', 'make_status'];
		Ext.apply(me, {
					_url : Ext.urls.GET_ALL_BAOBIAO_TASK,
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
								flex : 1,
								validator : function(startValue) {
									if (startValue) {
										var endValue = me
												.down("datefield[name=\"end_date\"]")
												.getRawValue();
										if (endValue) {
											var from = new Date(startValue);
											var to = new Date(endValue);
											if (from.getTime() - to.getTime() > 0) {
												return "开始日期不可以大于结束日期";
											}
										}
									}
									return true;
								},
								listeners : {
									validitychange : function(field, isValid,
											eOpts) {
										me.down("datefield[name=\"end_date\"]")
												.isValid();
									}
								}
							}, {
								xtype : 'datefield',
								name : 'end_date',
								validator : function() {
									return me
											.down("datefield[name=\"begin_date\"]")
											.isValid() ? true : "开始日期不可以小于结束日期";
								},
								flex : 1
							}]
						}, {
							xtype : 'numberfield',
							flex : 1,
							allowDecimals : false,
							allowExponential : false,
							minValue : 1,
							width : 516,
							name : 'id',
							fieldLabel : "任务ID"
						}]
					}],
					_gcolumns : gcolumns,
					gridConfig : {
						tbar : ['-', {
									xtype : 'button',
									iconCls : 'add',
									text : '新建任务',
									handler : function() {
										Ext.widget("baobiao_task_add", {
													_panel : me
												});
									}
								}, '-']
					}
				})
		me.callParent(arguments);
	}
});
