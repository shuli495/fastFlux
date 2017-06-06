class CommonAddressApp extends React.Component  {
    constructor(props) {
        super(props);
    }

    render() {
        {
            var provinceDOM = [<option value="">市</option>];
            provinceDOM.push(<option value="北京">北京</option>);
            provinceDOM.push(<option value="上海">上海</option>);
        }

        return (
            <span className="address_component">
                    <select ref="province" onChange={this.handleSelectProvince}>{provinceDOM}</select>
            </span>
        );
    }
}

module.exports = CommonAddressApp;