# fastFlux
基于flux的快速开发框架

## 目录结构
> **/build** jsx编译后js存放目录  

> **/src/page** 前端页面  

> **/src/css** CSS  
> **/src/css/common** 公共CSS  

> **/src/js** JS脚本  
> **/src/js/common** 公共JS  
> **/src/js/stores** FLUX stores层
> **/src/js/components** FLUX components层  
> **/src/js/components** 公共commonents组件

> **import XXX from 'js/YYY.js'** 引用/src/js/YYY.js  
> **import XXX from 'commonJs/YYY.js'** 引用/src/js/common/YYY.js  
> **import XXX from 'components/YYY.jsx'** 引用/src/components/YYY.jsx  
> **import XXX from 'components/common/YYY.jsx'** 引用/src/components/common/YYY.jsx  
> **import XXX from 'stores/YYY.jsx'** 引用/src/stores/YYY.jsx  

## 使用说明
1. 前端页面body增加class="XXX"
2. body最下方增加init.js的引用
```
<body class="demo">
	<div id="demo_content"></div>
	<script src="/src/js/common/init.js"></script>
</body>
```
init.js会自动引用/src/css/XXX.css, /src/js/XXX.js, /build/XXX.js

3. 组件层继承BaseComponents，构造器中向父类传入stores层。  
render中return必须有且只有一个顶级容器包含所有DOM。

```
import BaseComponents from 'components/common/baseComponents.jsx';
import DemoStore from 'stores/demo.jsx';

class DemoApp extends BaseComponents {
    constructor(props) {
        super(props, DemoStore);
        
        this.handleQuery = this.handleQuery.bind(this);
    }
    
    handleQuery() {
        DemoStore.query();
    }
    
    render() {
        {
            // javascript
            var DOM = [];
            var data = this.state;
            DOM.push(<p>{data}</p>);
        }

        return (
            <div>
                // DOM
                {DOM}
            </div>
        );
}
}

module.exports = DemoApp;
```
继承后，组件层可使用一下方法：  
> **this.state或this.getData()** 获取store层的data数据  
> **this.setData(json)** 设置store层的data数据（参数key-value形式的json）  
> **componentDidMount(){}** 组件加载完成后执行的方法，组件中从写即可，修改数据后需要调用this.reloading()刷新  
> **this.reloading()或this.rechange()** 刷新组件

4. stroe层格式  
"data"变量名称不能变，否则组件层this.state或this.getData()无法获取数据。  
方法修改数据后，需要调用"this.emit('change');"来刷新组件。
```
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DemoStore = assign({}, EventEmitter.prototype, {
  data: {
    // json data
  },

  query: function () {
    this.emit('change');
  },

  add: function (username,address) {
    // do add
    this.query();
  },

  update: function (id,username,address) {
    // do update
    this.query();
  },

  del: function () {
    // do del
    this.query();
  }
});

module.exports = DemoStore;

```

## init.js
路径：/src/js/common/init.js  

自动加载setting.js、util.js 页面组件等可直接使用  
使用CDN加载bootstrap、buttons、font-awesome、react、react-dom、jquery、jquery.cookie   
根据body的className自动加载/src/css/className.css、/src/js/className.js、/build/className.
js下的同名文件

## setting.js
路径：/src/js/common/setting.js

可直接使用$setting.XXX访问setting.js中的变量

## util.js
路径：/src/js/common/util.js

**$util_getMsg(xhr, callback)**  
获取ajax返回异常数据。
xhr：异常xhr   
callback：回调函数

**$util_alertMsg(xhr,msg,callback)**  
获取ajax返回异常数据，并弹出，错误代码400以上弹红色错误框，400以下弹绿色正确框。
xhr：异常xhr  
msg：自定义异常信息，不填去xhr的返回信息  
callback：回调函数

**$util_alertStr(msg)**  
弹出绿色框信息。
msg：弹出信息

**$util_checkMail(mail)**  
验证邮箱格式 正确返回true 错误或空返回false。

**$util_validateValue(fatherId)**  
验证fatherId下的子input控件的数据，验证通过返回true，验证失败返回false。  
fatherId 父控件id，校验该控件下的控件的数据  

```
增加以下input属性，实现校验：

data-errMsgId：显示错误信息的div的id  
data-empty：true/false 是否非空  
data-emptyText：如果为空提示文本  
data-min：最小长度  
data-minText：最小长度提示文本  
data-max：最大长度  
data-maxText：最大长度提示文本  
data-length：非空长度长度  
data-lengthText：非空长度长度提示文本  
data-include：非空包含  
data-includeText：非空包含提示文本  
data-same：与id的value是否相同  
data-sameText：与id的value是不同提示文本  
data-mail：邮箱格式  
data-mailText：邮箱格式不正确提示文本
```



## 更新内容
```
1.0

- 自动引用css、js
- 公共baseComponents组件，其他组件继承此组件，简化组件开发流程

```
