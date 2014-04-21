Ext.define('overrides.RowEditor', {
			override : 'Ext.grid.RowEditor',
			initComponent : function() {
				var me = this;
				me.callParent(arguments);
				me.getForm().on('validitychange', me.onValidityChange, me);
			},

			onValidityChange : function() {
				var me = this, form = me.getForm(), valid = form.isValid();
				if (me.errorSummary && me.isVisible()) {
					me[valid ? 'hideToolTip' : 'showToolTip']();
				}
				me.updateButton(valid);
				me.isValid = valid;
			}

		});