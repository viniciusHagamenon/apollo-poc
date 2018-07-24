import { graphql } from 'graphql'
import { importSchema } from 'graphql-import'
import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  mockServer,
} from 'graphql-tools'

const typeDefs: any = importSchema('src/data/schema.graphql')

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

const mocks = {
  ID: () => '1',
  Int: () => 1,
  Float: () => 12.34,
  String: () => 'Barrel Aged Hinterland',
  DateTime: () => '2015-05-01T00:00:00.000Z',
  Json: () => ({
    value: 20,
    unit: 'liters',
  }),
}

addMockFunctionsToSchema({
  schema,
  mocks,
})

describe('Schema', async () => {
  it('should have valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs, mocks)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })

  it('should search for Beers and match structure', async () => {
    const query = `
      query {
        beers(searchString: "ipa") {
          id
          punk_id
          name
          first_brewed
          abv
          volume
        }
      }
    `

    const result = await graphql(schema, query)
    const firstResult = result.data.beers[0]

    expect(firstResult.punk_id).toBe(1)
    expect(firstResult.name).toBe('Barrel Aged Hinterland')
    expect(firstResult.first_brewed).toBe('2015-05-01T00:00:00.000Z')
    expect(firstResult.abv).toBe(12.34)
    expect(firstResult.volume.value).toBe(20)
  })

  it('should get a single Beer', async () => {
    const query = `
      query {
        beer(id: "1") {
          id
          name
        }
      }
    `

    const result = await graphql(schema, query)
    const beer = result.data.beer

    expect(beer.name).toBe('Barrel Aged Hinterland')
  })

  it('should find Beer by punk_id', async () => {
    const query = `
      query {
        beerByPunkID(punk_id: 1) {
          id
          punk_id
          name
        }
      }
    `

    const result = await graphql(schema, query)
    const beer = result.data.beerByPunkID

    expect(beer.punk_id).toBe(1)
  })
})
