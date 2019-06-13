import getUserId from '../utils/getUserId';

const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      const userId = getUserId(request);
      return prisma.subscription.comment({ 
        where: {
          node: {
            post: {
              id: postId // Don't recieve notify when comment in other post
            }
          }
        }
       }, info);
    }
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published: true // Only recieve notify when published equal true
          }
        }
      }, info);
    }
  },
  myPosts: {
    subscribe (parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  }
}

export default Subscription;