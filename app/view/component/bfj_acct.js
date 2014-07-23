Ext.define('yspz_gen.view.component.bfj_acct', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : ['widget.bfj_acct'],
			name : 'bfj_acct',
			fieldLabel : '备付金账号',
			_url : 'CashReconciliationTaskGenerateActionImpl_cQueryBfjacct.action'
		});
