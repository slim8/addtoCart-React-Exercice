import { useEffect, useState } from 'react';
import Item from './Item';
import { Product } from '../types/product';

type Products = ReadonlyArray<Product>;

function App() {
  const [product, setProduct] = useState<Products>([]);
  const [cart, setCart] = useState<Product[]>([]);
  // Créer deux `useState` qui contiendra les produits chargés,
  // et les produits dans le panier
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data: Products) => setProduct(data));
  }, []);
  // Utiliser useEffect pour charger la liste des produits,
  // comme fetch('/products.json')

  const removeProductFromCart = (id: number) => {
    const recupirated = cart.find((item) => item.id === id);
    if (recupirated) {
      setProduct([...product, recupirated]);
    }
    const updated = cart.filter((item) => item.id != id);
    setCart(updated);
  };

  const addProductToCart = (productItem: Product) => {
    setCart([...cart, productItem]);
    const updated = product.filter(
      (item: Product) => item.id != productItem.id
    );
    setProduct(updated);
  };
  return (
    <>
      <h1>Shopping time</h1>
      {product.map((item) => (
        <Item
          id={item.id}
          product={item.product}
          price={item.price}
          addProductToCart={addProductToCart}
        />
      ))}

      <h2>Panier</h2>
      {cart.map((item) => (
        <Item
          id={item.id}
          product={item.product}
          price={item.price}
          removeProductFromCart={removeProductFromCart}
        />
      ))}
    </>
  );
}

export default App;
