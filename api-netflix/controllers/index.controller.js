const { ERR, OK } = require("../utils/response");
const { User } = require("../models/index.model");
const argon2 = require("argon2");

const GetFavoriteMovies = async (req, res) => {
  OK(res, 200, req.user, "success getting favorite movies");
};

const AddFavoriteMovies = async (req, res) => {
  try {
    const { data } = req.body;
    const user = await User.findById(req.user._id);
    user.favoriteMovies.push(data);
    await user.save();

    return OK(
      res,
      201,
      user.favoriteMovies,
      "success adding favorite list movies"
    );
  } catch (error) {
    return ERR(res, 500, "Error adding favorite list movies");
  }
};

const checkFavoriteMovies = async (req, res) => {
  try {
    const { movie_id } = req.body;

    const user = await User.findById(req.user._id);
    const isFavorited = await user.favoriteMovies.some(
      (movie) => movie.id === movie_id
    );
    return OK(res, 200, { isFavorited }, "movie is in favorite list");
  } catch (error) {
    return ERR(res, 500, "Error checking favorite list movies");
  }
};

const DeleteFavoriteMovies = async (req, res) => {
  try {
    const { movie_id } = req.body;
    const user = await User.findById(req.user._id);
    const existingMovies = user.favoriteMovies.some(
      (movie) => movie.id === movie_id
    );

    if (!existingMovies) {
      return ERR(res, 404, "movie not found in favorite list");
    }

    user.favoriteMovies = user.favoriteMovies.filter(
      (movie) => movie.id !== movie_id
    );
    await user.save();

    return OK(res, 204, null, "success removing favorite list movies");
  } catch (error) {
    return ERR(res, 500, "Error removing favorite list movies");
  }
};

const SignInToken = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    let user = await User.findOne({ email });
    if (!user) return ERR(res, 404, "User not found");

    const valid = await argon2.verify(user.password, password);
    if (!valid) return ERR(res, 401, "Invalid password");

    user.token = token;
    await user.save();

    return OK(res, 200, null, "success signing in token");
  } catch (error) {
    return ERR(res, 500, "Error signing in token");
  }
};

const SignOutToken = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.token = null;
    await user.save();

    return OK(res, 204, null, "success signing out token");
  } catch (error) {
    return ERR(res, 500, "Error signing out token");
  }
};

const SignUpUser = async (req, res) => {
  const { email, password } = req.body;
  const hashPass = await argon2.hash(password);

  try {
    const user = await User.findOne({ email });
    if (user) {
      return ERR(res, 409, "Email already exists");
    }

    const addNewUser = new User({ email, password: hashPass });
    await addNewUser.save();

    return OK(res, 201, addNewUser._id, "User created successfully");
  } catch (error) {
    return ERR(res, 500, "Signup failed");
  }
};

module.exports = {
  GetFavoriteMovies,
  AddFavoriteMovies,
  checkFavoriteMovies,
  DeleteFavoriteMovies,
  SignInToken,
  SignOutToken,
  SignUpUser,
};
