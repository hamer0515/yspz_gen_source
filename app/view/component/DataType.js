Ext.define('yspz_gen.view.component.DataType', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.datatype',
			_data : [{
						id : 'varchar(512)',
						name : 'varchar(512)'
					}, {
						id : 'varchar(128)',
						name : 'varchar(128)'
					}, {
						id : 'varchar(32)',
						name : 'varchar(32)'
					}, {
						id : 'char(64)',
						name : 'char(64)'
					}, {
						id : 'char(1)',
						name : 'char(1)'
					}, {
						id : 'bigint',
						name : 'bigint'
					}, {
						id : 'integer',
						name : 'integer'
					}, {
						id : 'date',
						name : 'date'
					}, {
						id : 'timestamp',
						name : 'timestamp'
					}]
		});
