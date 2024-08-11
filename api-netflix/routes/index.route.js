const router = require("express").Router();
const { checkToken } = require("../utils/auth");
const userController = require("../controllers/index.controller");

router.get(
  "/my-movies/:email/:token",
  checkToken,
  userController.GetFavoriteMovies
);
router.post("/my-movies", checkToken, userController.AddFavoriteMovies);
router.post("/my-movies/check", checkToken, userController.checkFavoriteMovies);
router.delete("/my-movies", checkToken, userController.DeleteFavoriteMovies);

router.post("/my-token", userController.SignInToken);
router.delete("/my-token", checkToken, userController.SignOutToken);
router.post("/sign-up", userController.SignUpUser);

module.exports = router;
