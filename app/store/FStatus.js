Ext.define('demo.store.FStatus', {
			extend : 'demo.store.CBase',
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/status'
			}
		});