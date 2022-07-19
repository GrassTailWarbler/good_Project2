// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

     onLoad () {
        //cc.view.enableAntiAlias(true);
     },
    mask:function(){
        this.node.getComponent(cc.Mask).inverted=true;
        let graphicsPosArr= this.node.getComponent(cc.PolygonCollider).points;
        let graphics = this.node.getComponent(cc.Mask)['_graphics'];
        graphics.clear(false);
        graphics.moveTo(graphicsPosArr[0].x,graphicsPosArr[0].y);
        for(let i =0;i<graphicsPosArr.length;i++){
            graphics.lineTo(graphicsPosArr[i].x,graphicsPosArr[i].y);
        }
        graphics.close();
        graphics.stroke();
        graphics.fill();
    },

    start () {
        //this.mask();
    },
    onEnable(){
        this.mask();//节点被激活的话就重新绘制遮罩层
    },
    onDisable(){
        this.node.active=false;
    },
    on_show_mask:function(){
        this.node.active=true;
    },
    on_hide_mask:function(){
        this.node.active=false;
    }

    // update (dt) {},
});
