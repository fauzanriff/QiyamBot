const fs = require('fs');
const path = require('path');

const DONE = 1; // 💯
const FAIL = 2; // 😭
const HAID = 3; // 🚺
const SICK = 4; // 😷
const NIFAS = 5; // 🚼
const UNKNOWN = 6; // ❌
const IZIN = 7; // ℹ️
const PERGI = 8; // 🚗
let STATUS_STRING = {}
STATUS_STRING[DONE] = 'DONE';
STATUS_STRING[FAIL] = 'FAIL';
STATUS_STRING[HAID] = 'HAID';
STATUS_STRING[SICK] = 'SICK';
STATUS_STRING[NIFAS] = 'NIFAS';
STATUS_STRING[UNKNOWN] = 'UNKNOWN';
STATUS_STRING[IZIN] = 'IZIN';
STATUS_STRING[PERGI] = 'PERGI';
let STATUS_MESSAGE = {}
STATUS_MESSAGE[DONE] = '💯';
STATUS_MESSAGE[FAIL] = '😭';
STATUS_MESSAGE[HAID] = '🚺';
STATUS_MESSAGE[SICK] = '😷';
STATUS_MESSAGE[NIFAS] = '🚼';
STATUS_MESSAGE[UNKNOWN] = '❌';
STATUS_MESSAGE[IZIN] = 'ℹ️';
STATUS_MESSAGE[PERGI] = '🚗';
let ICON_MESSAGE = {}
ICON_MESSAGE['💯'] = DONE;
ICON_MESSAGE['😭'] = FAIL;
ICON_MESSAGE['🚺'] = HAID;
ICON_MESSAGE['😷'] = SICK;
ICON_MESSAGE['🚼'] = NIFAS;
ICON_MESSAGE['❌'] = UNKNOWN;
ICON_MESSAGE['ℹ️'] = IZIN;
ICON_MESSAGE['🚗'] = PERGI;

class MuslimahQiyamBot {

  constructor(client) {
    let rawdata = fs.readFileSync(path.resolve('src/muslimahQiyamBot/data.json'));
    this.data = JSON.parse(rawdata);
    this.client = client;
  }

  saveJson() {
    let data = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(path.resolve('src/muslimahQiyamBot/data.json'), data);
  }

  /**Message Example
   * 
   * {
      mediaKey: undefined,
      id: {
        fromMe: false,
        remote: '6285624247824-1619174698@g.us',
        id: '3A487EB8847A0142DF23',
        _serialized: 'false_6285624247824-1619174698@g.us_3A487EB8847A0142DF23'
      },
      ack: -1,
      hasMedia: false,
      body: 'Apa kabar',
      type: 'chat',
      timestamp: 1619174800,
      from: '6285624247824-1619174698@g.us',
      to: '6281313928620@c.us',
      author: '6285624247824@c.us',
      isForwarded: false,
      isStatus: false,
      isStarred: false,
      broadcast: false,
      fromMe: false,
      hasQuotedMsg: false,
      location: undefined,
      vCards: [],
      mentionedIds: [],
      links: []
    }
   * 
   */

