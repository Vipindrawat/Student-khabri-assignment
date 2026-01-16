import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../Model/UserModel.js';

router.post('/register',
    [
        body('name', 'enter name of atleast 3 character').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        body('password', 'enter password of atleast  5 digit').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {

                let user = await User.findOne({ "email": req.body.email });

                if (user) {
                    res.json({ success: false, error: "email of this name already exists" });
                }
                else {
                    let hash = await bcrypt.hash(req.body.password, 10);

                    user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    await user.save();

                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                    res.status(200).json({ success: true, token });
                }
            }

            else {
                res.json({ success: false, errors: result.array() });
            }
        }
        catch (error) {
            res.status(500);
            res.json({ success: false, error: "intenal server error", message: error.message });
        }
    })



router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const result = validationResult(req);

            if (result.isEmpty()) {

                const { email, password } = req.body;
                let findemail = await User.findOne({ email });

                if (!findemail) {
                    return res.status(400).json({ success: false, error: "please enter valid credentials" });
                }

                let passwordcheck = await bcrypt.compare(password, findemail.password);
                if (!passwordcheck) {
                    return res.status(400).json({ success: false, "error": "Please enter valid credentials" });
                }

                let token = jwt.sign({ id: findemail.id }, process.env.JWT_SECRET);
                res.status(200).json({ success: true, token });
            }
            else {
                res.json({ success: false, errors: result.array() });
            }
        }
        catch (error) {
            res.status(500);
            res.json({ success: false, error: "intenal server error", message: error.message });
        }
    })
export default router;