Ext.define("yspz_gen.controller.Index", {
			extend : "Ext.app.Controller",
			views : ["West", "North", "South", "Center", "Panel",
					"component.plugins.PageComboResizer", "component.MyStore",
					"component.base.PagingInfo", "component.QueryForm",
					"task.gen", "task.list", "task.gsum",
					"component.base.ComboBox",
					"component.base.CheckBoxGroupSingle", "component.Books",
					"component.Set", "component.Validation", "component.Line",
					"component.JournalEntry", "component.calcValue",
					"component.Preprocess", "component.acct_status",
					"yspz.list", "yspz.input", "yspz.edit",
					"component.DataType", "component.pay_cycle",
					"component.bfj_acct", "component.yspz", "component.rule",
					"component.bank", "yspz_sum.query", "bi.BiBrowser",
					"bi.InfoPanel", "bi.List", "bi.BiPanel", "bi.ProtoPanel",
					"bi.DeptAddPanel", "bi.BiAddPanel", "bi.ProtoAddPanel",
					"bi.RuleInputPanel", "bi.FeeInputPanel",
					"component.bfj_acct", "baobiao.task.list",
					"baobiao.task.add", "baobiao.task.edit",
					"baobiao.task.source", "zjdz.task.gen", "zjdz.task.reset",
					"zjdz.task.list", "zjdz.task.dz", "zjdz.task.adjust",
					"task.badlist"],
			stores : ["CBase", "FStatus", "CalcValue"]
		});