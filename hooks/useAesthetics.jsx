import { useQuery } from '@tanstack/react-query';
import fetchAesthetics from '../lib/fetchAesthetics';

const useAesthetic = (url) => {
  return useQuery({ queryKey: ["aesthetics",], queryFn: () => fetchAesthetics(url) })
};

export default useAesthetic;
