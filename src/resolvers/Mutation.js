import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      token: jwt.sign({ userId: user.id }, 'thisismysecret')
    }

  },
  async createPost(parent, args, { prisma }, info) {
    const data = {
      ...args.data,
      author: {
        connect: {
          id: args.data.author
        }
      }
    }

    return prisma.mutation.createPost({ data }, info);
  },
  async createComment(parent, args, { prisma }, info) {
    const data = {
      ...args.data,
      author: {
        connect: {
          id: args.data.author
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
  async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser( { where: { id: args.id } } , info);
  },
  async deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },
  async deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  },
  async updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser({ where: { id: args.id }, data: args.data }, info)
  },
  async updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost({ where: { id: args.id }, data: args.data }, info);
  },
  async updateComment(parent, args, { prisma }, info) {
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