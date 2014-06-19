Ext.define('yspz_gen.view.bi.List', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bi_list',
	layout : 'border',
	border : false,
	bodyBorder : false,

	initComponent : function() {
		var me = this;
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
					selectionchange : this.onIconSelect
				}
			},
			tbar : [{
						xtype : 'textfield',
						name : 'filter',
						fieldLabel : '搜索',
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
						editable : false,
						store : Ext.create('Ext.data.Store', {
									fields : ['field', 'label'],
									sorters : 'type',
									proxy : {
										type : 'memory',
										data : [{
													label : '部门',
													field : 'name'
												}, {
													label : '协议',
													field : 'count'
												}]
									}
								}),
						listeners : {
							scope : this,
							select : this.sort
						}
					}, '->', {
						iconCls : 'bi_add',
						handler : function() {
							Ext.widget('dept_add', {
										_store : Ext.getCmp('img-chooser-view').store
									});
						},
						tooltip : '添加部门'
					}
			// , {
			// iconCls : 'bi_delete',
			// id : 'delete-dept-btn',
			// disabled : true,
			// tooltip : '刪除部门'
			// }
			]
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
		// selected ? Ext.getCmp('delete-dept-btn').enable() : Ext
		// .getCmp('delete-dept-btn').disable();
		if (selected) {
			this.down('infopanel').reload({
						code : selected.data.code
					});
			this.down('infopanel')._deptCode = selected.data.code;
			this.down('infopanel')._deptName = selected.data.name;
		} else {
			this.down('infopanel').clear();
		}
	}
});