import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) { // Default prisma use info for nest type
    const opArgs = {
      first: args.first || 5,
      skip: args.skip || 0
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      }
    }
    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first || 5,
      skip: args.skip || 0,
      where: {
        published: true,
      }
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ]
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
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

  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId } }, info);
  },
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    }

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ]
    }

    console.log(opArgs);

    return prisma.query.posts(opArgs, info);

  }
};

export default Query;