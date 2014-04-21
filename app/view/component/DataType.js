Ext.define('yspz_gen.view.component.DataType', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.datatype',
			// name : '_type',
			// fieldLabel : '会计主体',
			_data : [{
						id : 'bigint',
						name : 'bigint'
					}, {
						id : 'char(1)',
						name : 'char(1)'
					}, {
						id : 'char(64)',
						name : 'char(64)'
					}, {
						id : 'varchar(3096)',
						name : 'varchar(3096)'
					}, {
						id : 'date',
						name : 'date'
					}, {
						id : 'timestamp',
						name : 'timestamp'
					}, {
						id : 'blob(102400)',
						name : 'blob(102400)'
					}]
		});
