import getUserId from '../../utils/getUserId';

// Locking down field
const User = {
  email: {
    fragment: 'fragment userId on User { id }', // Get id field with not from info query
    resolve (parent, args, { request }, info) {
      const userId = getUserId(request, false);
      
      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve (parent, args, { prisma, request }, info) {
      return prisma.query.posts({
        where: {
          author: {
            id: parent.id
          },
          published: true,
        }
      }, info)
    }
  }
};

export default User;