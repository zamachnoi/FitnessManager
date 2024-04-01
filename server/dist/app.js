"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const defaultRoute_1 = require("./routes/defaultRoute");
const userRoute_1 = require("./routes/userRoute");
const memberRoute_1 = require("./routes/memberRoute");
const memberGoalsRoute_1 = require("./routes/memberGoalsRoute");
const memberHealthStatsRoute_1 = require("./routes/memberHealthStatsRoute");
const trainersRoute_1 = require("./routes/trainersRoute");
const routineRoute_1 = require("./routes/routineRoute");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static("public"));
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    credentials: true,
}));
const authEnabled = process.env.AUTH === "true" || false;
if (authEnabled) {
    exports.app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "secretkey123", // Secret used to sign the session ID cookie
        resave: false, // Avoids resaving session if not modified
        saveUninitialized: false, // Does not save uninitialized sessions
        cookie: {
            secure: false, // TRUE in production (with HTTPS), FALSE in development
            httpOnly: true, // Helps mitigate the risk of client side script accessing the protected cookie
            maxAge: 1000 * 60 * 60 * 24, // Example: sets cookie to expire in 1 day
        },
    }));
}
// ROUTES
exports.app.use("/", defaultRoute_1.defaultRoute);
exports.app.use("/users", userRoute_1.userRoute);
exports.app.use("/members", memberRoute_1.memberRoute);
exports.app.use("/members", memberGoalsRoute_1.memberGoalRoute);
exports.app.use("/members", memberHealthStatsRoute_1.memberHealthStatsRoute);
exports.app.use("/trainers", trainersRoute_1.trainerRoute);
exports.app.use("/routines", routineRoute_1.routineRoute);
const port = process.env.PORT || 8000;
exports.app.listen(port, () => {
    console.log(`server started at at http://localhost:${port}`);
});
