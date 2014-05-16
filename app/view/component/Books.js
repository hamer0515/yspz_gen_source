Ext.define('yspz_gen.view.component.Books', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.books',

			_fields : ['name', 'id', 'checkingList', 'set'],
			initComponent : function() {
				var me = this;
				me._url = Ext.urls.GET_ALL_BOOKS;
				Ext.apply(me, {
							_extraParams : {
								suitid : Ext.encode(me._set)
							}
						});
				me.callParent(arguments);
			}
		});
