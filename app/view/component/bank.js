Ext.define('yspz_gen.view.component.bank', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : ['widget.bank'],
			name : 'bank',
			fieldLabel : '备付金银行',
			_url : 'CashReconciliationTaskGenerateActionImpl_cQueryBfjbank.action'
		});
