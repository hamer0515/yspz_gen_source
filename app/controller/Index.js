Ext.define('yspz_gen.controller.Index', {
			extend : 'Ext.app.Controller',
			views : ['West', 'North', 'South', 'Center', 'Panel',
					'component.plugins.PageComboResizer', 'file.badlist',
					'component.MyStore', 'component.QueryForm', 'task.gen',
					'task.list', 'task.gsum', 'component.base.ComboBox',
					'component.base.CheckBoxGroupSingle', 'component.Books',
					'component.Set', 'component.Validation', 'component.Line',
					'component.JournalEntry', 'component.calcValue',
					'component.Preprocess', 'yspz.edit', 'yspz.input',
					'component.DataType', 'component.pay_cycle',
					'component.bfj_acct', 'component.yspz', 'component.rule',
					'yspz_sum.query', 'bi.BiBrowser', 'bi.InfoPanel',
					'bi.List', 'bi.BiPanel', 'bi.ProtoPanel',
					'bi.DeptAddPanel', 'bi.BiAddPanel', 'bi.ProtoAddPanel',
					'bi.RuleInputPanel', 'bi.FeeInputPanel',
					'component.bfj_acct'],
			stores : ['CBase', 'FStatus']
		});