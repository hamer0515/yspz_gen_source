Ext.define('overrides.Table', {
			override : 'Ext.view.Table',
			// x-unselectable
			enableTextSelection : true,
			loadingText:"读取中..."
		});