export const resolvers = {
  Query: {
    beers: (_: any, args: any, context: any, info: any) => {
      return context.prisma.query.beers(
        {
          where: {
            OR: [
              { name_contains: args.searchString },
              { tagline_contains: args.searchString },
              { description_contains: args.searchString },
            ],
          },
        },
        info
      )
    },
    beer: (_: any, args: any, context: any, info: any) => {
      return context.prisma.query.beer(
        {
          where: {
            id: args.id,
          },
        },
        info
      )
    },
  },
}
