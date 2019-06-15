import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const getUsers = gql`{
  users {
    id
    name
  }
}`;

const getPosts = gql`
  {
    posts {
      title
      author {
        name
      }
    }
  }
`;

client.query({
  query: getUsers
})
  .then(res => {

    let html = '';

    res.data.users.forEach(user => {
      html += `
        <div>
          <h3>${user.name}</h3>
        </div>
      `
    });

    document.querySelector('#users').innerHTML = html;
  })
  .catch(err => {
    console.log(err);
  });

  client.query({
    query: getPosts
  })
    .then(res => {
      let html = '';
  
      res.data.posts.forEach(post => {
        console.log('aa');
        html += `
          <div>
            <h3>${post.title}</h3>
            <h4>${post.author.name}</h4>
          </div>
        `
      });
  
      document.querySelector('#posts').innerHTML = html;
    })
    .catch(err => {
      console.log(err);
    });