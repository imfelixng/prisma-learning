import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const data = {
      ...args.data,
      password
    }

    const user = await prisma.mutation.createUser({ data }); // don't have second argument so get all scalar field

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'mysupersecret')
    }

  },
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const data = {
      ...args.data,
      author: {
        connect: {
          id: userId
        }
      }
    }

    return prisma.mutation.createPost({ data }, info);
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true
    });

    if (!postExists) throw new Error('Unable to find post');

    const data = {
      ...args.data,
      author: {
        connect: {
          id: userId
        }
      },
      post: {
        connect: {
          id: args.data.post
        }
      }
    }

    return prisma.mutation.createComment({ data }, info);
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser( { where: { id: userId } } , info);
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({ 
      id: args.id,
      author: {
        id: userId
      }
     })

     if (!postExists) {
      throw new Error('Unable delete this post');
     }

    return prisma.mutation.deletePost(
      { 
        where: { 
          id: args.id,

        } 
      },
      info
    );
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!commentExists) throw new Error('Unable delete this comment');


    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateUser({ where: { id: userId }, data: args.data }, info)
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });

    const isPublished = await prisma.exists.Post({
      published: true,
    });

    if (!postExists) throw new Error('Unable update this post');

    if (isPublished && !args.data.published) {
      await prisma.mutation.deleteManyComments(
        {
          where: {
            post: {
              id: args.id
            }
          }
        }
      )
    }

    return prisma.mutation.updatePost({ where: { id: args.id }, data: args.data }, info);
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!commentExists) throw new Error('Unable update this comment');

    return prisma.mutation.updateComment({ where: { id: args.id }, data: args.data }, info);
  },
  async login(parent, args, { prisma }, info) {
    const { email, password } = args.data;
    const user = await prisma.query.user( { where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Email or password is not valid')

    const token = jwt.sign({ userId: user.id }, 'mysupersecret');

    return {
      user,
      token
    }

  }
};

export default Mutation;