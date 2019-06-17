import { gql } from "apollo-boost";

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      email
      name
    }
  }
`;

const login = gql`
  mutation($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

const getAllPosts = gql`
query {
  myPosts {
    id
    title
    body
    published
  }
}
`;

const updatePost = gql`
mutation($id: ID!, $data: UpdatePostInput!) {
  updatePost(
    id: $id,
    data: $data
  ) {
    id
    title
    body
    published
  }
}
`;

const createPost = gql`
mutation($data: CreatePostInput!) {
  createPost(
    data: $data
  ) {
    id
    title
    body
    published
  }
}
`;

const deletePost = gql`
mutation($id: ID!) {
  deletePost(
    id: $id
  ) {
    id
  }
}
`;

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(
      id: $id
    ) {
      id
    }
  }
`

export {
  createUser, getUsers, login, getProfile,
  getPosts, getAllPosts, updatePost, createPost, deletePost,
  deleteComment
};
