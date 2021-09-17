import React from 'react';
import { Button } from 'antd';
import './styles/index.less';
import styles from './styles/index.modules.less'
import test from './json/test.json';
import imgSrc3 from './images/header_icon2.png';

export default class Page1 extends React.Component {
    state = {
        a: 2,
    }
    render() {
        return <div>
            {/* react状态测试 */}
            <Button onClick={() => {
                this.setState({a: ++this.state.a})
            }}>React状态测试{this.state.a}</Button>
            <br/><br/>
            {/* antd组件测试 */}
            <Button>antd组件测试</Button>
            <br/><br/>
            {/* less文件测试 */}
            <div className="lessBox"><div>aa</div></div>
            <br/><br/>
            {/* css modules文件测试 */}
            <div className={styles.modulesBox}><div>aa</div></div>
            <br/><br/>
            {/* svg文件测试 */}
            <div className="svg"><div>aa</div></div>
            <br/><br/>
            {/* 图片加载测试 */}
            <img src={imgSrc3}></img>
            <br/><br/>
            {/* json取值测试 */}
            <div>{test.aa}</div>
            <br/><br/>
            {/* 静态文件测试 */}
            <img src="../../static/avatar.png"></img>
        </div>
    }
}
