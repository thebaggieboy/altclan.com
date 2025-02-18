import { useQuery } from '@tanstack/react-query';
import fetchCustomers from "../lib/fetchCustomers"

const useCustomer = (url) => {
  return useQuery({ queryKey: ["customers",], queryFn: () => fetchCustomers(url) })
};

export default useCustomer;
