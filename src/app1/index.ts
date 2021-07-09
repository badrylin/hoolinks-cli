import "core-js/stable";
import "regenerator-runtime/runtime";
import { chunk } from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import Page1 from './page';
import './test';

console.log('app1', process.env.NODE_ENV);
console.log('app1', process.env.environment);
console.log('app3', process.env.environment);

ReactDom.render(
    React.createElement(Page1),
    document.getElementById('app1'),
)

module['hot'] && module['hot'].accept()
