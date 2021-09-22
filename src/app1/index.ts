import 'core-js/stable';
import 'regenerator-runtime/runtime';
import lodash from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import Page1 from './page';
import './test';

console.log('app1', process.env.NODE_ENV);
console.log('app1', process.env.environment);
console.log('lodash', lodash);
console.log('lodash', '1'==='1');
// const a: any = 1

ReactDom.render(
    React.createElement(Page1),
    document.getElementById('app1'),
)

// @ts-ignore
module['hot'] && module['hot'].accept()
