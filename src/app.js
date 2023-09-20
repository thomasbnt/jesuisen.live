const path = require("node:path")
const fastify = require('fastify')({logger: false})
const fastifyView = require('@fastify/view')
const fastifyStatic = require('@fastify/static')
const ejs = require('ejs')

fastify.register(fastifyView, {
  engine: { ejs },
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

// Index page
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

// About page
fastify.get('/about', (request, reply) => {
  reply.sendFile('about.html')
})

// /u/:username route
fastify.register(require('./routes/username'))


const start = async () => {
  try {
  await fastify.listen({port: 3000}, (err, address) => {
    console.log(`Server listening on ${address}`)
  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start().then(r => r)
