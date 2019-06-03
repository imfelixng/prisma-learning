import bcrypt from 'bcryptjs';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) throw new Error('Email taken.');

    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const data = {
      ...args.data,
      password
    }

    return prisma.mutation.createUser({ data }, info);
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
  }
};

export default Mutation;