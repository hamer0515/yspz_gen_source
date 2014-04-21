Ext.define('yspz_gen.view.component.yspzDict', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.yspz_dict',

			layout : {
				type : 'table',
				columns : 1
			},
			border : false,
			cls : 'x-unselectable',

			initComponent : function() {
				var me = this;
				me.items = [{
							xtype : 'checkboxgroup',
							fieldLabel : '凭证选择',
							columns : 2,
							vertical : true,
							items : [{
										xtype : 'checkbox',
										boxLabel : '全选',
										action : 'selectAll'
									}, {
										xtype : 'checkbox',
										boxLabel : '反选',
										action : 'deselectAll'
									}]
						}, {
							xtype : 'treepanel',
							rootVisible : false,
							id : 'routes',
							store : me.store,
							width : 400,
							height : 200
						}];

				me.callParent(arguments);
			}
		});