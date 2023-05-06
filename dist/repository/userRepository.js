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
const db_1 = __importDefault(require("../db"));
const uuid_1 = require("uuid");
class UserRepository {
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, db_1.default)("users").where({ username }).first();
            return user;
        });
    }
    create(username, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const user = { id, username, password: hash };
            yield (0, db_1.default)("users").insert(user);
            return user;
        });
    }
    fetchAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, db_1.default)("users").select("username");
            return users;
        });
    }
}
exports.default = UserRepository;
