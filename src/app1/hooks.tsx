import React, { useReducer, useState } from 'react';
import {
    Button,
    Input,
} from 'antd';
import './styles/test/index.less';
console.log('hooks1')
export const HooksDemo: React.FC = () => {
    const [test1, setTest1] = useReducer((state, action) => {
        console.log('111', action)
        return state
    }, 1)
    const [test2, setTest2] = useReducer((state, action) => {
        console.log('222', action)
        return state
    }, 1)
    console.log([

        ...test1===2&&[<div>1111</div>],
    ])
    return <div>
        <Button onClick={() => {
            setTest1(1)
            setTest1(1)
        }}>test1</Button>

        <Button onClick={() => {
            setTest2(1)
        }}>test2</Button>
        <Input></Input>
        <div>111124567</div>
    </div>
}
