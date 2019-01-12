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
    },

    ctor() {
    },

    //直接跳转,没有进度条
    loadScene(tarSceneName) {
        let curScene = cc.director.getScene();

        let game = require("game");
        game.uiMgr.closeAllUI();
        cc.director.loadScene(tarSceneName); 

    },

    //预加载进度
    onProgress(completedCount, totalCount, latestItem) {
        console.log("onProgress***", this, completedCount, totalCount, latestItem);
    },

    //预加载完成
    onLoaded(error, asset) {
        console.log("onLoaded***", this, error, asset);
    },

    //预加载,带进度条
    preloadScene(tarSceneName) {
        let self = this;
        let curScene = cc.director.getScene();

        let game = require("game");
        game.uiMgr.closeAllUI();
        cc.director.preloadScene(tarSceneName, function() { self.onProgress() }, function() { self.onLoaded() });
    }
});
