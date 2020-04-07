import React from 'react';
import classes from '../Button.module.css';

const Button = props => (
    <button className={[classes.Button, classes[props.buttonType]].join(' ')} onClick={props.onClick}>
        {props.children}
    </button>
);