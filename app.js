const path = require("node:path")
const fastify = require('fastify')({logger : false})
const fastifyStatic = require('@fastify/static')

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

fastify.get('/', (request, reply) => {
  reply.sendFile('index.html' )
})

fastify.get(`/u/:username`, (request, reply) => {
  // If no username is provided, return an error
  if (!request.params.username) {
    reply.code(400)
    return reply.sendFile('error/400.html')
  }
  reply.send({username : request.params.username})
})


const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start().then(r => r)
