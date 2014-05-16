Ext.define('yspz_gen.view.bi.BiPanel', {
			extend : 'Ext.view.View',
			alias : 'widget.bipanel',

			singleSelect : true,
			// overItemCls : 'x-view-over',
			// itemSelector : 'div.thumb',

			itemSelector : '.list-item',
			overItemCls : 'list-item-hover',
			autoScroll : true,

			initComponent : function() {
				this.store = Ext.create('Ext.data.Store', {
							fields : ['name', 'code'],
							proxy : {
								type : 'ajax',
								url : 'json/bi/bi_list.json',
								reader : {
									type : 'json'
								}
							}
						});
				this.callParent(arguments);
			},

			// width : 200,
			// minWidth : 200,

			tpl : [
					// '<div class="thumb-wrap" >',
					'<tpl for=".">',
					'<div class="list-item">',
					'<span><a href="javascript:void(0)">{name}-{code}</a></span>',
					'</div>', '</tpl>'
			// , '</div>'
			],

			clear : function() {
				this.store.removeAll();
			},

			reload : function() {
				this.store.load();
			}
		});