import fetch from "node-fetch";

interface Article {
  id: string;
  attributes: {
    title: string;
  };
}

const patchArticle = async (
  username: string,
  password: string,
  server: string,
  article: Article
) => {
  const url = `https://${server}/jsonapi/node/article/${article.id}`;

  const response = await fetch(url, {
    method: `PATCH`,
    headers: {
      "Content-Type": `application/vnd.api+json`,
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64"
      )}`
    },
    body: JSON.stringify({
      data: {
        type: "node--article",
        id: article.id,
        attributes: {
          title: article.attributes.title + `!`
        }
      }
    })
  });

  const body = await response.json();
  console.log({
    body,
    st: response.status
  });
};

const getFirstArticle = async (server: string) => {
  const url = `https://${server}/jsonapi/node/article?page[limit]=1&sort=-created`;
  const response = await fetch(url);
  const body = await response.json();
  return body.data[0];
};

export const update = async (
  username?: string,
  password?: string,
  server?: string
) => {
  if (!username || !password || !server) {
    console.error("You must pass username, password and server");
    return;
  }

  const article = await getFirstArticle(server);
  await patchArticle(username, password, server, article);
};
