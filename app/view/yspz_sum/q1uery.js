Ext.define('yspz_gen.view.yspz_sum.query', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.sum_query',
	border : true,

	initComponent : function() {
		var me = this, formPanel, gridPanel, store;
		formPanel = Ext.create('Ext.form.Panel', {
			// title : 'Simple Form',
			bodyPadding : 5,
			// width : 350,

			// The form will submit an AJAX request to this URL when
			// submitted
			url : 'save-form.php',

			// Fields will be arranged vertically, stretched to full
			// width
			layout : 'anchor',
			defaults : {
				anchor : '100%'
			},

			// The fields
			defaultType : 'textfield',
			items : [{
						fieldLabel : '单据',
						xtype : 'treepicker',
						name : 'credentialCode',
						displayField : 'text',
						valueField : 'credentialCode',
						store : new Ext.data.TreeStore({
									fields : ['credentialCode', 'text'],
									proxy : {
										type : 'ajax',
										url : Ext.urls.GET_CREDENTIAL_TREE_UNCHECKED
									},
									root : {
										expanded : true,
										credentialCode : '',
										text : '所有单据'
									},
									autoLoad : true
								}),
						allowBlank : false
					}],

			// Reset and Submit buttons
			buttons : [{
						text : 'Reset',
						handler : function() {
							this.up('form').getForm().reset();
						}
					}, {
						text : 'Submit',
						formBind : true, // only enabled once the
						// form is valid
						disabled : true,
						handler : function() {
							var form = this.up('form').getForm();
							if (form.isValid()) {
								form.submit({
											success : function(form, action) {
												Ext.Msg.alert('Success',
														action.result.msg);
											},
											failure : function(form, action) {
												Ext.Msg.alert('Failed',
														action.result.msg);
											}
										});
							}
						}
					}]
		});
		// store = Ext.create('widget.mystore', {
		// fields : ["business_date", "fch", "business_type", "goods_type",
		// "success_money"],
		// autoLoad : true,
		// proxy : {
		// type : 'ajax',
		// api : {
		// read :
		// 'credential/CredentialServlet.action?method=getSumMoneyDetail&code=F0002&suitCode=fhyd'
		// },
		// reader : {
		// type : 'json',
		// root : 'data',
		// totalProperty : 'totalCount',
		// successProperty : 'success'
		// }
		// }
		// });
		// me.columns = [{
		// text : "业务处理日期",
		// dataIndex : 'business_date',
		// flex : 1
		// }, {
		// text : "销卡通道编号",
		// dataIndex : 'fch',
		// flex : 1
		// }, {
		// text : "业务类型",
		// dataIndex : 'business_type',
		// flex : 1
		// }, {
		// text : "货物类型",
		// dataIndex : 'goods_type',
		// flex : 1
		// }, {
		// text : "交易勾兑成功金额",
		// dataIndex : 'success_money',
		// renderer : function(value) {
		// if (value == undefined)
		// return 0.00;
		// return Ext.util.Format
		// .number(parseInt(value), '0,0.00');
		// },
		// flex : 1
		// }];
		// me.dockedItems = [{
		// xtype : 'pagingtoolbar',
		// store : store,
		// dock : 'bottom'
		// }];
		me.items = [formPanel, gridPanel];
		me.callParent(arguments);
	}
});