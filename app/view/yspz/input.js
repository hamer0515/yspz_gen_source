Ext.define('yspz_gen.view.yspz.input', {
	extend : 'Ext.window.Window',
	alias : 'widget.yspz_input',
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
		defaults : {
			anchor : '100%'
		},
		defaultType : 'textfield',
		items : [{
					xtype : 'fieldset',
					columnWidth : 0.5,
					title : '定义',
					defaultType : 'textfield',
					defaults : {
						anchor : '100%'
					},
					layout : 'anchor',
					items : [{
								fieldLabel : '列名',
								allowBlank : false,
								validator : function(v) {
									if (v != '') {
										var store = this.up('window')._store;
										var index = store.findExact('colname',
												v);
										if (index != -1) {
											return '已经存在的列';
										}
									}
									return true
								},
								name : 'colname'
							}, {
								fieldLabel : '数据类型',
								xtype : 'datatype',
								name : 'type',
								allowBlank : false
							}, {
								xtype : 'checkboxgroup',
								fieldLabel : '主键、非空',
								submitValue : false,
								columns : 2,
								vertical : true,
								items : [{
											boxLabel : 'Primary Key',
											inputValue : true,
											uncheckedValue : false,
											name : 'primarykey'
										}, {
											boxLabel : 'Not NULL',
											inputValue : true,
											uncheckedValue : false,
											name : 'notnull',
											checked : true
										}]
							}, {
								fieldLabel : '备注',
								name : 'comment'
							}, {
								fieldLabel : '显示为',
								name : 'text',
								allowBlank : false
							}]
				}, {
					xtype : 'fieldset',
					columnWidth : 0.5,
					title : '取值',
					defaults : {
						anchor : '100%'
					},
					layout : 'anchor',
					items : [{
								xtype : 'radiogroup',
								columns : 2,
								fieldLabel : '是否为金额',
								vertical : true,
								items : [{
											boxLabel : '否',
											name : "isMoney",
											inputValue : false,
											checked : true
										}, {
											boxLabel : '是',
											name : "isMoney",
											inputValue : true
										}]
							}, {
								xtype : 'textfield',
								fieldLabel : '默认值',
								name : 'default'
							}, {
								xtype : 'radiogroup',
								fieldLabel : '取值方式',
								columns : 3,
								vertical : true,
								items : [{
											boxLabel : '流水文件',
											name : 'vfrom',
											checked : true,
											inputValue : 1
										}, {
											boxLabel : '计费模块',
											name : 'vfrom',
											inputValue : 2
										}, {
											boxLabel : 'Matcher',
											name : 'vfrom',
											inputValue : 3
										}],
								listeners : {
									change : function(field, newValue, oldValue) {
										Ext.getCmp('vfrom_' + oldValue.vfrom)
												.hide();
										Ext.getCmp('vfrom_' + oldValue.vfrom)
												.disable();
										Ext.getCmp('vfrom_' + newValue.vfrom)
												.show();
										Ext.getCmp('vfrom_' + newValue.vfrom)
												.enable();
										if (newValue.vfrom == 1) {
											Ext.getCmp('vfrom_4').show();
											Ext.getCmp('vfrom_4').enable();
											Ext.getCmp('vfrom_5').show();
											Ext.getCmp('vfrom_5').enable();
										}
										if (oldValue.vfrom == 1) {
											Ext.getCmp('vfrom_4').hide();
											Ext.getCmp('vfrom_4').disable();
											Ext.getCmp('vfrom_5').hide();
											Ext.getCmp('vfrom_5').disable();
										}
									}
								}
							}, {
								xtype : 'numberfield',
								fieldLabel : '值',
								id : 'vfrom_1',
								anchor : '100%',
								maxValue : 99,
								minValue : 1,
								name : 'value',
								allowBlank : false
							}, {
								xtype : 'calcvalue',
								fieldLabel : '值',
								id : 'vfrom_2',
								allowBlank : false,
								hidden : true,
								disabled : true,
								name : 'value'
							}, {
								xtype : 'textfield',
								fieldLabel : '值',
								emptyText : "取值于流水如:[2,3,4]",
								id : 'vfrom_3',
								hidden : true,
								disabled : true,
								allowBlank : false,
								name : 'value'
							}, {
								xtype : 'validation',
								id : 'vfrom_4',
								fieldLabel : '流水校验规则',
								name : 'validation',
								allowBlank : false
							}, {
								xtype : 'preprocess',
								id : 'vfrom_5',
								fieldLabel : '处理方式',
								name : 'preprocess'
							}]
				}],
		buttons : [{
			text : '確定',
			handler : function() {
				var formpanel = this.up('window').down('form');
				if (formpanel.isValid()) {
					var store = this.up('window')._store;
					store.insert(store.getCount(), formpanel.getForm()
									.getValues());
					formpanel.getForm().reset();
				}
			}
		}, {
			text : '取消',
			handler : function() {
				this.up('window').close()
			}
		}, {
			text : '重置',
			handler : function() {
				this.up('window').down('form').getForm().reset();
			}
		}]
	}
});