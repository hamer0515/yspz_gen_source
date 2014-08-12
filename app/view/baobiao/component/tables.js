Ext.define('yspz_gen.view.baobiao.component.tables', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : ['widget.baobiao_component_tables'],
			name : 'tables',
			_url : 'ruleDB/ruleDB_queryTable.action',
			valueField : 'tableName',
			displayField : 'showTableName',
			_fields : ['tableName', 'showTableName']
		});
