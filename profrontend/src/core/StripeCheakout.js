import React, {useState, useEffect} from 'react';
import { isAutheticated } from '../auth/helper';
import { cardEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheakoutButton from 'react-stripe-checkout';
import { API} from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheakout = ({products, setReload = f => f, reload= undefined}) => {
    
    const [data, setData] = useState({
        loading: false,
        success:false,
        error: "",
        address: ""
    });

    const token = isAutheticated() && isAutheticated().token
    const userId = isAutheticated() && isAutheticated().user._id

    const getFinalAmount = () => {
      let amount=0
      products.map(p => {
          amount = amount+p.price;
      })
      return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body : JSON.stringify(body)
        }).then(response => {
            console.log(response);
            //call further mehods
         //   const orderData = {
            //    products: products,
             //   transaction_id: response.transaction.id,
             //   amount : response.transation.amount
         //   }
         //   createOrder(userId, token, orderData);
            const {status} = response ;
           console.log("STATUS",status); 
         
           cardEmpty(() => {
               console.log("did we got a crash?");
          });
          setReload(!reload);
        }).catch(error => console.log(error));
    };

    const showStripButton = () => {
        return isAutheticated() ? (
            <StripeCheakoutButton
            stripeKey="pk_test_kwnsP4VtLQA7kSOQgmBRrdOr00T74hHur5"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress

            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheakoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        );
    };



    return (
        <div>
            <h3 className="text-white">Stripe CheakOut {getFinalAmount()}</h3>
            {showStripButton()}
        </div>
    );
};

export default StripeCheakout;
