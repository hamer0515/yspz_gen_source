Ext.define('yspz_gen.view.bi.ItemSelectPanel', {
	extend : 'Ext.window.Window',
	alias : 'widget.bi_itemselectpanel',
	layout : 'fit',
	width : 400,
	closable : false,
	resizable : false,
	modal : true,
	autoShow : true,
	items : {
		xtype : 'form',
		bodyPadding : 5,
		layout : 'anchor',
		defaults : {
			anchor : '100%'
		},
		items : [{
					xtype : 'radiogroup',
					columns : 2,
					vertical : true,
					items : [{
								boxLabel : '本金入金规则',
								name : 'bj_rule',
								inputValue : true,
								checked : true
							}, {
								boxLabel : '本金出金规则',
								name : 'bj_rule',
								inputValue : false
							}]
				}, {
					xtype : 'checkboxgroup',
					columns : 2,
					vertical : true,
					items : [{
								boxLabel : '入金产生的手续费',
								name : 'bj_in_free',
								inputValue : true
							}, {
								boxLabel : '出金产生的手续费',
								name : 'bj_out_free',
								inputValue : true
							}],
					allowBlank : false
				}],
		buttons : [{
			text : '添加',
			handler : function() {
				var window = this.up('window'), formpanel = window.down('form');
				if (formpanel.isValid()) {
					window._tabpanel.add({
								closable : true,
								xtype : 'bi_ruleinputpanel',
								layout : 'fit',
								_items : formpanel.getValues(),
								title : "规则组" + window._tabpanel._count++
							}).show();
					window.close();
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