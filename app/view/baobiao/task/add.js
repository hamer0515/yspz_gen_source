Ext.define("yspz_gen.view.baobiao.task.add", {
			extend : "Ext.window.Window",
			alias : "widget.baobiao_task_add",
			title : "新增任务",
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
					layout : "anchor",
					url : Ext.urls.ADD_BAOBIAO_TASK,
					defaults : {
						anchor : "100%"
					},
					defaultType : "datefield",
					items : [{
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
											allowBlank : false,
											width : 180
										}, {
											xtype : 'datefield',
											name : 'end_date',
											allowBlank : false,
											width : 180
										}]
							}],
					buttons : [{
						text : "確定",
						handler : function() {
							var form = this.up("form");
							if (form.isValid()) {
								form.getForm().submit({
									success : function(f, action) {
										Ext.info("任务创建成功", function() {
													form.up("window").close();
												});
									},
									failure : function(f, action) {
										Ext
												.error("任务创建失败："
														+ action.result.msg);
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