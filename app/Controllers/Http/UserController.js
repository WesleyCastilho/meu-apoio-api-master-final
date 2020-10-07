"use strict";
const User = use("App/Models/User");
class UserController {
  async index() {
    const user = await User.all();
    return user;
  }

  async create({ request, response }) {
    const data = request.all();
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
        if(error.code === '23505'){
            return response.status(401).send({ error: "Usuário já cadastrado" });
        }
      return response.status(401).send({ error: error });
    }
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);
    return user;
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      const data = request.all();
      user.merge(data);
      await user.save();
      return user;
    } catch (error) {
      return response.status(401).send({ error: "Usuário não localizado" });
    }
  }

  async destroy({ params, auth, response }) {
    const user = await User.findOrFail(params.id);

    console.log(auth.user)
    if (user.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Você não pode deletar a si mesmo" });
    }

    await property.delete();
  }
}

module.exports = UserController;
