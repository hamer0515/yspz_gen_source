Ext.define('yspz_gen.view.baobiao.component.fields', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : ['widget.baobiao_component_fields'],
			name : 'tables',
			_url : 'ruleDB/ruleDB_queryTableColumnByTableID.action',
			_disAutoLoad : true,
			valueField : 'columnName',
			displayField : 'showColumnName',
			_fields : ['columnName', 'showColumnName']
		});
