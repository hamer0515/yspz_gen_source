Ext.define('yspz_gen.view.component.base.PagingInfo', {
			extend : 'Ext.toolbar.Paging',
			plugins : [],
			alias : 'widget.paginginfo',
			displayMsg : '共 {2} 条',
			getPagingItems : function() {
				var me = this;

				return [];
			}
		});
