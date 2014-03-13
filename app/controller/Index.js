Ext.define('demo.controller.Index', {
			extend : 'Ext.app.Controller',
			views : ['West', 'North', 'South', 'Center', 'Panel',
					'component.plugins.PageComboResizer',
					// 'file.goodlist',
					'file.badlist', 'component.MyStore', 'component.QueryForm',
					'task.gen', 'task.list'],
			stores : ['CBase', 'FStatus']
		});