import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) { // Default prisma use info for nest type
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      }
    }
    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      }
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  post: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request, false);
    console.log(userId);
    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [
          {
            published: true
          },
          {
            author: {
              id: userId
            }
          }
        ]
      }
    }, info);

    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return posts[0];

  }
};

export default Query;