import { chunk } from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import Page2 from './page';

ReactDom.render(
    React.createElement(Page2),
    document.getElementById('app2'),
)
