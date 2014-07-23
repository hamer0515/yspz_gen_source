Ext.define('yspz_gen.view.component.base.PagingInfo', {
			extend : 'Ext.toolbar.Paging',
			plugins : [],
			alias : 'widget.paginginfo',
			displayMsg : '共 {2} 条',
			getPagingItems : function() {
				var me = this;

				return [];
			},
			getStoreListeners : function() {
				return {
					beforeload : this.beforeLoad,
					load : this.onLoad,
					exception : this.onLoadError,
					remove : this.onLoad,
					add : this.onLoad
				};
			},
			getPageData : function() {
				var store = this.store, totalCount = store.getCount();

				return {
					total : totalCount,
					currentPage : store.currentPage,
					pageCount : Math.ceil(totalCount / store.pageSize),
					fromRecord : ((store.currentPage - 1) * store.pageSize) + 1,
					toRecord : Math.min(store.currentPage * store.pageSize,
							totalCount)

				};
			}
		});
