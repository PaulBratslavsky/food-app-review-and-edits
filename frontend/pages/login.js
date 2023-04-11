import { useState } from 'react'
import { useRouter } from 'next/router';
import Form from '@/components/Form'
import { useAuth } from '@/context/AuthContext'
import Cookie from "js-cookie";
import { gql, useMutation } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function LoginRoute() {
  const { setUser } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = async () => {
    const { email, password } = formData
    const { data } = await loginMutation({ variables: { identifier: email, password } })
    setUser(data.login.user);
    router.push("/")
    Cookie.set("token", data.login.jwt);
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <Form
    title="Login"
    buttonText="Login"
    formData={formData}
    setFormData={setFormData}
    callback={handleLogin}
  />
}
