Ext.define('yspz_gen.view.Panel', {
	extend : 'Ext.panel.Panel',
	// overflowY : 'auto',
	/*
	 * _columns(object):科目汇总时候需要的列
	 * _gcolumns(array):科目初始化时候需要的列（科目汇总查询时为初始化的列定义，其他为grid列定义）
	 * _url:数据集和excel导出的url _items:表单元素的items hasExportBtn:是否有导出按钮
	 * _fields:数据集的列定义
	 * 
	 */

	initComponent : function() {
		var me = this, columns = me._columns, gcolumns = me._gcolumns
				|| (columns && Ext.Object.getValues(columns)), items = me._items, fields = me._fields, url = me._url, form, exportBtn, store, grid;
		// 判断有没有表格
		if (gcolumns) {
			/*
			 * 检查列是否已經定义
			 * 
			 */
			gcolumns.forEach(function(element, index, array) {
						if (!element) {
							Ext.Error.raise({
										msg : '缺少列定义! fields:'
												+ fields.join(', ')
									});
						}
					});
			// 創建表格數據集
			store = Ext.create('widget.mystore', Ext.Object.merge({
								_columns : columns,
								fields : fields,
								proxy : {
									type : 'ajax',
									api : {
										read : url
									},
									reader : {
										type : 'json',
										root : 'data',
										totalProperty : 'totalCount',
										successProperty : 'success'
									}
								}
							}, me.storeConfig || {}));
			grid = new Ext.grid.Panel(Ext.Object.merge({
						store : store,
						columns : gcolumns
					}, me.gridConfig || {}));
			if (!me._disablePaging) {
				// 添加底部分页工具栏
				grid.addDocked({
							xtype : 'pagingtoolbar',
							store : store,
							dock : 'bottom'
						});
			}
			// 数据集中添加表格的引用
			Ext.apply(store, {
						_grid : grid
					});
		}
		// 有沒有表單
		if (items) {
			form = Ext.create('widget.queryform', Ext.Object.merge({
								items : items
							}, me.formConfig || {}));
			if (!me._disableSubmitBtn) {
				form.add(Ext.create('widget.button', {
					text : me.submitText || '查询',
					margin : '0 20 0 0',
					action : 'submit',
					handler : me.submitHandler || function() {
						if (form.formCheck ? form.formCheck() : form.isValid()) {
							store.proxy.extraParams = form._getValues ? form
									._getValues() : form.getForm().getValues();
							store.loadPage(1);
						}
					}
				}));
			}
			if (!me._disableResetBtn) {
				form.add(Ext.create('widget.button', {
							text : me.resetText || '重置',
							margin : '0 20 0 0',
							handler : me.resetHandler || function(button) {
								form.getForm().reset();
							}
						}));
			}
			// 有没有导出excel按钮
			if (me.hasExporBtn) {
				exportBtn = Ext.create('widget.exportbtn', {
							_url : url + '_excel',
							_grid : grid,
							_widget : me.exportMode,
							_bid : me.bid
						});
				Ext.apply(store, {
							_exportBtn : exportBtn
						});
				form.add(exportBtn);
			};
			if (me._buttons) {
				for (var i in me._buttons) {
					form.add(Ext.create('widget.button', me._buttons[i]));
				}
			}
			Ext.apply(store, {
						_form : form
					});
		}
		me.items = [form, grid];
		me.on('afterlayout', function() {
					if (grid && !grid.isloclable) {
						var height = parseInt(this.getHeight()) - 2;
						if (form) {
							height -= parseInt(form.getHeight());
						}
						// me.un("afterlayout", afterlayout);
						me.suspendEvent("afterlayout")
						grid.setHeight(height);
					}
				}, me);
		me.callParent(arguments);
		me._init && me._init.call(this);
	}
});
