import { getProducts } from '@/lib/catalog';
import { CartPage } from '@/components/cart-page';
export default async function Cart(){return <CartPage products={await getProducts()}/>;}
