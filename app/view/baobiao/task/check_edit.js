Ext.define("yspz_gen.view.baobiao.task.check_edit", {
			extend : "Ext.window.Window",
			alias : "widget.baobiao_task_check_edit",
			title : "编辑人工校验规则",
			layout : "fit",
			closable : false,
			resizable : false,
			modal : true,
			autoShow : true,
			initComponent : function() {
				var me = this, count = 1;
				me.items = {
					xtype : "form",
					bodyPadding : 5,
					items : [{
								xtype : "fieldcontainer",
								layout : {
									type : 'hbox',
									defaultMargins : {
										right : 5
									}
								},
								items : [{
											xtype : 'textareafield',
											readOnly : true,
											rows : 5,
											cols : 40,
											name : 'content',
											fieldLabel : '规则详细'
										}]
							}, {
								xtype : "fieldcontainer",
								layout : {
									type : 'hbox',
									defaultMargins : {
										right : 5
									}
								},
								items : [{
											xtype : 'displayfield',
											fieldLabel : '规则编号',
											submitValue : true,
											name : 'id'
										}]
							}, {
								xtype : "fieldcontainer",
								layout : {
									type : 'hbox',
									defaultMargins : {
										right : 5
									}
								},
								items : [{
											xtype : 'valid',
											name : "valid",
											fieldLabel : "更改有效性为",
											allowBlank : false,
											margin : '0 5 0 0'
										}]
							}],
					buttons : [{
						text : "確定",
						handler : function() {
							var form = this.up("form");
							if (form.isValid()) {
								Ext.asyncRequest(
										Ext.urls.UPDATE_BAOBIAO_TASK_CHECK,
										form.getValues(), function() {
											form.up("window").close();
											me._panel.down("grid").store
													.reload();
										}, undefined, undefined, form);
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