Ext.define('demo.view.component.MyStore', {
			extend : 'Ext.data.Store',
			alias : 'widget.mystore',
			pageSize : 50,

			listeners : {
				// load : function(me, records, success, eOpts) {
				// var exportBtn = me._exportBtn;
				// if (records && exportBtn) {
				// if (records.length > 0) {
				// exportBtn.setDisabled(false);
				// } else {
				// exportBtn.setDisabled(true);
				// }
				// }
				// },
				beforeload : function(me, operation, eOpts) {
					// operation.callback = Ext.storeCallBack;
					var form = me._form, columns = me._columns, grid = me._grid;
					if (form) {

						return form.formCheck ? form.formCheck() : form
								.isValid();
						// if (form.down('hsx')) {
						// var values = form.getForm().getValues();
						// var cols = [];
						// var hsxes = [];
						// var list = Ext.hsx;
						// for (var i in list) {
						// if (values[list[i]]) {
						// hsxes.push(values[list[i]]);
						// }
						// }
						// if (hsxes.length == 0) {
						// for (var key in columns) {
						// cols.push(columns[key]);
						// }
						// } else {
						// for (var i = 0; i < hsxes.length; i++) {
						// cols.push(columns[hsxes[i]]);
						// }
						// // 科目汇总查询时增加借贷金额列
						// cols.push(columns.j);
						// cols.push(columns.d);
						// // 挂帐情况查询时增加载长短款金额列
						// cols.push(columns.blc);
						// cols.push(columns.bsc);
						// cols.push(columns.action);
						// }
						// grid.reconfigure(me, cols);
						// }
					}

				}
			}
		});
