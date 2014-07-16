Ext.define('yspz_gen.view.component.acct_status', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.acct_status',
			name : 'acct_status',
			fieldLabel : '银行账户使用状态',
			_data : [{
						id : 1,
						name : '使用中'
					}, {
						id : 2,
						name : '销户'
					}, {
						id : 3,
						name : '全部'
					}]

		});
