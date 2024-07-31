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
exports.createUser = void 0;
const db_server_1 = __importDefault(require("../utils/db.server")); // Ensure Prisma Client instance is correctly exported
// Define the route handler function
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = user;
    return db_server_1.default.user.create({
        data: {
            name,
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
});
exports.createUser = createUser;
