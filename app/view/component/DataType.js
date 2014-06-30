Ext.define('yspz_gen.view.component.DataType', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.datatype',
			_data : [{
						id : 'varchar(40)',
						name : 'varchar(40)--[金额]等类型可选'
					}, {
						id : 'varchar(32)',
						name : 'varchar(32)--[账号][接口编号][产品类型]等类型可选'
					}, {
						id : 'varchar(10)',
						name : 'varchar(10)--[日期][币种][业务类型]等类型可选'
					}, {
						id : 'integer',
						name : 'integer--[转账类型]等类型可选'
					}]
		});
