// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let misc = require("misc");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    ctor() {
        //这里还没有场景且不能loadRes
        this.isInited = false;

        this.tipsList = [];
        this.cacheNodes = 30;
        this.tipsPoolName = "";
        this.tipsContainer = new cc.Node();

        this.speed = 200;       //速度(像素每秒)
        this.interval = 0.1;    //间隔(秒)
        this.holdTime = 1000;   //悬停静止时间(毫秒)
    },

    _init(fnCallback) {
        if (this.isInited) {
            fnCallback();
            return;
        }
        this.isInited = true;
        let self = this;

        this._initContainer();
        this._initTipsPrefab(fnCallback);
    },

    _initContainer() {
        console.error("请在子类实现");
    },

    _initTipsPrefab() {
        console.error("请在子类实现");
    },

    _addContainer(node) {
        node.opacity = 255;
        let offsetHeight = this.tipsContainer.height/2;

        for (let i = this.tipsList.length-1; i >= 0; i--) {
            let item = this.tipsList[i];
            let rightPosY = (item[1].height*(i+1))+item[1].height/2 - offsetHeight;
            if (item[1].y < rightPosY) {
                item[1].y = rightPosY;
            }
         }
        node.y = node.height/2 - offsetHeight;
        node.parent = this.tipsContainer;
        this.tipsList.unshift([misc.msTime(), node]);

        this.tipsContainer.parent = cc.director.getScene();
        this.tipsContainer.zIndex = 1024; //永远在前面

        if (this.tipsList.length == 1) {
            this.schedule(this._onTimer, this.interval);
        }
   },

   _onTimer() {
        let game = require("game");
        let sliceIndex = -1;
        let offsetHeight = this.tipsContainer.height/2;
        let msTime = misc.msTime();

        for (let i = this.tipsList.length-1; i >= 0; i--) {
            let item = this.tipsList[i];
            if (msTime - item[0] < this.holdTime) {
                break;
            }
            item[1].y += this.interval * this.speed;

            let distance = item[1].y + offsetHeight;
            let distRatio = Math.max(0, 1 - distance/this.tipsContainer.height);
            item[1].opacity = 255 * distRatio;

            if (item[1].y >= this.tipsContainer.height+item[1].height/2) {
                game.npMgr.put(this.tipsPoolName, item[1]);
                sliceIndex = i;
            }
        }
        if (sliceIndex >= 0) {
            this.tipsList = this.tipsList.slice(0, sliceIndex);
        }
        if (this.tipsList.length == 0) {
            this.tipsContainer.parent = null;
            this.unschedule(this._onTimer);
        }
   },

    tips(cont) {
        console.error("请在子类实现");
    },

    //关闭所有TIPS
    closeAllTips() {
        let game = require("game");
        for (let i = this.tipsList.length-1; i >= 0; i--) {
            let item = this.tipsList[i];
            game.npMgr.put(this.tipsPoolName, item[1]);
        }
        this.tipsList = [];
        this.tipsContainer.parent = null;
        this.unschedule(this._onTimer);
    }

    // update (dt) {},
});
