import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Cookie from "js-cookie";
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

import Head from "next/head";
import Link from "next/link";

function Navigation() {
  const { user, setUser, setShowCart } = useAuth();
  const router = useRouter();

  function handleLogout() {
    setUser(null);
    Cookie.remove("token");
    router.push("/");
  }

  return (
    <nav className="container mx-auto flex justify-between p-6 px-4">
      <div className="flex justify-between items-center w-full">
        <div className="xl:w-1/3">
          <Link
            className="block text-2xl max-w-max text-green-500 hover:text-green-900 font-medium"
            href="/"
          >
            Food Order App
          </Link>
        </div>

        <div className="xl:block xl:w-1/3">
          <div className="flex items-center justify-end">
            <Link
              className="text-gray-500 hover:text-gray-900 font-medium"
              href="/"
            >
              Home
            </Link>

            <div className="hxl:block">
              {user ? (
                <div className="flex items-center justify-end">
                  <span className="inline-block py-2 px-4 mr-2 leading-5 text-gray-500 hover:text-gray-900 bg-transparent font-medium rounded-md">
                    {user.username}
                  </span>
                  <button
                    className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-end">
                  <Link
                    className="inline-block py-2 px-4 mr-2 leading-5 text-gray-500 hover:text-gray-900 bg-transparent font-medium rounded-md"
                    href="/login"
                  >
                    Log In
                  </Link>
                  <Link
                    className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                    href="/register"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <button onClick={() => setShowCart((prevState => !prevState))} class="bg-green-500 text-white p-3 ml-3 rounded-full hover:bg-yellow-500 items-center">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3334 8.16667V4.83333C11.3334 2.99238 9.84099 1.5 8.00004 1.5C6.15909 1.5 4.66671 2.99238 4.66671 4.83333V8.16667M2.16671 6.5H13.8334L14.6667 16.5H1.33337L2.16671 6.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Layout(props) {
  const title = "Welcome to Next JS";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <Cart />
      <div className="container mx-auto px-4">{props.children}</div>
    </div>
  );
}
