import express from "express";

import * as controller from "../controllers/controller.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/").get(controller.get_Topics).post(controller.post_Topic);

router
  .route("/:id")
  .get(controller.get_Topic)
  .delete(controller.delete_Topic)
  .put(controller.update_Topic);

export default router;
