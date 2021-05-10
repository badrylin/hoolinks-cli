import { chunk } from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import Page2 from './page';

console.log('app2');

ReactDom.render(
    React.createElement(Page2),
    document.getElementById('app1'),
)
