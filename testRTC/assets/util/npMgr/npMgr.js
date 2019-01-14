//节点对象池管理器,频繁创建和移除的节点用此管理器缓存,比如子弹,鱼,怪物等

let misc = require("misc");

cc.Class({
    extends: cc.Component,

    properties: {
        npMap: { default: {}, },
    },

    ctor() {
        //这里定义一堆对象池,根据用途起名
        this.npMap["bullet"] = new cc.NodePool();
        this.npMap["commonTips"] = new cc.NodePool();
    },

    //@poolName 对象池名称,为了便于排错,不能自动创建
    getPool(poolName) {
        return this.npMap[poolName];
    },

    clearPool(poolName) {
        this.getPool(poolName).clear();
    },

    //@prefab 节点预制件,如果传了进来,池子里没有对象自动创建
    get(poolName, prefab) {
        let pool = this.getPool(poolName);
        misc.assert(pool, "对象池不存在:"+pool);
        if (pool.size() > 0) {
            return pool.get();
        }
        if (prefab) {
            let node = cc.instantiate(prefab);
            return node;
        }
        return null;
    },

    put(poolName, node) {
        let pool = this.getPool(poolName);
        pool.put(node);
        return pool.size();
    },
});
