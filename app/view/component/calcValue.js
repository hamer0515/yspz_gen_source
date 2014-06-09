Ext.define('yspz_gen.view.component.calcValue', {
	extend : 'yspz_gen.view.component.base.ComboBox',
	alias : 'widget.calcvalue',
	// name : '_type',
	_fields : ["code", "name"],
	valueField : 'code',
	_storeName : 'CalcValue'
		// _url : "common/commonQueryAction_queryFeeDict.action",
		// initComponent : function() {
		// var me = this, data = [];
		// Ext.data.StoreManager.lookup('CalcValue').each(function(rec) {
		// data.push(rec.data);
		// });
		// me._data = data;
		// me.callParent(arguments);
		// }
		// _data : [{
		// "code" : "[RES_BI]",
		// "name" : "[RES_BI]"
		// }, {
		// "code" : "[RES_BJ][RES_BJ_ACCT]",
		// "name" : "[RES_BJ][RES_BJ_ACCT]"
		// }, {
		// "code" : "[RES_BJ][RES_BJ_IN]",
		// "name" : "[RES_BJ][RES_BJ_IN]"
		// }, {
		// "code" : "[RES_BFEE][0][RES_BFEE_BFJ_ACCT]",
		// "name" : "[RES_BFEE][0][RES_BFEE_BFJ_ACCT]"
		// }, {
		// "code" : "[RES_BFEE][0][RES_BFEE_BFJ_OUT]",
		// "name" : "[RES_BFEE][0][RES_BFEE_BFJ_OUT]"
		// }, {
		// "code" : "[RES_BFEE][0][RES_BFEE_BFJ_O]",
		// "name" : "[RES_BFEE][0][RES_BFEE_BFJ_O]"
		// }, {
		// "code" : "[RES_BFEE][1][RES_BFEE_BFJ_ACCT]",
		// "name" : "[RES_BFEE][1][RES_BFEE_BFJ_ACCT]"
		// }, {
		// "code" : "[RES_BFEE][1][RES_BFEE_BFJ_OUT]",
		// "name" : "[RES_BFEE][1][RES_BFEE_BFJ_OUT]"
		// }, {
		// "code" : "[RES_BFEE][1][RES_BFEE_BFJ_O]",
		// "name" : "[RES_BFEE][1][RES_BFEE_BFJ_O]"
		// }, {
		// "code" : "[RES_BFEE][2][RES_BFEE_BFJ_ACCT]",
		// "name" : "[RES_BFEE][2][RES_BFEE_BFJ_ACCT]"
		// }, {
		// "code" : "[RES_BFEE][2][RES_BFEE_BFJ_OUT]",
		// "name" : "[RES_BFEE][2][RES_BFEE_BFJ_OUT]"
		// }, {
		// "code" : "[RES_BFEE][2][RES_BFEE_BFJ_O]",
		// "name" : "[RES_BFEE][2][RES_BFEE_BFJ_O]"
		// }, {
		// "code" : "[RES_PBFEE][0][RES_PBFEE_FP_code]",
		// "name" : "[RES_PBFEE][0][RES_PBFEE_FP_code]"
		// }, {
		// "code" : "[RES_PBFEE][1][RES_PBFEE_FP_code]",
		// "name" : "[RES_PBFEE][1][RES_PBFEE_FP_code]"
		// }, {
		// "code" : "[RES_PBFEE][2][RES_PBFEE_FP_code]",
		// "name" : "[RES_PBFEE][2][RES_PBFEE_FP_code]"
		// }, {
		// "code" : "[RES_BFEE][0][RES_BFEE_CWWF_O]",
		// "name" : "[RES_BFEE][0][RES_BFEE_CWWF_O]"
		// }, {
		// "code" : "[RES_BFEE][1][RES_BFEE_CWWF_O]",
		// "name" : "[RES_BFEE][1][RES_BFEE_CWWF_O]"
		// }, {
		// "code" : "[RES_BFEE][2][RES_BFEE_CWWF_O]",
		// "name" : "[RES_BFEE][2][RES_BFEE_CWWF_O]"
		// }, {
		// "code" : "[RES_PBFEE][0][RES_PBFEE_ZG_O]",
		// "name" : "[RES_PBFEE][0][RES_PBFEE_ZG_O]"
		// }, {
		// "code" : "[RES_PBFEE][1][RES_PBFEE_ZG_O]",
		// "name" : "[RES_PBFEE][1][RES_PBFEE_ZG_O]"
		// }, {
		// "code" : "[RES_PBFEE][2][RES_PBFEE_ZG_O]",
		// "name" : "[RES_PBFEE][2][RES_PBFEE_ZG_O]"
		// }, {
		// "code" : "[RES_BFEE][0][RES_BFEE_CWWF_I]",
		// "name" : "[RES_BFEE][0][RES_BFEE_CWWF_I]"
		// }]
	});
