Ext.define("yspz_gen.view.Viewport", {
			extend : "Ext.container.Viewport",
			requires : ["Ext.Date", "Ext.Action", "Ext.util.History",
					"Ext.data.TreeStore", "Ext.grid.property.Grid",
					"Ext.grid.feature.Summary", "Ext.grid.column.Action",
					"Ext.grid.plugin.RowExpander", "Ext.data.TreeStore",
					"Ext.layout.container.Table",
					"Ext.layout.container.Border", "Ext.toolbar.Paging",
					"Ext.form.field.Date", "Ext.form.field.Hidden",
					"Ext.form.Label", "Ext.form.field.File",
					"Ext.ux.TabScrollerMenu", "Ext.ux.TabCloseMenu",
					"Ext.ux.form.ItemSelector", "Ext.grid.plugin.RowEditing",
					"overrides.Ext", "overrides.Table",
					"overrides.TabCloseMenu", "overrides.RowExpander",
					"overrides.Gridpanel", "overrides.Paging",
					"overrides.Treepanel", "overrides.TreeField",
					"overrides.Connection", "overrides.DateField",
					"Ext.form.field.Display", "overrides.RowEditor",
					"Ext.form.CheckboxGroup", "Ext.grid.plugin.DragDrop",
					"Ext.grid.column.RowNumberer", "Ext.form.RadioGroup",
					"Ext.form.FieldSet", "Ext.toolbar.Spacer",
					"Ext.ux.TreePicker", "Ext.layout.container.Column"],

			layout : {
				type : "border"
			},

			items : [{
						region : "north",
						xtype : "north",
						height : 60,
						margins : "0 5 0 5"
					}, {
						title : "菜单",
						region : "west",
						xtype : "west",
						margins : "0 0 0 5",
						minWidth : 200,
						collapsible : true,
						split : true
					}, {
						region : "center",
						xtype : "center",
						height : 683,
						margins : "0 5 0 0"
					}, {
						region : "south",
						xtype : "south",
						height : 25,
						margins : "0 5 0 5"
					}]
		});
