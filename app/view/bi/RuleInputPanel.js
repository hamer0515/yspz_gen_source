Ext.define('yspz_gen.view.bi.RuleInputPanel', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.bi_ruleinputpanel',
			tabPosition : "bottom",
			plain : true,
			autoScroll : true,
			bodyPadding : 5,

			initComponent : function() {
				var me = this, items = [{
					title : "本金",
					xtype : "panel",
					items : [{
								xtype : 'fieldset',
								title : 'Matcher',
								items : [{
											xtype : "textfield",
											name : me._prefix + "matcher",
											fieldLabel : 'Matcher',
											allowBlank : false
										}]
							}, {
								xtype : 'fieldset',
								title : '本金',
								items : [{
									xtype : 'radiogroup',
									columns : 2,
									vertical : true,
									items : [{
										boxLabel : '入帐',
										name : me._prefix + 'inout',
										inputValue : 0,
										checked : true,
										listeners : {
											change : function(radio, newValue) {
												if (newValue) {
													radio
															.up("panel[title='本金']")
															.down("bfj_acct")
															.setFieldLabel("入帐帐号");
												} else {
													radio
															.up("panel[title='本金']")
															.down("bfj_acct")
															.setFieldLabel("出帐帐号");
												}
											}
										}
									}, {
										boxLabel : '出帐',
										name : me._prefix + 'inout',
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
									fieldLabel : '非工作日是否划付',
									items : [{
												boxLabel : '是',
												name : me._prefix
														+ 'pay4weekend',
												inputValue : true,
												checked : true
											}, {
												boxLabel : '否',
												name : me._prefix
														+ 'pay4weekend',
												inputValue : false
											}]
								}, {
									xtype : "bfj_acct",
									name : me._prefix + "acct",
									fieldLabel : '入帐帐号',
									width : 516
										// allowBlank : false
									}, {
									xtype : "pay_cycle",
									name : me._prefix + "pay_cycle"
										// allowBlank : false
									}, {
									xtype : "textfield",
									name : me._prefix + "delay",
									fieldLabel : '划付延迟（天）'
										// allowBlank : false
									}]
							}]
				}, {
					title : "条目1",
					closable : false,
					_prefix : me._prefix + "clause_1_",
					xtype : 'bi_feeinputpanel'
				}, {
					title : "条目2",
					closable : false,
					_prefix : me._prefix + "clause_2_",
					xtype : 'bi_feeinputpanel'
				}, {
					title : "条目3",
					closable : false,
					_prefix : me._prefix + "clause_3_",
					xtype : 'bi_feeinputpanel'
				}, {
					title : "条目4",
					closable : false,
					_prefix : me._prefix + "clause_4_",
					xtype : 'bi_feeinputpanel'
				}, {
					title : "条目5",
					closable : false,
					_prefix : me._prefix + "clause_5_",
					xtype : 'bi_feeinputpanel'
				}];
				me.items = items;
				this.callParent(arguments);
			}
		});