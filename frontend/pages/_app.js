import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css'
import Layout from '@/components/Layout';

const API_URL = process.env.STRAPI_URL || "http://localhost:1337"

export const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider><Layout><Component {...pageProps} /></Layout></AuthProvider>
    </ApolloProvider>
  )
}