var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DemoStore = assign({}, EventEmitter.prototype, {
  data: {
       database:[{"id":"1","username":"user1","address":"北京"}, {"id":"2","username":"user2","address":"上海"}],
	infos: [{"id":"1","username":"user1","address":"北京"}, {"id":"2","username":"user2","address":"上海"}],
      	total: 1,
      	pageSize: 10,
      	pageNum: 1
  },

  page: function (pageNum,username,address) {
      this.data.infos.length = 0;
      for(var i=0;i<this.data.database.length;i++) {
        if((username == "" && address == "") || this.data.database[i].username == username || this.data.database[i].address == address) {
          this.data.infos[this.data.infos.length] = this.data.database[i];
        }
      }
      this.emit('change');
    // $.ajax({
    //     type : "GET",
    //     dataType: "json",
    //     url: $setting.serverUrl + 'client?pageNum='+pageNum,
    //     success: function(result) {
    //     	this.data.infos = result.data.dataList;
    //           this.data.pageNum = pageNum;
    //           this.data.total = result.data.page.totalCount;
    // 	       this.emit('change');
    //     }.bind(this),
    //     error: function(xhr, type, exception) {
    //             $util_alertMsg(xhr);
    //     }.bind(this)
    // });
  },

  add: function (username,address) {
    this.data.database[this.data.database.length] = {"id":Math.random(),"username":username,"address":address};
    this.page(1,"","");
  },

  update: function (id,username,address) {
      for(var i=0;i<this.data.database.length;i++) {
        if(this.data.database[i].id == id) {
            this.data.database[i].username = username;
            this.data.database[i].address = address;
        }
      }
      this.page(1,"","");
  },

  del: function (id) {
      var temp = [];
      for(var i=0;i<this.data.database.length;i++) {
        if(this.data.database[i].id != id) {
          temp[temp.length] = this.data.database[i];
        }
      }
      this.data.database = temp;
      this.page(1,"","");
  }
});

module.exports = DemoStore;
