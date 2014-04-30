Ext.define('yspz_gen.view.yspz.gen', {
	extend : 'Ext.window.Window',
	alias : 'widget.yspz_gen',
	title : '原始凭证',
	// width : 300,
	layout : 'fit',
	closable : false,
	modal : true,
	autoShow : true,
	items : {
		xtype : 'form',
		bodyPadding : 5,
		layout : 'anchor',
		defaults : {
			anchor : '100%'
		},
		defaultType : 'textfield',
		items : [{
			xtype : 'sets',
			margin : '0 0 0 0',
			listeners : {
				blur : function(me, The, eOpts) {
					var value = me.getValue(), result = me.getStore().queryBy(
							function(record) {
								if (record.data.id == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						me.setValue('');
					}
					if (me.getValue()) {
						me.up('form').down('lines').store.load({
									params : {
										suitid : me.getValue()
									}
								});
					}
				}
			},
			allowBlank : false
		}, {
			xtype : 'lines',
			margin : '5 0 0 0',
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
							.up('viewport'), center = viewport.down('center'), id = 'center_'
							+ values._set.toString()
							+ values._line.toString()
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
							title : "[" + formpanel.down('sets').getRawValue()
									+ ']['
									+ formpanel.down('lines').getRawValue()
									+ '][' + values._code + ']凭证生成'
						}).show();
					}
				}
			}
		}]
	}
});