"use strict";

const Helpers = use("Helpers");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }

  /**
   * Create/save a new image.
   * POST images
   */
  async store({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      const images = request.file("image", {
        types: ["image"],
        size: "2mb",
      });

      await images.moveAll(Helpers.tmpPath("uploads"), (file) => ({
        name: `${Date.now()}-${file.clientName}`,
      }));

      console.log(images);
      if (!images.movedAll()) {
        return images.errors();
      }

      await Promise.all(
        images
          .movedList()
          .map((image) => user.images().create({ path: image.fileName }))
      );

      return response
        .status(200)
        .send({ succes: "Avatar atualizado com sucesso" });
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }
}

module.exports = ImageController;
