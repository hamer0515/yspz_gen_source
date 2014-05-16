Ext.define('overrides.TreeField', {
			override : 'Ext.ux.TreePicker',
			/**
			 * Creates and returns the tree panel to be used as this field's
			 * picker.
			 */
			createPicker : function() {
				var me = this, picker = new Ext.tree.Panel({
							shrinkWrapDock : 2,
							store : me.store,
							floating : true,
							displayField : me.displayField,
							columns : me.columns,
							minHeight : me.minPickerHeight,
							maxHeight : me.maxPickerHeight,
							manageHeight : true,
							shadow : false,
							listeners : {
								scope : me,
								itemclick : me.onItemClick
							},
							viewConfig : {
								listeners : {
									scope : me,
									render : me.onViewRender
								}
							}
						}), view = picker.getView();

				if (Ext.isIE9 && Ext.isStrict) {
					// In IE9 strict mode, the tree view grows by the height of
					// the horizontal scroll bar when the items are highlighted
					// or unhighlighted.
					// Also when items are collapsed or expanded the height of
					// the view is off. Forcing a repaint fixes the problem.
					view.on({
								scope : me,
								highlightitem : me.repaintPickerView,
								unhighlightitem : me.repaintPickerView,
								afteritemexpand : me.repaintPickerView,
								afteritemcollapse : me.repaintPickerView
							});
				}
				return picker;
			},
			setValue : function(value) {
				var me = this, record;

				me.value = value;

				if (me.store.loading) {
					// Called while the Store is loading. Ensure it is processed
					// by the onLoad method.
					return me;
				}

				// try to find a record in the store that matches the value
				record = value ? me.store.getNodeById(value) : me.store
						.getRootNode();
				if (value === undefined) {
					// record = me.store.getRootNode();
					// me.value = record.getId();
					record = me.value = '';
				} else {
					record = me.store.getNodeById(value);
				}

				// set the raw value to the record's display field if a record
				// was found
				me.setRawValue(record ? record.get(me.displayField) : '');

				return me;
			}
		});