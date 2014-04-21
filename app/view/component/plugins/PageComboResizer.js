Ext.define('yspz_gen.view.component.plugins.PageComboResizer', {
			extend : 'Ext.Base',
			pageSizes : [50, 100, 200, 500, 1000],
			prefixText : '每页显示 ',
			postfixText : '条数据',

			constructor : function(config) {
				Ext.apply(this, config);
				yspz_gen.view.component.plugins.PageComboResizer.superclass.constructor
						.call(this, config);
			},

			init : function(pagingToolbar) {
				var ps = this.pageSizes;
				var combo = new Ext.form.ComboBox({
							triggerAction : 'all',
							lazyRender : true,
							mode : 'local',
							editable : false,
							width : 65,
							store : ps,
							listeners : {
								select : function(c, r, i) {
									pagingToolbar.store.pageSize = ps[r[0].index];
								}
							}
						});

				Ext.iterate(this.pageSizes, function(ps) {
							if (ps == pagingToolbar.store.pageSize) {
								combo.setValue(ps);
								return;
							}
						});

				var inputIndex = pagingToolbar.items
						.indexOf(pagingToolbar.items.map.refresh);
				pagingToolbar.insert(++inputIndex, '-');
				pagingToolbar.insert(++inputIndex, this.prefixText);
				pagingToolbar.insert(++inputIndex, combo);
				pagingToolbar.insert(++inputIndex, this.postfixText);
				pagingToolbar.on({
							beforedestroy : function() {
								combo.destroy();
							}
						});

			}
		});
