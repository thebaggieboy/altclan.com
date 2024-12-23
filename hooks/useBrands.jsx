import { useQuery } from '@tanstack/react-query';
import fetchBrands from "../lib/fetchBrands"

const useBrands = (url) => {
  return useQuery({ queryKey: ["brands",], queryFn: () => fetchBrands(url) })
};

export default useBrands;
