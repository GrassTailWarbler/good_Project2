//弹窗效果类型
var effect2_opit = {
	default: 0, //默认效果
	defaultT: 0.2, //默認時間
	effectList: [],
	setEffect: function (node, types, cb, t, b) {
		if (this.effectList.length == 0) {
			this.init();
		}
		if (node.runningEff) {
			node.stopAllActions();
			node.runningEff = false;
			if (node.effScaleX != undefined) {
				node.scaleX = node.effScaleX;
				node.scaleY = node.effScaleY;
			}
			if (node.effOpacity != undefined) {
				node.opacity = node.effOpacity;
			}
			if (node.effRot != undefined) {
				node.rotation = node.effRot;
			}
			if (node.effX != undefined) {
				node.x = node.effX;
				node.y = node.effY;
			}
		}
		if (b) {
			node.effScaleX = null;
			node.effRot = null;
			node.effX = null;
			node.effY = null;
			node.effOpacity = null;
		}
		var actionList = [];
		if (typeof types != "undefined" && types) {
			if (typeof types == "object") {
				for (var i in types) {
					actionList.push(this.getEffect(node, types[i], t));
				}
			} else {
				actionList.push(this.getEffect(node, types, t));
			}
		} else {
			actionList.push(this.getEffect(node, this.default, t));
		}
		node.runAction(cc.sequence(actionList.length > 1 ? cc.spawn(actionList) : actionList[0], cc.callFunc(function () {
			node.runningEff = false;
			if (node.effScaleX != undefined) {
				node.scaleX = node.effScaleX;
				node.scaleY = node.effScaleY;
			}
			if (node.effOpacity != undefined) {
				node.opacity = node.effOpacity;
			}
			if (node.effRot != undefined) {
				node.rotation = node.effRot;
			}
			if (node.effX != undefined) {
				node.x = node.effX;
				node.y = node.effY;
			}
			cb && cb();
		})));

	},
	getEffect: function (node, n, t) {
		node.runningEff = true;
		var action, fn;
		switch (n) {
			case 0:
				//縮放
				var scaleX = node.scaleX;
				var scaleY = node.scaleY;
				if (node.effScaleX == undefined) {
					node.effScaleX = scaleX;
					node.effScaleY = scaleY;
				}
				fn = this.effectList[0];
				node.scaleX = 0.8 * node.effScaleX;
				node.scaleY = 0.8 * node.effScaleY;
				if (fn) {
					action = fn(node.effScaleX, node.effScaleY, t).easing(cc.easeBackOut(2));
				}
				break;
			case 1:
				//透明度
				var opac = node.opacity;
				if (node.effOpacity == undefined) {
					node.effOpacity = opac;
				}
				fn = this.effectList[1];
				node.opacity = 0;
				if (fn) {
					action = fn(node.effOpacity, t);
				}
				break;
			case 2:
				//角度
				var rot = node.rotation;
				if (node.effRot = undefined) {
					node.effRot = rot;
				}
				fn = this.effectList[2];
				node.rotation = 0;
				if (fn) {
					action = fn(node.effRot, t, 1);
				}
				break;
			case 3:
				//右飄入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX + 120;
				node.y = node.effY + 50;
				if (fn) {
					action = fn(node.effX, node.effY, t);
				}
				break;
			case 4:
				//隱藏
				//透明度
				var opac = node.opacity;
				if (!node.effOpacity) {
					node.effOpacity = opac;
				}
				fn = this.effectList[1];
				node.opacity = 255;
				if (fn) {
					action = fn(0, t);
				}
				break;
			case 5:
				//左飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX - 300;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX, node.effY, t).easing(cc.easeBackOut(2));
				}
				break;
			case 6:
				//右飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX + 1080;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX, node.effY, t).easing(cc.easeBackOut(2));
				}
				break;
			case 7:
				//下飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY - 300;
				if (fn) {
					action = fn(node.effX, node.effY, t);
				}
				break;
			case 8:
				//上飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY + 300;
				if (fn) {
					action = fn(node.effX, node.effY, t);
				}
				break;
			case 9:
				//右飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX + 300;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX, node.effY, t).easing(cc.easeBackOut(2));
				}
				break;
			case 10:
				//右飘出
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX + 300, node.effY, t).easing(cc.easeBackIn(2));
				}
				break;
			case 11:
				//下飘出
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX, node.effY - 300, t);
				}
				break;
			case 12:
				//上飘出
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX, node.effY + 300, t);
				}
				break;
			case 13:
				//左飘出
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX - 300, node.effY, t).easing(cc.easeBackIn(2));
				}
				break;
			case 14:
				//右飘入
				var x = node.x;
				var y = node.y;
				if (node.effX == undefined) {
					node.effX = x;
					node.effY = y;
				}
				fn = this.effectList[3];
				node.x = node.effX;
				node.y = node.effY;
				if (fn) {
					action = fn(node.effX + 1080, node.effY, t).easing(cc.easeBackIn(2));
				}
				break;
		}
		return action;
	},
	init: function () {
		this.effectList.push(this.effect1.bind(this));
		this.effectList.push(this.effect2.bind(this));
		this.effectList.push(this.effect3.bind(this));
		this.effectList.push(this.effect4.bind(this));
	},
	//缩放特效
	effect1: function (nodeValX, nodeValY, t) {
		var action;
		action = cc.scaleTo(t ? t : this.defaultT, nodeValX, nodeValY);
		return action;
	},
	//透明度特效
	effect2: function (nodeVal, t) {
		var action;
		action = cc.fadeTo(t ? t : this.defaultT, nodeVal);
		return action;
	},
	//旋转特效
	effect3: function (nodeVal, t, num) {
		var action;
		var n = num || 0;
		action = cc.rotateTo(t ? t : this.defaultT, nodeVal + n * 360);
		return action;
	},
	//位移特效
	effect4: function (nodeValX, nodeValY, t) {
		var action;
		action = cc.moveTo(t ? t : this.defaultT, nodeValX, nodeValY);
		return action;
	},

};
module.exports = effect2_opit;