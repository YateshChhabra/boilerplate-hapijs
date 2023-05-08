import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import UserRepository from "../repository/userRepository";
import { compareHash, generateSalt, generateHash } from "../utils/bcrypt";
import { createToken, validateToken } from "../utils/jwt";

interface IUser {
  username: string;
  password: string;
}

const userRepository = new UserRepository();

export async function doSignUp(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  try {
    const { username, password } = <IUser>request.payload;

    const isExistingUser = await userRepository.findByUsername(username);

    if (isExistingUser) {
      return h.response("Username Already Taken").code(400);
    } else {
      const salt = generateSalt(10);
      const hash = generateHash(password, salt);
      const newUser = await userRepository.create(username, hash);
      const token = createToken(newUser.id);
      return h
        .response({
          data: newUser,
          message: "User Registered SuccessFully",
          status: 201,
        })
        .code(201)
        .header(
          "Set-Cookie",
          `access_token=${token}; isHttpOnly=false; Path=/`
        );
    }
  } catch (e) {
    return h
      .response({ message: "Oops!! Something Went Wrong", status: 500 })
      .code(500);
  }
}

export async function doSignIn(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  try {
    const { username, password } = <IUser>request.payload;
    const ExistingUser = await userRepository.findByUsername(username);

    if (!ExistingUser) {
      return h
        .response({ message: "Username Not Exists", status: 400 })
        .code(400);
    } else {
      const isMatch = compareHash(password, ExistingUser.password);
      if (!isMatch) {
        return h
          .response({ message: "Password Does Not Match", status: 400 })
          .code(400);
      }
      const token = createToken(ExistingUser.username);

      return h
        .response({
          data: ExistingUser,
          message: "User SignIn SuccessFully",
          status: 200,
        })
        .code(200)
        .header(
          "Set-Cookie",
          `access_token=${token}; isHttpOnly=false; Path=/`
        );
    }
  } catch (err) {
    console.log("error in doSigin ", err);

    return h
      .response({ message: "Oops!! Something Went Wrong", status: 500 })
      .code(500);
  }
}

export async function fetchUserList(request: Request, h: ResponseToolkit) {
  try {
    const token = request.state.access_token;
    const isAuthenticated = validateToken(token);
    
    if(!token){
      return h
        .response({
          message: "You are not Authenticated this page",
          status: 400,
        })
        .code(400);
    }
    else if (isAuthenticated) {
      const users = await userRepository.fetchAllUser();
      return h
        .response({
          data: users,
          message: "success",
          status: 200,
        })
        .code(200);
    } else {
      return h
        .response({
          message: "Token Expired",
          status: 401,
        })
        .code(401);
    }
  } catch (e) {
    return h
      .response({ message: "Oops!! Something Went Wrong", status: 500 })
      .code(500);
  }
}
