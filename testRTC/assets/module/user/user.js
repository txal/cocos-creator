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
let comModuleBase = require("moduleBase");

cc.Class({
    extends: comModuleBase,

    //自定义消息分发
    dispatchCmdMsg(cmdNo, cmdName, source, data) {
        let found = false;
        for(k in this.moduleMap) {
            let module = this.moduleMap[k];
            if (module[cmdName]) {
                module[cmdName].call(module, data);
                found = true;
                break;
            }
        }
        misc.assert(found, "消息处理函数未定义: "+cmdName);
    },

    //proto消息分发
    dispatchPBMsg(cmdNo, cmdName, source, data) {
        this.dispatchCmdMsg(cmdNo, cmdName, source, data);
    },

    properties: {
        moduleMap: {default: {}, },
    },

    ctor() {
    },

    onRelease() {
    },

    initModule() {
    },

});
