'use strict'

const UserController = require('../app/Controllers/Http/UserController')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Rota de cadastro
Route.post('/users', 'UserController.create')

// Rota de Usuário
Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')
Route.patch('/users/:id', 'UserController.update')
Route.delete('/users/:id', 'UserController.destroy')


// Rota de Login
Route.post('/sessions', 'SessionController.create')

// Rota de avatar
Route.post('users/:id/images', 'ImageController.store')
  .middleware('auth')
Route.get('images/:path', 'ImageController.show')







