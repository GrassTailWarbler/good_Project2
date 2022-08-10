
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
       this.init();
    },
    init:function(){
      //实例化弹窗节点
      cc.instantiate(this.popupDlgInit).parent=this.node;
    }

});
