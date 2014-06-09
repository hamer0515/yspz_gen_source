Ext.define('yspz_gen.view.component.base.ComboBox', {
			extend : 'Ext.form.ComboBox',
			// width : 516,
			// margin : '0 10 0 0',
			queryMode : 'local',
			anyMatch : true,
			listeners : {
				blur : function(me, The, eOpts) {
					var value = me.getValue(), result = me.getStore().queryBy(
							function(record) {
								if (record.data[me.valueField] == value) {
									return true;
								}
								return false;
							});
					if (result.length == 0) {
						me.setValue('');
					}
				},
				focus : function(me, The, eOpts) {
					me.store.clearFilter();
				}
			},
			valueField : 'id',
			displayField : 'name',
			initComponent : function() {
				var me = this;
				if (me._url) {
					if (!me._disAutoLoad) {
						Ext.apply(me, {
									store : Ext.create('widget.mystore', {
												fields : me._fields
														|| ['id', 'name'],
												autoLoad : true,
												proxy : {
													type : 'ajax',
													url : me._url,
													extraParams : me._extraParams
												}
											})
								});
					} else {
						Ext.apply(me, {
									store : Ext.create('widget.mystore', {
												fields : me._fields
														|| ['id', 'name'],
												proxy : {
													type : 'ajax',
													url : me._url,
													extraParams : me._extraParams
												}
											})
								});
					}
				} else if (me._data) {
					Ext.apply(me, {
								store : Ext.create('widget.mystore', {
											fields : me._fields
													|| ['id', 'name'],
											data : me._data
										})
							});
				} else if (me._storeName) {
					me._data = [];
					Ext.data.StoreManager.lookup(me._storeName).each(
							function(rec) {
								me._data.push(rec.data);
							});
					Ext.apply(me, {
								store : Ext.create('widget.mystore', {
											fields : me._fields
													|| ['id', 'name'],
											data : me._data
										})
							});
				}
				if (me.onChangeEvent) {
					me.on("change", me.onChangeEvent, me);
				}
				me.callParent(arguments);
			}
		});