  handleMessage(msg){
    const args = msg.body.split(' ');
    const command = args[1];
    const client = this.client;

    switch (command) {
      case 'recap': {
        client.sendMessage(msg.from, this.renderMessage());
        break;
      }
      case 'ya':
        if (this.data.resetConfirm){
          this.setPeriode(this.data.resetConfirm)
          this.changePeriode();
          client.sendMessage(msg.from, this.renderPeriode());
          this.data.resetConfirm = "";
        }
        break;
      case 'ubah-periode': {
        const _period = msg.body.replace('>> ubah-periode ', '');
        this.data.resetConfirm = _period;
        client.sendMessage(msg.from, this.robotResponse(`Kamu yakin akan ubah periode ke ${_period}?\nSeluruh status akan di reset ulang. Balas '>> ya' untuk melanjutkan.`));
        break;
      }
      case 'ubah-admin': {
        this.setAdmin(args[2].replace('_', ' '));
        client.sendMessage(msg.from, this.renderManager());
        break;
      }
      case 'ubah-asmin': {
        this.setAsmin(args[2].replace('_', ' '));
        client.sendMessage(msg.from, this.renderManager());
        break;
      }
      case 'ubah-bendahara': {
        this.setBendahara(args[2].replace('_', ' '));
        client.sendMessage(msg.from, this.renderManager());
        break;
      }
      case 'tambah-doa': {
        this.addDoa(msg.body.replace('>> tambah-doa ', ''));
        client.sendMessage(msg.from, this.renderDoas() || "< Doa Kosong >");
        break;
      }
      case 'hapus-doa': {
        this.removeDoa();
        client.sendMessage(msg.from, this.renderDoas() || "< Doa Kosong >");
        break;
      }
      case 'tambah-motivasi': {
        this.addMotivasi(msg.body.replace('>> tambah-motivasi ', ''));
        client.sendMessage(msg.from, this.renderMotivasis() || "< Motivasi Kosong >");
        break;
      }
      case 'hapus-motivasi': {
        this.removeMotivasi();
        client.sendMessage(msg.from, this.renderMotivasis() || "< Motivasi Kosong >");
        break;
      }
      case 'tambah-catatan': {
        this.addNote(msg.body.replace('>> tambah-catatan ', ''));
        client.sendMessage(msg.from, this.renderNote() || "< Catatan Kosong >");
        break;
      }
      case 'hapus-catatan': {
        this.removeNote();
        client.sendMessage(msg.from, this.renderNote() || "< Catatan Kosong >");
        break;
      }
      case 'ubah-catatan-penting': {
        this.setImportantNote(msg.body.replace('>> ubah-catatan-penting ', ''));
        client.sendMessage(msg.from, this.renderImportantNote() || "< Catatan Penting Kosong >");
        break;
      }
      case 'recap-hari': {
        const nDay = msg.body.match(/\d+/);
        if (nDay){
          this.setDay(nDay)
          client.sendMessage(msg.from, this.renderRecap(nDay[0]));
          client.sendMessage(msg.from, this.renderPercentage(nDay[0]));
          break;
        }
        client.sendMessage(msg.from, this.renderRecap(this.data.day));
        client.sendMessage(msg.from, this.renderPercentage(this.data.day));
        break;
      }
      case 'belum-recap':{
        const nDay = msg.body.match(/\d+/);
        if (nDay){
          client.sendMessage(msg.from, this.renderNotRecaped(nDay[0]));
          break;
        }
        client.sendMessage(msg.from, this.renderNotRecaped(this.data.day));
        break;
      }
      case 'ubah-pjh': {
        const nGroup = parseInt(args[2]);
        if (nGroup) {
          const name = msg.body.replace('>> ubah-pjh ', '').replace(nGroup+" ", '');
          if (name) {
            this.setPjh(nGroup-1, name);
            client.sendMessage(msg.from, this.renderGroupHeader(this.data.groups[nGroup-1]));
          }
        }
        break;
      }
      case 'karantina': {
        client.sendMessage(msg.from, this.renderQuarantineStatus());
        break;
      }
      case 'help': {
        client.sendMessage(msg.from, this.helpMessage());
        break;
      }
      // >> NN. <Name> 🗑
      // >> NN. <Name> <Stat>
      default:
        const getId = msg.body.match(/\d+/);
        if (getId) {
          const id = getId[0];
          const status = this.extractStatus(msg.body);
          if (this.memberExist(id)) {
            let member = this.getMember(id);
            if (status) {
              this.addStatusMember(id, status);
              client.sendMessage(msg.from, this.renderMemberStatus(member));
            } else if (msg.body.includes('🗑')) {
              this.removeStatusMember(id);
              client.sendMessage(msg.from, this.renderMemberStatus(member));
            }
          }
        }
        break;
    }
    this.saveJson();
  }

  extractStatus(msg){
    for (let i=1; i<=8; i++){
      if(msg.includes(STATUS_MESSAGE[i])) {
        return STATUS_MESSAGE[i];
      }
    }
    return false;
  }

  nextDay(){
    const that = this;
    for(var i = 0; i < that.data.members.length; i++){
      let member = this.data.members[i];
      if (member.status.length < that.data.day){
        member.status.push(UNKNOWN);
      }
    }
    that.data.day++;
  }

