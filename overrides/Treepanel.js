Ext.define('overrides.Treepanel', {
	override : 'Ext.tree.Panel',
	listeners : {
		itemcollapse : function(node, eOpts) {
			if (!node.leaf) {
				node.collapseChildren(true);
			}
		}
	},
	viewConfig : {
		loadMask : true,
		listeners : {
			itemcontextmenu : function(view, rec, node, index, e) {
				e.stopEvent();
				Ext.create('Ext.menu.Menu', {
					items : [Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '展开当前节点',
										handler : function(widget, event) {
											view.up('treepanel').expandNode(
													rec, true);
										}
									}), Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '折叠当前节点',
										handler : function(widget, event) {
											view.up('treepanel').collapseNode(
													rec, false);
										}
									}), Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '展开所有节点',
										handler : function(widget, event) {
											view.up('treepanel').expandAll();
										}
									}), Ext.create('Ext.Action', {
										// icon :
										// '../shared/icons/fam/delete.gif',
										text : '折叠所有节点',
										handler : function(widget, event) {
											view.up('treepanel').collapseAll();
										}
									}), Ext.create('Ext.Action', {
										text : '刷新数据',
										handler : function(widget, event) {
											view.up('treepanel').store.reload();
										}
									})]
				}).showAt(e.getXY());
				return false;
			}
		}
	}
});