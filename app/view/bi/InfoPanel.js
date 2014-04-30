Ext.define('yspz_gen.view.bi.InfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.infopanel',

	width : 200,
	minWidth : 150,

	tpl : [
			'<div class="details">',
			'<tpl for=".">',
			(!Ext.isIE6
					? '<img src="icons/{thumb}" />'
					: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'icons/{thumb}\')"></div>'),
			'<div class="details-info">',
			'<b>Example Name:</b>',
			'<span>{name}</span>',
			'<b>Example URL:</b>',
			'<span><a href="http://dev.sencha.com/deploy/touch/examples/{url}" target="_blank">{url}.html</a></span>',
			'<b>Type:</b>', '<span>{type}</span>', '</div>', '</tpl>', '</div>'],

	afterRender : function() {
		this.callParent();
		if (!Ext.isWebKit) {
			this.el.on('click', function() {
						alert('支持WebKit浏览器.其他浏览器显示不一定正确.');
					}, this, {
						delegate : 'a'
					});
		}
	},

	loadRecord : function(image) {
		this.body.hide();
		this.tpl.overwrite(this.body, image.data);
		this.body.slideIn('l', {
					duration : 250
				});
	},

	clear : function() {
		this.body.update('');
	}
});