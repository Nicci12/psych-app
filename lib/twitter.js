export async function getTwitterUserByHandle(twitterHandles) {
  const endpointURL = `https://api.twitter.com/2/users/by?usernames=${twitterHandles}&user.fields=profile_image_url,url,description&expansions=pinned_tweet_id`;
  const res = await fetch(endpointURL, {
    headers: {
      Authorization: "Bearer " + process.env.BEARER_TOKEN,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  if (res.data) {
    const allUsersPromises = await res.data.map(async (user) => {
      return await getUserTweets(user);
    });
    const resultPromises = await Promise.all(allUsersPromises);
    return resultPromises;
  } else {
    return ("Unsuccessful request");
  }
}


async function getUserTweets(user) {
  let userTweets = await getPage(user.id);
  const twitterEmbedPromises = await userTweets.map(async (tweetObj) => {
    const embedUrl = `https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F${user.username}%2Fstatus%2F${tweetObj.id}`;
    return await fetch(embedUrl).then((response) => response.json());
  });
  let twitterEmbeds = await Promise.all(twitterEmbedPromises);
  twitterEmbeds = twitterEmbeds.map((embed) => {
    return { ...embed, user_info: user };
  });
  return twitterEmbeds;
}

const getPage = async (userId) => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=5`;
  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + process.env.BEARER_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
    return resp;
  } catch (err) {
    return err (`Request failed: ${err}`);
  }
};
