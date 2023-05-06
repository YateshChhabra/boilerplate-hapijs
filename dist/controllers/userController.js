"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserList = exports.doSignIn = exports.doSignUp = void 0;
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const userRepository = new userRepository_1.default();
function doSignUp(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = request.payload;
            const isExistingUser = yield userRepository.findByUsername(username);
            if (isExistingUser) {
                return h.response("Username Already Taken").code(400);
            }
            else {
                const salt = (0, bcrypt_1.generateSalt)(10);
                const hash = (0, bcrypt_1.generateHash)(password, salt);
                const newUser = yield userRepository.create(username, hash);
                const token = (0, jwt_1.createToken)(newUser.id);
                return h
                    .response({
                    data: newUser,
                    message: "User Registered SuccessFully",
                    status: 201,
                })
                    .code(201)
                    .header("Set-Cookie", `access_token=${token}; isHttpOnly=false; Path=/`);
            }
        }
        catch (e) {
            return h
                .response({ message: "Oops!! Something Went Wrong", status: 500 })
                .code(500);
        }
    });
}
exports.doSignUp = doSignUp;
function doSignIn(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = request.payload;
            const ExistingUser = yield userRepository.findByUsername(username);
            if (!ExistingUser) {
                return h
                    .response({ message: "Username Not Exists", status: 400 })
                    .code(400);
            }
            else {
                const isMatch = (0, bcrypt_1.compareHash)(password, ExistingUser.password);
                if (!isMatch) {
                    return h
                        .response({ message: "Password Does Not Match", status: 400 })
                        .code(400);
                }
                const token = (0, jwt_1.createToken)(ExistingUser.username);
                return h
                    .response({
                    data: ExistingUser,
                    message: "User SignIn SuccessFully",
                    status: 200,
                })
                    .code(200)
                    .header("Set-Cookie", `access_token=${token}; isHttpOnly=false; Path=/`);
            }
        }
        catch (err) {
            console.log("error in doSigin ", err);
            return h
                .response({ message: "Oops!! Something Went Wrong", status: 500 })
                .code(500);
        }
    });
}
exports.doSignIn = doSignIn;
function fetchUserList(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = request.state.access_token;
            const isAuthenticated = (0, jwt_1.validateToken)(token);
            if (isAuthenticated) {
                const users = yield userRepository.fetchAllUser();
                return h
                    .response({
                    data: users,
                    message: "success",
                    status: 200,
                })
                    .code(200);
            }
            else {
                return h
                    .response({
                    message: "Token Expired",
                    status: 400,
                })
                    .code(400);
            }
        }
        catch (e) {
            return h
                .response({ message: "Oops!! Something Went Wrong", status: 500 })
                .code(500);
        }
    });
}
exports.fetchUserList = fetchUserList;
