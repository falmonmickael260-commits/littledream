import { getProducts } from '@/lib/catalog';
import { PackBuilder } from '@/components/pack-builder';

export default async function Packs({searchParams}:{searchParams:Promise<{modifier?:string; selection?:string}>}) {
  const query = await searchParams;
  return <PackBuilder products={await getProducts()} editKey={query.modifier} selection={query.selection}/>;
}
