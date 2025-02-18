import { useQuery } from '@tanstack/react-query';
import fetchPayments from "../lib/fetchPayments"

const usePayment = (url) => {
  return useQuery({ queryKey: ["payments",], queryFn: () => fetchPayments(url) })
};

export default usePayment;
