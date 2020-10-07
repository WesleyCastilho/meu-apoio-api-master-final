'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('genero', 1)
      table.string('rg', 11)
      table.string('cpf', 11)
      table.string('especialidade', 30)
      table.string('tempo_exercicio', 30)
      table.string('como_conheceu', 30)
      table.string('porque_aderir', 30)
      table.boolean('aceita_termos').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
