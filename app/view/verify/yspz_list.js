Ext.define('yspz_gen.view.verify.yspz_list', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.verify_yspz_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), store = new Ext.data.TreeStore(
				{
					autoLoad : true,
					fields : ['id', 'set', 'line', 'code', 'creator', 'ts_c',
							'status'],
					proxy : {
						type : 'ajax',
						url : 'verify/yspz_list'
					}
				}), gcolumns = [{
					text : "编号",
					dataIndex : 'id',
					flex : 1
				}, {
					text : "流水文件来源",
					dataIndex : 'path',
					editor : {
						allowBlank : false
					},
					flex : 1
				}, {
					text : "凭证编号",
					dataIndex : 'ys_id',
					flex : 1
				}, {
					text : "生成日期",
					dataIndex : 'date',
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
				}, {
					text : "合计",
					dataIndex : 'heji',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "Good",
					dataIndex : 'good',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "Bad",
					dataIndex : 'bad',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "完成百分比",
					dataIndex : 'percent',
					renderer : function(value) {
						return Ext.Number.correctFloat(parseFloat(value)) * 100
								+ '%';
					},
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [{
						tooltip : '开始校验',
						margin : '0 10 0 0',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 2) {
								return 'startjob';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), msg = "确定[开始校验]";
							Ext.Msg.confirm('警告', msg, function(optional) {
										if (optional == 'yes') {
											Ext.asyncRequest('action/ksjy', {
														id : rec.data.id
													}, function() {
														grid.store.reload();
													});
										}
									});
						}
					}, {
						tooltip : '汇总生成',
						margin : '0 10 0 0',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 4) {
								return 'good';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), msg = "确定开始汇总生成任务";
							if (rec.data.bad > 0) {
								msg = "还有[" + rec.data.bad
										+ "]条bad数据没有处理，是否要忽略";
							}
							Ext.Msg.confirm('警告', msg, function(optional) {
										if (optional == 'yes') {
											Ext.asyncRequest('action/hzsc', {
														id : rec.data.id
													}, function() {
														grid.store.reload();
													});
										}
									});
						}
					}, {
						tooltip : 'Bad列表',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 4 && rec.data.bad > 0) {
								return 'bad';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), center = grid
									.up('center'), id = 'list_bad_'
									+ rec.data.id, cmp = Ext.getCmp(id);

							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								var list = Ext.createByAlias('widget.badlist',
										{
											ys_id : rec.data.ys_id
										});
								list.store.load({
											params : {
												id : rec.data.id
											}
										});
								center.add({
											closable : true,
											xtype : 'panel',
											items : list,
											id : id,
											title : '文件[' + rec.data.path
													+ ']Bad列表'
										}).show();
							}
						}
					}]
				}], fields = ['id', 'path', 'ys_id', 'date', 'status', 'heji',
				'good', 'bad', 'percent', 'error'];
		Ext.apply(me, {
					storeConfig : {
						autoLoad : true
					},
					_url : 'task/list',
					_fields : fields,
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
