Ext.define('yspz_gen.view.component.Line', {
			extend : 'yspz_gen.view.component.base.ComboBox',
			alias : 'widget.lines',
			name : '_line',
			fieldLabel : '行业线',
			_url : 'suit_findAllTradeBySuit.action',
			_disAutoLoad : true
		});
