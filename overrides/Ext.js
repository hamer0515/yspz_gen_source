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
	asyncRequest : function(url, params, success) {
		Ext.Ajax.request({
					async : false,
					url : url,
					params : params,
					success : success
				});
	},
	info : function(title, msg, button, fn) {
		Ext.Msg.show({
					title : title,
					msg : msg,
					buttons : button,
					icon : Ext.Msg.INFO,
					fn : fn
				});
	},
	error : function(title, msg, button, fn) {
		Ext.Msg.show({
					title : title,
					msg : msg,
					buttons : button,
					icon : Ext.Msg.ERROR,
					fn : fn
				});
	}
});