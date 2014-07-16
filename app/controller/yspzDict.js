Ext.define('yspz_gen.controller.yspzDict', {
			extend : 'Ext.app.Controller',
			views : ['component.yspzDict'],

			init : function() {
				this.control({
							'treepanel' : {
								checkchange : this.check
							},
							'routes' : {
								setChangedValue : this.setValues
							},
							'checkbox[action=selectAll]' : {
								change : this.selectAll
							}
						});
			},
			setValues : function(arr) {
				var routes = Ext.getCmp('routes');
				var root = routes.getRootNode();
				this.select(root.childNodes, arr);
			},
			select : function(node, arr) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						this.select(node[i]);
					}
				} else {
					if (Ext.Array.contains(arr, node.data.route_id)) {
						node.set('checked', true);
					}
					if (node.childNodes.length > 0) {
						this.select(node.childNodes);
					}
				}
			},
			selectAll : function(element, newValue) {
				// if (!element._ssEvent) {
				var routes = Ext.getCmp('routes');
				var root = routes.getRootNode();
				this.changeChecked(root, newValue);
				// }
				// element._ssEvent = false;
			},
			check : function(node, checked) {
				this.checkChange(node, checked);
				var routes = Ext.getCmp('routes');
				var checkbox = routes.up("panel")
						.down("checkbox[boxLabel=\"全选\"]");
				if (this.checkSelectAll(routes.getRootNode())) {
					// checkbox._ssEvent = true;
					// routes.suspendEvent("checkchange");
					checkbox.setRawValue(true);
					checkbox.mixins.field.value = true;
					// routes.resumeEvent("checkchange");
				} else {
					// checkbox._ssEvent = true;
					// routes.suspendEvent("checkchange");
					checkbox.setRawValue(false);
					checkbox.mixins.field.value = false;;
					// routes.resumeEvent("checkchange");
				}
			},
			checkChange : function(node, checked) {
				if (node.childNodes.length > 0) {
					this.changeChecked(node.childNodes, checked);
				}
				if (node.parentNode.data.checked != null) {
					this.changeCheckedUp(node.parentNode, checked);
				}
			},
			checkSelectAll : function(node) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						if (!this.checkSelectAll(node[i])) {
							return false;
						}
					}
				} else {
					if (node.data.checked !== null
							&& node.data.checked === false) {
						return false;
					}
					if (node.childNodes.length > 0) {
						if (!this.checkSelectAll(node.childNodes)) {
							return false;
						}
					}
				}
				return true;
			},
			changeChecked : function(node, checked) {
				if (Ext.isArray(node)) {
					for (var i = node.length - 1; i >= 0; i--) {
						this.changeChecked(node[i], checked);
					}
				} else {
					if (node.data.checked != null) {
						node.set('checked', checked);
					}
					if (node.childNodes.length > 0) {
						this.changeChecked(node.childNodes, checked);
					}
				}
			},
			changeCheckedUp : function(node, checked) {
				if (checked == false) {
					var re = node.childNodes.every(function(element, index,
									array) {
								return !element.data.checked;
							});
					if (re) {
						node.set('checked', checked);
					}
				} else {
					node.set('checked', checked);
				}
				if (node.parentNode.data.checked != null) {
					this.changeCheckedUp(node.parentNode, checked);
				}
			}
		});