  previousDay(){
    this.data.day--;
  }

  setDay(n) {
    const _day = parseInt(n);
    if (_day) {
      this.data.day = _day;
    }
  }

  getMember(id) {
    return this.data.members.find(function(member){ return member.id === id }) || {};
  }
  
  setMember(id, config){
    let memberIndex = this.data.members.findIndex(function(member){ return member.id === id });
    if (memberIndex) {
      let new_member = {...this.data.members[memberIndex], ...config};
      this.data.members[memberIndex] = new_member;
    }
  }

  setPeriode(date){
    this.data.periode = date;
  }

  setAdmin(name){
    this.data.group.manager.admin = name;
  }

  setAsmin(name){
    this.data.group.manager.asmin = name;
  }

  setBendahara(name){
    this.data.group.manager.bendahara = name;
  }

  setPjh(index, name){
    if (this.data.groups[index]) {
      this.data.groups[index].pjh = name;
    }
  }

  addDoa(msg){
    this.data.doas.push(msg);
  }

  removeDoa(){
    this.data.doas.pop();
  }

  addMotivasi(msg){
    this.data.motivasis.push(msg);
  }

  removeMotivasi(){
    this.data.motivasis.pop();
  }

  addNote(msg){
    this.data.notes.push(msg);
  }

  removeNote(){
    this.data.notes.pop();
  }

  setImportantNote(msg){
    this.data.importantNote = msg;
  }

  changePeriode(){
    this.data.day = 1;
    this.clearStatus();
  }

  clearStatus(){
    for (let i =0; i < this.data.members.length; i++){
      this.data.members[i].status = [];
    }
  }

  totalDone(day){
    const _today = parseInt(day) ? parseInt(day) -1 : this.data.day - 1;
    return this.data.members.filter(function(member){
      return member.status[_today] && ( member.status[_today] === DONE )
    }).length;
  }

  totalFail(day){
    const _today = parseInt(day) ? parseInt(day) -1 : this.data.day - 1;
    return this.data.members.filter(function(member){
      return !member.status[_today] || ( member.status[_today] === FAIL || member.status[_today] === UNKNOWN )
    }).length;
  }

  totalUdzur(day){
    const _today = parseInt(day) ? parseInt(day) -1 : this.data.day - 1;
    return this.data.members.filter(function(member){
      return member.status[_today] && ( member.status[_today] !== FAIL && member.status[_today] !== UNKNOWN && member.status[_today] !== DONE )
    }).length;
  }

  memberExist(id){
    return this.data.members.findIndex(function(member){ return member.id === id }) > -1;
  }

  addStatusMember(id, status) {
    if (this.memberExist(id)) {
      let member = this.getMember(id);
      member.status.push(ICON_MESSAGE[status]);
      this.handleQuarantine(id);
    }
  }

  handleQuarantine(id){
    let member = this.getMember(id);
    if (this.needQuarantine(member)){
      member.quarantine = true;
    } else {
      member.quarantine = false;
    }
  }

  needQuarantine(member) {
    let hold = 0;
    let total = 0;
    for (let i =0; i < member.status.length; i++){
      let _status = member.status[i];
      if (_status === FAIL || _status === UNKNOWN){
        hold++;
        total++;
        if (hold >= 3) return true;
      } else {
        hold = 0;
      }
    }
    return total >= 4;
  }

  removeStatusMember(id){
    if (this.memberExist(id)) {
      this.getMember(id).status.pop();
      this.handleQuarantine(id);
    }
  }

  renderMessage() {
    const that = this;
    return '*بِسْـــــــــــــمِ اللّهِ الرَّحْمَنِ الرَّحِيْم*\n' +
    '\n' +
    '🔊🔊 *LIST TAHAJJUD '+ that.data.group.name +' '+ that.data.group.no +'*\n' +
    '=============================\n' +
    this.renderPeriode() +
    '=============================\n' +
    that.renderManager() +
    '\n' +
    '🔘🔘🔘TAHAJJUD🔘🔘\n' +
    '\n' +
    '*TAHU-TAHU HAJAT TERWUJUD*\n' +
    '➖➖➖➖➖➖➖➖➖➖➖\n' +
    this.renderDoas() +
    this.renderMotivasis()+
    that.renderAllGroupStatus() +
    that.renderQuarantineStatus()+
    that.renderRecap(that.data.day) +
    that.renderImportantNote() +
    '🚧🚧🚧🚪🚪🚪🚪🚧🚧🚧\n\n' +
    that.renderNote();
  }

