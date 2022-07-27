var Path = cc.Class({
	name: "Path",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		PathorText: {
			default: "",
			displayName: "图片路径或文本"
		}
	}
});
var AtlasPath = cc.Class({
	name: "AtlasPath",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		PathorText: {
			default: "",
			displayName: "图片路径或文本"
		},
		posId: {
			default: "",
			displayName: "位置"
		}
	}
});
var text2text = cc.Class({
	name: "text2text",
	properties: {
		lanName: {
			default: "",
			displayName: "中文语言"
		},
		Text: {
			default: "",
			displayName: "翻译语言"
		}
	}
});
var changPathandText = cc.Class({
	name: "changPathandText",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		Texts: {
			default: [],
			type: text2text,
			displayName: "文本"
		},
		path: {
			default: "",
			displayName: "资源路径"
		}
	}
});
var Color = cc.Class({
	name: "Color",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		Color: {
			default: new cc.Color(),
			displayName: "节点颜色"
		}
	}
});
var Pos = cc.Class({
	name: "Pos",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		Pos: {
			default: new cc.Vec2(),
			displayName: "位置"
		}
	}
});
var size = cc.Class({
	name: "size",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		size: {
			default: new cc.Vec2(),
			displayName: "大小"
		}
	}
});
var Rot = cc.Class({

	name: "Rot",
	properties: {
		lanName: {
			default: "",
			displayName: "语言"
		},
		Rot: {
			default: 0,
			displayName: "角度"
		}
	}
});
var multilingual = cc.Class({
	extends: cc.Component,
	properties: {
		lanId: {
			default: 0,
			range: [0, 9, 1], // 限制取值范围0~9，步进1
			displayName: "资源类型",
			tooltip: "0图片 1文字 2字体文件 3图集文件 4节点属性 5动画 6根据图片名 7只加载资源 8跟换图集资源且更改文本 9按钮图片替换",
			notify: function () {
				//当这里属性被赋值时触发时，动态修改下面visible属性。
				this._showCombinePropId = this.lanId;
			},
		},
		_showCombinePropId: 0,
		gameName: {
			default: "",
			displayName: "资源组名",
			tooltip: "某种语言的根目录",
			visible: function () {
				return this._showCombinePropId == 7;
			}
		},
		default_path: {
			default: "",
			displayName: "默认路径",
			tooltip: "默认路径（图片路径都一样只根目录不同就可以用）",
			visible: function () {
				return this._showCombinePropId != 7 && this._showCombinePropId != 4 && this._showCombinePropId != 1 && this._showCombinePropId != 3;
			}
		},
		Str_supplement: {
			default: "",
			displayName: "补充字符",
			tooltip: "用于替换带#文本，用于空格",
			visible: function () {
				return this._showCombinePropId == 1;
			}
		},
		ResType: {
			default: 0,
			displayName: "是否释放",
			tooltip: "是否释放该节点上的资源",
			visible: function () {
				return this._showCombinePropId != 7 && this._showCombinePropId != 4 && this._showCombinePropId != 1;
			}
		},
		node_cb: {
			default: [],
			type: cc.Node,
			displayName: "用于其他函数中单独调用",
			tooltip: "方便代码中调用"
		},
		lan_Path: {
			default: [],
			type: Path,
			displayName: "资源",
			tooltip: "只用于类型0,1,2,5,6,7",
			visible: function () {
				return this._showCombinePropId != 3 && this._showCombinePropId != 4 && this._showCombinePropId != 8;
			}
		},
		lan_AtlasPath: {
			default: [],
			type: AtlasPath,
			displayName: "图集资源",
			tooltip: "只用于类型3",
			visible: function () {
				return this._showCombinePropId == 3;
			}
		},
		lan_changPathandText: {
			default: [],
			type: changPathandText,
			displayName: "修改字体资源和文字",
			tooltip: "只用于类型1，2",
			visible: function () {
				return this._showCombinePropId == 1 || this._showCombinePropId == 8 || this._showCombinePropId == 2;
			}
		},
		Combine: {
			default: false,
			displayName: "是否修改节点属性",
			notify: function () {
				this._showNode = this.Combine; //or false
			}
		},
		_showNode: false,
		lan_Color: {
			default: [],
			type: Color,
			displayName: "颜色",
			visible: function () {
				if (!this._showNode) {
					this.lan_Color = [];
				}
				return this._showNode;
			}
		},
		lan_Pos: {
			default: [],
			type: Pos,
			displayName: "位置",
			visible: function () {
				if (!this._showNode) {
					this.lan_Pos = [];
				}
				return this._showNode;
			}
		},
		lan_Size: {
			default: [],
			type: size,
			displayName: "大小",
			visible: function () {
				if (!this._showNode) {
					this.lan_Size = [];
				}
				return this._showNode;
			}
		},
		lan_Rot: {
			default: [],
			type: Rot,
			displayName: "角度",
			visible: function () {
				if (!this._showNode) {
					this.lan_Rot = [];
				}
				return this._showNode;
			}
		}
	},

	// use this for initialization
	onLoad: function () {
		this.m_uuid = this.generateUUID(); //生成一个唯一Id
		if (!g.multilinguals) {
			g.multilinguals = {};
		}
		g.multilinguals[this.m_uuid] = this; //储存多语言
		//用于节点自用
		for (var i in this.node_cb) {
			if (this.node_cb[i].multilingual) {
				this.node_cb[i].multilingual.push(this);
			} else {
				this.node_cb[i].multilingual = [this];
			}
		}
		//开辟资源存储空间用于释放资源
		if (!g.multilinguals2Res) {
			g.multilinguals2Res = {};
		}
		g.multilinguals2Res[this.m_uuid] = [];
		this.m_nodeType = "zh";
		g.multilName != "zh" && this.init(g.multilName);


	},
	//切换语言类型
	init: function (type) {
		//g.configs.debugLog && console.log(this.m_uuid);
		//g.configs.debugLog && console.count("多语言调用次数");
		if (!type) {
			return;
		}
		if (type == this.m_nodeType) {
			return;
		}
		this.m_nodeType = type;
		switch (this.lanId) {
			case 0:
				//是图片
				//获得图片路径
				var path = "";
				for (var i in this.lan_Path) {
					if (this.lan_Path[i].lanName == type) {
						path = this.lan_Path[i].PathorText;
						break;
					}
				}
				//获取图片资源
				if (path != "") {
					cc.loader.loadRes("" + type + "/" + path, cc.SpriteFrame, function (err, spriteFrame) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame);
						}
						this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						this.changeNodeValue(type);
					}.bind(this));
				} else if (this.default_path != "") {
					var name = "";
					var sp = this.node.getComponent(cc.Sprite);
					sp.spriteFrame && (name = sp.spriteFrame._name);
					//默认路径
					if (name == "") {
						return;
					}
					cc.loader.loadRes("" + type + "/" + this.default_path + "/" + name, cc.SpriteFrame, function (err, spriteFrame) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame);
						}

						this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						this.changeNodeValue(type);
					}.bind(this));
				}
				break;
			case 1:
				//是文本
				var str = "";
				var text = "";
				for (var i in this.lan_changPathandText) {
					if (this.lan_changPathandText[i].lanName == type) {
						text = this.lan_changPathandText[i].Texts;
						break;
					}
				}
				if (text != "" && text.length != 0) {
					str = this.node.getComponent(cc.Label).string;
					for (var i in text) {
						if (str == text[i].lanName) {
							this.node.getComponent(cc.Label).string = text[i].Text;
							break;
						}
					}
					this.changeNodeValue(type);
				} else if (this.lan_Path.length != 0) {
					for (var i in this.lan_Path) {
						if (this.lan_Path[i].lanName == type) {
							str = this.lan_Path[i].PathorText;
							this.node.getComponent(cc.Label).string = str;
							this.changeNodeValue(type);
							break;
						}
					}
				} else {
					str = this.node.getComponent(cc.Label).string;
					this.node.getComponent(cc.Label).string = g.lan_Mgr.getLanToLan(str, this.Str_supplement);
				}

				break;
			case 2:
				//是字体文件
				//获得图片路径
				var path = "";
				for (var i in this.lan_Path) {
					if (this.lan_Path[i].lanName == type) {
						path = this.lan_Path[i].PathorText;
						break;
					}
				}
				//获取图片资源
				if (path != "") {
					cc.loader.loadRes("" + type + "/" + path, cc.Font, function (err, font) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font);
						}
						this.node.getComponent(cc.Label).font = font;
						this.changeNodeValue(type);
					}.bind(this));
				} else if (this.default_path != "") {
					//默认路径
					cc.loader.loadRes("" + type + "/" + this.default_path, cc.Font, function (err, font) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font);
						}
						this.node.getComponent(cc.Label).font = font;
						this.changeNodeValue(type);
					}.bind(this));
				}
				break;
			case 3:
				//图集资源
				var name = "";
				var sp = this.node.getComponent(cc.Sprite);
				sp && (name = sp.spriteFrame._name);
				var path = "";
				var pos = "";
				for (var i in this.lan_AtlasPath) {
					if (this.lan_AtlasPath[i].lanName == type) {
						path = this.lan_AtlasPath[i].PathorText;
						pos = this.lan_AtlasPath[i].posId;
						break;
					}
				}
				//获取图片资源
				if (path != "") {
					cc.loader.loadRes("" + type + "/Atlas/" + path, cc.SpriteAtlas, function (err, Atlas) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).atlas);
						}
						this.node.getComponent(cc.Sprite).atlas = Atlas;
						var frame = Atlas.getSpriteFrame(pos);
						this.node.getComponent(cc.Sprite).spriteFrame = frame;
						this.changeNodeValue(type);
					}.bind(this));
				} else if (this.default_path != "") {
					//默认路径
					cc.loader.loadRes("" + type + "/" + this.default_path, cc.Font, function (err, font) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).atlas);
						}
						var frames = Atlas.getSpriteFrames();
						for (var key in frames) {
							if (frames[key]._name == name) {
								this.node.getComponent(cc.Sprite).atlas = Atlas;
								this.node.getComponent(cc.Sprite).spriteFrame = frames[key];
								this.changeNodeValue(type);
								break;
							}
						}

					}.bind(this));
				}
				break;
			case 4:
				//节点属性
				this.changeNodeValue(type);
				break;
			case 5:
				//动画资源
				var path = "";
				for (var i in this.lan_Path) {
					if (this.lan_Path[i].lanName == type) {
						path = this.lan_Path[i].PathorText;
						break;
					}
				}
				//获取动画资源
				if (path != "") {
					cc.loader.loadRes("" + type + "/Anim/" + path, cc.AnimationClip, function (err, anim) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						this.node.getComponent(cc.Animation).stop();
						//	this.node.getComponent(cc.Animation)._nameToState = {};
						this.node.getComponent(cc.Animation).removeClip(anim._name);
						this.node.getComponent(cc.Animation).addClip(anim);
						this.node.getComponent(cc.Animation).play(anim._name);
						this.changeNodeValue(type);
					}.bind(this));
				} else if (this.default_path != "") {
					//默认路径
					cc.loader.loadRes("" + type + "/" + this.default_path, cc.AnimationClip, function (err, anim) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						this.node.getComponent(cc.Animation).stop();
						//	this.node.getComponent(cc.Animation)._nameToState = {};
						this.node.getComponent(cc.Animation).removeClip(anim._name);
						this.node.getComponent(cc.Animation).addClip(anim);
						this.node.getComponent(cc.Animation).play(anim._name);
						this.changeNodeValue(type);
					}.bind(this));
				}
				this.changeNodeValue(type);
				break;
			case 6:
				//是图片
				//获得图片路径
				var path = "";
				var name = "";
				for (var i in this.lan_Path) {
					if (this.lan_Path[i].lanName == type) {
						path = this.lan_Path[i].PathorText;
						break;
					}
				}
				var sp = this.node.getComponent(cc.Sprite);
				sp && (name = sp.spriteFrame._name);
				//获取图片资源
				if (path != "" && name != "") {
					cc.loader.loadRes("" + type + "/" + path + "/" + name, cc.SpriteFrame, function (err, spriteFrame) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame);
						}
						this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						this.changeNodeValue(type);
					}.bind(this));
				} else if (name != "" && path == "" && this.default_path != "") {
					//默认路径
					cc.loader.loadRes("" + type + "/" + this.default_path + "/" + name, cc.SpriteFrame, function (err, spriteFrame) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame);
						}
						this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
						this.changeNodeValue(type);
					}.bind(this));
				}
				break;
			case 7:
				//加载资源组
				cc.loader.loadResDir("" + type + "/" + this.gameName, function (err, sp) {
					if (err) {
						g.configs.debugLog && console.warn(err);
						return;
					}
				}.bind(this));
				break;
			case 8:
				//是字体文件
				//获得图片路径
				var path = "";
				var text = "";
				for (var i in this.lan_changPathandText) {
					if (this.lan_changPathandText[i].lanName == type) {
						path = this.lan_changPathandText[i].path;
						text = this.lan_changPathandText[i].Texts;
						break;
					}
				}
				//获取图片资源
				if (path != "") {
					cc.loader.loadRes("" + type + "/" + path, cc.Font, function (err, font) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font);
						}
						this.node.getComponent(cc.Label).font = font;
						var str = this.node.getComponent(cc.Label).string;
						for (var i in text) {
							if (str == text[i].lanName) {
								this.node.getComponent(cc.Label).string = text[i].Text;
								break;
							}

						}

						this.changeNodeValue(type);
					}.bind(this));
				} else if (this.default_path != "") {
					//默认路径
					cc.loader.loadRes("" + type + "/" + this.default_path, cc.Font, function (err, font) {
						if (err) {
							g.configs.debugLog && console.warn(err);
							return;
						}
						if (!this.node || !this.node.isValid) {
							g.configs.debugLog && console.warn('节点不存在');
							return;
						}
						if (this.ResType == 1) {
							//添加释放队列
							g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font);
						}
						this.node.getComponent(cc.Label).font = font;
						var str = this.node.getComponent(cc.Label).string;
						if (text != "") {
							for (var i in text) {
								if (str == text[i].lanName) {
									this.node.getComponent(cc.Label).string = text[i].Text;
									break;
								}
							}
						} else {
							this.node.getComponent(cc.Label).string = g.lan_Mgr.getLanToLan(str);
						}

						this.changeNodeValue(type);
					}.bind(this));
				}
				break;
			case 9:
				if (this.default_path != "") {
					var name = "";
					var sp = this.node.getComponent(cc.Sprite);
					var btn = this.node.getComponent(cc.Button);
					sp && (name = sp.spriteFrame._name);
					//默认路径
					if (name != "") {
						cc.loader.loadRes("" + type + "/" + this.default_path + "/" + name, cc.SpriteFrame, function (err, spriteFrame) {
							if (err) {
								g.configs.debugLog && console.warn(err);
								return;
							}
							if (!this.node || !this.node.isValid) {
								g.configs.debugLog && console.warn('节点不存在');
								return;
							}
							if (this.ResType == 1) {
								//添加释放队列
								g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame);
							}
							this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
							this.changeNodeValue(type);
						}.bind(this));
					}
					if (btn) {
						if (btn.normalSprite) {
							cc.loader.loadRes("" + type + "/" + this.default_path + "/" + btn.normalSprite._name, cc.SpriteFrame, function (err, spriteFrame) {
								if (err) {
									g.configs.debugLog && console.warn(err);
									return;
								}
								if (!this.node || !this.node.isValid) {
									g.configs.debugLog && console.warn('节点不存在');
									return;
								}
								if (this.ResType == 1) {
									//添加释放队列
									g.multilinguals2Res[this.m_uuid].push(btn.normalSprite);
								}
								this.node.getComponent(cc.Button).normalSprite = spriteFrame;
								this.changeNodeValue(type);
							}.bind(this));
						}
						if (btn.pressedSprite) {
							cc.loader.loadRes("" + type + "/" + this.default_path + "/" + btn.pressedSprite._name, cc.SpriteFrame, function (err, spriteFrame) {
								if (err) {
									g.configs.debugLog && console.warn(err);
									return;
								}
								if (!this.node || !this.node.isValid) {
									g.configs.debugLog && console.warn('节点不存在');
									return;
								}
								if (this.ResType == 1) {
									//添加释放队列
									g.multilinguals2Res[this.m_uuid].push(btn.pressedSprite);
								}
								this.node.getComponent(cc.Button).pressedSprite = spriteFrame;
								this.changeNodeValue(type);
							}.bind(this));
						}
						if (btn.disabledSprite) {
							cc.loader.loadRes("" + type + "/" + this.default_path + "/" + btn.disabledSprite._name, cc.SpriteFrame, function (err, spriteFrame) {
								if (err) {
									g.configs.debugLog && console.warn(err);
									return;
								}
								if (!this.node || !this.node.isValid) {
									g.configs.debugLog && console.warn('节点不存在');
									return;
								}
								if (this.ResType == 1) {
									//添加释放队列
									g.multilinguals2Res[this.m_uuid].push(btn.disabledSprite);
								}
								this.node.getComponent(cc.Button).disabledSprite = spriteFrame;
								this.changeNodeValue(type);
							}.bind(this));
						}
					}
				}
				break;


		}

	},
	//赋值节点属性
	changeNodeValue: function (type) {
		if (!type) {
			return;
		}
		if (!this.node) {
			g.configs.debugLog && console.warn('节点不存在');
			return;
		}
		//颜色
		for (var i in this.lan_Color) {
			if (this.lan_Color[i].lanName == type) {
				this.node.color = this.lan_Color[i].Color;
				break;
			}
		}
		//位置
		for (var i in this.lan_Pos) {
			if (this.lan_Pos[i].lanName == type) {
				this.node.x = this.lan_Pos[i].Pos.x;
				this.node.y = this.lan_Pos[i].Pos.y;
				break;
			}
		}
		//大小
		for (var i in this.lan_Size) {
			if (this.lan_Size[i].lanName == type) {
				this.node.width = this.lan_Size[i].size.x;
				this.node.height = this.lan_Size[i].size.y;
				break;
			}
		}
		//角度
		for (var i in this.lan_Rot) {
			if (this.lan_Rot[i].lanName == type) {
				this.node.rotation = this.lan_Rot[i].Rot;
				break;
			}
		}
	},
	//生成唯一标识
	generateUUID: function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
});