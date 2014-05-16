Ext.define('yspz_gen.view.bi.DeptAddPanel', {
			extend : 'Ext.window.Window',
			alias : 'widget.dept_add',
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
				url : 'bi/dept_add',
				defaults : {
					anchor : '100%'
				},
				defaultType : 'textfield',
				items : [{
							fieldLabel : '部门名称',
							name : 'name',
							allowBlank : false
						}, {
							fieldLabel : '部门编号',
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
			}
		});