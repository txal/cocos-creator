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
        _rowSpacing: 10,     //行距(像素)
        _itemSpacing: 10,    //物品间距 
        _rowHeight: 20,      //行高
        _pageSize: 20,       //每页行数
        _pageIndex: 1,       //页码
        _pageCount: 1,       //页数
        _showTitles: 10,     //显示行数
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("scroll-to-top", this.onScrollToTop, this);
        this.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        this.node.on("bounce-bottom", this.onBounceBottom, this);
        this.node.on("bounce-top", this.onBounceTop, this);
        this.node.on("scroll-ended", this.onScrollEnd, this);
        this.node.on("touch-up", this.onTouchUp, this);

        this.labelTips = this.node.getChildByName("labelTips");
        this.labelTips.active = false;

        this.view = this.node.getChildByName("view");
        this.content = this.view.getChildByName("content");

        this.updateInterval = 0.2;
        this.updateTimer = 0;
    },

    start () {
    },

    update (dt) {
        this.updateTimer += dt
        if (this.updateTimer < this.updateInterval) {
            return; 
        }
        this.updateTimer = 0;

        let bottomY = this.content.y - this.content.height;
        let distanceY = bottomY>-this.view.height/2 ? Math.abs(bottomY-(-this.view.height/2)) : bottomY;
        let displayTipsY = this._rowHeight;
        if (distanceY >= displayTipsY) {
            this.labelTips.active = true;
        } else {
            this.labelTips.active = false;
        }
    },

    init (showTitles, rowSpacing, itemSpacing, pageSize, pageIndex, pageCount) {
        this._showTitles = showTitles;
        this._rowSpacing = rowSpacing;
        this._itemSpacing = itemSpacing;
        this._pageSize = pageSize;
        this._pageIndex = pageIndex;
        this._pageCount = pageCount;
    },

    //更新数据
    updateData (pageIndex, pageCount, data) {
        this.pageIndex = pageIndex;
        this.pageCount = pageCount;
    },
    
    onScrollToTop (scrollView) {
    },

    onScrollToBottom (scrollView) {
    },

    onBounceBottom (scrollView) {
    },

    onBounceTop (scrollView) {
    },

    onScrollEnd (scrollView) {
    },

    onTouchUp (scrollView) {
    },
});
