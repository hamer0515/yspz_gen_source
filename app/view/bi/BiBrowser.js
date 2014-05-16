Ext.define('yspz_gen.view.bi.BiBrowser', {
	extend : 'Ext.view.View',
	alias : 'widget.bibrowser',

	singleSelect : true,
	overItemCls : 'x-view-over',
	itemSelector : 'div.thumb-wrap',
	tpl : [
			'<tpl for=".">',
			'<div class="thumb-wrap">',
			'<div class="thumb">',
			(!Ext.isIE6
					? '<img src="resources/icons/{thumb}" />'
					: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'icons/{thumb}\')"></div>'),
			'</div>', '<span>{name}({count})</span>', '</div>', '</tpl>'],

	initComponent : function() {
		this.store = Ext.create('Ext.data.Store', {
					autoLoad : true,
					fields : ['name', 'code', 'count', 'thumb'],
					proxy : {
						type : 'ajax',
						url : 'json/bi/icons.json',
						reader : {
							type : 'json'
						}
					}
				});

		this.callParent(arguments);
		this.store.sort();
	}
});