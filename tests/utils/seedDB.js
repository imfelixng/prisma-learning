import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import prisma from "../../src/prisma.js";

const userOne = {
  input: {
    name: "An",
    email: "ngquangan.demo1@gmail.com",
    password: bcrypt.hashSync("test123456", 13)
  },
  user: undefined,
  jwt: undefined
}

const userTwo= {
  input: {
    name: "An",
    email: "ngquangan.demo2@gmail.com",
    password: bcrypt.hashSync("test123456", 13)
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: "This is test post 1",
    body: "This is body",
    published: true,
  },
  post: undefined
}

const postTwo = {
  input: {
    title: "This is test post 2",
    body: "This is body",
    published: false,
  },
  post: undefined
}

const commentOne = {
  input: {
    text: "This is test comment 1",
  },
  comment: undefined
}

const commentTwo = {
  input: {
    text: "This is test comment 2",
  },
  comment: undefined
}

const seedDB = async () => {
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'mysupersecret');
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, 'mysupersecret');

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

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  })

  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userTwo.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  })

}

export { seedDB as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }