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
	asyncRequest : function(url, params, successCallback, failCallback,
			success, panel) {
		panel && !panel.getEl().isMasked() && panel.getEl().mask("操作中...");
		Ext.Ajax.request({
					// async : false,
					url : url,
					params : params,
					_panel : panel,
					success : function(response, opts) {
						// panel && panel.getEl().isMasked()
						// && panel.getEl().unmask();
						if (success) {
							success.call(success, response, opts);
						} else {
							var res = Ext.decode(response.responseText);
							if (res.success) {
								Ext.info('请求提交成功', successCallback);
							} else {
								Ext.error('请求提交失败:' + res.msg, failCallback);
							}
						}
					},
					// failure : function() {
					// panel && panel.getEl().isMasked()
					// && panel.getEl().unmask();
					// },
					callback : function() {
						panel && panel.getEl().isMasked()
								&& panel.getEl().unmask();
					},
					scope : panel,
					timeout : 14400000
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
	warn : function(msg, callback) {
		Ext.Msg.show({
					title : "警告",
					msg : msg,
					buttons : Ext.Msg.YES,
					icon : Ext.Msg.WARNING,
					fn : callback
				});
	},
	error : function(msg, callback) {
		Ext.Msg.show({
					title : "错误",
					msg : msg,
					buttons : Ext.Msg.YES,
					icon : Ext.Msg.ERROR,
					fn : callback
				});
	},
	urls : {
		GET_ZJDZ_TASK_ADJUST : "zjdz/task_adjust", // 获得资金对账调整数据
		GET_ZJDZ_TASK_DZ : "cash/cashAction_getCashData.action", // 获得资金对账的数据
		GET_ZJDZ_TASK_LIST : "CashReconciliationTaskGenerateActionImpl_eQuery.action", // 获得资金对账任务列表
		GET_ZJDZ_TASK_LIST_FOR_RESET : "CashReconciliationTaskGenerateActionImpl_mQuery.action", // 获得资金对账任务列表-资金对账任务修改
		GET_ZJDZ_TASK_GEN : "CashReconciliationTaskGenerateActionImpl_generateQuery.action",// 获得资金对账任务生成界面银行帐号列表
		GET_LAST_ZJDZ_DATE : "CashReconciliationTaskGenerateActionImpl_getLastMaxDate.action", // 获得最近资金对账任务生成日期
		GET_ALL_BAOBIAO_TASK : "task_selectTaskByID.action",// "baobiao/task",//
		// 获得报表模块的任务列表
		GET_SUM_RESULT : "summary/summary_getSummaryDetailData.action",// 汇总结果查询
		GET_ALL_CREDENTIAL_TYPES : "credential/credentialAction_getCredentialComboxTree.action",// 获得原始凭证类别
		GET_ALL_ENTRIES : "credential/checking_findAllChecking.action", // 获得所有核算项
		GET_ALL_BOOKS : "credential/book_findAllBookBySuit.action",// 获得所有的科目信息（用于科目的擦combo控件）
		GET_CREDENTIAL_TREE : "credential/credentialAction_getCredentialTree.action", // 获取原始凭证树型控件数据(支持多选)
		GET_CREDENTIAL_TREE_UNCHECKED : "credential/credentialAction_getCredentialTreeUnchecked.action", // 获取原始凭证树型控件数据(不支持多选)
		GET_ALL_BAD_RECORDS : "credential/credentialAction_getUpdateCredential.action",// 获得相关任务的bad记录
		GET_ALL_TASK_STATUS : "credential/credentialAction_getCredentialStatusList.action",// 获得所有导入任务的状态(查询导入任务界面发起)
		GET_YSPZ_INFO_AND_RULES : "summary/summary_querySummaryRule.action",// 获得原始凭证信息及所有汇总方案
		GET_BAOBIAO_BANK_STATUS_BY_TASK : "taskaccount_selectTaskAccountByID.action",// "baobiao/bank_status_by_task",//
		// 获得银行帐号的状态，根据任务
		ADD_YSPZ_RULE : "summary/summary_createSummaryRule.action",// 添加原始凭证汇总方案
		ADD_BAOBIAO_TASK : "task_createNewTask.action",// "baobiao/task_add",//
		// 添加报表任务
		GET_RULE_INFO : "summary/summary_getSummaryRule.action",// 获得汇总方案信息
		QUERY_TASK_STATUS : "credential/credentialAction_getCredentialStatus.action", // 查询原始凭证状态(用于生成导入任务的查询按钮)
		SUBMIT_ZJDZ_TASK_DZ : "zjdz/task_dz",// 提交资金对账任务改写
		SUBMIT_ZJDZ_TASK_RESET : "CashReconciliationTaskGenerateActionImpl_mUpdate.action",// 提交资金对账任务改写
		SUBMIT_ZJDZ_TASK : "CashReconciliationTaskGenerateActionImpl_generateTask.action",// 提交资金对账任务生成
		SUBMIT_YSPZ_SUMMARY : "summary/summary_sumCredential.action",// 提交原始凭证汇总生成方案
		SUBMIT_FIXED_BAD_RECORD : "credential/credentialAction_updateCredential.action",// 提交更改过的bad记录
		SUBMIT_TASK_START_FOR_CHECK : "credential/credentialAction_optionCredential.action",// 提交原始凭证导入任务，开始校验
		SUBMIT_BAOBIAO_TASK_READY_OR_NOT : "import_readyOrnot.action",// 提交报表数据源准备情况
		SUBMIT_BAOBIAO_IMPORT : "import_importData.action",// 提交报表导入操作
		SUBMIT_BAOBIAO_CALCULATE : "calculate/calc_calculate",// 提交报表计算操作
		SUBMIT_BAOBIAO_CHECK : "check/check_check.action",// 提交报表人工校验操作
		SUBMIT_BAOBIAO_MAKE : "repo/repo_report.action",// 提交报表报备操作
		SUBMIT_CREDENTIAL_META : "credential/meta_createCredential.action",// 提交原始凭证元数据
		SUBMIT_EXPORT_TO_ORACLE : "summary/summary_expSumDetailData2Oracle.action"// 汇总查询结果导出到oracle
	}
});