const effect2_opit =require("../common/effect2_opit");
var popupDlg= cc.Class({
	extends: cc.Component,

	properties: {
		bg: {
			default: null,
			type: cc.Node,
			displayName: "背景"
		},
		content: {
			default: null,
			type: cc.Label,
			displayName: "内容"
		},
		menus: {
			default: [],
			type: cc.Node,
			displayName: "菜单"
		},
		//effect:effect2_opit
	},

	ctor: function () {
		// popupDlg.inst = this;
		// g.popupDlg = popupDlg;
		this.fn1 = null;
		this.fn2 = null;
		this.m_bDelay = false; //是否延迟显示；
		this.m_nDelay = 0; //延时时间
		myGlobal.popupDlg = this;
	},
	restart: function () {
		// popupDlg.inst = this;
		// g.popupDlg = popupDlg;
		this.fn1 = null;
		this.fn2 = null;
		this.m_bDelay = false; //是否延迟显示；
		this.m_nDelay = 0; //延时时间
		this.node.active = false;
	},
	onLoad: function () {
		this.node.active = false;
		this.node.inst = this;
	},

	// 传入内容、关闭回调、模式（0只有确定 1确定取消）
	onShow: function (content, fn1, fn2, _mode, delaySec) {
		this.m_bDelay = false;
		this.content.string = content||"";//g.lan_Mgr.getLanToLan(content) || "";
		this.fn1 = fn1;
		this.fn2 = fn2 || fn1; //觉得这样比较好点，更多的是双函数的
		// 根据模式显示菜单
		var mode = _mode || 0;
		var t1 = (delaySec == null) ? 0 : ~~delaySec;
		var len = this.menus.length;
		for (var i = 0; i < len; ++i) {
			this.menus[i].active = false;
		}
		this.menus[mode].active = true;
		if (t1 > 0) {
			///为延迟显示
			this.m_bDelay = true;
			this.m_nDelay = t1;
			return;
		}
		var stats = this.node.active;
		this.node.active = true;
		if (!stats) {
			effect2_opit.setEffect(this.node, [0, 1]);
		}
		// this.node.stopAllActions();
		// this.node.opacity = 0;
		// this.node.runAction(cc.fadeTo(0.2, 255));
		// this.bg.stopAllActions();
		// this.bg.scale = 0;
		// this.bg.runAction(cc.scaleTo(0.2, 1));
	},

	onHide: function () {
		this.m_bDelay = false;
		effect2_opit.setEffect(this.node, 4, function () {
			this.node.active = false;
		}.bind(this));
		// this.node.runAction(cc.fadeTo(0.1, 0));
		// this.bg.stopAllActions();
		// var scale = cc.scaleTo(0.1, 0);
		// var func = cc.callFunc(function () {
		// 	this.node.active = false;
		// }, this);
		// this.bg.runAction(cc.sequence(scale, func));
	},

	onConfirm: function () {
		this.fn1 && this.fn1();
		this.onHide();
	},
	onClose: function () {
		this.fn2 && this.fn2();
		this.onHide();
	},
	// update: function (dt) {
	// 	if (!this.node || !this.m_bDelay) {
	// 		this.m_bDelay = false;
	// 		this.m_nDelay = 0;
	// 		return;
	// 	}
	// 	this.m_nDelay -= dt;
	// 	if (this.m_nDelay <= 0) {
	// 		this.m_bDelay = false;
	// 		this.m_nDelay = 0;
	// 		this.node.active = true;
	// 		this.node.stopAllActions();
	// 		this.node.opacity = 0;
	// 		this.node.runAction(cc.fadeTo(0.2, 255));
	// 		this.bg.stopAllActions();
	// 		this.bg.scale = 0;
	// 		this.bg.runAction(cc.scaleTo(0.2, 1));
	// 	}

	// },
});
module.exports = popupDlg;