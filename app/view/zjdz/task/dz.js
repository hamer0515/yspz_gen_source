Ext.define('yspz_gen.view.zjdz.task.dz', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdz_task_dz',
	border : false,

	initComponent : function() {
		var me = this, view, tpl;
		tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<table width="98%" border="1" cellspacing="1" cellpadding="0" align="center" class="live_1_table">',
				'<tr align="center"  >',
				'<td colspan="1">资金对账日期： {zjdz_date}</td>',
				'<td colspan="3">{opening_bank}:{b_acct}</td>',
				'<td colspan="2">银行账户标号：{bank_code}</td></tr>',
				'{[this.gentrs(values)]}', '</table>', '</tpl>', {
					gentrs : function(json) {
						var data = "";
						for (var i in json.tids) {
							var tid = json.tids[i];
							// data += "<tr>";
							if (tid.io === 'i') {
								data += this.genIn(tid);
							} else if (tid.io === '0') {
								data += this.genOut(tid);
							}
							// data += "</tr>";
						}
						return data;
					},
					genIn : function(json) {
						var data = "<tr>", prefix = json.id + "_";
						data += "<td rowspan=\"4\"><div class=\"lblk\">收款接口:</div><div class=\"cblk\">"
								+ json.name
								+ "</div><div style=\"margin-top: 10px\"><label class=\"ice_five\">帐务变化总额:</label></div><div style=\"text-align: right; margin-right: 20px\">"
								+ "<input type=\"text\" class=\"ice_six\" disabled=\"disabled\"></input>"
								+ "</div></td>"
								+ "<td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">前期帐务</td><td style=\"border: 0\"><button type=\"button\">清除</button></td><td style=\"border: 0\"><button type=\"button\">调节</button></td></tr>"
								+ "<tr><td style=\"width:200px\"></td><td style=\"width:180px\">前期未达</td><td style=\"width:180px\">前期长款</td><td style=\"width:180px\">前期短款</td><td style=\"width:110px\">前期变化总额</td></tr>"
								+ "<tr><td>交易收款</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[0][0],
										'0,0.00')
								+ "</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[0][1],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td>交易手续费</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[1][0],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_one\"><td class=\"ice_three\"></td></td></tr>"
								+ "<tr><td rowspan=\""
								+ (3 + json.benqi.length * 5)
								+ "\"><div class=\"ice_seven\">对账单实际资金变化</div>"
								+ "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">交易收款金额</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">收款手续费</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">收款退回金额</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">退回手续费</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "</table>"
								+ "<div style=\"margin-top: 30px\"><label class=\"ice_five\">接口实际资金变化总额</label></div><div style=\"text-align: right; margin-right: 20px\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\"></input></div></td>"
								+ "<td>交易退款</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[2][0],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[2][2],
										'0,0.00')
								+ "</td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td>退回手续费</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[3][0],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">本期帐务</td><td style=\"border: 0\"><button type=\"button\">清除</button></td><td style=\"border: 0\"></td></tr>";
						for (var i in json.benqi) {
							var bq = json.benqi[i];
							data += "<tr><td>清算日期"
									+ bq.clear_date
									+ "</td><td>本期清算</td><td>本期实际应收/付</td><td>本期长/短款</td><td>本期变化总额</td></tr>"
									+ "<tr><td>应收银行-应收交易款</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[0],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_three\"></td></tr>"
									+ "<tr><td>应付银行-应付银行手续费</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[1],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
									+ "<tr><td>应付银行-应付银行交易款</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[2],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_three\"></td></tr>"
									+ "<tr><td>应收银行-应收银行手续费</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[3],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>";
						}
						return data;
					},
					genOut : function(json) {
						return "<tr><td>from genOut</td></tr>";
					}
				});
		me.store = new Ext.data.Store({
			fields : ['id', 'b_acct', 'opening_bank', 'bank_code', 'zjdz_date',
					'tids'],
			proxy : {
				type : 'ajax',
				url : Ext.urls.GET_ZJDZ_TASK_DZ
			},
			listeners : {
				load : function(me, records, successful, eOpts) {
					var textfield = view.getEl().query("input[type=\"text\"]");
					var btn = view.getEl().query("button");
					var calTD = view.getEl().query("td[class=\"ice_three\"]");
					// 初始化变化总额列
					calTD.forEach(function(v) {
								var el = new Ext.dom.Element(v);
								el.setHTML(Ext.util.Format.number(
										"10000000000.00", '0,0.00'));
							});
					// 初始化textfield
					textfield.forEach(function(v) {
						var el = new Ext.dom.Element(v)
						el.set({
									value : Ext.util.Format.number(
											"10000000000.00", '0,0.00')
								});
						el.on('blur', function(e, t) {
							var el = new Ext.dom.Element(t);
							var value = el.getValue().replace(/,/g, '').trim();
							if (!/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.\d+)?$/
									.test(value)) {
								value = 0;
							}
							el.set({
										value : Ext.util.Format.number(value,
												'0,0.00')
									});
							var tr = el.parent("tr"), td = tr
									.child("td[class=\"ice_three\"]"), sum = 0;
							tr.query("input[type=\"text\"]").forEach(
									function(v) {
										sum += parseFloat(new Ext.dom.Element(v)
												.getValue().replace(/,/g, '')
												.trim());
									});
							td.setHTML(Ext.util.Format.number(sum, '0,0.00'));
						});
					});
					// 注册按钮事件
					btn.forEach(function(v) {
						var el = new Ext.dom.Element(v);
						if (v.innerText === "清除") {
							el.on("click", function(e, btn) {
										var baseTR = new Ext.dom.Element(btn)
												.parent("tr");
										var td = baseTR.child("td[rowspan]");
										if (td) {// 前期帐务清除
											var rowspan = parseInt(td
													.getAttribute("rowspan"));
											baseTR = baseTR.next("tr")
													.next("tr");
											for (var i = 0; i < rowspan; i++) {
												baseTR
														.child("td[class=\"ice_three\"]")
														.setHTML("0.00");
												baseTR = baseTR.next("tr");
											}
										} else {// 本期帐务清除
											baseTR = baseTR.prev("tr")
													.prev("tr");
											td = baseTR.child("td[rowspan]");
											var rowspan = parseInt(td
													.getAttribute("rowspan"))
													- 2;
											baseTR = baseTR.next("tr")
													.next("tr").next("tr");
											for (var i = 1; i < rowspan; i++) {
												baseTR = baseTR.next("tr");
												if (i % 5 === 0) {
													continue;
												}
												baseTR
														.child("td[class=\"ice_three\"]")
														.setHTML("0.00");
												baseTR
														.query("input[type=\"text\"]")
														.forEach(function(v) {
															new Ext.dom.Element(v)
																	.set({
																		value : "0.00"
																	});
														});
											}
										}
									});
						} else if (v.innerText === "调节") {
							// alert("click 调节");
						}
					});
				}
			}
		});
		view = Ext.create('Ext.view.View', {
					store : me.store,
					tpl : tpl,
					itemSelector : 'table[class=\"live_1_table\"]'
				});
		me.items = view;
		me.callParent(arguments);
	}
});
