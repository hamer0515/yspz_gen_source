Ext.define('overrides.TabBar', {
			override : 'Ext.tab.Bar',
			// @private
			onClick : function(e, target) {
				// The target might not be a valid tab el.
				var tab = Ext.getCmp(target.id), tabPanel = this.tabPanel;

				target = e.getTarget();

				if (tab && tab.isDisabled && !tab.isDisabled()) {
					if (tab.closable && target === tab.closeEl.dom) {
						tab.onCloseClick();
					} else {
						if (tabPanel) {
							// TabPanel will card setActiveTab of the TabBar
							tabPanel.setActiveTab(tab.card);
						} else {
							this.setActiveTab(tab);
						}
						tab.focus();
					}
				}
			}
		});