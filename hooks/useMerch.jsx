import { useQuery } from '@tanstack/react-query';
import fetchProducts from "../lib/fetchProducts"

const useMerch = (url) => {
  return useQuery({ queryKey: ["products",], queryFn: () => fetchProducts(url) })
};

export default useMerch;
