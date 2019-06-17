import "cross-fetch/polyfill";
import { gql } from "apollo-boost";

import prisma from "../src/prisma.js";
import seedDB, { userOne } from './utils/seedDB';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDB);

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

test('should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({
    query: getProfile
  });

  expect(response.data.me.id).toBe(userOne.user.id)
  expect(response.data.me.name).toBe(userOne.user.name)
  expect(response.data.me.email).toBe(userOne.user.email)
})

