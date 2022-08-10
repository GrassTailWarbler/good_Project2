var config = require("data");
cc.Class({
    extends: cc.Component,

    properties: {
       item:{
        default:null,
        type:cc.Prefab
       },
       content:{
        default:null,
        type:cc.Node
       },
       menu:{
        default:null,
        type:cc.Node
       },
       checkMenuNode:{
        default:null,
        type:cc.Toggle
       }
    },

   

    onLoad () {
        let len = config.data_arry.length;
        for(let i = 0;i<len;i++){
            let _item = cc.instantiate(this.item);
            let items = _item.getChildByName("item");
            
            let attrs={node_id:i};
            items.attr(attrs);
            items.getComponent(cc.Label).string = config.data_name[i];
            _item.parent = this.content;

        }

    },
    checkMemu:function(){
        this.checkMenuNode.isChecked?this.onShow() :this.onHide();
    },
    onShow:function(){
        this.menu.active = true;
    },
    onHide:function(){
        this.menu.active = false;
    }
    

    
});
