"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaBinding = require("prisma-binding");

var _resolvers = require("./resolvers");

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'thisismysupersecret',
  fragmentReplacements: _resolvers.fragmentReplacements
}); // Promise
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
//   const userExists = await prisma.exists.User(
//     {
//       id: authorId
//     }
//   ) 
//   if (!userExists) throw new Error("User not found.");
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ id title body published author { id name email posts { id title published } } }');
//   return post.author;
// }
// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post(
//     {
//       id: postId
//     }
//   )
//   if (!postExists) throw new Error('Post not found.');
//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data: {
//         ...data
//       }
//     },
//     '{ author { id name posts { id title published }} }'
//   );
//   return post.author;
// }
// createPostForUser('cjvmisn3k00or0779m2i8m6d3', { title: 'This is new post222', body: 'This is body', published: true })
//   .then(user => console.log(user))
//   .catch(err => console.log(err));
// updatePostForUser('cjw97u85f00rc0758eccp5yzxa', 
//   {
//     title: 'Best post'
//   },
// )
//   .then(user => console.log(JSON.stringify(user, null, 2)))
//   .catch(err => console.log(err))
// prisma.exists.Post(
//   {
//     id: "cjw97u85f00rc0758eccp5yzx"
//   }
// )
//   .then(exists => console.log(exists))
//   .catch(err => console.log(err));

exports["default"] = prisma;