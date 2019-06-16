import 'cross-fetch/polyfill';
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

test("should be create new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "ngquangan"
          email: "ngquangan12345678910@gmail.com"
          password: "ngquangan"
        }
      ) {
        user {
          id
        }
        token
      }
    }
  `;

    const response = await client.mutate({
      mutation: createUser
    })

});
