Ext.define('yspz_gen.view.zjdz.task.dz', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.zjdz_task_dz',
	border : false,
	autoScroll : true,

	initComponent : function() {
		var me = this, view, tpl;
		tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<table width="98%" border="1" cellspacing="1" cellpadding="0" align="center" class="live_1_table" _task="{id}">',
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
							} else if (tid.io === 'o') {
								data += this.genOut(tid);
							}
							// data += "</tr>";
						}
						data += this.genOther(json);
						return data;
					},
					genIn : function(json) {
						var data = "<tr>", prefix = json.id + "_";
						data += "<td rowspan=\"4\" _tid=\""
								+ json.id
								+ "\"><div class=\"lblk\">收款接口:</div><div class=\"cblk\">"
								+ json.name
								+ "</div><div style=\"margin-top: 10px\"><label class=\"ice_five\">帐务变化总额:</label></div><div style=\"text-align: right; margin-right: 20px\">"
								+ "<input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"width:180px\"></input>"
								+ "</div></td>"
								+ "<td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">前期帐务</td><td style=\"border: 0\"><button type=\"button\" _tid=\""
								+ json.id
								+ "\">重置</button></td><td style=\"border: 0\"><button type=\"button\" _tid=\""
								+ json.id
								+ "\">调节</button></td></tr>"
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
								+ "<div style=\"margin-top: 30px\"><label class=\"ice_five\">接口实际资金变化总额</label></div><div style=\"text-align: right; margin-right: 20px\"><input type=\"text\" class=\"ice_nine\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></div></td>"
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
								+ "<tr><td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">本期帐务</td><td style=\"border: 0\"><button type=\"button\">重置</button></td><td style=\"border: 0\"></td></tr>";
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
						var data = "<tr>", prefix = json.id + "_";
						data += "<td rowspan=\"4\" _tid=\""
								+ json.id
								+ "\"><div class=\"lblk\">出款接口:</div><div class=\"cblk\">"
								+ json.name
								+ "</div><div style=\"margin-top: 10px\"><label class=\"ice_five\">帐务变化总额:</label></div><div style=\"text-align: right; margin-right: 20px\">"
								+ "<input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"width:180px\"></input>"
								+ "</div></td>"
								+ "<td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">前期帐务</td><td style=\"border: 0\"><button type=\"button\" _tid=\""
								+ json.id
								+ "\">重置</button></td><td style=\"border: 0\"><button type=\"button\" _tid=\""
								+ json.id
								+ "\">调节</button></td></tr>"
								+ "<tr><td style=\"width:200px\"></td><td style=\"width:180px\">前期未达</td><td style=\"width:180px\">前期长款</td><td style=\"width:180px\">前期短款</td><td style=\"width:110px\">前期变化总额</td></tr>"
								+ "<tr><td>交易出款</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[0][0],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[0][2],
										'0,0.00')
								+ "</td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td>出款手续费</td><td class=\"ice_two\">"
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
								+ "<div style=\"margin-top: 30px\"><label class=\"ice_five\">接口实际资金变化总额</label></div><div style=\"text-align: right; margin-right: 20px\"><input type=\"text\" class=\"ice_nine\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></div></td>"
								+ "<td>出款退回</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[2][0],
										'0,0.00')
								+ "</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[2][2],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td>退回手续费</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.qianqi[3][0],
										'0,0.00')
								+ "</td><td class=\"ice_one\"></td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">本期帐务</td><td style=\"border: 0\"><button type=\"button\">重置</button></td><td style=\"border: 0\"></td></tr>";
						for (var i in json.benqi) {
							var bq = json.benqi[i];
							data += "<tr><td>清算日期"
									+ bq.clear_date
									+ "</td><td>本期清算</td><td>本期实际应收/付</td><td>本期长/短款</td><td>本期变化总额</td></tr>"
									+ "<tr><td>应付银行-交易出款</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[0],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_three\"></td></tr>"
									+ "<tr><td>应付银行-出款手续费</td><td class=\"ice_two\">"
									+ Ext.util.Format.number(bq.data[1],
											'0,0.00')
									+ "</td><td><input type=\"text\" style=\"width: 160px\"></input></td><td class=\"ice_one\"></td><td class=\"ice_three\"></td></tr>"
									+ "<tr><td>应收银行-出款退回</td><td class=\"ice_two\">"
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
					genOther : function(json) {
						var data = "", prefix = json.id + "_";
						data += "<tr><td rowspan=\"4\">"
								+ "<div class=\"lblk\">其他部分:</div>"
								+ "<div style=\"margin-top: 10px\"><label class=\"ice_five\">帐务变化总额:</label></div><div style=\"text-align: right; margin-right: 20px\">"
								+ "<input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"width:180px\"></input>"
								+ "</div></td>"
								+ "<td colspan=\"3\" class=\"ice_four\" style=\"border: 0\">其他帐务</td><td style=\"border: 0\"><button type=\"button\">重置</button></td><td style=\"border: 0\"></td></tr>"
								+ "<tr><td>帐务变化类型</td><td>入金</td><td>帐务变化类型</td><td>出金</td><td>帐务变化</td></tr>"
								+ "<tr><td>资金划拨调入</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[0], '0,0.00')
								+ "</td><td>资金划拨调出</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[1], '0,0.00')
								+ "</td><td class=\"ice_three\">"
								+ Ext.util.Format.number(
										parseFloat(json.amt[0])
												- parseFloat(json.amt[1]),
										'0,0.00')
								+ "</td></tr>"
								+ "<tr><td>申请存放的自有资金</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[2], '0,0.00')
								+ "</td><td>申请调出的自有资金</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[3], '0,0.00')
								+ "</td><td class=\"ice_three\">"
								+ Ext.util.Format.number(
										parseFloat(json.amt[2])
												- parseFloat(json.amt[3]),
										'0,0.00')
								+ "</td></tr>"
								+ "<tr><td rowspan=\"8\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">"
								+ "<tr><th colspan=\"2\">对账单实际资金变化</th></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">资金划拨转入:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">资金划拨转出:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">账户管理费:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">利息:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">手续费:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">内部划款转入:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">内部划款转出:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">未知长款:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "<tr><td style=\"text-align: right\"><label class=\"ice_five\">未知短款:</label></td><td style=\"text-align: left\"><input type=\"text\" class=\"ice_six\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></td></tr>"
								+ "</table>"
								+ "<div style=\"margin-top: 10px\"><label class=\"ice_five\">其他资金变化总额</label></div><div style=\"text-align: right; margin-right: 20px\"><input type=\"text\" class=\"ice_nine\" disabled=\"disabled\" style=\"background-color: #D8D8D8\"></input></div></td>"
								+ "<td>利息收入</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[4], '0,0.00')
								+ "</td><td>手续费、账户管理费</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[5], '0,0.00')
								+ "</td><td class=\"ice_three\">"
								+ Ext.util.Format.number(
										parseFloat(json.amt[4])
												- parseFloat(json.amt[5]),
										'0,0.00')
								+ "</td></tr>"
								+ "<tr><td></td><td></td><td>结转</td><td class=\"ice_two\">"
								+ Ext.util.Format.number(json.amt[6], '0,0.00')
								+ "</td><td class=\"ice_three\">"
								+ Ext.util.Format.number(
										parseFloat(json.amt[6]), '0,0.00')
								+ "</td></tr>"
								+ "<tr><td>未知长款（测试）</td><td><input type=\"text\" style=\"width: 160px\"></td><td>未知短款</td><td><input type=\"text\" style=\"width: 160px\"></td><td class=\"ice_three\"></td></tr>"
								+ "<tr><td rowspan=\"5\" colspan=\"5\" class=\"ice_four\">"
								+ "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">"
								+ "<tr><td style=\"text-align: left\"><label>银行实际期初余额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px\"></td>"
								+ "<td style=\"text-align: left\"><label>账户期初余额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px;background-color: #D8D8D8\" disabled=\"disabled\" value=\""
								+ Ext.util.Format.number(
										parseFloat(json.qichu), '0,0.00')
								+ "\"></td></tr>"
								+ "<tr><td style=\"text-align: left\"><label>银行实际资金变化总额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px;background-color: yellow\" disabled=\"disabled\" value=\"0.00\"></td>"
								+ "<td style=\"text-align: left\"><label>帐务变化总额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px;background-color: yellow\" disabled=\"disabled\"></td></tr>"
								+ "<tr><td style=\"text-align: left\"><label>银行实际期末余额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px\"></td>"
								+ "<td style=\"text-align: left\"><label>账户期末余额:</label></td><td style=\"text-align: left\"><input type=\"text\" style=\"width: 160px;background-color: yellow\" disabled=\"disabled\"></td></tr>"
								+ "</table>"
								+ "</td></tr>"
								+ "<tfoot><tr><td colspan=\"5\" style=\"border: 0\"></td><td style=\"border: 0\"><button type=\"button\">确认提交</button></td></tr></tfoot>"
						return data;
					}
				});
		me.store = new Ext.data.Store({
			fields : ['id', 'b_acct', 'opening_bank', 'bank_code', 'zjdz_date',
					'tids', 'amt', 'qichu'],
			proxy : {
				type : 'ajax',
				url : Ext.urls.GET_ZJDZ_TASK_DZ
			},
			listeners : {
				load : function(store, records, successful, eOpts) {
					// 所有可用的输入框
					var textfield = view.getEl()
							.query("input:enabled[type=\"text\"]");
					// 按钮包括清除和调节按钮
					var btn = view.getEl().query("button");
					// 总额列
					var calTD = view.getEl().query("td[class=\"ice_three\"]");
					// 接口列，接口帐务变化总额从这里开始计算
					var tTD = view.getEl().query("td[rowspan=\"4\"]");
					// 初始化textfield
					textfield.forEach(function(v) {
						var el = new Ext.dom.Element(v)
						el.dom.value = Ext.util.Format.number("0.00", '0,0.00');
						el.on('blur', function(e, t) {
							var el = new Ext.dom.Element(t);
							var value = el.getValue().replace(/,/g, '').trim();
							if (!/^(([1-9]{1}\d*)|([0]{1}))(\.\d+)?$/
									.test(value)) {
								value = 0;
							}
							el.dom.value = Ext.util.Format.number(value,
									'0,0.00');
							var tr = el.parent("tr"), td = tr
									.child("td[class=\"ice_three\"]"), sum = 0, base = 0, hasBase = false;
							if (td) {
								if (tr.getHTML().indexOf("未知长款") !== -1) {
									tr.query("input[type=\"text\"]").forEach(
											function(v, i) {
												if (i === 0)
													sum += parseFloat(new Ext.dom.Element(v)
															.getValue()
															.replace(/,/g, '')
															.trim());
												else if (i === 1)
													sum -= parseFloat(new Ext.dom.Element(v)
															.getValue()
															.replace(/,/g, '')
															.trim());

											});
								} else {
									if (tr.query("input[type=\"text\"]").length === 2) {
										base = parseFloat(tr
												.child("td[class=\"ice_two\"]")
												.getHTML().replace(/,/g, '')
												.trim());
										hasBase = true;
										// console.log("base:" + base);
									}
									tr.query("input[type=\"text\"]").forEach(
											function(v) {
												sum += parseFloat(new Ext.dom.Element(v)
														.getValue().replace(
																/,/g, '')
														.trim());
											});
									if (hasBase && sum > base) {
										Ext.MessageBox
												.confirm(
														'提示',
														"本期应收/付+本期长/短款>本期清算<br\>\
"
																+ Ext.util.Format
																		.number(
																				sum,
																				'0,0.00')
																+ ">"
																+ Ext.util.Format
																		.number(
																				base,
																				'0,0.00')
																+ "<br\>\
是否要清空?",
														function(opt) {
															if (opt === 'yes') {
																value = 0, sum = 0;
																el.dom.value = Ext.util.Format
																		.number(
																				value,
																				'0,0.00');
																tr
																		.query("input[type=\"text\"]")
																		.forEach(
																				function(
																						v) {
																					sum += parseFloat(new Ext.dom.Element(v)
																							.getValue()
																							.replace(
																									/,/g,
																									'')
																							.trim());
																				});
																td
																		.setHTML(Ext.util.Format
																				.number(
																						sum,
																						'0,0.00'));
																calTotal4Tid(tr
																		.prev("tr:has(td[rowspan=4])")
																		.child("td[rowspan=4]"));
																calTotal();
															} else {
																el.focus();
															}
														});

									}
								}
								td.setHTML(Ext.util.Format
										.number(sum, '0,0.00'));
								calTotal4Tid(tr.prev("tr:has(td[rowspan=4])")
										.child("td[rowspan=4]"));
								calTotal();
							}
							// 银行实际期初余额 | 银行实际期末余额
							else {
								var bankReal;
								if (tr.getHTML().toString().indexOf("银行实际期初余额") !== -1) {
									bankReal = new Ext.dom.Element(tr
											.next("tr")
											.query("input:disabled[type=\"text\"]")[0]);
									sum = parseFloat(new Ext.dom.Element(tr
											.next("tr")
											.next("tr")
											.query("input:enabled[type=\"text\"]")[0])
											.getValue().replace(/,/g, '')
											.trim())
											- parseFloat(new Ext.dom.Element(tr
													.query("input:enabled[type=\"text\"]")[0])
													.getValue().replace(/,/g,
															'').trim());
								} else if (tr.getHTML().toString()
										.indexOf("银行实际期末余额") !== -1) {
									bankReal = new Ext.dom.Element(tr
											.prev("tr")
											.query("input:disabled[type=\"text\"]")[0]);
									sum = parseFloat(new Ext.dom.Element(tr
											.query("input:enabled[type=\"text\"]")[0])
											.getValue().replace(/,/g, '')
											.trim())
											- parseFloat(new Ext.dom.Element(tr
													.prev("tr")
													.prev("tr")
													.query("input:enabled[type=\"text\"]")[0])
													.getValue().replace(/,/g,
															'').trim());
								}
								bankReal.dom.value = Ext.util.Format.number(
										sum, '0,0.00')
							}
						});
					});
					// 初始化变化总额列
					calTD.forEach(function(v) {
						var el = new Ext.dom.Element(v), value = 0;
						if (el.getHTML()) {
							return;
						}
						var tr = el.parent("tr");
						var input = tr.query("input:enabled[type=\"text\"]");
						if (input.length > 0) {
							input.forEach(function(v) {
										value += parseFloat(new Ext.dom.Element(v)
												.getValue().replace(/,/g, '')
												.trim());
									});
						}
						el.setHTML(Ext.util.Format.number(value, '0,0.00'));
					});
					tTD.forEach(function(v) {
								calTotal4Tid(new Ext.dom.Element(v));
							});
					calTotal();
					// 注册按钮事件
					btn.forEach(function(v) {
						var el = new Ext.dom.Element(v);
						if (v.innerHTML === "重置") {
							el.on("click", function(e, btn) {
								var btn = new Ext.dom.Element(btn);
								var baseTR = btn.parent("tr");
								var td = baseTR.child("td[rowspan]");
								if (td) {// 前期帐务|其他 重置
									if (baseTR.getHTML().toString()
											.indexOf("其他帐务") !== -1) {
										baseTR = baseTR.next().next().next()
												.next().next().next();
										baseTR.child("td[class=\"ice_three\"]")
												.setHTML("0.00");
										baseTR.query("input[type=\"text\"]")
												.forEach(function(v) {
													new Ext.dom.Element(v).dom.value = "0.00";
												});
									} else {
										var rowspan = parseInt(td
												.getAttribute("rowspan"));
										baseTR = baseTR.next("tr").next("tr");
										for (var i = 0; i < rowspan; i++) {
											baseTR
													.child("td[class=\"ice_three\"]")
													.setHTML("0.00");
											baseTR = baseTR.next("tr");
										}
										// 删除保存在iew上面的调整数据
										delete view._data[btn
												.getAttribute("_tid")];
									}
									calTotal4Tid(td);
								} else {// 本期帐务清除
									baseTR = baseTR.prev("tr").prev("tr");
									td = baseTR.child("td[rowspan]");
									var rowspan = parseInt(td
											.getAttribute("rowspan"))
											- 2;
									baseTR = baseTR.next("tr").next("tr")
											.next("tr");
									for (var i = 1; i < rowspan; i++) {
										baseTR = baseTR.next("tr");
										if (i % 5 === 0) {
											continue;
										}
										baseTR.child("td[class=\"ice_three\"]")
												.setHTML("0.00");
										baseTR.query("input[type=\"text\"]")
												.forEach(function(v) {
													new Ext.dom.Element(v).dom.value = "0.00";
												});
									}
									calTotal4Tid(new Ext.dom.Element(btn)
											.parent("tr")
											.prev("tr:has(td[rowspan=4])")
											.child("td[rowspan=4]"));
								}
								calTotal();
							});
						} else if (v.innerHTML === "调节") {
							el.on("click", function(evt, el) {
								var tid = new Ext.dom.Element(el)
										.getAttribute("_tid"), task = new Ext.dom.Element(el)
										.parent("table").getAttribute("_task"), task_tz = Ext
										.createByAlias(
												'widget.zjdz_task_adjust', {
													_view : view,
													_td : new Ext.dom.Element(el)
															.parent("tr")
															.child("td[rowspan=4]"),
													_tid : tid
												});
								task_tz.store.load({
											params : {
												tid : tid,
												task : task
											}
										});
								Ext.create('Ext.window.Window', {
											title : '调节',
											maxHeight : 500,
											width : 800,
											y : 100,
											resizable : false,
											modal : true,
											layout : 'fit',
											items : task_tz
										}).show();
							});
						} else if (v.innerHTML === "确认提交") {
							el.on("click", function() {
								Ext.Msg.confirm('警告', "你确定要提交?", function(
										optional) {
									if (optional == 'yes') {
										Ext.asyncRequest(
												Ext.urls.SUBMIT_ZJDZ_TASK_DZ, {
													adjust : Ext
															.encode(view._data),
													data : Ext.encode(view
															.genInputData())
												}, function() {
													me.up("panel").close();
												});

									}
								});

							});
						}
					});
				}
			}
		});
		var calBenSum4Tid = function(el, data) {
			var td = el;
			var tr = el.parent("tr").next("tr").next("tr");
			// 前期帐务--交易收款
			if (tr.child("td").getHTML() === "交易收款") {
				var wdsk = 0, ck = 0;
				data.forEach(function(f) {
							if (f.tname === "收款") {
								wdsk += f.amt[0];
							}
						});
				data.forEach(function(f) {
							ck += f.amt[1];
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(wdsk - ck, '0,0.00'));

			}
			// 前期帐务--交易出款
			else if (tr.child("td").getHTML() === "交易出款") {
				var wdck = 0, dk = 0;
				data.forEach(function(f) {
							if (f.tname === "出款") {
								wdck += f.amt[0];
							}
						});
				data.forEach(function(f) {
							dk += f.amt[2];
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(wdck - dk, '0,0.00'));
			}
			tr = tr.next("tr");
			// 前期帐务--交易手续费
			if (tr.child("td").getHTML() === "交易手续费") {
				var wdfee = 0;
				data.forEach(function(f) {
							if (f.tname === "交易手续费") {
								wdfee += f.amt[0];
							}
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(wdfee, '0,0.00'));
			}
			// 前期帐务--出款手续费
			else if (tr.child("td").getHTML() === "出款手续费") {
				var ckfee = 0;
				data.forEach(function(f) {
							if (f.tname === "出款手续费") {
								wdck += f.amt[0];
							}
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(ckfee, '0,0.00'));
			}
			tr = tr.next("tr");
			// 前期帐务--交易退款
			if (tr.child("td").next("td").getHTML() === "交易退款") {
				var jytk = 0, dk = 0;
				data.forEach(function(f) {
							if (f.tname === "交易退款") {
								jytk += f.amt[0];
							}
						});
				data.forEach(function(f) {
							dk += f.amt[2];
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(jytk - dk, '0,0.00'));

			}
			// 前期帐务--出款退回
			else if (tr.child("td").next("td").getHTML() === "出款退回") {
				var ckth = 0, dk = 0;
				data.forEach(function(f) {
							if (f.tname === "出款退回") {
								ckth += f.amt[0];
							}
						});
				data.forEach(function(f) {
							dk += f.amt[2];
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(ckth - dk, '0,0.00'));
			}
			tr = tr.next("tr");
			// 前期帐务--退回手续费
			if (tr.child("td").getHTML() === "退回手续费") {
				var thfee = 0;
				data.forEach(function(f) {
							if (f.tname === "退回手续费") {
								thfee += f.amt[0];
							}
						});
				tr.child("td[class=\"ice_three\"]").setHTML(Ext.util.Format
						.number(thfee, '0,0.00'));
			}
			tr = tr.next("tr");
			calTotal4Tid(el);
			calTotal();
		};
		var calTotal4Tid = function(el) {
			var input = new Ext.dom.Element(el.query("input[type=\"text\"]")[0]), sum = 0;
			if (el.getHTML().toString().indexOf("其他部分") !== -1) {
				var tr = el.parent("tr").next("tr").next("tr");
				// 资金划拨资金划拨调入/调出
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				// 申请存放/调出的自有资金
				tr = tr.next("tr");
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr");
				// 利息收入/手续费、账户管理费
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr");
				// 结转
				sum -= parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr");
				// 未知长/短款
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
			} else {
				var tr = el.parent("tr").next("tr").next("tr"), rowspan = 0;
				// 前期帐务--交易收款
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr");
				// 前期帐务--交易手续费
				sum -= parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr");
				// 前期帐务--交易退款
				sum -= parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				rowspan = parseInt(tr.child("td[rowspan]")
						.getAttribute("rowspan"));
				tr = tr.next("tr");
				// 前期帐务--退回手续费
				sum += parseFloat(tr.child("td[class=\"ice_three\"]").getHTML()
						.replace(/,/g, '').trim());
				tr = tr.next("tr").next("tr");
				for (var i = 1; i <= (rowspan - 3); i++) {
					if (i % 5 === 2 || i % 5 === 0) {
						sum += parseFloat(tr.child("td[class=\"ice_three\"]")
								.getHTML().replace(/,/g, '').trim());
					} else if (i % 5 === 3 || i % 5 === 4) {
						sum -= parseFloat(tr.child("td[class=\"ice_three\"]")
								.getHTML().replace(/,/g, '').trim());
					}
					tr = tr.next("tr");

				}
			}
			input.dom.value = Ext.util.Format.number(sum, '0,0.00');
		};
		var calTotal = function() {
			var table = new Ext.dom.Element(view.getEl()
					.query("td[rowspan=\"5\"]")[0]).child("table");
			var qichu, total, remaining, sum = 0;
			table.query("tr").forEach(function(v, i, arr) {
				var tr = new Ext.dom.Element(v);
				if (tr.getHTML().toString().indexOf("账户期初余额") !== -1) {
					tr.query("input:disabled").forEach(function(v) {
						qichu = parseFloat(new Ext.dom.Element(v).getValue()
								.replace(/,/g, '').trim());
					});
				} else if (tr.getHTML().toString().indexOf("帐务变化总额") !== -1) {
					total = new Ext.dom.Element(tr.query("input:disabled")[1]);
				} else if (tr.getHTML().toString().indexOf("账户期末余额") !== -1) {
					remaining = new Ext.dom.Element(tr.query("input:disabled")[0]);
				}

			});
			view.getEl().query("td[rowspan=\"4\"]").forEach(function(v) {
				var td = new Ext.dom.Element(v);
				sum += parseFloat(new Ext.dom.Element(td
						.query("input:disabled")[0]).getValue().replace(/,/g,
						'').trim());
			});
			total.dom.value = Ext.util.Format.number(sum, '0,0.00');
			remaining.dom.value = Ext.util.Format.number(qichu - sum, '0,0.00');
		}
		view = Ext.create('Ext.view.View', {
			_data : {},
			genInputData : function() {
				var td = this.getEl().query("td[rowspan=\"4\"]"), data = {
					data : [],
					amt : []
				};
				if (td) {
					td.forEach(function(v) {
						var col = new Ext.dom.Element(v);
						// 其他部分
						if (col.getHTML().toString().indexOf("其他部分") !== -1) {
							var baseTR = col.parent("tr");
							var tr = baseTR.next("tr").next("tr").next("tr")
									.next("tr").next("tr").next("tr");
							tr.query("input:enabled[type=\"text\"]").forEach(
									function(v) {
										data.amt.push(new Ext.dom.Element(v)
												.getValue().replace(/,/g, '')
												.trim());
									});
							tr = tr.next("tr").child("td").child("table");
							tr.query("input:enabled[type=\"text\"]").forEach(
									function(v) {
										data.amt.push(new Ext.dom.Element(v)
												.getValue().replace(/,/g, '')
												.trim());
									});
						}
						// 接口部分
						else {
							var d = {
								tid : col.getAttribute("_tid"),
								data : []
							};
							var baseTR = col.parent("tr");
							var rowspan = parseInt(baseTR.next("tr").next("tr")
									.next("tr").next("tr").child("td[rowspan]")
									.getAttribute("rowspan"));
							var tr = baseTR.next("tr").next("tr").next("tr")
									.next("tr").next("tr").next("tr")
									.next("tr");
							for (var i = 0; i < (rowspan - 3) / 5; i++) {
								var dd = {
									clear_date : "",
									data : []
								};
								for (var j = 0; j < 5; j++) {
									if (j % 5 === 0) {
										dd.clear_date = tr.child("td")
												.getHTML().toString().replace(
														"清算日期", "");
									} else {
										var input = tr
												.query("input[type=\"text\"]");
										if (input) {
											input.forEach(function(v) {
												dd.data
														.push(new Ext.dom.Element(v)
																.getValue()
																.replace(/,/g,
																		'')
																.trim())
											})
										}

									}
									tr = tr.next("tr");
								}
								d.data.push(dd);
							}
							data.data.push(d);
						}
					})
				}
				return data;
			},
			calBenSum4Tid : calBenSum4Tid,
			store : me.store,
			disableSelection : true,
			tpl : tpl,
			itemSelector : 'table[class=\"live_1_table\"]'
		});
		me.items = view;
		me.callParent(arguments);
	}
});
