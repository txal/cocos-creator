let game = require("game");
let cltPBRpc = require("cltPBRpc");
let cltCmdRpc = require("cltCmdRpc");

//@data 数组
cltCmdRpc.dispatchCmdMsg = function(cmdNo, cmdName, source, data) {
    game.user.dispatchCmdMsg(cmdNo, cmdName, source, data);
};

//@data 对象
cltPBRpc.dispatchPBMsg = function(cmdNo, cmdName, source, data) {
    game.user.dispatchPBMsg(cmdNo, cmdName, source, data);
};

