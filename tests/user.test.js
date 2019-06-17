import "cross-fetch/polyfill";

import prisma from "../src/prisma.js";
import seedDB, { userOne } from "./utils/seedDB";
import getClient from "./utils/getClient";

import  {
  createUser,
  getUsers,
  login,
  getProfile
} from './utils/operations';


const client = getClient();

beforeEach(seedDB);

test("should be create new user", async () => {
  const variables = {
    data: {
      name: "An",
      email: "ngquangan1234@gmail.com",
      password: "ngquangan"
    }
  };

  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

test("should expose public author profiles", async () => {
  const response = await client.query({
    query: getUsers
  });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("An");
});

test("should not login with bad credentials", async () => {
  const variables = {
    data: {
      email: "ngquangan@gmail.com",
      password: "123456789"
    }
  };
  await expect(
    client.mutate({
      mutation: login,
      variables
    })
  ).rejects.toThrow();
});

test("should not sign up with short password", async () => {
  const variables = {
    data: {
      name: "An",
      email: "ngquangan123@gmail.com",
      password: "123456"
    }
  };

  await expect(
    client.mutate({
      mutation: createUser,
      variables
    })
  ).rejects.toThrow();
});

test("should fetch user profile", async () => {
  const client = getClient(userOne.jwt);

  const response = await client.query({
    query: getProfile
  });

  expect(response.data.me.id).toBe(userOne.user.id);
  expect(response.data.me.name).toBe(userOne.user.name);
  expect(response.data.me.email).toBe(userOne.user.email);
});
