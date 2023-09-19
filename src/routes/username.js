module.exports = function (fastify, opts, done) {
  fastify.get('/u/:username', async function (request, reply) {
    const username = request.params.username
    if (!username) {
      reply.code(400)
      return reply.sendFile('error/400.html')
    }
    const data = await TwitchAPI(username)
    reply.send(data)
  })
  done()
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
  console.log(responseToken)
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

