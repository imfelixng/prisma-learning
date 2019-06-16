import "cross-fetch/polyfill";
import ApolloClient, { gql } from "apollo-boost";
import bcrypt from "bcryptjs";

import prisma from "../src/prisma.js";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "An",
      email: "ngquangan.demo@gmail.com",
      password: bcrypt.hashSync("test123456", 13)
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: "This is test post",
      body: "This is body",
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: "This is tes t post1",
      body: "This is body1",
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });
});

test("should be create new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "ngquangan"
          email: "ngquangan@gmail.com"
          password: "test123456"
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
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

test("should expose public author profiles", async () => {
  const getUsers = gql`
    query {
      users {
        id
        email
        name
      }
    }
  `;

  const response = await client.query({
    query: getUsers
  });

  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("An");
});

test("should  expose published posts", async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;

  const response = await client.query({
    query: getPosts
  });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test("should not login with bad credentials", async () => {
  const login = gql`
    mutation {
      login(
        data: { email: "ngquangan.demo@gmail.com", password: "test1234567" }
      ) {
        token
      }
    }
  `;

  await expect(
    client.mutate({
      mutation: login
    })
  ).rejects.toThrow();
});

test("should not sign up with short password", async () => {
  const signup = gql`
    mutation {
      createUser(
        data: {
          name: "An",
          email: "ngquangan123@gmail.com",
          password: "123456"
        }
      ) {
        token
      }
    }
  `;

  await expect(
    client.mutate({
      mutation: signup
    })
  ).rejects.toThrow();
});
