// import express from "express";
// import session from "express-session";
// import cors from "cors";
// import dotenv from "dotenv";
// import passport from "./config/passport.js";
// import authRoutes from "./routes/auth.js";

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// // Enable better error logging
// app.use((req, res, next) => {
//   const oldJson = res.json;
//   res.json = function (data) {
//     console.log("Response:", data);
//     return oldJson.call(this, data);
//   };
//   next();
// });

// // CORS configuration
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//   })
// );

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//       sameSite: "lax",
//       path: "/",
//     },
//     name: "sleep2earn.sid",
//   })
// );

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Debug middleware
// app.use((req, res, next) => {
//   console.log("Request URL:", req.url);
//   console.log("Session ID:", req.sessionID);
//   console.log("Session:", req.session);
//   console.log("User:", req.user);
//   console.log("Is Authenticated:", req.isAuthenticated());
//   next();
// });

// // Routes
// app.use("/", authRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Server error:", err);
//   res
//     .status(500)
//     .json({ error: "Internal server error", message: err.message });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
//   console.log("Environment:", process.env.NODE_ENV);
//   console.log("Callback URL:", process.env.WHOOP_CALLBACK_URL);
// });

import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === "production";

// Enable better error logging
app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    console.log("Response:", data);
    return oldJson.call(this, data);
  };
  next();
});

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://taupe-zuccutto-fbdae1.netlify.app",
  "https://sleepspace.xyz",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Cache-Control",
    ],
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: isProd ? "none" : "lax",
      path: "/",
      domain: isProd ? ".sleepspace.onrender.com" : undefined,
    },
    name: "sleep2earn.sid",
    proxy: isProd, // Trust the reverse proxy when in production
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("Is Authenticated:", req.isAuthenticated());
  console.log("Origin:", req.get("origin"));
  next();
});

// Routes
app.use("/", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Callback URL:", process.env.WHOOP_CALLBACK_URL);
});
