const path = require("node:path")
const fastify = require('fastify')({logger: false})
const fastifyStatic = require('@fastify/static')


fastify.register(require('@fastify/view'), {
  engine: { ejs: require('ejs') },
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

// Index
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

// /u/:username route
fastify.register(require('./routes/username'))

const start = async () => {
  try {
    await fastify.listen({port: 3000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start().then(r => r)
