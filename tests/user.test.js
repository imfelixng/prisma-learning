import 'cross-fetch/polyfill';
import ApolloClient, { gql } from "apollo-boost";
import bcrypt from 'bcryptjs';

import prisma from '../src/prisma.js';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "An",
      email: 'ngquangan.demo@gmail.com',
      password: bcrypt.hashSync('test123')
    }
  })

  await prisma.mutation.createPost({
    data: {
      title: 'This is test post',
      body: 'This is body',
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })

  await prisma.mutation.createPost({
    data: {
      title: 'This is tes t post1',
      body: 'This is body1',
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })

});

test("should be create new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "ngquangan"
          email: "ngquangan@gmail.com"
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

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
    expect(exists).toBe(true);
});
