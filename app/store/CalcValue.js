Ext.define('yspz_gen.store.CalcValue', {
			extend : 'yspz_gen.store.CBase',
			autoLoad : true,
			fields : ['code', 'name'],

			proxy : {
				type : 'ajax',
				url : 'common/commonQueryAction_queryFeeDict.action'
			}

		});