Ext.define('yspz_gen.view.yspz.gen', {
	extend : 'Ext.window.Window',
	alias : 'widget.yspz_gen',
	title : '原始凭证',
	// width : 300,
	layout : 'fit',
	closable : false,
	modal : true,
	autoShow : true,

	initComponent : function() {
		this.items = {
			xtype : 'form',
			bodyPadding : 5,
			layout : 'anchor',
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			items : [{
						fieldLabel : '所属类别',
						xtype : 'treepicker',
						name : '_type',
						displayField : 'text',
						valueField : 'id',
						store : new Ext.data.TreeStore({
									fields : ['id', 'text'],
									proxy : {
										type : 'ajax',
										url : Ext.urls.GET_ALL_CREDENTIAL_TYPES
									},
									root : {
										expanded : true,
										id : '',
										text : '所有类别'
									},
									autoLoad : true
								}),
						allowBlank : false
					}, {
						fieldLabel : '凭证编号',
						margin : '5 0 0 0',
						maxLength : 5,
						name : '_code',
						allowBlank : false
					}, {
						fieldLabel : '凭证名称',
						margin : '5 0 0 0',
						name : '_name',
						allowBlank : false
					}],
			buttons : [{
				text : '確定',
				handler : function(btn) {
					var formpanel = form = btn.up('form'), form = formpanel
							.getForm();
					if (form.isValid()) {
						var values = form.getValues(), viewport = this
								.up('viewport'), center = viewport
								.down('center'), id = 'center_'
								+ values._type.toString()
								+ values._code.toString(), cmp = Ext.getCmp(id);
						if (cmp) {
							center.setActiveTab(cmp);
						} else {
							center.add({
								closable : true,
								xtype : 'panel',
								items : Ext.Object.merge({
											xtype : 'yspz_edit'
										}, values),
								id : id,
								title : '['
										+ formpanel.down('treepicker')
												.getRawValue() + ']['
										+ values._code + ']凭证生成'
							}).show();
						}
					}
				}
			}]
		};
		this.callParent(arguments);
	}

});