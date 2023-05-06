"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.generateSalt = exports.compareHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const compareHash = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.compareHash = compareHash;
const generateSalt = (rounds) => {
    return bcrypt_1.default.genSaltSync(rounds);
};
exports.generateSalt = generateSalt;
const generateHash = (password, salt) => {
    return bcrypt_1.default.hashSync(password, salt);
};
exports.generateHash = generateHash;