  getMembersOfGroup(group){
    const that = this;
    return that.data.members.filter(function(member){
      return member.group === group.id && !member.quarantine
    })
  }

  getQuarantineMembers(){
    const that = this;
    return that.data.members.filter(function(member){
      return !!member.quarantine;
    })
  }

  renderStatus(status) {
    return status.map(function(stat){
      return STATUS_MESSAGE[stat];
    }).join('')
  }

  renderGroupHeader(group) {
    return group.icon + '*'+ group.name.toUpperCase() +'*\n' +
      '============\n' +
      '🧕🏻 PJH: *'+ group.pjh.toUpperCase() +'*\n' +
      '➖➖➖➖➖➖➖➖\n';
  }

  renderGroupStatus(group) {
    const that = this;
    return this.renderGroupHeader(group) +
      that.getMembersOfGroup(group).map(function(member){
        return that.renderMemberStatus(member);
      }).join('\n');
  }

  renderMemberStatus(member) {
    const that = this;
    return `*${member.id}. ${member.name} (${member.city})*\n` +
      `${member.phone}\n` +
      `${that.renderStatus(member.status)}`;
  }

  renderPeriode() {
    const that = this;
    return '📅 Periode '+ that.data.periode +'\n';
  }

  renderManager() {
    const that = this;
    return '0⃣0⃣ '+ that.data.group.manager.admin +' - Admin K-'+ that.data.group.no +'\n' +
    '0️⃣0️⃣ '+ that.data.group.manager.asmin +' - Asmin K-'+ that.data.group.no +'\n' +
    '0⃣0⃣ '+ that.data.group.manager.bendahara +' - Bendahara K-'+ that.data.group.no +'\n';
  }

  renderDoas() {
    const that = this;
    if (this.data.doas.length > 0) {
      return '📚📖 *List Doa :*\n\n' +
        that.data.doas.map(function(doa) {
          return doa;
        }).join('\n')+'\n';
    }
    return "";
  }

  renderMotivasis() {
    const that = this;
    if (this.data.motivasis.length > 0){
      return '📚✊🏻 *List Motivasi :*\n' +
        that.data.motivasis.map(function(motivasi){
          return motivasi;
        }).join('\n')+'\n\n';
    }
    return "";
  }

  renderImportantNote() {
    const that = this;
    if (that.data.importantNote){
      return '*_'+that.data.importantNote.toUpperCase()+'_*\n\n';
    }
    return "";
  }

  renderNote() {
    const that = this;
    if (this.data.notes.length > 0){
      return '*📌Catatan*\n' +
        that.data.notes.map(function(note) {
          return note;
        }).join('\n');
    }
    return "";
  }

  renderQuarantineStatus(){
    const that = this;
    let members =  that.getQuarantineMembers();
    let result = '_Tidak Ada_';
    if (members.length > 0) {
      result = members.map(function(member){
        return that.renderMemberStatus(member);
      }).join('\n');
    }
    return '*🔺KARANTINA🔺*\n' +
      '===============\n' +
      result+'\n\n';
  }

  renderAllGroupStatus(){
    const that = this;
    return '🇹🇷🇹🇷 '+ that.data.group.name.toUpperCase() +'\n' +
      that.data.groups.map(function(group){
        return that.renderGroupStatus(group);
      }).join('\n\n')+'\n\n';
  }

  renderNotRecaped(day){
    const that = this;
    const _day = parseInt(day);
    let members = this.data.members.filter(function(member) {
      return !member.status[_day-1] || member.status[_day-1] === UNKNOWN;
    });
    if (members.length > 0){
      return `* 📅 BELUM RECAP HARI KE-${_day} *\n` +
        `===============*${members.length} orang*\n` +
        members.map(function(member){
          return that.renderMemberStatus(member);
        }).join('\n');
    }
    return `* 📅 RECAP HARI KE-${_day} LENGKAP *`
  }

