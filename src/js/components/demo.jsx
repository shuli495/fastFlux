import BaseComponents from 'components/common/baseComponents.jsx';
import CommonPageApp from 'components/common/page.jsx';
import CommonAddressApp from 'components/common/address.jsx';
import DemoStore from 'stores/demo.jsx';

class DemoApp extends BaseComponents {
    constructor(props) {
            super(props, DemoStore);

            this.handleQuery = this.handleQuery.bind(this);
            this.handleInfo = this.handleInfo.bind(this);
            this.handleUpdate = this.handleUpdate.bind(this);
            this.handleDel = this.handleDel.bind(this);
    }

    handleQuery(pageNum) {
        DemoStore.page(pageNum, this.refs.schUsername.value, this.refs.schAddressApp.refs.province.value);
    }

    handleInfo(id,username,address) {
        if(typeof(id) == "undefined" || id == "undefined" || typeof(id) == "object" || id == "") {
            this.refs.id.value= "";
            this.refs.username.value = "";
            this.refs.schAddressApp.refs.province.value = "";

            this.refs.addBut.style.display = "";
            this.refs.updateBut.style.display = "none";
            this.refs.delBut.style.display = "none";
        } else {
            this.refs.id.value= id;
            this.refs.username.value = username;
            this.refs.address.refs.province.value = address;

            this.refs.addBut.style.display = "none";
            this.refs.updateBut.style.display = "";
            this.refs.delBut.style.display = "";
        }
    }

    handleUpdate() {
        var username = this.refs.username.value;
        var address = this.refs.address.refs.province.value;

        if(!$util_validateValue("user_info")) {
            return;
        }

        var id = this.refs.id.value;
        if(typeof(id) == "undefined" || id == "undefined" || id == "") {
            DemoStore.add(username,address);
        } else {
            DemoStore.update(id,username,address);
        }
        $("#info_close").click();
    }

    handleDel() {
        DemoStore.del(this.refs.id.value);
        $("#info_close").click();
    }

    render(){
        {
            var usersDOM = [];
            for (var i = 0; i < this.state.infos.length; i++) {
                var id = typeof(this.state.infos[i].id) == "undefined" ? "" : this.state.infos[i].id;
                var username = typeof(this.state.infos[i].username) == "undefined" ? "" : this.state.infos[i].username;
                var address = typeof(this.state.infos[i].address) == "undefined" ? "" : this.state.infos[i].address
                usersDOM.push(
                                        <tr>
                                            <td>
                                                <a href="#" className="fa fa-pencil-square-o" data-toggle="modal" data-target="#user_info" onClick={this.handleInfo.bind(this,id,username,address)}></a>
                                            </td>
                                            <td>{id}</td>
                                            <td>{username}</td>
                                            <td>{address}</td>
                                        </tr>
                                      );
            }
        }

        return (
            <div className="content table-responsive">
                <div className="search_content">
                    <input type="text" placeholder="用户名" ref="schUsername" />
                    <CommonAddressApp ref="schAddressApp"/>
                    <button className="button button-primary button-circle button-small" onClick={this.handleQuery.bind(this,1)}><i className="fa fa-search"></i></button>
                </div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="edit_th"><a href="#" className="fa fa-plus" data-toggle="modal" data-target="#user_info" onClick={this.handleInfo}></a></th>
                            <th>ID</th>
                            <th>用户名</th>
                            <th>地址</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersDOM}
                    </tbody>
                </table>

                <CommonPageApp total={this.state.total} pageSize={this.state.pageSize} pageNum={this.state.pageNum} handleQuery={this.handleQuery} />

                <div className="modal fade" id="user_info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" id="info_close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body search_content add_content">
                                <input type="hidden" ref="id" />
                                <input type="hidden" ref="status" />
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label class="col-sm-2 control-label">用户名</label>
                                        <div className="col-sm-9">
                                          <input type="text" placeholder="1-32个汉字或字母" ref="username" data-errMsgId="usernameError" data-max="32" data-maxText="1-32个汉字或字母"/>
                                           <div id="usernameError" className="errorMsg"></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label class="col-sm-2 control-label">地址</label>
                                        <div className="col-sm-9">
                                           <CommonAddressApp ref="address"/>
                                           <div id="addressError" className="errorMsg"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button button-primary button-rounded button-small" ref="addBut" onClick={this.handleUpdate}>添加</button>&nbsp;
                                <button type="button" className="button button-caution button-rounded button-small" ref="delBut" onClick={this.handleDel}>删除</button>&nbsp;
                                <button type="button" className="button button-primary button-rounded button-small" ref="updateBut" onClick={this.handleUpdate}>修改</button>&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DemoApp;