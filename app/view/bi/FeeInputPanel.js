Ext.define('yspz_gen.view.bi.FeeInputPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bi_feeinputpanel',
	bodyPadding : 5,
	autoScroll : true,
	initComponent : function() {
		var me = this, items = [{
			xtype : 'fieldset',
			title : '定义',
			items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 5
							}
						},
						fieldLabel : '收付手续费',
						items : [{
									boxLabel : '收手续费',
									name : me._prefix + 'fee_inout',
									inputValue : 0,
									checked : true
								}, {
									boxLabel : '付手续费',
									name : me._prefix + 'fee_inout',
									inputValue : 1
								}]
					}, {
						xtype : 'radiogroup',
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 5
							}
						},
						fieldLabel : '确认方式',
						items : [{
							boxLabel : '直接确认',
							name : me._prefix + 'confirm_mode',
							inputValue : 0,
							checked : true,
							listeners : {
								change : function(radio, newValue) {
									if (newValue) {
										me.down("fieldset[title='暂估计算法则']")
												.setTitle("计算法则");
										me.down("fieldset[title='划付规则']")
												.show();
										me.down("fieldset[title='确认规则']")
												.hide();
									} else {
										me.down("fieldset[title='计算法则']")
												.setTitle("暂估计算法则");
										me.down("fieldset[title='划付规则']")
												.hide();
										me.down("fieldset[title='确认规则']")
												.show();
									}
								}
							}
						}, {
							boxLabel : '周期确认',
							name : me._prefix + 'confirm_mode',
							inputValue : 1
						}]
					}]
		}, {
			xtype : 'fieldset',
			title : '计算法则',
			_count : 1,
			items : [{
						xtype : "fieldcontainer",
						layout : {
							type : 'hbox',
							defaultMargins : {
								right : 5
							}
						},
						items : [{
									xtype : "textfield",
									name : me._prefix + "max",
									fieldLabel : '封顶'
								}, {
									xtype : "textfield",
									name : me._prefix + "min",
									fieldLabel : '保底'
								}]
					}, {
						xtype : "button",
						text : "添加计算区间",
						colspan : 7,
						handler : function() {
							var fieldset = this.up("fieldset");
							var count = fieldset._count++;
							var fieldContainer = Ext.create(
									'widget.fieldcontainer', {
										layout : {
											type : 'table',
											columns : 7,
											tdAttrs : {
												style : {
													padding : "3px"
												}
											}
										},
										_count : count,
										items : [{
													xtype : 'label',
													text : '计算区间' + count
															+ '（分）',
													rowspan : 2
												}, {
													xtype : "textfield",
													name : me._prefix
															+ "value_from_"
															+ count,
													hideLabel : true,
													allowBlank : false,
													rowspan : 2,
													width : 95
												}, {
													xtype : 'label',
													rowspan : 2,
													text : '-'
												}, {
													xtype : "textfield",
													name : me._prefix
															+ "value_to_"
															+ count,
													hideLabel : true,
													allowBlank : false,
													rowspan : 2,
													width : 95
												}, {
													xtype : "radiofield",
													boxLabel : '比例',
													name : me._prefix + 'mode_'
															+ count,
													inputValue : 0
												}, {
													xtype : 'label',
													text : '费率'
												}, {
													xtype : "button",
													text : "删除",
													handler : function() {
														this
																.up("fieldset")
																.remove(this
																		.up("fieldcontainer"));
													}
												}, {
													xtype : "radiofield",
													boxLabel : '定额',
													checked : true,
													name : me._prefix + 'mode_'
															+ count,
													listeners : {
														change : function(
																radio, newValue) {
															if (newValue) {
																radio
																		.up("fieldcontainer")
																		.down("label[text='/百万分之']")
																		.setText("/笔");
															} else {
																radio
																		.up("fieldcontainer")
																		.down("label[text='/笔']")
																		.setText("/百万分之");
															}
														}
													},
													inputValue : 1
												}, {
													xtype : "textfield",
													name : me._prefix + 'rate_'
															+ count,
													allowBlank : false,
													hideLabel : true,
													width : 95
												}, {
													xtype : 'label',
													text : '/笔'
												}]
									});
							fieldset.add(fieldContainer);
						}
					}]
		}, {
			xtype : 'fieldset',
			title : '划付规则',
			items : [{
				xtype : 'radiogroup',
				columns : 2,
				fieldLabel : '是否财务外付',
				vertical : true,
				items : [{
							boxLabel : '是',
							name : me._prefix + 'cwwf',
							inputValue : true
						}, {
							boxLabel : '否',
							name : me._prefix + 'cwwf',
							inputValue : false,
							checked : true,
							listeners : {
								change : function(radio, newValue) {
									if (newValue) {
										radio.up("fieldset").items.items
												.forEach(function(element,
																index, array) {
															if (index > 0) {
																element.show();
															}
														});
									} else {
										radio.up("fieldset").items.items
												.forEach(function(element,
																index, array) {
															if (index > 0) {
																element.hide();
															}
														});
									}
								}
							}
						}]
			}, {
				xtype : "fieldcontainer",
				layout : {
					type : 'hbox',
					defaultMargins : {
						right : 5
					}
				},
				items : [{
					xtype : "bfj_acct",
					name : me._prefix + "acct",
					fieldLabel : '划付帐号',
					width : 516
						// allowBlank : false
					}, {
					xtype : "pay_cycle",
					name : me._prefix + "pay_cycle"
						// allowBlank : false
					}]
			}, {
				xtype : "fieldcontainer",
				layout : {
					type : 'hbox',
					defaultMargins : {
						right : 5
					}
				},
				items : [{
					xtype : "textfield",
					name : me._prefix + "delay",
					fieldLabel : '划付延迟（天）'
						// allowBlank : false
					}, {
					xtype : 'radiogroup',
					layout : {
						type : 'hbox',
						defaultMargins : {
							right : 5
						}
					},
					fieldLabel : '非工作日是否划付',
					items : [{
								boxLabel : '是',
								name : me._prefix + 'pay4weekend',
								inputValue : true,
								checked : true
							}, {
								boxLabel : '否',
								name : me._prefix + 'pay4weekend',
								inputValue : false
							}]
				}]
			}]
		}, {
			xtype : 'fieldset',
			title : '确认规则',
			hidden : true,
			items : [{
						xtype : "textfield",
						name : me._prefix + "confirm_rule_id",
						fieldLabel : '确认规则ID'
					}]
		}];
		me.items = items;
		this.callParent(arguments);
	}
});