  getOverallStatus(members, day){
    let overall = {
      DONE: 0,
      FAIL: 0,
      HAID: 0,
      SICK: 0,
      NIFAS: 0,
      UNKNOWN: 0,
      IZIN: 0,
      PERGI: 0
    };
    for (let i = 0; i < members.length; i++){
      overall[STATUS_STRING[members[i].status[day-1]]]++;
    }
    return overall;
  }

  convertInt(i) {
    return i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  }

  renderRecap(day){
    const _day = parseInt(day);
    const that = this;
    const ovstat = this.getOverallStatus(that.data.members, _day);
    return `*⚖️ PERHITUNGAN HARI KE-${day} ⚖️*\n` +
    '==================\n' +
    '💯 : '+ that.convertInt(ovstat.DONE) +'\n' +
    '😭 : '+ that.convertInt(ovstat.FAIL) +'\n' +
    '🚺 : '+ that.convertInt(ovstat.HAID) +'\n' +
    '😷 : '+ that.convertInt(ovstat.SICK) +'\n' +
    '🚼 : '+ that.convertInt(ovstat.NIFAS) +'\n' +
    '❌ : '+ that.convertInt(ovstat.UNKNOWN) +'\n' +
    'ℹ️ : '+ that.convertInt(ovstat.IZIN) +'\n' +
    '🚗 : '+ that.convertInt(ovstat.PERGI) +'\n' +
    '👭🏻 : '+ that.data.group.member +'\n\n';
  }

  renderPercentage(day){
    const tDone = this.totalDone(day);
    const tUdzur = this.totalUdzur(day);
    const total = this.data.members.length;
    let _percentage = Math.round((tDone/(total - tUdzur)) * 100);
    return `💯 #0${this.data.group.no}#0${this.data.group.no}#${tDone}/${total}-${this.convertInt(tUdzur)}=${_percentage}%_${this.data.group.manager.admin}`;
  }

  robotResponse(msg, success){
    let _stat = success === undefined ? "" : (success ? '✅' : '🚫');
    return `🤖 : ${msg} ${_stat}`;
  }

  helpMessage() {
    return `*HELP*
➖➖➖➖➖➖➖➖➖➖➖
*>> <NOMOR>. <NAMA> <ICON>*
_Update status._
_Contoh: '>> 1. Fulanah 💯'_
_Contoh (short): '>> 1 💯'_

*>> recap*
_Melihat recap terakhir._

*>> recap-hari <N>*
_Melihat status recap di hari ke-N. Dan mengubah perhitungan menjadi Hari ke-N._
_Contoh: '>> recap-hari 3'_

*>> belum-recap*
_Me-list daftar nama yang belum recap pada hari ke-N._

➖➖➖➖➖➖➖➖➖➖➖

*>> ubah-periode*
_Update periode._
_Contoh: '>> ubah-periode 26 April - 3 Mei 2021'

*>> ubah-pjh <GRUP KE-N> <NAMA>*
_Ubah PJH grup._
_Contoh: '>> ubah-pjh 2 Fulanah'_

*>> ubah-admin | ubah-asmin | ubah-bendahara <NAMA>*
_Update pengelola._
_Contoh: '>> ubah-admin Fulanah_Binti_Fulan'_

➖➖➖➖➖➖➖➖➖➖➖

*>> tambah-doa <PESAN>*
_Menambahkan list doa._

*>> hapus-doa*
_Menghapus doa terakhir dari list doa._

*>> tambah-motivasi <PESAN>*
_Menambahkan list motivasi._

*>> hapus-motivasi*
_Menghapus motivasi terakhir dari list motivasi._

*>> tambah-catatan <PESAN>*
_Menambahkan list catatan._

*>> hapus-catatan*
_Menghapus catatan terakhir dari list catatan._

*>> ubah-catatan-penting <PESAN>*
_Mengubah catatan penting._

➖➖➖➖➖➖➖➖➖➖➖

*>> help*
_Kumpulan perintah._`;
  }
}

module.exports = MuslimahQiyamBot;