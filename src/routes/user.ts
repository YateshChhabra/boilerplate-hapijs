import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import {
  doSignUp,
  doSignIn,
  fetchUserList,
} from "../controllers/userController";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/signup",
    handler: doSignUp,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().alphanum().min(3).max(30).required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/signin",
    handler: doSignIn,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/userlist",
    handler: fetchUserList,
  },
];


export default userRoutes;