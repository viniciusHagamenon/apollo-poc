import axios from 'axios'
import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/data/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  debug: true,
})

const apiEndpoint = 'https://api.punkapi.com/v2/beers'
const totalPages = Array.from({ length: 10 }, (v, i) => i + 1)

const main = async () => {
  const beersResponse = await Promise.all(
    totalPages.map(async i => await axios.get(`${apiEndpoint}?page=${i}`))
  )

  // flatten beers
  const beers = Array.prototype.concat.apply([], beersResponse.map(r => r.data))

  beers.forEach((beer: any) => {
    const { id, ...restBeer } = beer

    restBeer.punk_id = id

    const fbDate = restBeer.first_brewed.split('/')
    restBeer.first_brewed = `${fbDate[1]}-${fbDate[0]}`

    prisma.mutation
      .upsertBeer(
        {
          where: { punk_id: id },
          create: restBeer,
          update: restBeer,
        },
        // @ts-ignore
        '{ punk_id, name }'
      )
      .then(console.log)
      .catch((e: any) => console.log(e))
  })
}

try {
  main()
} catch (e) {
  console.log('Errors:', e)
}
