Ext.define('yspz_gen.controller.Index', {
			extend : 'Ext.app.Controller',
			views : ['West', 'North', 'South', 'Center', 'Panel',
					'component.plugins.PageComboResizer', 'file.badlist',
					'component.MyStore', 'component.QueryForm', 'task.gen',
					'task.list', 'task.gsum', 'component.base.ComboBox',
					'component.base.CheckBoxGroupSingle', 'component.Books',
					'component.Set', 'component.Validation', 'component.Line',
					'component.JournalEntry', 'component.calcValue',
					'component.Preprocess', 'yspz.edit', 'yspz.gen',
					'yspz.input', 'component.DataType', 'yspz_sum.f0002',
					'bi.BiBrowser', 'bi.InfoPanel', 'bi.List'],
			stores : ['CBase', 'FStatus']
		});