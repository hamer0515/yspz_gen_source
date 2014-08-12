Ext.define('yspz_gen.view.baobiao.component.errorLevel', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.baobiao_component_errorLevel',
			fieldLabel : '错误级别',
			_data : [{
						id : 'WARN',
						name : '警告'
					}, {
						id : 'ERROR',
						name : '错误'
					}]
		});
