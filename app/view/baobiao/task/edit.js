Ext.define('yspz_gen.view.baobiao.task.edit', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.baobiao_task_edit',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "编号",
					dataIndex : 'id',
					flex : 1
				}, {
					text : "备付金法人银行",
					dataIndex : 'b_name',
					flex : 1
				}, {
					text : "备付金银行账号",
					dataIndex : 'b_acct',
					flex : 1
				},
				// {
				// text : "人工校验",
				// dataIndex : 'check_status',
				// renderer : function(value) {
				// return ['未人工校验', '人工校验成功', '人工校验失败'][parseInt(value)];
				// },
				// flex : 1
				// },
				{
					text : "报备",
					dataIndex : 'repo_status',
					renderer : function(value) {
						return ['未报备', '报备中', '报备成功', '报备失败'][parseInt(value)];
					},
					flex : 1
				}], fields = ['id', 'b_name', 'b_acct',
				// 'check_status',
				'repo_status'];
		Ext.apply(me, {
			formConfig : {
				_reloadData : function() {
					var form = this, values = this.getValues();
					Ext.asyncRequest(Ext.urls.GET_ALL_BAOBIAO_TASK, Ext.Object
									.merge(values, {
												page : 1,
												start : 0,
												limit : 50
											}), undefined, undefined, function(
									response) {
								var res = Ext.decode(response.responseText), data = res.data[0];
								form.getForm().setValues(data);
								Ext.ComponentQuery.query("button", form)
										.forEach(function(v) {
													v.hide()
												});
								if (parseInt(data.import_status) !== 1) {
									form.down("button[text=\"导入\"]").show();
								} else if (parseInt(data.cal_status) !== 1) {
									form.down("button[text=\"计算\"]").show();
								} else if (parseInt(data.check_status) !== 1) {
									form.down("button[text=\"人工校验\"]").show();
								} else if (parseInt(data.make_status) !== 1) {
									form.down("button[text=\"导入\"]").show();
									form.down("button[text=\"准备报备\"]").show();
								}
							}, undefined, form.getEl() ? form : undefined);
					form.up("panel").down("grid").store.reload();
				}
			},
			_url : Ext.urls.GET_BAOBIAO_BANK_STATUS_BY_TASK,
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
									fieldLabel : "交易日期",
									xtype : 'datefield',
									name : 'date',
									readOnly : true,
									flex : 1
								}, {
									fieldLabel : "任务ID",
									xtype : 'numberfield',
									name : 'id',
									readOnly : true,
									flex : 1
								}]
					}, {
						xtype : "fieldcontainer",
						height : 22,
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 10
							}
						},
						items : [{
							xtype : 'button',
							text : "导入",
							hidden : true,
							hideMode : "visibility",
							handler : function(btn) {
								var rec = btn.up("baobiao_task_edit")._record;
								Ext.asyncRequest(
										Ext.urls.SUBMIT_BAOBIAO_IMPORT, {
											id : rec.data.id,
											date : rec.data.date
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, undefined, me.down("form"));
							},
							width : 100
						}, {
							xtype : 'button',
							text : "计算",
							hidden : true,
							hideMode : "visibility",
							width : 100,
							handler : function(btn) {
								var rec = btn.up("baobiao_task_edit")._record;
								Ext.asyncRequest(
										Ext.urls.SUBMIT_BAOBIAO_CALCULATE, {
											id : rec.data.id,
											date : rec.data.date
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, undefined, me.down("form"));
							}
						}, {
							xtype : 'button',
							text : "人工校验",
							hidden : true,
							hideMode : "visibility",
							width : 100,
							handler : function(btn) {
								var rec = btn.up("baobiao_task_edit")._record;
								Ext.asyncRequest(Ext.urls.SUBMIT_BAOBIAO_CHECK,
										{
											id : rec.data.id,
											date : rec.data.date
										}, undefined, undefined
										// function() {
										// me.down("form")._reloadData.call(me
										// .down("form"));
										// }
										, function(response) {
											var res = Ext
													.decode(response.responseText), msg = "请求提交成功";
											if (res.success) {
												if (Ext.isString(res.msg)
														|| res.msg.length === 0) {
													Ext
															.info(
																	msg
																			+ (Ext
																					.isString(res.msg)
																					? ":"
																							+ res.msg
																					: ''),
																	function() {
																		me
																				.down("form")._reloadData
																				.call(me
																						.down("form"));
																	});
													return;
												}
											} else {
												msg = "请求提交失败";
											}
											Ext.widget('window', {
												width : 600,
												height : 400,
												layout : 'fit',
												closable : false,
												// resizable : false,
												modal : true,
												autoShow : true,
												title : msg,
												items : {
													xtype : 'form',
													bodyPadding : 5,
													layout : 'anchor',
													// overflowY : "scroll",
													defaults : {
														anchor : '100%'
													},
													items : Ext.create(
															'Ext.grid.Panel', {
																viewConfig : {
																	getRowClass : function(
																			record) {
																		var color, level = record.data.level;
																		if (level === "error") {
																			color = 'red';
																		} else if (level === "warn") {
																			color = 'yellow';
																		}
																		return color;
																	}
																},
																store : Ext
																		.create(
																				'Ext.data.Store',
																				{
																					fields : [
																							'account',
																							'rule',
																							'rerule',
																							'level'],
																					data : res.msg
																				}),
																columns : [{
																	text : '帐号',
																	dataIndex : 'account',
																	flex : 1
																}, {
																	text : '原规则',
																	dataIndex : 'rule',
																	flex : 1
																}, {
																	text : '替换后规则',
																	dataIndex : 'rerule',
																	flex : 1
																}, {
																	text : '错误级别',
																	dataIndex : 'level',
																	flex : 1
																}],
																height : 327
															}),
													buttons : [{
														text : '确定',
														handler : function() {
															this.up('window')
																	.close();
															me.down("form")._reloadData
																	.call(me
																			.down("form"));
														}
													}]
												}
											});
										}, me.down("form"));
							}
						}, {
							xtype : 'button',
							text : "准备报备",
							hidden : true,
							hideMode : "visibility",
							width : 100,
							handler : function(btn) {
								var rec = btn.up("baobiao_task_edit")._record;
								Ext.asyncRequest(Ext.urls.SUBMIT_BAOBIAO_MAKE,
										{
											id : rec.data.id,
											date : rec.data.date
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										}, undefined, me.down("form"));
							}
						}]
					}],
			_gcolumns : gcolumns,
			_disableResetBtn : true,
			_disableSubmitBtn : true,
			_init : function() {
				this.down("form").loadRecord(this._record);
				this.down("grid").store.proxy.extraParams = {
					id : this._record.data.id
				};
				me.down("form")._reloadData.call(me.down("form"));
				// if (this._readOnly) {
				// this.down("form").query("button[text!=\"人工校验\"]")
				// .forEach(function(btn) {
				// btn.setDisabled(true);
				// });
				// }
			}
		})
		me.callParent(arguments);
	}
});
