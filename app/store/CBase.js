Ext.define('yspz_gen.store.CBase', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],

			constructor : function(config) {
				var me = this;
				Ext.apply(me, {
							$render : Ext.bind(Ext._render, me, [me], true)
						});
				me.callParent([config]);
			}
		});