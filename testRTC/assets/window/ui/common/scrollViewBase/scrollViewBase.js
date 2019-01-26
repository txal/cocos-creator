// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rowSpacing: 10,     //行距(像素)
        itemSpacing: 10,    //物品间距 
        pageSize: 20,       //每页行数
        pageIndex: 1,       //页码
        pageCount: 1,       //页数
        showTitles: 10,     //显示行数
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("scroll-to-top", this.onScrollToTop, this):
        this.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        this.node.on("bounce-bottom", this.onBounceBottom, this);
        this.node.on("bounce-top", this.onBounceTop, this);
        this.node.on("scroll-ended", this.onScrollEnd, this);
        this.node.on("touch-up", this.onTouchUp, this);
    },

    start () {
    },

    // update (dt) {},

    init (showTitles, rowSpacing, itemSpacing, pageSize, pageIndex, pageCount) {
        this.showTitles = showTitles;
        this.rowSpacing = rowSpacing;
        this.itemSpacing = itemSpacing;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.pageCount = pageCount;
    },

    //更新数据
    updateData (pageIndex, pageCount, data) {
        this.pageIndex = pageIndex;
        this.pageCount = pageCount;
    },
    
        this.node.on("scroll-to-top", this.onScrollToTop, this):
        this.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        this.node.on("bounce-bottom", this.onBounceBottom, this);
        this.node.on("bounce-top", this.onBounceTop, this);
        this.node.on("scroll-ended", this.onScrollEnd, this);
        this.node.on("touch-up", this.onTouchUp, this);
});
