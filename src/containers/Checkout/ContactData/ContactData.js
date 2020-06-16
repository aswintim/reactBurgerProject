import React, {Component} from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component{
state={
    orderForm:{
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Zip Code'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: 'fastest', displayValue: 'Fastest'},
                {value:'cheapest', displayValue: 'Cheapest'}]
            },
            value: ''
        }
    },
    loading: false
}

orderHandler=()=>{
    // event.preventDefault();

    const order = {
            ingredients : this.props.ings,
            price: +this.props.price,
            customer: {
                name: this.state.orderForm.name.value,
                address: this.state.orderForm.street.value,
                email: this.state.orderForm.email.value,
                zipcode: this.state.orderForm.zipCode.value,
                country: this.state.orderForm.country.value
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value

        }

        this.setState({loading: true})
        axios.post('/orders.json', order)
        .then(response=>{
            console.log(response)
            this.setState({loading: false})
            this.props.history.push('/');

        })
        .catch(error=>{
            console.log(error)
            this.setState({loading: false})
        })
}


changeHandler= (event, identifier)=>{
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[identifier]};
    updatedFormElement.value = event.target.value;
    updatedOrderForm[identifier] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm})
}

render(){

let dummyForm = [];

for(let key in this.state.orderForm){
    dummyForm.push({
        id: key,
        config: this.state.orderForm[key]
    })
}

let form = (

    <form style={{width: '100%'}}>        
        {dummyForm.map(formElement=>(
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.changeHandler(event, formElement.id)}
            /> 
        ))}               
        <Button btnType='Success' onClick={this.orderHandler}>Submit</Button>
        </form>
)

if (this.state.loading){
    form = <Spinner />
}

return(
<div className={classes.form}>
<h1>Your Contact Information</h1>
    {form}
</div>
)
}

}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);