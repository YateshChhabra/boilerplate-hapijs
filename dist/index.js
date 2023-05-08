"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.start = exports.init = exports.server = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const db_1 = __importDefault(require("./db"));
const hapi_1 = __importDefault(require("@hapi/hapi"));
const user_1 = __importDefault(require("./routes/user"));
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        exports.server = hapi_1.default.server({
            port: process.env.PORT || 4000,
            host: "localhost",
            routes: {
                cors: {
                    credentials: true,
                },
            },
        });
        // Routes
        exports.server.route(user_1.default);
        return exports.server;
    });
};
exports.init = init;
const start = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Listening on ${exports.server.settings.host}:${exports.server.settings.port}`);
        exports.server.decorate("request", "database", db_1.default);
        exports.server.start();
    });
};
exports.start = start;
process.on("unhandledRejection", (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
(0, exports.init)()
    .then(() => (0, exports.start)())
    .catch((err) => console.error(err));
