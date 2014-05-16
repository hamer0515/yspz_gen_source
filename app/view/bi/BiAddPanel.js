Ext.define('yspz_gen.view.bi.BiAddPanel', {
			extend : 'Ext.window.Window',
			alias : 'widget.bi_add',
			layout : 'fit',
			closable : false,
			resizable : false,
			modal : true,
			autoShow : true,
			items : {
				xtype : 'form',
				bodyPadding : 5,
				width : 350,
				layout : 'anchor',
				url : 'bi/bi_add',
				defaults : {
					anchor : '100%'
				},
				defaultType : 'textfield',
				items : [{
					xtype : 'hiddenfield',
					name : 'dept'
						// value : 'value from hidden field'
					}, {
					fieldLabel : '银行接口名称',
					name : 'name',
					allowBlank : false
				}, {
					fieldLabel : '银行接口编号',
					name : 'code',
					allowBlank : false
				}],
				buttons : [{
					text : '確定',
					handler : function() {
						var win = this.up('window'), form = win.down('form')
								.getForm();
						if (form.isValid()) {
							form.submit({
										success : function(form, action) {
											Ext.info("添加部门成功", function() {
														win.close();
														win._store.reload();
														this.close();
													});
										},
										failure : function(form, action) {
											Ext
													.error(
															"部门添加失败："
																	+ action.result.msg,
															function() {
																win.close();
																this.close();
															});
										}
									});
						}
					}
				}, {
					text : '取消',
					handler : function() {
						this.up('window').close()
					}
				}]

			},
			initComponent : function() {
				this.callParent(arguments);
				this.down('hiddenfield').setValue(this._dept);
			}
		});