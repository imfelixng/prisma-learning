import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

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

prisma.mutation.updatePost(
  {
    data: {
      body: "1234",
    },
    where: {
      id: "cjw95x10h008s07588x09ywnw"
    }
  },
  '{ id title body published }'
)
  .then(data => {
    console.log(data);
    return prisma.query.posts(null, '{ id title body }')
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
