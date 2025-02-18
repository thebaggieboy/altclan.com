import { useQuery } from '@tanstack/react-query';
import fetchOrders from "../lib/fetchOrders"

const useOrder = (url) => {
  return useQuery({ queryKey: ["orders",], queryFn: () => fetchOrders(url) })
};

export default useOrder;
