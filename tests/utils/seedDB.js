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

const seedDB = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'mysupersecret');

  await prisma.mutation.createPost({
    data: {
      title: "This is test post",
      body: "This is body",
      published: true,
      author: {
        connect: {
          id: userOne.user.id
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
          id: userOne.user.id
        }
      }
    }
  });
}

export { seedDB as default, userOne }