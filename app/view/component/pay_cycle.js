Ext.define('yspz_gen.view.component.pay_cycle', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : ['widget.pay_cycle'],
			name : 'pay_cycle',
			fieldLabel : '划付周期',
			_data : [{
						id : 1,
						name : '年'
					}, {
						id : 2,
						name : '半年'
					}, {
						id : 3,
						name : '季度'
					}, {
						id : 4,
						name : '月'
					}, {
						id : 5,
						name : '星期'
					}, {
						id : 6,
						name : '日'
					}, {
						id : 7,
						name : '实时'
					}, {
						id : 8,
						name : '自定义'
					}]
		});
