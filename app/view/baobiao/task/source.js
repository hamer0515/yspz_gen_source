Ext.define("yspz_gen.view.baobiao.task.source", {
			extend : "Ext.window.Window",
			alias : "widget.baobiao_task_source",
			title : "数据源选择",
			layout : "fit",
			closable : false,
			resizable : false,
			modal : true,
			autoShow : true,
			initComponent : function() {
				var me = this;
				me.items = {
					xtype : "form",
					bodyPadding : 5,
					width : 350,
					layout : "anchor",
					url : Ext.urls.SUBMIT_BAOBIAO_TASK_READY_OR_NOT,
					defaults : {
						anchor : "100%"
					},
					defaultType : "textfield",
					items : [{
								xtype : 'checkboxgroup',
								fieldLabel : '请选择数据源',
								columns : 2,
								vertical : true,
								items : [{
											xtype : 'hiddenfield',
											name : 'id'
										}, {
											boxLabel : '资金对账结果',
											name : 'file_type',
											inputValue : '1',
											readOnly : true
										}, {
											boxLabel : '收入表',
											name : 'file_type',
											inputValue : '2',
											readOnly : true
										}, {
											boxLabel : '实际银行余额表',
											name : 'file_type',
											inputValue : '4',
											readOnly : true
										}, {
											boxLabel : '初值表',
											name : 'file_type',
											inputValue : '4'
										}]
							}, {
								xtype : "hidden",
								name : "begin_date"
							}, {
								xtype : "hidden",
								name : "end_date"
							}],
					buttons : [{
						text : "確定",
						handler : function(btn) {
							var form = this.up("form");
							if (form.isValid()) {
								form.getForm().submit({
									success : function() {
										Ext.info("操作成功", function() {
													var win = btn.up("window");
													win._form._reloadData
															.call(win._form);
													form.up("window").close();
												});
									},
									failure : function(f, action) {
										Ext.error("操作失败：" + action.result.msg,
												function() {
													var win = btn.up("window");
													win._form._reloadData
															.call(win._form);
													form.up("window").close();
												});
									}
								});
							}
						}
					}, {
						text : "取消",
						handler : function() {
							this.up("window").close()
						}
					}]
				};
				this.callParent(arguments);
			}

		});