import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import prisma from "../../src/prisma.js";

const userOne = {
  input: {
    name: "An",
    email: "ngquangan.demo@gmail.com",
    password: bcrypt.hashSync("test123456", 13)
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: "This is test post",
    body: "This is body",
    published: true,
  },
  post: undefined
}

const seedDB = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'mysupersecret');

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: "This is test post",
      body: "This is body",
      published: false,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

}

export { seedDB as default, userOne, postOne }