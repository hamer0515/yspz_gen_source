Ext.define('yspz_gen.view.component.Books', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.books',
			_url : 'book_findAllBookBySuit.action',
			_fields : ['name', 'id', 'checkingList', 'set'],
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							_extraParams : {
								suitid : Ext.encode(me._set)
							}
						});
				me.callParent(arguments);
			}
		});
