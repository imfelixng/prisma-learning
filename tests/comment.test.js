import "cross-fetch/polyfill";
import prisma from "../src/prisma.js";
import seedDB, { userOne, commentOne, commentTwo } from './utils/seedDB';
import getClient from './utils/getClient';

import {
  deleteComment
} from './utils/operations';

beforeEach(seedDB);

test('should delete own comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentOne.comment.id
  }

  await client.mutate({
    mutation: deleteComment,
    variables
  });

  const exists = await prisma.exists.Comment({ id: commentOne.comment.id });

  expect(exists).toBe(false);

})

test('should not delete other users comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentTwo.comment.id
  }

  await expect(client.mutate({
    mutation: deleteComment,
    variables
  })).rejects.toThrow(); // Tranh stop test case when have exception

})
