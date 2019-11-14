const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const passwordGenerator = require('generate-password');
const mailer = require('../../mailer/mailer');
const dotenv = require('dotenv');
dotenv.config();

// User Model
const User = require('../../models/User');

// @route   POST /api/users/auth
// @desc    Auth user
// @access  Public
router.post('/auth', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                }
              });
            }
          )
        })
    })
});

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simple validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          const originalPassword = newUser.password;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email
                    }
                  });
                }
              );

              const emailTemplate = `
                <p><b>Account Credentials</b></p>
                <table>
                  <tbody>
                    <tr>
                      <td><b>Username: </b></td>
                      <td>${newUser.email}</td>
                    </tr>
                    <tr>
                      <td><b>Password: </b></td>
                      <td>${originalPassword}</td>
                    </tr>
                  </tbody>
                </table>
              `;
              mailer.sendEmail('testreactauth@gmail.com', 'RAS - Account Created', emailTemplate);

              return res.status(200).json({ msg: 'Successfully created account. An email with your credentials has been sent.' });
            });
        });
      });
    })
});

router.post("/resetpassword", (req, res) => {
  const { email } = req.body;

  // Simple validation
  if (!email) {
    return res.status(400).json({ msg: 'Please enter an email address' });
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        const newPassword = passwordGenerator.generate({
          length: 16,
          numbers: true,
        });

        user.password = newPassword;

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
              .then(user => {
                const emailTemplate = `
                  <p><b>Reset Password</b></p>
                  <table>
                    <tbody>
                      <tr>
                        <td><b>Username: </b></td>
                        <td>${user.email}</td>
                      </tr>
                      <tr>
                        <td><b>New Password: </b></td>
                        <td>${newPassword}</td>
                      </tr>
                    </tbody>
                  </table>
                `;
                mailer.sendEmail('testreactauth@gmail.com', 'RAS - Password Reset', emailTemplate);

                return res.status(200).json({ msg: 'Successfully changed password. An email with new password has been sent.' });
              });
          })
        });

      } else {
        return res.status(400).json({ msg: 'Email address does not exist.' });
      }
    })
});

// @route   GET /api/users/loaduser
// @desc    Get user data
// @access  Private
router.get('/loaduser', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
