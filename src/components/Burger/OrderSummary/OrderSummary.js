import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .filter(igKey => props.ingredients[igKey] > 0) //show only if there is atleast 1 item
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}</li>
        });

     return <Aux>
         <h3>Your Order</h3>
         <p>A delicious burger with following ingredients</p>
         <ul>
             {ingredientSummary}
         </ul>
         <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
         <p>Continue to checkout?</p>
         <Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
         <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
     </Aux>;
}

export default OrderSummary;