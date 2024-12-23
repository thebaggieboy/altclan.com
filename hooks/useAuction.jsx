import { useQuery } from '@tanstack/react-query';
import fetchProducts from "../lib/fetchProducts"
import fetchAuction from '../lib/fetchAuction';


const useAuction = (url) => {
  return useQuery({ queryKey: ["auction",], queryFn: () => fetchAuction(url) })
};

export default useAuction;
