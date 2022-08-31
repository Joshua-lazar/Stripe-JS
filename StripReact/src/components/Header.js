// Init
import React,{useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
// Component
export default function Header() {

  const publishablekey = 'pk_test_51LcnVIAMsbok33p5V9yjzWHHnyOBFF2jugWw7XO7wYPdH3e6LAfix4LLziooSMe3e6FvcDjsS1qnwoK2mDN8veGn00svQEJCVk'
  const [product, setProduct] = useState({
    name:"Macebook pro M1 ",
    price: 1200
  })
  const priceForStripe =  product.price * 100 ;
  const payNow = async token  => {

    try
    {
      const   response = await axios({
        url:"http://localhost:9000/payment",
        method:'post',
        data:{
          amount :product.price * 100 ,
          token
        }
      })
      if(response === 200)
      {
        console.log('your payment was sucessful')
      }

    }
    catch(error)
    {
      console.log(error)
    }
  }
    return (
    <div>
      <h1>React Stripe payment integration</h1>
      <p>

        <span>Product : </span>
        {product.name}
      </p>

      <p>
        <span>Price : </span>
        {product.price}
      </p>
      <StripeCheckout
      stripeKey ={publishablekey}
      label="pay Now"
      name="Pay with Credit Card"
      billingAddress
      shippingAddress
      amount={priceForStripe}
      description = {`Your total is ${product.price}`}
      token={payNow}
      />
    </div>
  );
}
