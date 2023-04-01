import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const API_URL = process.env.STRAPI_URL || "http://localhost:1337"

import '@/styles/globals.css'
import Layout from '@/components/Layout';

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <Layout><Component {...pageProps} /></Layout></ApolloProvider>
}
