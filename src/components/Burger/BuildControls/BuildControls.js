import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {

    const controls = [
        {label: "Salad", type: "salad" },
        {label: "Bacon", type: "bacon" },
        {label: "Cheese", type: "cheese" },
        {label: "Meat", type: "meat" },
        
    ]

    return <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => 
            <BuildControl 
                added={() => props.ingredientsAdded(ctrl.type)} 
                removed={() => props.ingredientsRemoved(ctrl.type)}
                key={ctrl.label} 
                label={ctrl.label} 
                disabled={props.disabled[ctrl.type]}
                type={ctrl.type}  />
        )}
    </div>
};

export default BuildControls;