
import React, {useState, useEffect}from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";


import { loadCart } from './helper/cartHelper';
import Card from './Card';
import StripeCheakout from './StripeCheakout';

const Cart = () => {
    const [products, setproducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      setproducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2> 
                    This seaction is to load products
                </h2>
                {products.map((product, index) => (
                  <Card
                  key = {index}
                  product={product}
                  removeFromcart={true}
                  addtoCart={false}
                  setReload={setReload}
                  reload={reload}
                  />
                ))}
            </div>
        );
    };

    const loadCheakout = () => {
        return (
            <div>
                <h2> 
                    this section is for cheakout
                </h2>
            </div>
        )
    }

   

    return (
        <Base title="cart Page" description="Ready to cheakout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6"><StripeCheakout
                    products={products}
                    setReload = {setReload}
                 />
                </div>
            </div>
        </Base>
    );
}


export default Cart;
