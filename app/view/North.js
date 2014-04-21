Ext.define('yspz_gen.view.North', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.north',
			layout : {
				type : 'hbox',
				align : 'middle'
			},
			autoShow : true,
			border : false,
			initComponent : function() {
				var me = this, swidth = document.body.clientWidth;
				me.items = [{
							xtype : 'image',
							border : false,
							height : 39,
							width : 127,
							src : 'resources/images/yeepay_logo.jpg',
							margin : '0 0 0 20'
						}, {
							xtype : 'image',
							border : false,
							height : 39,
							width : 158,
							src : 'resources/images/logo_title.png',
							margin : '0 0 0 40'
						}];
				me.callParent(arguments);
			}
		});