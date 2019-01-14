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
    createUIFromPrefab(name, prefab) {
        //设置场景自动释放情况下,不自动释放prefab
        cc.loader.setAutoReleaseRecursively(prefab, false);

        let node = this.uiMap[name];
        if (!node) {
            node = cc.instantiate(prefab);
            this.uiMap[name] = node;
        }
        if (!cc.isValid(node)) {
            misc.assert(false, "UI节点["+name+"]已被销毁但没有显式调用uiMgr.destroyUI(通常是切换场景时随场景一起销毁了)");
        }
        return node;
    },

    //@name 界面名称
    //@prefabPath 预制件资源路径
    //@fnCallback 创建完成回调
    createUIFromPath(name, prefabPath, fnCallback) {
        misc.assert(fnCallback, "未定义回调函数");
        let node = this.uiMap[name];
        if (node) {
            if (!cc.isValid(node)) {
                misc.assert(false, "UI节点["+name+"]已被销毁但没有显式调用uiMgr.destroyUI(通常是切换场景时随场景一起销毁了)");
                return;
            }
            fnCallback(node);
        }

        let self = this;
        cc.loader.loadRes(prefabPath, function (err, prefab) {
            if (!err) {
                let node = self.createUIFromPrefab(name, prefab);
                fnCallback(node);

            } else {
                console.error(err);
            }

        });
    },

    closeUI(name, cleanup=false) {
        let node = this.uiMap[name];
        if (!node) {
            return;
        }
        node.removeFromParent(cleanup);
    },

    //没有释放任何资源的
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
