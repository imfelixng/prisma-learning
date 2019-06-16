import bcrypt from "bcryptjs";

import prisma from "../../src/prisma.js";

const seedDB = async () => {
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
}

export { seedDB as default }