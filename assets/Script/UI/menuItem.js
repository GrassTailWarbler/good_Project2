// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        item:{
            default:null,
            type:cc.Label
        },
        editBox:{
            default:null,
            type:cc.EditBox
        },
    },

    changeText:function(){
        
        let value =myGlobal.titleMenu.find(item=>
           
            item.node_id===this.item.node.node_id
        );
        value.getChildByName("txt").getComponent(cc.Label).string = this.item.string = this.editBox.string;
    },
   
});
