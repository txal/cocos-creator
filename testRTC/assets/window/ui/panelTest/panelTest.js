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
let comUIBase = require("uiBase");

cc.Class({
    extends: comUIBase,

    properties: {
        btnClose: cc.Node,
    },

    ctor() {
        console.log("construct***### panelTest");
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.btnClose.on("touchend", function(event) {
            game.uiMgr.closeUI("panelTest");

       }, this);

        this.node.on('say-hello', function(event) {
            console.log(event.detail);

        }, this);
    },

    start () {

    },

    // update (dt) {},

    onDestroy() {
        console.log("panel test destroy*****");
    },
});
