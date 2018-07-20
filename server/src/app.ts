import { ApolloServer } from 'apollo-server-express'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as createError from 'http-errors'
import * as logger from 'morgan'
import * as path from 'path'

import resolvers from './data/resolvers'
import typeDefs from './data/schema'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
export const app = express()

apolloServer.applyMiddleware({ app })

app.use('/graphql', () => {
  // noop - Avoid Error: Can't set headers after they are sent.
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404))
  }
)

// error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  }
)
