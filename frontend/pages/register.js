import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '@/components/Form';
import { useAuth } from '@/context/AuthContext';
import Cookie from "js-cookie";
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function RegisterRoute() {
  const { setUser } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleRegister = async () => {
    const { email, password } = formData
    const { data } = await registerMutation({ variables: { username: email, email: email, password } })
    console.log(data, "on registyer")
    debugger;
    setUser(data.register.user);
    router.push("/")
    Cookie.set("token", data.register.jwt);
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <Form
    title="Sign Up"
    buttonText="Sign Up"
    formData={formData}
    setFormData={setFormData}
    callback={handleRegister}
  />
}
