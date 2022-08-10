
var config = require("data");
cc.Class({
    extends: cc.Component,

    properties: {
        rotation_node:{
            default:null,
            type:cc.Node
        },
        title_parent_node:{
            default:null,
            type:cc.Node
        },
        choos_label:{
            default:null,
            type:cc.Label
        }, 
    },
    start () {
        this.choos_label.string='???';
        this._flag=false;
        this.save_angle=0;
        this.final_rotation=[];
        this.title_node_array=this.title_parent_node.children;
        //保存到全局变量里,方便菜单自定义菜名
        myGlobal.titleMenu = this.title_parent_node.children;
        for (var i = 0; i < this.title_node_array.length; ++i) {
            var attrs={node_id:i};
            this.title_node_array[i].attr(attrs);
            this.final_rotation[i]=config.data_arry[i];
        }
    },
    go_around:function(){
        if(this._flag){
            console.log("当前正在转动");
            return;
        }
        if(this.rotation_node){
            this._flag=true;
            for (var i = 0; i < this.title_node_array.length; ++i) {
                this.title_node_array[i].getChildByName("mask").active=false;
            }
            this. _r = parseInt(Math.random()*11);
            console.log('随机抽取的数字'+this._r);
            var __i = this. _r;
            this.rotation_node.angle = 0;
            this.save_angle=this.final_rotation[__i]+360*10;
            //this.save_angle=-65;
            console.log('转的角度'+this.save_angle);
            //this.rotation_node.runAction(cc.rotateTo(2, this.save_angle));

            cc.tween(this.rotation_node)
            .to(5,{angle:this.save_angle},{easing:'sineOut'})
            .call(()=>{
                this.go_around_callfun();
            })
            .start();
        }
       
    },
    go_around_callfun:function(){
        this._flag=false;
        //this._r=8;
        for (var i = 0; i < this.title_node_array.length; ++i) {
            this.title_node_array[i].getChildByName("mask").active=false;
            if(this._r==this.title_node_array[i].node_id){
                this.title_node_array[i].getChildByName("mask").active=true;
                this.choos_label.string = config.data_name[i];
            }
        }
    },
    onRestart:function(){
        cc.audioEngine.stopAll();
        cc.game.end();
       
        
    }

});
