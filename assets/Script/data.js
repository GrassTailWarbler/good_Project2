var cfg={

    data_arry:[],
    data_name:{},
    random_data:function(){
        for(var i = 0;i<12;i++){
            var rom_data = Math.random();
            switch (i) {
                case 0:
                    this.data_arry[i]= parseInt(rom_data*25+5);//蛋糕
                    this.data_name[i]="蛋糕";
                    break;
                case 1:
                    this.data_arry[i]= parseInt(rom_data*20+45);//薯条
                    this.data_name[i]="薯条";
                    break;
                case 2:
                    this.data_arry[i]= parseInt(rom_data*10+75);//汉堡
                    this.data_name[i]="汉堡";
                    break;
                case 3:
                    this.data_arry[i]= parseInt(rom_data*30+95);//手抓饼
                    this.data_name[i]="手抓饼";
                    break;
                case 4:
                    this.data_arry[i]= parseInt(rom_data*20+135);//葡萄酒
                    this.data_name[i]="葡萄酒";
                    break;
                case 5:
                    this.data_arry[i]= parseInt(rom_data*10+165);//苹果
                    this.data_name[i]="苹果";
                    break;
                case 6:
                    this.data_arry[i]= parseInt(rom_data*20+185);//冰激凌
                    this.data_name[i]="冰激凌";
                    break;
                case 7:
                    this.data_arry[i]= parseInt(rom_data*25+215);//辣椒
                    this.data_name[i]="辣椒";
                    break;
                case 8:
                    this.data_arry[i]= parseInt(rom_data*15+250);//咖喱
                    this.data_name[i]="咖喱";
                    break;
                case 9:
                    this.data_arry[i]= parseInt(rom_data*10+275);//寿司
                    this.data_name[i]="寿司";
                    break;
                case 10:
                    this.data_arry[i]= parseInt(rom_data*20+295);//鱼饼
                    this.data_name[i]="鱼饼";
                    break;
                case 11:
                    this.data_arry[i]= parseInt(rom_data*30+325);//关东煮
                    this.data_name[i]="关东煮";
                    break;
                default:
                    break;
            } 
        }
    }
}
cfg.random_data();
module.exports = cfg;