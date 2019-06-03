const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
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
  }
}

export default Subscription;