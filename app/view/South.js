Ext.define('demo.view.South', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.south',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var me = this;
				me.items = {
					xtype : 'displayfield',
					value : "<center>Copyright © 2013 YeePay.com All rights reserved. "
							+ Ext.version + "<center>"
				};
				me.callParent(arguments);
			}
		});