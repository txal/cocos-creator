// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let game = require("game");

cc.Class({
    extends: cc.Component,

    properties: {
        btnDialog: cc.Button,
        panelTest: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor() {
    },

    onLoad () {
        let node = cc.find("nodePersist").getComponent("persistNode");
        console.error("sceneA***", node.data);

        this.node.on("click", function() {
            let game = require("game");
            game.user.sendEvent("panelTest", "say-hello", "---say hello---");

            game.sceneMgr.preloadScene("B");
        }, this);

        this.btnDialog.node.on("click", function() {
            let node = game.uiMgr.createUIFromPrefab("panelTest", this.panelTest);
            node.parent = cc.director.getScene();
            game.tipsMgr.commonTips("游戏游戏游戏");

        }, this);

    },

    start () {
    },

    // update (dt) {},
});
