"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const defaultRoute_1 = require("./routes/defaultRoute");
const userRoute_1 = require("./routes/userRoute");
const memberRoute_1 = require("./routes/memberRoute");
const memberGoalsRoute_1 = require("./routes/memberGoalsRoute");
const memberHealthStatsRoute_1 = require("./routes/memberHealthStatsRoute");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 8000;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static("public"));
// ROUTES
exports.app.use("/", defaultRoute_1.defaultRoute);
exports.app.use("/users", userRoute_1.userRoute);
exports.app.use("/members", memberRoute_1.memberRoute);
exports.app.use("/members", memberGoalsRoute_1.memberGoalRoute);
exports.app.use("/members", memberHealthStatsRoute_1.memberHealthStatsRoute);
exports.app.listen(port, () => {
    console.log(`server started at at http://localhost:${port}`);
});
