module.exports = function (fastify, opts, done) {
  fastify.get('/u/:username', async function (req, res) {
    const data = await CheckIfUserExists(req, res, req.params.username)
    console.log(data)
    if (data.status === 400) {
      res.code(400)
      return res.view('src/templates/error/404.ejs', {message: data.message})
    }
    if (!data) {
      res.code(404)
      return res.view('src/templates/error/404.ejs')
    }
    return res.view('src/templates/username.ejs', {
      data: data.data[0],
      username: data.data[0].login,
      title: `${data.data[0].display_name} on Twitch`,
      url: `https://twitch.tv/${data.data[0].login}`,
      image: data.data[0].profile_image_url,
      description: data.data[0].description || `Twitch profile of ${data.data[0].display_name}`,
    })
  })
  done()

  // /u/:username/json
  fastify.get('/u/:username/json', async function (req, res) {
    console.log('JSON username')
    const data = await CheckIfUserExists(req, res, req.params.username)
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

