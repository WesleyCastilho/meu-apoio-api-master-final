"use strict";
const User = use("App/Models/User");
class UserController {
  async index({ request }) {
    try {
      const isprovider = request.header("isprovider");
      if (isprovider === true) {
        const user = await User.query()
          .where("isprovider", "=", true)
          .with("images")
          .fetch();
        return user;
      }
      const user = await User.query()
        .where("isprovider", "=", false)
        .with("images")
        .fetch();
      return user;
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }

  async create({ request, response }) {
    const data = request.all();
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.code === "23505") {
        return response.status(401).send({ error: "Usuário já cadastrado" });
      }
      return response.status(401).send({ error: error });
    }
  }

  async show({ request, params }) {
    try {
      const isprovider = request.header("isprovider");
      if (isprovider === true) {
        const user = await User.query()
          .where("id", "=", params.id)
          .where("isprovider", "=", true)
          .with("images")
          .fetch();
        return user;
      }
      const user = await User.query()
        .where("isprovider", "=", false)
        .with("images")
        .fetch();
      return user;
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      const data = request.all();
      user.merge(data);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === "23505") {
        return response.status(401).send({ error: "Usuário já cadastrado" });
      }
      return response.status(401).send({ error: error });
    }
  }

  async destroy({ params, auth, response }) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      return response
        .status(401)
        .send({ succes: "Usuário removido com sucesso" });
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }
}

module.exports = UserController;
