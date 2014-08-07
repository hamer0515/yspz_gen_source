Ext.define("yspz_gen.controller.Index", {
			extend : "Ext.app.Controller",
			views : ["West", "North", "South", "Center", "Panel",
					"component.base.PagingInfo", "component.QueryForm",
					"component.base.ComboBox",
					"component.base.CheckBoxGroupSingle", "component.MyStore",
					"component.Validation",
					"component.plugins.PageComboResizer", "component.Books",
					"component.Set", "component.Line", "component.calcValue",
					"component.Preprocess", "component.acct_status",
					"component.DataType",
					"component.pay_cycle",
					"component.bfj_acct",
					"component.yspz",
					"component.rule",
					"component.bank",
					"component.bfj_acct",
					// 银行信息管理
					"bi.BiBrowser", "bi.InfoPanel", "bi.List", "bi.BiPanel",
					"bi.ProtoPanel", "bi.DeptAddPanel", "bi.BiAddPanel",
					"bi.ProtoAddPanel",
					"bi.RuleInputPanel",
					"bi.FeeInputPanel",
					// 报表模块
					"baobiao.task.list", "baobiao.task.add",
					"baobiao.task.edit", "baobiao.task.source",
					// 资金对账模块
					"zjdz.task.gen", "zjdz.task.reset", "zjdz.task.list",
					"zjdz.task.dz", "zjdz.task.adjust",
					// 汇总查询
					"yspz_sum.query",
					// 单据生成模块
					"yspz.list", "yspz.input", "yspz.edit",
					// 任务导入模块
					"task.gen", "task.list", "task.gsum", "task.badlist"],
			stores : ["CBase", "FStatus", "CalcValue"]
		});