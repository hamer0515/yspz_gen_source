Ext.define('yspz_gen.view.zjdz.task.adjust', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdz_task_adjust',
	border : false,
	autoScroll : true,

	initComponent : function() {
		var me = this, view = me._view, tpl, OriginData = view._data[me._tid];
		// console.log(OriginData);
		tpl = new Ext.XTemplate(
				'<table width="98%" border="1" cellspacing="1" cellpadding="0" align="center" class="live_1_table">',
				'<thead><tr><th>应到帐日期(差错日期)</th><th>清算日期</th><th>前期未达类型</th><th>未达余额</th><th style=\"width: 70px\"></th><th>前期长款</th><th style=\"width: 70px\"></th><th>前期短款</th><th style=\"width: 70px\"></th></tr></thead>',
				'<tbody><tpl for=".">',
				'{[this.gentrs(values)]}',
				'</tpl></tbody>',
				'<tfoot><tr><td colspan=\"5\" style=\"border: 0\"></td><td colspan=\"2\" style=\"border: 0\"><button type=\"button\">清除</button></td><td colspan=\"2\" style=\"border: 0\"><button type=\"button\">确认</button></td></tr></tfoot>',
				'</table>', {
					gentrs : function(json) {
						var data = "", d, value;
						var field = json.data;
						for (var j in field) {
							if (OriginData) {
								d = Ext.Array.findBy(OriginData,
										function(item) {
											return item.clear_date === field[j].clear_date
													&& item.tname === field[j].tname
										});
							}
							if (parseInt(j) === 0) {
								data += "<tr><td>" + json.ydz_date + "</td>";
							} else {
								data += "<tr><td></td>";
							}
							var f = field[j];
							data += "<td>" + f.clear_date + "</td><td _type=\""
									+ f.type + "\">" + f.tname + "</td>";
							for (var k in f.amt) {
								value = d
										? d.amt[k] ? d.amt[k] : "0.00"
										: "0.00";
								data += f.amt[k]
										? "<td>"
												+ Ext.util.Format.number(
														f.amt[k], '0,0.00')
												+ "</td><td><input type=\"text\" style=\"width: 60px\" value=\""
												+ Ext.util.Format.number(value,
														'0,0.00') + "\"></td>"
										: "<td></td><td></td>";
							}
							data += "</tr>";
						}
						return data;
					}
				});
		me.store = new Ext.data.Store({
			fields : ['ydz_date', 'data'],
			proxy : {
				type : 'ajax',
				url : Ext.urls.GET_ZJDZ_TASK_ADJUST
			},
			listeners : {
				load : function(store, records, successful, eOpts) {
					if (!successful) {
						me.up("panel").close();
					}
					// 所有可用的输入框
					var textfield = view.getEl()
							.query("input:enabled[type=\"text\"]");
					// 按钮包括清除和确定按钮
					var btn = view.getEl().query("button");
					textfield.forEach(function(v) {
						var el = new Ext.dom.Element(v);
						// el.dom.value = Ext.util.Format.number("0.00",
						// '0,0.00');
						el.on('blur', function(e, t) {
							var el = new Ext.dom.Element(t);
							var value = el.getValue().replace(/,/g, '').trim();
							if (!/^(([1-9]{1}\d*)|([0]{1}))(\.\d+)?$/
									.test(value)) {
								value = 0;
							}
							el.dom.value = Ext.util.Format.number(value,
									'0,0.00');
							var tr = el.parent("tr"), base = 0, hasBase = false;
							if (tr.query("input[type=\"text\"]").length === 2) {
								base = parseFloat(el.parent("td").prev("td")
										.getHTML().replace(/,/g, '').trim());
								hasBase = true;
								// console.log("base:" + base);
							}
							if (hasBase && parseFloat(value) > base) {
								Ext.MessageBox.confirm('提示', "输入>未达<br\>\
"
												+ Ext.util.Format.number(value,
														'0,0.00')
												+ ">"
												+ Ext.util.Format.number(base,
														'0,0.00')
												+ "<br\>\
是否要清空?",
										function(opt) {
											if (opt === 'yes') {
												value = 0, sum = 0;
												el.dom.value = Ext.util.Format
														.number(value, '0,0.00');
												tr
														.query("input[type=\"text\"]")
														.forEach(function(v) {
															sum += parseFloat(new Ext.dom.Element(v)
																	.getValue()
																	.replace(
																			/,/g,
																			'')
																	.trim());
														});
											} else {
												me.focus();
												el.focus();
											}
										});

							}
						});
					});
					// 注册按钮事件
					btn.forEach(function(v) {
						var el = new Ext.dom.Element(v);
						if (v.innerHTML === "清除") {
							el.on("click", function(e, btn) {
										view
												.getEl()
												.query("input:enabled[type=\"text\"]")
												.forEach(function(v) {
													var el = new Ext.dom.Element(v);
													el.dom.value = Ext.util.Format
															.number("0.00",
																	'0,0.00');
												});
									});
						} else if (v.innerHTML === "确认") {
							el.on("click", function(e, btn) {
										var tr = new Ext.dom.Element(btn)
												.parent("table").child("tbody")
												.child("tr"), data = [];
										var i = 0;
										while (tr) {
											var re = handleTR(tr);
											re && data.push(re);
											tr = tr.next("tr");
										}
										var view = me._view;
										if (!view._data[me._tid]) {
											view._data[me._tid] = [];
										}
										view._data[me._tid] = data;
										view.calBenSum4Tid(me._td, data);
										me.up("window").close();
									});
						}
					});
				}
			}
		});
		var handleTR = function(tr) {
			var input = tr.query("input[type=\"text\"]"), isOK = false;
			// 检查是否修改（input的值不为0）
			Ext.Array.each(input, function(v) {
						if (parseFloat(new Ext.dom.Element(v).getValue()
								.replace(/,/g, '').trim()) !== 0) {
							isOK = true;
							return false;
						}
					});
			if (!isOK) {
				return null;
			}
			var td = tr.query("td");
			var re = {
				clear_date : new Ext.dom.Element(td[1]).getHTML(),
				type : new Ext.dom.Element(td[2]).getAttribute("_type"),
				tname : new Ext.dom.Element(td[2]).getHTML(),
				amt : []
			};
			var i = 4;
			while (true) {
				var v = null, f = new Ext.dom.Element(td[i]).child("input");
				if (f
						&& parseFloat(f.getValue().replace(/,/g, '').trim()) !== 0) {
					v = parseFloat(f.getValue().replace(/,/g, '').trim());
				}
				re.amt.push(v);
				i += 2;
				if (i > 8) {
					break;
				}
			}
			return re;
		}
		view = Ext.create('Ext.view.View', {
					store : me.store,
					disableSelection : true,
					tpl : tpl,
					itemSelector : 'table[class=\"live_1_table\"]'
				});
		me.items = view;
		me.callParent(arguments);
	}
});
