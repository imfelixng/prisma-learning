import "cross-fetch/polyfill";
import prisma from "../src/prisma.js";
import seedDB, { userOne, postOne } from './utils/seedDB';
import getClient from './utils/getClient';

import {
  getPosts, getAllPosts, updatePost, createPost, deletePost
} from './utils/operations';

const client = getClient();

beforeEach(seedDB);

test("should  expose published posts", async () => {
  const response = await client.query({
    query: getPosts
  });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('should get all posts of user', async () => {
  const client = getClient(userOne.jwt);

  const response = await client.query({
    query: getAllPosts
  });

  expect(response.data.myPosts.length).toBe(2);

});

test('should be able to update own post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  }

  await client.mutate({
    mutation: updatePost,
    variables
  });

  const exists = await prisma.exists.Post({ id: postOne.post.id, published: false });

  expect(exists).toBe(true);
})

test('should be create new post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: {
      title: "Test post",
      body: "This is body",
      published: true
    }
  }

  await client.mutate({
    mutation: createPost,
    variables
  });

  const exists = await prisma.exists.Post({ ...postOne.input });

  expect(exists).toBe(true);

})

test('should be delete post', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: postOne.post.id,
  }
  await client.mutate({
    mutation: deletePost,
    variables
  });

  const exists = await prisma.exists.Post({ id: postOne.post.id });

  expect(exists).toBe(false);
})


