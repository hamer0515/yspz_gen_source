Ext.define('yspz_gen.controller.Index', {
			extend : 'Ext.app.Controller',
			views : ['West',
					'North',
					'South',
					'Center',
					'Panel',
					'component.plugins.PageComboResizer',
					// 'file.goodlist',
					'file.badlist', 'component.MyStore', 'component.QueryForm',
					'task.gen', 'task.list', 'yspz.gen',
					'component.base.ComboBox', 'component.Books',
					'component.Set', 'component.Validation', 'component.Line',
					'component.JournalEntry', 'yspz.edit',
					'component.DataType', 'yspz_sum.f0002'],
			stores : ['CBase', 'FStatus']
		});