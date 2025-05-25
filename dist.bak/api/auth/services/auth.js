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
const config_1 = require("../../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_dto_1 = __importDefault(require("../dto/register-dto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../../config/env");
const validation_error_1 = __importDefault(require("../../../lib/errors/validation-error"));
const format_to_string_1 = __importDefault(require("../../../lib/errors/format/format-to-string"));
class AuthService {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = register_dto_1.default.safeParse(req.body);
            if (!validation.success) {
                console.error(validation.error.flatten().fieldErrors);
                throw new validation_error_1.default((0, format_to_string_1.default)(validation.error.flatten().fieldErrors));
            }
            const { email, password } = validation.data;
            try {
                const existingUser = yield config_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
                console.log("existingUser", existingUser);
                if (existingUser.rows.length > 0) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield config_1.pool.query("INSERT INTO users (email, password_hash) VALUES ($1, $2)", [email, hashedPassword]);
                return res.status(201).json({ message: "User registered successfully" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield config_1.pool.query("SELECT * FROM users WHERE email = $1", [
                    email,
                ]);
                if (result.rows.length === 0) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                const user = result.rows[0];
                if (user.password_hash !== password) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_1.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                return res.json({ token });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map