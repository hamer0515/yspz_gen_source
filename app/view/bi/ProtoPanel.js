Ext.define('yspz_gen.view.bi.ProtoPanel', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.protopanel',
			autoScroll : true,
			height : 'auto',
			columns : [{
						header : '编号',
						dataIndex : 'id',
						width : 30
					}, {
						header : '起始日期',
						dataIndex : 'begin',
						flex : 1
					}, {
						header : '终止日期',
						dataIndex : 'end',
						flex : 1
					}],
			initComponent : function() {
				this.store = Ext.create('Ext.data.Store', {
							fields : ['begin', 'end', 'id'],
							proxy : {
								type : 'ajax',
								url : 'json/bi/proto_list.json',
								reader : {
									type : 'json'
								}
							}
						});
				this.callParent(arguments);
			},

			clear : function() {
				this.store.removeAll();
			},

			reload : function() {
				this.store.reload();
			}
		});