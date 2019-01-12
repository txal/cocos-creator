let misc = require("misc");
let regCmd = {};

///////////////////注册自定义协议函数////////////////////
regCmd.cmdRange = [1025, 8000]; //指令范围
regCmd.cmdMapReq = {}; //请求指令MAP
regCmd.cmdMapRet = {}; //返回指令MAP

regCmd.cmdCheck = function (cmdNo, cmdName, proto) {
    misc.assert(cmdNo && cmdName && proto, "参数错误");
    misc.assert(cmdNo >= this.cmdRange[0] && cmdNo <= this.cmdRange[1], "非法指令号:"+cmdNo);
};

regCmd.regCmdReq = function (cmdNo, cmdName, proto, target) {
    target = target ? target : 0;
    this.cmdCheck(cmdNo, cmdName, proto);
    misc.assert(!this.cmdMapReq[cmdNo], "命令号重复注册"+cmdNo);
    misc.assert(!this.cmdMapReq[cmdName], "命令名重复注册"+cmdName);
    var cmd = [cmdNo, cmdName, proto, target];
    this.cmdMapReq[cmdNo] = cmd;
    this.cmdMapReq[cmdName] = cmd;
};

regCmd.regCmdRet = function (cmdNo, cmdName, proto, target) {
    target = target ? target : 0;
    this.cmdCheck(cmdNo, cmdName, proto);
    misc.assert(!this.cmdMapRet[cmdNo], "命令号重复注册"+cmdNo);
    misc.assert(!this.cmdMapRet[cmdName], "命令名重复注册"+cmdName);
    var cmd = [cmdNo, cmdName, proto, target];
    this.cmdMapRet[cmdNo] = cmd;
    this.cmdMapRet[cmdName] = cmd;
};

regCmd.getCmdReq = function(sCmdName) {
    return this.cmdMapReq[sCmdName];
};

regCmd.getCmdRet = function(nCmdNo) {
    return this.cmdMapRet[nCmdNo];
};



///////////////////注册PROTOBUF协议函数////////////////////
regCmd.pbCmdRange = [8001, 40000]; //指令范围
regCmd.pbCmdMapReq = {}; //请求指令MAP
regCmd.pbCmdMapRet = {}; //返回指令MAP

regCmd.pbCmdCheck = function (cmdNo, cmdName, proto) {
    misc.assert(cmdNo && cmdName && proto, "参数错误");
    misc.assert(cmdNo >= this.pbCmdRange[0] && cmdNo <= this.pbCmdRange[1], "非法指令号:"+cmdNo);
};

regCmd.regPBReq = function (cmdNo, cmdName, proto, target) {
    target = target ? target : 0;
    this.pbCmdCheck(cmdNo, cmdName, proto);
    misc.assert(!this.pbCmdMapReq[cmdNo], "命令号重复注册"+cmdNo);
    misc.assert(!this.pbCmdMapReq[cmdName], "命令名重复注册"+cmdName);
    var cmd = [cmdNo, cmdName, proto, target];
    this.pbCmdMapReq[cmdNo] = cmd;
    this.pbCmdMapReq[cmdName] = cmd;
};

regCmd.regPBRet = function (cmdNo, cmdName, proto, target) {
    target = target ? target : 0;
    this.pbCmdCheck(cmdNo, cmdName, proto);
    misc.assert(!this.pbCmdMapRet[cmdNo], "命令号重复注册"+cmdNo);
    misc.assert(!this.pbCmdMapRet[cmdName], "命令名重复注册"+cmdName);
    var cmd = [cmdNo, cmdName, proto, target];
    this.pbCmdMapRet[cmdNo] = cmd;
    this.pbCmdMapRet[cmdName] = cmd;
};

regCmd.getPBReq = function(sCmdName) {
    return this.pbCmdMapReq[sCmdName];
};

regCmd.getPBRet = function(nCmdNo) {
    return this.pbCmdMapRet[nCmdNo];
};





module.exports = regCmd 