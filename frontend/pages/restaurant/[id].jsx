import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

import Image from "next/image";
import Cart from "@/components/Cart";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function DishCard({ data }) {
  const { addItem } = useAuth();

  return (
    <div className="w-3/4 container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-full bg-gray-100 rounded-2xl">
          <Image
            className="w-full rounded-2xl"
            height={300}
            width={300}
            src={`${process.env.STRAPI_URL || "http://localhost:1337"}${
              data.attributes.image.data.attributes.url
            }`}
            alt=""
          />
          <div className="p-8">
            <div className="group inline-block mb-4" href="#">
              <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
                {data.attributes.name}
              </h3>
              <h2>{data.attributes.price}</h2>
            </div>
            <p className="text-sm text-gray-500 font-bold">
              {data.attributes.description}
            </p>
            <div className="flex flex-wrap md:justify-center -m-2">
              <div className="w-full md:w-auto p-2 my-6">
                <button
                  className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                  onClick={() => addItem(data)}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default function Restaurant() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data;

    return (
      <div>
        <h1 className="text-2xl text-green-600">
          {restaurant.data.attributes.name}
        </h1>
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {restaurant.data.attributes.dishes.data.map((res) => {
                return <DishCard key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}
