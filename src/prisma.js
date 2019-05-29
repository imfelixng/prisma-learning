import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// Promise

// prisma.query.comments(null, '{ id text author { id name } }')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// prisma.mutation.createPost(
//   {
//     data: {
//       title: "New post in Nodejs",
//       body: "This is body",
//       published: true,
//       author: {
//         connect: {
//           id: "cjvmisn3k00or0779m2i8m6d3"
//         }
//       }
//     }
//   },
//   '{ id title body published }'
// )
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// prisma.mutation.updatePost(
//   {
//     data: {
//       body: "1234",
//     },
//     where: {
//       id: "cjw95x10h008s07588x09ywnw"
//     }
//   },
//   '{ id title body published }'
// )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, '{ id title body }')
//   })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// Async / Await
// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ id }');

//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId
//       }
//     },
//     '{ id name posts { id title } }'
//   )
//   return user;
// }

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data: {
        ...data
      }
    },
    '{ author { id } }'
  );

  const user = await prisma.query.users(
    {
      where: {
        id: post.author.id
      }
    },
    '{ id name posts { id title body } }'
  );
  return user;
}

// createPostForUser('cjvmisn3k00or0779m2i8m6d3', { title: 'This is new post', body: 'This is body', published: true })
//   .then(user => console.log(user))
//   .catch(err => console.log(err));

updatePostForUser('cjw97u85f00rc0758eccp5yzx', 
  {
    body: 'Best post'
  },
)
  .then(user => console.log(JSON.stringify(user, null, 2)))
  .catch(err => console.log(err))