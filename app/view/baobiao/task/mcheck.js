Ext.define('yspz_gen.view.baobiao.task.mcheck', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.baobiao_task_mcheck',
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
						return ['未报备', '报备成功', '报备失败'][parseInt(value)];
					},
					flex : 1
				}], fields = ['id', 'b_name', 'b_acct', 'ready_or_no',
				'import_status', 'cal_status', 'check_status', 'match_status',
				'report_status'];
		Ext.apply(me, {
			storeConfig : {
				autoLoad : true
			},
			// gridconfig : {
			// autoScroll : true
			// },
			formConfig : {
				_reloadData : function() {
					var form = this, values = this.getValues();
					Ext.asyncRequest(Ext.urls.GET_ALL_BAOBIAO_TASK, {
								id : values.id
							}, undefined, undefined, function(response) {
								var res = Ext.decode(response.responseText);
								form.getForm().setValues(res.data[0]);
							});
					form.up("panel").down("grid").store.reload();
				}
			},
			_url : Ext.urls.GET_BAOBIAO_BANK_STATUS_BY_TASK,
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
									disabled : true,
									width : 180
								}, {
									xtype : 'datefield',
									name : 'end_date',
									disabled : true,
									width : 180
								}]
					}, {
						xtype : "fieldcontainer",
						fieldLabel : "任务ID",
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 10
							}
						},
						items : [{
									xtype : 'numberfield',
									name : 'id',
									disabled : true
								}, {
									xtype : 'displayfield',
									name : "file_type",
									renderer : function(value) {
										var types = ["资金对账结果", "收入表",
												"实际银行余额表", "初值表"], r = [];
										value.split(',').forEach(function(v) {
													r.push(types[parseInt(v)
															- 1]);
												});
										return "数据来源：" + r.join("、");
									}
								}]
					}, {
						xtype : "fieldcontainer",
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 10
							}
						},
						items : [{
							xtype : 'button',
							text : "数据源准备情况",
							handler : function(btn) {
								var view = Ext.widget("baobiao_task_source", {
											_form : btn.up("form")
										}), _record = btn
										.up("baobiao_task_edit")._record;
								view.down("checkboxgroup").setValue({
									file_type : _record.data.file_type
											.split(',')
								});
								view.down("hiddenfield")
										.setValue(_record.data.id);
							},
							width : 100
						}, {
							xtype : 'button',
							text : "导入",
							handler : function(btn) {
								var rec = btn.up("baobiao_task_edit")._record;
								Ext.asyncRequest(
										Ext.urls.SUBMIT_BAOBIAO_IMPORT, {
											id : rec.data.id
										}, function() {
											me.down("form")._reloadData.call(me
													.down("form"));
										});
							},
							width : 100
						}, {
							xtype : 'button',
							text : "计算",
							width : 100
						}, {
							xtype : 'button',
							text : "人工校验",
							width : 100
						}, {
							xtype : 'button',
							text : "核对",
							width : 100
						}, {
							xtype : 'button',
							text : "报备",
							width : 100
						}]
					}, {
						xtype : "fieldcontainer",
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 10
							}
						},
						items : [{
							xtype : 'displayfield',
							name : 'ready_or_no',
							renderer : function(value) {
								return ['未查询', '准备好了', '未准备好'][parseInt(value)];
							},
							width : 100
						}, {
							xtype : 'displayfield',
							name : "import_status",
							renderer : function(value) {
								return ['未导入', '导入成功', '导入失败'][parseInt(value)];
							},
							width : 100
						}, {
							xtype : 'displayfield',
							name : 'cal_status',
							renderer : function(value) {
								return ['未计算', '计算成功', '计算失败'][parseInt(value)];
							},
							width : 100
						}, {
							xtype : 'displayfield',
							name : 'check_status',
							renderer : function(value) {
								return ['未人工校验', '人工校验成功', '人工校验失败'][parseInt(value)];
							},
							width : 100
						}, {
							xtype : 'displayfield',
							name : 'match_status',
							renderer : function(value) {
								return ['未核对', '核对成功', '核对失败'][parseInt(value)];
							},
							width : 100
						}, {
							xtype : 'displayfield',
							name : 'report_status',
							renderer : function(value) {
								return ['未报备', '报备成功', '报备失败'][parseInt(value)];
							},
							width : 100
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
				if (this._readOnly) {
					this.down("form").query("button[text!=\"人工校验\"]").forEach(
							function(btn) {
								btn.setDisabled(true);
							});
				}
			}
		})
		me.callParent(arguments);
	}
});
