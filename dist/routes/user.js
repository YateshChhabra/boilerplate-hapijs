"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userController_1 = require("../controllers/userController");
const userRoutes = [
    {
        method: "POST",
        path: "/signup",
        handler: userController_1.doSignUp,
        options: {
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().alphanum().min(3).max(30).required(),
                    password: joi_1.default.string()
                        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                        .required(),
                }),
            },
        },
    },
    {
        method: "POST",
        path: "/signin",
        handler: userController_1.doSignIn,
        options: {
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().required(),
                    password: joi_1.default.string().required(),
                }),
            },
        },
    },
    {
        method: "GET",
        path: "/userlist",
        handler: userController_1.fetchUserList,
    },
];
exports.default = userRoutes;
