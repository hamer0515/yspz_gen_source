Ext.define('yspz_gen.view.Center', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.center',
			enableTabScroll : true,
			border : false,
			id : 'center_tab_container',
			defaults : {
				autoScroll : true,
				bodyPadding : 10
			},
			plugins : [{
						ptype : 'tabscrollermenu',
						menuPrefixText : '标签',
						maxText : 15,
						pageSize : 5
					}, {
						ptype : 'tabclosemenu',
						closeTabText : '关闭标签',
						closeAllTabsText : '关闭所有标签',
						closeOthersTabsText : '关闭其他标签'

					}],
			items : [{
						title : '欢迎登录',
						iconCls : 'tabs',
						id : 'tab-main',
						html : '财务中心-帐务处理系统',
						closable : false
					}],
			listeners : {
				tabchange : function(tabPanel, tab) {
					var tabs = [], ownerCt = tabPanel.ownerCt, oldToken, newToken;

					tabs.push(tab.id);
					tabs.push(tabPanel.id);

					while (ownerCt && ownerCt.is('tabpanel')) {
						tabs.push(ownerCt.id);
						ownerCt = ownerCt.ownerCt;
					}

					newToken = tabs.reverse().join(':');

					oldToken = Ext.History.getToken();

					if (oldToken === null || oldToken.search(newToken) === -1) {
						Ext.History.add(newToken);
					}
				},
				afterrender : function(tabpanel, eOpts) {
					Ext.History.init();
					Ext.History.on('change', function(token) {
								var parts, tabPanel, length, i;

								if (token) {
									parts = token.split(':');
									length = parts.length;
									for (i = 0; i < length - 1; i++) {
										var r = Ext.getCmp(parts[i])
												.setActiveTab(Ext
														.getCmp(parts[i + 1]));
									}
								}
							});
				}
			}
		});