const fs = require('fs');
const path = require('path');

const MuslimahQiyamBot = require(path.resolve("src/muslimahQiyamBot/MuslimahQiyamBot.js"));

const MQB = 'muslimahqiyambot';

class MessageManager {

  constructor(client) {
    let rawdata = fs.readFileSync(path.resolve('src/config.json'));
    this.client = client;
    this.data = JSON.parse(rawdata);
    this.MQ = new MuslimahQiyamBot(client);
  }

  saveJson() {
    let data = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(path.resolve('src/config.json'), data);
  }
  
  handle(msg){
    const that = this;
    const prefix = msg.body.split(" ")[0];
    if (that.data.admin.includes(msg.id.remote) && prefix === that.data.adminprefix) {
      return that.handleAdmin(msg);
    }
    if (that.data[MQB].remotes.includes(msg.id.remote) && prefix === that.data[MQB].prefix) {
      return this.MQ.handleMessage(msg);
    }
    if (prefix === '>>>') {
      return this.handlePublic(msg);
    }
  }

  handleAdmin(msg){
    const that = this;
    let args = msg.body.split(" ");
    args.shift();
    if (args.length > 0){
      const cmd = args[0];
      const val = args[1];
      if (typeof cmd === "string" && typeof val === "string"){
        switch(cmd){
          case 'add-admin':{
            that.proccessAddAdmin(msg, val);
            break;
          }
          case 'remove-admin':{
            that.proccessRemoveAdmin(msg, val);
            break;
          }
          case 'mqb-add-remote':{
            that.proccessAddMQBRemote(msg, val);
            break;
          }
          case 'mqb-remove-remote':{
            that.proccessRemoveMQBRemote(msg, val);
            break;
          }
          default:{
            break;
          }
        }
        that.saveJson();
      }
    }
  }

  handlePublic(msg){
    const that = this;
    let args = msg.body.split(" ");
    args.shift();
    if (args.length > 0){
      const cmd = args[0];
      if (typeof cmd === "string"){
        switch(cmd){
          case 'register':{
            that.proccessSendReqPublic(msg);
            break;
          }
          default:{
            break;
          }
        }
      }
    }
  }

  /**
   * ADMIN ADD
   */

  proccessAddAdmin(msg, val){
    const that = this;
    that.addAdmin(val);
    that.client.sendMessage(msg.from, this.robotResponse(`Admin added *_${val}_*`, true));
  }

  proccessRemoveAdmin(msg, val){
    const that = this;
    that.removeAdmin(val);
    that.client.sendMessage(msg.from, this.robotResponse(`Admin removed *_${val}_*`, true));
  }

  addAdmin(remote){
    this.data.admin.push(remote);
  }

  removeAdmin(remote){
    this.data.admin = this.data.admin.filter((adrm) => adrm !== remote);
  }

  /**
   * MQB REMOTE ADD
   */

  proccessAddMQBRemote(msg, val){
    const that = this;
    that.addMQBRemote(val);
    that.client.sendMessage(msg.from, this.robotResponse(`MQB's Remote added ${val}`, true));
  }

  proccessRemoveMQBRemote(msg, val){
    const that = this;
    that.removeMQBRemote(val);
    that.client.sendMessage(msg.from, this.robotResponse(`MQB's Remote removed ${val}`, true));
  }

  addMQBRemote(remote){
    this.data[MQB].remotes.push(remote);
  }

  removeMQBRemote(remote){
    this.data[MQB].remotes = this.data[MQB].remotes.filter((adrm) => adrm !== remote);
  }

  proccessSendReqPublic(msg){
    this.client.sendMessage(this.data.admin[0], this.robotResponse(`Request from *_${msg.from}_*`))
  }

  robotResponse(msg, success){
    let _stat = success === undefined ? "" : (success ? '✅' : '🚫');
    return `🤖 : ${msg} ${_stat}`;
  }
}

module.exports = MessageManager;