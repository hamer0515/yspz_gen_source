Ext.define('yspz_gen.view.bi.List', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bilist',
	layout : 'border',
	border : false,
	bodyBorder : false,

	initComponent : function() {
		this.items = [{
					xtype : 'panel',
					region : 'center',
					layout : 'fit',
					items : {
						xtype : 'bibrowser',
						autoScroll : true,
						id : 'img-chooser-view',
						listeners : {
							scope : this,
							selectionchange : this.onIconSelect,
							itemdblclick : this.fireImageSelected
						}
					},
					tbar : [{
								xtype : 'textfield',
								name : 'filter',
								fieldLabel : '过滤',
								labelAlign : 'right',
								labelWidth : 35,
								listeners : {
									scope : this,
									buffer : 50,
									change : this.filter
								}
							}, ' ', {
								xtype : 'combo',
								fieldLabel : '排序',
								labelAlign : 'right',
								labelWidth : 45,
								valueField : 'field',
								displayField : 'label',
								value : 'Type',
								editable : false,
								store : Ext.create('Ext.data.Store', {
											fields : ['field', 'label'],
											sorters : 'type',
											proxy : {
												type : 'memory',
												data : [{
															label : 'Name',
															field : 'name'
														}, {
															label : 'Type',
															field : 'type'
														}]
											}
										}),
								listeners : {
									scope : this,
									select : this.sort
								}
							}]
				}, {
					xtype : 'infopanel',
					region : 'east',
					split : true
				}];

		this.callParent(arguments);

		this.addEvents('selected');
	},

	filter : function(field, newValue) {
		var store = this.down('bibrowser').store, view = this.down('dataview'), selModel = view
				.getSelectionModel(), selection = selModel.getSelection()[0];

		store.suspendEvents();
		store.clearFilter();
		store.filter({
					property : 'name',
					anyMatch : true,
					value : newValue
				});
		store.resumeEvents();
		if (selection && store.indexOf(selection) === -1) {
			selModel.clearSelections();
			this.down('infopanel').clear();
		}
		view.refresh();

	},

	sort : function() {
		var field = this.down('combobox').getValue();

		this.down('dataview').store.sort(field);
	},

	onIconSelect : function(dataview, selections) {
		var selected = selections[0];

		if (selected) {
			this.down('infopanel').loadRecord(selected);
		}
	},

	fireImageSelected : function() {
		var selectedImage = this.down('bibrowser').selModel.getSelection()[0];

		if (selectedImage) {
			this.fireEvent('selected', selectedImage);
			this.hide();
		}
	}
});