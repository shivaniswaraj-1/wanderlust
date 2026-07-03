const User = require("../models/user");
const nodemailer = require("nodemailer");

// ✅ Shared in-memory OTP store (key: email, value: { code, expiresAt })
const otpMap = new Map();

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to WanderLust! you are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

// ✅ Send OTP to emailxss
// ✅ Send OTP to email (only if not already registered)
module.exports.sendOtpVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);

        // ⛔ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered. Please log in instead.",
            });
        }

        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
        const expiresAt = Date.now() + 5 * 60 * 1000;

        console.log("verification email: ", email);

        // Save OTP to in-memory map
        otpMap.set(email, { code: otp, expiresAt });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.VERIFICATION_SENDER_EMAIL,
                pass: process.env.VERIFICATION_EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.VERIFICATION_SENDER_EMAIL,
            to: email,
            subject: "Welcome to WanderLust! Here's your OTP to complete the signup:",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message,
        });
    }
};

// ✅ Verify OTP and complete signup
module.exports.verifyOtpAndSignup = async (req, res, next) => {
    const { username, email, password, otp } = req.body;
    const stored = otpMap.get(email);

    if (!stored || stored.code !== otp || Date.now() > stored.expiresAt) {
        req.flash("error", "Invalid or expired OTP");
        return res.redirect("/signup");
    }

    try {
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        otpMap.delete(email);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};
