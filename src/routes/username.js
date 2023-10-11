module.exports = function (fastify, opts, done) {
  fastify.get('/:username', async function (req, res) {
    const data = await CheckIfUserExists(req, res, req.params.username)
    if (data.status === 400) {
      res.code(400)
      return res.view('src/templates/error/404.ejs', {message: data.message})
    }
    if (!data.data[0] || data.data[0] === undefined) {
      res.code(404)
      return res.view('src/templates/error/404.ejs', {message: "User not found"})
    }
    return res.view('src/templates/username.ejs', {
      data: data.data[0] || null,
      username: data.data[0].login || "Unknown",
      title: `${data.data[0].display_name} on Twitch` || "Unknown",
      url: `https://jesuisen.live/${data.data[0].login}` || "https://jesuisen.live?error=usernamenotfound",
      urlTwitch: `https://www.twitch.tv/${data.data[0].login}` || "https://jesuisen.live?error=usernamenotfound",
      image: data.data[0].profile_image_url || "https://jesuisen.live/assets/img/offline.png",
      description: data.data[0].description || `Twitch profile of ${data.data[0].display_name}`,
    })
  })
  done()

  // /u/:username/json
  fastify.get('/:username/json', async function (req, res) {
    const data = await CheckIfUserExists(req, res, req.params.username)
    if (!data[0] || data.data[0] === undefined) {
      res.code(404)
      return res.send({message: "User not found"})
    }
    return res.send({data: data.data[0]})
  })
  done()
}


async function CheckIfUserExists(req, res, username) {
  if (!username) {
    res.code(400)
    return res.view('src/templates/error/400.ejs')
  }
  return await TwitchAPI(username)
}


async function TwitchAPI(username) {
  require('dotenv').config()

  // TODO : Dont request a new token each time, get to the cache with the timestamp
  // TODO : If the token is expired, request a new one

  // First time, get the OAuth token
  const urlToken = 'https://id.twitch.tv/oauth2/token'
  const params = new URLSearchParams()
  params.append('client_id', process.env.TWITCH_CLIENT_ID)
  params.append('client_secret', process.env.TWITCH_CLIENT_SECRET)
  params.append('grant_type', 'client_credentials')
  const responseToken = await fetch(urlToken, {method: 'POST', body: params})
  const dataToken = await responseToken.json()
  const token = dataToken.access_token


  const url = `https://api.twitch.tv/helix/users?login=${username}`
  const headers = {
    'Client-ID': process.env.TWITCH_CLIENT_ID,
    'Authorization': `Bearer ${token}`
  }
  const response = await fetch(url, {headers})
  return await response.json()
}

