Ext.define('yspz_gen.view.task.list', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.task_list',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "凭证编号",
					dataIndex : 'code',
					flex : 1
				}, {
					text : "生成日期",
					dataIndex : 'importDate',
					flex : 1
				}, {
					text : "流水文件来源",
					dataIndex : 'credentialPath',
					editor : {
						allowBlank : false
					},
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
					text : "总条数",
					dataIndex : 'allCount',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "总金额",
					dataIndex : 'sumMoney',
					// renderer : function(value) {
					// return Ext.util.Format.number(parseInt(value), '0,0.00');
					// },
					flex : 1
				}, {
					text : "Good",
					dataIndex : 'goodCount',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "Bad",
					dataIndex : 'badCount',
					renderer : function(value) {
						return Ext.util.Format.number(parseInt(value), '0,0');
					},
					flex : 1
				}, {
					text : "完成百分比",
					dataIndex : 'percent',
					// renderer : function(value) {
					// return Ext.Number.correctFloat(parseFloat(value)) * 100
					// + '%';
					// },
					flex : 1
				}, {
					xtype : 'actioncolumn',
					text : '操作',
					width : 80,
					align : 'center',
					items : [
							// {
							// tooltip : '开始校验',
							// margin : '0 10 0 0',
							// getClass : function(v, meta, rec) {
							// if (rec.data.status == 2) {
							// return 'startjob';
							// }
							// return 'hide';
							// },
							// handler : function(grid, rowIndex, colIndex) {
							// var rec = grid.getStore().getAt(rowIndex), msg =
							// "确定[开始校验]";
							// Ext.Msg.confirm('警告', msg, function(optional) {
							// if (optional == 'yes') {
							// Ext.asyncRequest('action/ksjy', {
							// id : rec.data.id
							// }, function(response) {
							// var res = Ext
							// .decode(response.responseText);
							// if (res.success) {
							// Ext.info('消息', '开始校验提交成功',
							// Ext.Msg.OK,
							// function() {
							// grid.store
							// .reload();
							// });
							// } else {
							// Ext.error('错误', '开始校验提交失败:'
							// + res.msg,
							// Ext.Msg.OK);
							// }
							// });
							// }
							// });
							// }
							// },
							{
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
							if (rec.data.badCount > 0) {
								msg = "还有[" + rec.data.badCount
										+ "]条bad数据没有处理，是否要忽略";
							}
							Ext.Msg.confirm('警告', msg, function(optional) {
								if (optional == 'yes') {
									Ext
											.asyncRequest(
													'credential/CredentialServlet.action?method=getCredentialMeta',
													{
														code : rec.data.code
													}, undefined, undefined,
													function(response) {
														var res = Ext
																.decode(response.responseText);
														if (Object.keys(res).length > 0) {
															Ext
																	.widget(
																			'task_gsum',
																			{
																				_rec : rec,
																				_grid : grid,
																				_items : res
																			});
														} else {
															Ext
																	.error('获取凭证定义失败:'
																			+ res.msg);
														}
													});

								}
							});
						}
					}, {
						tooltip : 'Bad列表',
						getClass : function(v, meta, rec) {
							if (rec.data.status == 4 && rec.data.badCount > 0) {
								return 'bad';
							}
							return 'hide';
						},
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex), center = grid
									.up('center'), id = 'list_bad_'
									+ rec.data.credentialId, cmp = Ext
									.getCmp(id);

							if (cmp) {
								center.setActiveTab(cmp);
							} else {
								var list = Ext.createByAlias('widget.badlist');
								list.store.load({
											params : {
												credentialId : rec.data.credentialId,
												importDate : rec.data.importDate,
												id : rec.data.id
											}
										});
								center.add({
									closable : true,
									xtype : 'panel',
									items : list,
									id : id,
									title : '文件[' + rec.data.credentialPath
											+ ']Bad列表'
								}).show();
							}
						}
					}]
				}], fields = ['credentialId', 'importDate', 'credentialPath',
				'code', 'status', 'allCount', 'goodCount', 'badCount',
				'percent', 'error', 'sumMoney', 'id'];
		Ext.apply(me, {
					storeConfig : {
						autoLoad : true
					},
					_url : Ext.urls.GET_ALL_TASK_STATUS,
					_fields : fields,
					_gcolumns : gcolumns
				})
		me.callParent(arguments);
	}
});
