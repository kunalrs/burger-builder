import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kunal Sagar',
                address: {
                    street: 'charkop sector 2',
                    zipCode: 400067,
                    country: 'India'
                },
                email: 'rockcool19@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }).catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
        
        this.setState({
            loading: true
        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return (sum + el);
            }, 0);
        
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        
        if(oldCount <= 0)
            return;

        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceAddition;

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredient);
    }

    render() {

        let orderSummary = <OrderSummary 
                                price={this.state.totalPrice} 
                                purchaseCancel={this.purchaseCancelHandler} 
                                purchaseContinue={this.purchaseContinueHandler} 
                                ingredients={this.state.ingredients} />;
        if(this.state.loading)
            orderSummary = <Spinner />;

        const disabledInfo = {
            ...this.state.ingredients
        }; 

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ordered={this.purchaseHandler}
                    totalPrice={this.state.totalPrice}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ingredientsAdded={this.addIngredientHandler} 
                    ingredientsRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);