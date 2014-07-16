Ext.define('yspz_gen.view.component.yspzDict', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.yspz_dict',

			layout : {
				type : 'table',
				columns : 1,
				tableAttrs : {
					style : {
						width : '100%'
					}
				}
			},
			border : false,
			cls : 'x-unselectable',

			initComponent : function() {
				var me = this;
				me.items = [{
							xtype : 'checkboxgroup',
							fieldLabel : '凭证选择',
							columns : 1,
							vertical : true,
							items : [{
										xtype : 'checkbox',
										boxLabel : '全选',
										checkChangeBuffer : 0,
										action : 'selectAll'
									}]
						}, {
							xtype : 'treepanel',
							rootVisible : false,
							id : 'routes',
							store : me.store,
							style : {
								width : '90%'
							},
							height : 200
						}];

				me.callParent(arguments);
			}
		});