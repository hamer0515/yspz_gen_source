Ext.define('yspz_gen.view.baobiao.component.ruleType', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.baobiao_component_ruleType',
			fieldLabel : "规则种类",
			_data : [{
						id : '0',
						name : '规则仅涉及明细表，且没有sum求和'
					}, {
						id : '1',
						name : '其他'
					}]
		});
