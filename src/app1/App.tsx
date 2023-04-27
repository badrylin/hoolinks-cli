import React, { useReducer, useState } from 'react';
import { Button, Input, Table } from 'antd';
import './styles/index.less';
import styles from './styles/index.modules.less';
import avatar from './images/avatar.png';
import test from './json/test.json';
import { curry } from 'lodash-es';

console.log(curry);

export const App: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      {/* 静态文件测试 */}
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <img src="../../static/avatar.png"></img>
        <div style={{ marginTop: 50 }}>
          <Button size="large" onClick={() => setCount(count + 1)}>
            count: {count}
          </Button>

          <div>text: 22</div>

          {/* less样式测试 */}
          <div>
            less: <div className="svg">aa</div>
          </div>

          {/* css modules文件测试 */}
          <div>
            css modules:
            <div className={styles.modulesBox}></div>
          </div>

          {/* 图片加载测试 */}
          <div>
            图片: <img width={20} src={avatar}></img>
          </div>

          {/* json取值测试 */}
          <div>JSON:{test.aa}</div>

        </div>
      </div>
    </>
  );
};
