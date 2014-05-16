Ext.define('yspz_gen.view.bi.ProtoAddPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.proto_add',
	border : false,
	initComponent : function() {
		var me = this;
		me.items = {
			xtype : 'form',
			bodyPadding : 5,
			layout : 'anchor',
			url : 'bi/proto_add',
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			items : [{
						xtype : "fieldset",
						title : "生效区间",
						items : [{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									items : [{
												xtype : 'hiddenfield',
												name : 'dept',
												value : me._deptCode
											}, {
												xtype : 'hiddenfield',
												name : 'bi',
												value : me._biCode
											}, {
												xtype : 'datefield',
												fieldLabel : "协议起始时间",
												name : 'date_from',
												allowBlank : false
											}, {
												xtype : 'datefield',
												margin : '0 0 0 10',
												fieldLabel : "协议终止时间",
												name : 'date_to',
												allowBlank : false
											}]
								}]
					}, {
						xtype : 'tabpanel',
						_count : 1,
						height : 400,
						tabBar : {
							items : [{
								text : '添加规则组',
								closable : false,
								listeners : {
									click : function() {
										this.up("tabpanel").add({
											closable : true,
											xtype : 'bi_ruleinputpanel',
											_prefix : "rgroup_"
													+ this.up("tabpanel")._count
													+ "_",
											title : "规则组"
													+ this.up("tabpanel")._count++
										}).show();
									},
									afterrender : function() {
										this.fireEvent('click');
									}
								}
							}]
						}
					}],
			buttons : [{
				text : '添加',
				handler : function() {
					var form = this.up('panel').getForm();
					if (form.isValid()) {
						var tabpanel = this.up('panel').down('tabpanel'), groups = [];
						tabpanel.items.items.forEach(function(element, index,
										array) {
									groups.push(element._prefix);
								});
						var params = me.genValues(form.getValues(), groups);
						console.log(params);
						// console.log(params);
						// form.submit({
						// success : function(form, action) {
						// Ext.info('消息', "添加部门成功",
						// Ext.Msg.YES, function() {
						// win.close();
						// win._store.reload();
						// this.close();
						// });
						// },
						// failure : function(form, action) {
						// Ext
						// .info(
						// '消息',
						// "部门添加失败："
						// + action.result.msg,
						// Ext.Msg.YES,
						// function() {
						// win.close();
						// this.close();
						// });
						// }
						// });
					}
				}
			}]
		};
		this.callParent(arguments);
	},
	genValues : function(values, groups) {
		console.log(values);
		var data = {
			dept : values.dept,
			bi : values.bi,
			date_from : values.date_from,
			date_to : values.date_to,
			groups : []
		};
		for (var i in groups) {
			var g = groups[i], group = {
				bj : {
					matcher : values[g + "matcher"],
					inout : values[g + "inout"],
					pay4weekend : values[g + "pay4weekend"],
					acct : values[g + "acct"],
					pay_cycle : values[g + "pay_cycle"],
					delay : values[g + "delay"]
				}
			};
			for (var j = 1; j < 6; j++) {
				group["clause_" + j] = this.genClause(values, g, "clause_" + j
								+ "_");
			}
			data.groups.push(group);
		}
		return data;
	},
	genClause : function(values, group, clause) {
		var data = {
			fee_inout : values[group + clause + "fee_inout"],
			confirm_mode : values[group + clause + "confirm_mode"],
			max : values[group + clause + "max"],
			min : values[group + clause + "min"],
			fields : []
		}, fieldsText = '计算法则', count = [];
		// 直接确认
		if (data.confirm_mode == 0) {
			data.cwwf = values[group + clause + "cwwf"];
			// 财务外付
			if (data.cwwf) {

			}
			// 非财务外付
			else {
				data.acct = values[group + clause + "acct"];
				data.pay_cycle = values[group + clause + "pay_cycle"];
				data.delay = values[group + clause + "delay"];
				data.pay4weekend = values[group + clause + "pay4weekend"];
			}
		}
		// 周期确认
		else if (data.confirm_mode == 1) {
			fieldsText = '暂估计算法则';
			data.confirm_rule_id = values[group + clause + "confirm_rule_id"];
		}
		this.down("fieldset[title='" + fieldsText + "']").items.items.forEach(
				function(element, index, array) {
					if (element._count) {
						count.push(element._count);
					}
				});
		for (var i in count) {
			data.fields.push({
						from : values[group + clause + "value_from_" + count[i]],
						to : values[group + clause + "value_to_" + count[i]],
						mode : values[group + clause + "mode_" + count[i]],
						rate : values[group + clause + "rate_" + count[i]]
					})
		}
		return data;
	}
});