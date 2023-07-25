import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/http-client';

const MockQueryProvider = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default MockQueryProvider;
