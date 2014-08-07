Ext.define('yspz_gen.view.zjdz.task.gen', {
	extend : 'yspz_gen.view.Panel',
	alias : 'widget.zjdz_task_gen',
	initComponent : function() {
		var me = this, cls = Ext.getClassName(me).split('.').pop(), gcolumns = [
				{
					text : "银行帐号",
					dataIndex : 'b_acct',
					flex : 1
				}, {
					text : "开户银行",
					dataIndex : 'opening_bank',
					flex : 1
				}, {
					text : "银行名称",
					dataIndex : 'b_name',
					flex : 1
				}, {
					text : "银行账户编号",
					dataIndex : 'bank_code',
					flex : 1
				}, {
					text : "使用状态",
					dataIndex : 'acct_status',
					renderer : function(value) {
						return ['使用中', '销户'][parseInt(value) - 1];
					},
					flex : 1
				}], fields = ['b_acct', 'opening_bank', 'b_name', 'bank_code',
				'acct_status'];
		Ext.apply(me, {
			formConfig : {
				tools : [{
							type : 'refresh',
							handler : function(event, toolEl, panelHeader) {
								getLastDate();
							}
						}]
			},
			submitHandler : function() {
				me.down("grid").store.loadPage(1);
			},
			storeConfig : {
				// autoLoad : true,
				listeners : {
					beforeload : function(store, operation, eOpts) {
						var form = me.down("form"), values = form.getValues();
						if (form.formCheck ? form.formCheck() : form.isValid()) {
							store.proxy.extraParams = form._getValues ? form
									._getValues() : form.getForm().getValues();

							form.down("button[text=\"生成任务\"]")
									.setDisabled(values.acct_status !== 1
											? true
											: false);
							// if (values.acct_status !== 1) {
							// form.down("button[text=\"生成任务\"]")
							// .setDisabled(true);
							// } else {
							// form.down("button[text=\"生成任务\"]")
							// .setDisabled(false);
							// }
							// store.loadPage(1);
						}
					}
				}
			},
			_url : Ext.urls.GET_ZJDZ_TASK_GEN,
			_fields : fields,
			_items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
							fieldLabel : "历史生成日期",
							margin : '0 5 0 0',
							flex : 1,
							name : "last_date",
							xtype : 'datefield',
							disabled : true,
							submitValue : false
								// listeners : {
								// render : function(field) {
								// Ext.asyncRequest(Ext.urls.GET_LAST_ZJDZ_DATE,
								// {},
								// undefined, undefined, function(response) {
								// var res = Ext
								// .decode(response.responseText);
								// if (res.success) {
								// field.setValue(res.date);
								// me
								// .down("datefield[name=\"zjdz_date\"]")
								// .setValue(res.today)
								// .setMaxValue(new Date(res.today));
								// // me
								// // .down("datefield[name=\"zjdz_date\"]")
								// // .setMinValue(new Date(new
								// // Date(res.date)
								// // .getTime()
								// // + 1
								// // * 24
								// // * 60
								// // * 60
								// // * 1000));
								// me.down("grid").store.loadPage(1);
								// } else {
								// Ext
								// .error('获取最近凭证生成日期失败:'
								// + res.msg);
								// }
								// }, me.down("form"));
								// }
								// }
							}, {
							fieldLabel : "资金对账日期",
							xtype : 'datefield',
							margin : '0 5 0 0',
							flex : 1,
							// value : new Date(),
							allowBlank : false,
							// maxValue : new Date(),
							name : "zjdz_date"
						}, {
							xtype : "acct_status",
							editable : false,
							flex : 1,
							value : 1
						}]
					}],
			_disablePaging : true,
			_gcolumns : gcolumns,
			resetText : "生成任务",
			resetHandler : function(btn) {
				var form = btn.up("form"), values = btn.up("form").getValues();
				if (form.isValid() && values.zjdz_date) {
					Ext.Msg.confirm('确认', "是否确认生成" + values.zjdz_date
									+ "日对账任务？", function(optional) {
								if (optional == 'yes') {
									Ext.asyncRequest(Ext.urls.SUBMIT_ZJDZ_TASK,
											{
												zjdz_date : values.zjdz_date
											}, function() {
												me
														.down("datefield[name=\"last_date\"]")
														.fireEvent(
																"beforerender",
																me
																		.down("datefield[name=\"last_date\"]"));
											});

								}
							});
				}
			}
		});
		var getLastDate = function() {
			Ext.asyncRequest(Ext.urls.GET_LAST_ZJDZ_DATE, {}, undefined,
					undefined, function(response) {
						var res = Ext.decode(response.responseText), field = me
								.down("datefield[name=\"last_date\"]");
						if (res.success) {
							field.setValue(res.date);
							me.down("datefield[name=\"zjdz_date\"]")
									.setValue(res.today)
									.setMaxValue(new Date(res.today));
							// me
							// .down("datefield[name=\"zjdz_date\"]")
							// .setMinValue(new Date(new
							// Date(res.date)
							// .getTime()
							// + 1
							// * 24
							// * 60
							// * 60
							// * 1000));
							me.down("grid").store.loadPage(1);
						} else {
							Ext.error('获取对账任务最近生成日期失败:' + res.msg);
						}
					}, me.down("form"));
			// me.down("form").suspendEvent("afterlayout");
		};
		me.callParent(arguments);
		me.down("form").on('afterlayout', getLastDate, me.down("form"), {
					single : true
				});
		// me.down("button[text=\"查询\"]").fireHandler();
	}
});
