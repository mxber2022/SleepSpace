import express from "express";
import passport from "passport";
const { ReclaimClient } = require("@reclaimprotocol/zk-fetch");
const { transformForOnchain } = require("@reclaimprotocol/js-sdk");

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Auth routes 
router.get(
  "/auth/whoop",
  (req, res, next) => {
    console.log("Starting WHOOP authentication");
    next();
  },
  passport.authenticate("whoop", {
    scope: ["offline", "read:profile", "read:sleep"], // Add sleep scope
  })
);

router.get(
  "/auth/whoop/callback",
  (req, res, next) => {
    console.log("Received callback from WHOOP");
    next();
  },
  passport.authenticate("whoop", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

// WHOOP API proxy endpoints
router.get("/whoop/sleep", async (req, res) => {
  console.log("Sleep data request received");

  if (!req.isAuthenticated()) {
    console.log("User not authenticated");
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    console.log("Fetching sleep data from WHOOP API");
    const response = await fetch(
      "https://api.prod.whoop.com/developer/v1/activity/sleep?limit=10",
      {
        headers: {
          Authorization: `Bearer ${req.user.access_token}`,
          Accept: "application/json",
        },
      }
    );

    if (response.status === 401) {
      console.log("Token expired");
      return res.status(401).json({ error: "Token expired" });
    }

    if (!response.ok) {
      console.error("WHOOP API error:", response.status);
      throw new Error(`WHOOP API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Sleep data fetched successfully");
    res.json(data);
  } catch (error) {
    console.error("Error fetching sleep data:", error);
    res.status(500).json({ error: "Failed to fetch sleep data" });
  }
});

router.get("/auth/status", (req, res) => {
  console.log("Auth status check:", {
    sessionID: req.sessionID,
    session: req.session,
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });

  res.setHeader("Content-Type", "application/json");
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
});

router.post("/auth/logout", (req, res) => {
  console.log("Logging out user:", req.user);
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ error: "Failed to destroy session" });
      }
      res.clearCookie("sleep2earn.sid");
      res.json({ success: true });
    });
  });
});

router.post("/whoop/verify-proof", async (req, res) => {

  if (!req.isAuthenticated()) {
    console.log("User not authenticated");
    return res.status(401).json({ error: "Not authenticated" });
  }

  const reclaimClient = new ReclaimClient(
    process.env.APP_ID,
    process.env.APP_SECRET
  );

  try {
    const { access_token, sleepId } = req.body;

    if (!access_token || !sleepId) {
      return res.status(400).json({ error: "Missing access_token or sleepId" });
    }

    const url = `https://api.prod.whoop.com/developer/v1/activity/sleep/${sleepId}`;

    const privateOptions = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const publicOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const proof = await reclaimClient.zkFetch(url, publicOptions, privateOptions);

    if (!proof) {
      return res.status(500).json({ error: "Failed to generate proof" });
    }

    console.log("Generated Proof:", proof);

    res.json({
      success: true,
      proof
    });
  } catch (error) {
    console.error("Error getting proof:", error.message);
    res.status(500).json({ error: "Failed to get proof", details: error.message });
  }
});


export default router;
