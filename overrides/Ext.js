Ext.define('overrides.Ext', {
	override : 'Ext',
	version : 'v0.1',
	downloadURL : function(url) {
		var hiddenIFrameID = 'hiddenDownloader', iframe = document
				.getElementById(hiddenIFrameID);
		if (iframe === null) {
			iframe = document.createElement('iframe');
			iframe.id = hiddenIFrameID;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		iframe.src = url;
	},
	_render : function(value, meta, record, rowIndex, colIndex, store, view, /* 数据集 */
			ds) {
		var index = ds.findExact('id', value);
		if (index == -1) {
			index = ds.findExact('id', value + '');
		}
		if (index == -1) {
			meta.style = 'color:red';
		}
		return index == -1 ? '无效的数据(' + value + ')' : ds.getAt(index).data.name;
	},
	asyncRequest : function(url, params, successCallback, failCallback, success) {
		Ext.Ajax.request({
					async : false,
					url : url,
					params : params,
					success : success || function(response, opts) {
						var res = Ext.decode(response.responseText);
						if (res.success) {
							Ext.info('请求提交成功', successCallback);
						} else {
							Ext.error('请求提交失败:' + res.msg, failCallback);
						}
					}
				});
	},
	info : function(msg, callback) {
		Ext.Msg.show({
					title : "消息",
					msg : msg,
					buttons : Ext.Msg.YES,
					icon : Ext.Msg.INFO,
					fn : callback
				});
	},
	error : function(msg, callback) {
		Ext.Msg.show({
					title : "警告",
					msg : msg,
					buttons : Ext.Msg.YES,
					icon : Ext.Msg.ERROR,
					fn : callback
				});
	},
	urls : {
		GET_ALL_CREDENTIAL_TYPES : "credential/credentialAction_getCredentialComboxTree.action",// 获得原始凭证类别
		GET_ALL_ENTRIES : "credential/checking_findAllChecking.action", // 获得所有核算项
		GET_ALL_BOOKS : "credential/book_findAllBookBySuit.action",// 获得所有的科目信息（用于科目的擦combo控件）
		GET_CREDENTIAL_TREE : "credential/credentialAction_getCredentialTree.action", // 获取原始凭证树型控件数据(支持多选)
		GET_CREDENTIAL_TREE_UNCHECKED : "credential/credentialAction_getCredentialTreeUnchecked.action", // 获取原始凭证树型控件数据(不支持多选)
		GET_ALL_BAD_RECORDS : "credential/credentialAction_getUpdateCredential.action",// 获得相关任务的bad记录
		GET_ALL_TASK_STATUS : "credential/credentialAction_getCredentialStatusList.action",// 获得所有导入任务的状态(查询导入任务界面发起)
		GET_YSPZ_INFO_AND_RULES : "summary/summary_querySummaryRule.action",// 获得原始凭证信息及所有汇总方案
		ADD_YSPZ_RULE : "summary/summary_createSummaryRule.action",// 添加原始凭证汇总方案
		GET_RULE_INFO : "summary/summary_getSummaryRule.action",// 获得汇总方案信息
		QUERY_TASK_STATUS : "credential/credentialAction_getCredentialStatus.action", // 查询原始凭证状态(用于生成导入任务的查询按钮)
		SUBMIT_YSPZ_SUMMARY : "summary/summary_sumCredential.action",// 提交原始凭证汇总生成方案
		SUBMIT_FIXED_BAD_RECORD : "credential/credentialAction_updateCredential.action",// 提交更改过的bad记录
		SUBMIT_TASK_START_FOR_CHECK : "credential/credentialAction_optionCredential.action",// 提交原始凭证导入任务，开始校验
		SUBMIT_CREDENTIAL_META : "credential/meta_createCredential.action"// 提交原始凭证元数据
	}
});