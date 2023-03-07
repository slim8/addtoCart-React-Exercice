import { Product } from '../types/product';

type ItemProps = Product & {
  addProductToCart?: (product: Product) => void;
  removeProductFromCart?: (id: number) => void;
};

// Afficher le contenu du produit, ainsi qu'un bouton "+" si la méthode
// `addProductToCart` est passée, ou un bouton "-"
// si la méthode `removeProductFromCart` est passée
export default function Item({
  id,
  product,
  price,
  addProductToCart,
  removeProductFromCart,
}: ItemProps) {
  return (
    <li>
      {addProductToCart && (
        <button onClick={() => addProductToCart({ id, product, price })}>
          add to cart
        </button>
      )}
      {removeProductFromCart && (
        <button onClick={() => removeProductFromCart(id)}>
          remouve from cart
        </button>
      )}
      {id} : {product} ---- {price} $
    </li>
  );
}
