Ext.define('overrides.Paging', {
			override : 'Ext.toolbar.Paging',
			dock : 'bottom',
			plugins : [new demo.view.component.plugins.PageComboResizer()],
			displayInfo : true
		});