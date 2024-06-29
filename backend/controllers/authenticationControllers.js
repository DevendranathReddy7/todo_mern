const UserSchema = require("../modals/userModal");
// const HttpError = require("../modals/http-error");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "") {
    return res.status(400).json({ message: "Please enter an Email" });
  } else if (password === "") {
    return res.status(400).json({ message: "Please enter your Password" });
  }

  let existingUser = "";

  try {
    existingUser = await UserSchema.findOne({ email: email });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);

    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!existingUser) {
    // const error = new HttpError(
    //   "Seems you don't have account with us..Please open account by clicking below link",
    //   401
    // );
    // return next(error);

    return res.status(401).json({
      message:
        "Seems you don't have account with us..Please open account by clicking below link",
    });
  }
  if (existingUser.password !== password) {
    // const error = new HttpError(
    //   "You've entered invalid credentials..please enter valid credentials",
    //   401
    // );
    //    return next(error);

    return res.status(401).json({
      message:
        "You've entered invalid credentials..please enter valid credentials",
    });
  }
  //this will send back logged in user if success or error message
  res.status(200).json({ user: existingUser.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser = "";

  if (name === "") {
    return res.status(400).json({ message: "Please enter a Valid Name" });
  } else if (email === "") {
    return res.status(400).json({ message: "Please enter a Valid Email" });
  } else if (password === "" || password.length < 6) {
    return res.status(400).json({
      message: "Please choose strong Password with atleast 6 character length",
    });
  }

  try {
    existingUser = await UserSchema.findOne({ email: email });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);

    return res.status(500).json({ message: "Something went wrong" });
  }

  if (existingUser) {
    // const error = new HttpError(
    //   "Email already registered..please user different email or try login instead.",
    //   400
    // );
    // return next(error);

    return res.status(400).json({
      message:
        "Email already registered..please user different email or try login instead.",
    });
  }
  const newUser = new UserSchema({
    name,
    email,
    password,
  });

  await newUser.save();
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};
exports.signin = signin;
exports.signup = signup;
