Ext.define('overrides.Paging', {
			override : 'Ext.toolbar.Paging',
			dock : 'bottom',
			plugins : [new yspz_gen.view.component.plugins.PageComboResizer()],
			displayInfo : true
		});