function ArticleListByCategory({ articles, category }) {
  return (
    <>
      <h1>
        Showing News for category <i>{category}</i>
      </h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>
            {article.id} {article.title}
          </h2>
          <p>{article.description}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context; //Http Request and Response Object
  console.log(query);
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=Munty"]); //Can set a User Id here like we do in Express
  const { category } = params;
  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();
  console.log(`Pre Rendering News Articles for category ${category}`);
  return {
    props: {
      articles: data,
      category,
    },
  };
}
