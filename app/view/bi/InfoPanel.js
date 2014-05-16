Ext.define('yspz_gen.view.bi.InfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.infopanel',

	width : 200,
	minWidth : 150,

	layout : 'card',
	tbar : [{
		id : 'move-prev',
		text : '返回',
		handler : function(btn) {
			btn.up("panel").getLayout()["prev"]();
			Ext.getCmp('move-prev').setDisabled(!btn.up("panel").getLayout()
					.getPrev());
		},
		disabled : true
	}, '->', {
		iconCls : 'bi_add',
		id : 'infopanel-item-add',
		handler : function(btn) {
			var activeItem = btn.up("panel").getLayout().activeItem;
			if (activeItem.xtype === 'bipanel') {
				Ext.widget('bi_add', {
							_store : activeItem.store,
							_dept : btn.up("panel")._deptCode
						});
			} else if (activeItem.xtype === 'protopanel') {
				var center = btn.up('center'), id = 'center_proto_add_'
						+ btn.up("panel")._deptCode + "_"
						+ btn.up("panel").biCode, cmp = Ext.getCmp(id);
				if (cmp) {
					center.setActiveTab(cmp);
				} else {
					center.add({
						closable : true,
						_store : activeItem.store,
						_deptCode : btn.up("panel")._deptCode,
						_biCode : btn.up("panel")._biCode,
						title : "[" + btn.up("panel")._deptName + "]["
								+ btn.up("panel").down('protopanel').title
								+ "]",
						xtype : 'proto_add',
						layout : 'fit',
						// items : {
						// xtype : rec.data.url
						// },
						id : id
							// title : rec.data.text
					}).show();
				}

				// Ext.widget('proto_add', {
				// _store : activeItem.store,
				// _deptCode : btn.up("panel")._deptCode,
				// _biCode : btn.up("panel").biCode,
				// title : "[" + btn.up("panel")._deptName + "]["
				// + btn.up("panel").down('protopanel').title
				// + "]"
				// });
			}
		},
		tooltip : '添加'
	}],
	initComponent : function() {
		this.store = Ext.create('Ext.data.Store', {
					fields : ['name', 'code'],
					proxy : {
						type : 'ajax',
						url : 'json/bi/bi_list.json',
						reader : {
							type : 'json'
						}
					}
				});
		this.items = [{
					xtype : 'bipanel',
					listeners : {
						scope : this,
						itemclick : this.onItemClick
					}
				}, {
					xtype : 'protopanel'
				}];
		this.callParent(arguments);
	},

	clear : function() {
		this.reset();
		this.down('bipanel').store.removeAll();
	},

	reset : function() {
		if (this.getLayout().getPrev()) {
			this.getLayout()["prev"]();
		}
		Ext.getCmp('move-prev').setDisabled(true);
		Ext.getCmp('infopanel-item-add').setDisabled(true);
	},

	reload : function() {
		this.reset();
		this.down('bipanel').store.proxy.extraParams = arguments[0];
		this.down('bipanel').store.reload();
		Ext.getCmp('infopanel-item-add').setDisabled(false);
	},
	onItemClick : function(dataview, item) {
		this.down('protopanel').setTitle(item.data.name + "-" + item.data.code);
		this.down('protopanel').store.proxy.extraParams = {
			code : item.data.code
		};
		// this.down('infopanel')._biName = item.data.name;
		this._biCode = item.data.code;
		this.down('protopanel').reload();
		this.getLayout()["next"]();
		Ext.getCmp('move-prev').setDisabled(!this.getLayout().getPrev());
	}
});