Ext.define('overrides.Connection', {
			override : 'Ext.data.Connection',
			/**
			 * To be called when the request has come back from the server
			 * 
			 * @private
			 * @param {Object}
			 *            request
			 * @return {Object} The response
			 */
			onComplete : function(request, xdrResult) {
				var me = this, options = request.options, result, success, response;

				try {
					result = me.parseStatus(request.xhr.status);
				} catch (e) {
					// in some browsers we can't access the status if the
					// readyState is not 4, so the request has failed
					result = {
						success : false,
						isException : false
					};

				}
				success = me.isXdr ? xdrResult : result.success;

				if (success) {
					response = me.createResponse(request);
					me.fireEvent('requestcomplete', me, response, options);
					if (Ext.decode(response.responseText).success == 'forbidden') {
						Ext.MessageBox.show({
									title : '警告',
									msg : '无权访问:' + options.url,
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.WARNING
								});
					} else {
						Ext.callback(options.success, options.scope, [response,
										options]);
					}
				} else {
					if (result.isException || request.aborted
							|| request.timedout) {
						response = me.createException(request);
					} else {
						response = me.createResponse(request);
					}
					me.fireEvent('requestexception', me, response, options);
					if (response.status == 403) {
						Ext.MessageBox.show({
									title : '错误',
									msg : '登录超时，请重新登录',
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR,
									fn : function() {
											var viewport = Ext
													.getCmp('zixweb_viewport');
											viewport.removeAll();
											viewport.add({
														xtype : 'loginform'
													});
									}
								});
					} else if (response.status != 200) {
						Ext.MessageBox.show({
									title : '错误',
									msg : response.status + ' '
											+ response.statusText,
									buttons : Ext.Msg.YES,
									icon : Ext.Msg.ERROR
								});
					} else {
						Ext.callback(options.failure, options.scope, [response,
										options]);
					}

				}
				Ext.callback(options.callback, options.scope, [options,
								success, response]);
				delete me.requests[request.id];
				return response;
			}
		});