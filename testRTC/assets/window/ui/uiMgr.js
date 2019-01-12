// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//一级界面应该放到此管理器里面,避免频繁释放创建导致卡顿

let misc = require("misc");

cc.Class({
    extends: cc.Component,

    properties: {
        uiMap: {default: {},},
    },

    ctor() {

    },

    //@name 界面名称
    //@prefab 界面预制件
    createUI(name, prefab) {
        let node = this.uiMap[name];
        if (!node) {
            node = cc.instantiate(prefab);
            this.uiMap[name] = node;
        }
        if (!cc.isValid(node)) {
            misc.assert(false, "节点["+name+"]已被销毁但没有显式调用uiMgr.destroyUI(通常是切换场景时随场景一起销毁了)");
        }
        return node;
    },

    closeUI(name, cleanup=false) {
        let node = this.uiMap[name];
        if (!node) {
            return;
        }
        node.removeFromParent(cleanup);
    },

    destroyUI(name) {
        let node = this.uiMap[name]
        if (!node) {
            return;
        }
        node.destroy();
        this.uiMap[name] = null;
    },

    closeAllUI() {
        for (let k in this.uiMap) {
            this.closeUI(k);
        }
    },

    destroyAllUI() {
        for (let k in this.uiMap) {
            this.destroyUI(k);
        }
    },
});
