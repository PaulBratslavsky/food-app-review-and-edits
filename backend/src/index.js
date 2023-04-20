'use strict';
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Mutation {
          createOrder(input: OrderInput): OrderEntityResponse
        }
      `,
      resolvers: {
        Mutation: {
          createOrder: {
            resolve: async (_, args, ctx) => {
              const { toEntityResponse } = strapi.service("plugin::graphql.format").returnTypes;
              const user = ctx.state.user;
              const { address, amount, dishes, token, city, state } = args.data;

              const charge = await stripe.charges.create({
                amount: amount,
                currency: "usd",
                description: `Order ${new Date()} by ${ctx.state.user.id}`,
                source: token,
              });

              console.log(charge, "charge")

              const order = await strapi.service("api::order.order").create({
                data: {
                  amount,
                  address,
                  dishes,
                  city,
                  state,
                  token,
                  user: user.id,
                },
              });
              return toEntityResponse(order);
            },
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};
