//const popupDlg = require("../tanchuang/Public/Script/prefab/common/popupDlg");
cc.Class({
    extends: cc.Component,

    properties: {
      popupDlgInit:{
        default:null,
        type:cc.Prefab
      }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       cc.instantiate(this.popupDlgInit).parent=this.node;
    },

});
