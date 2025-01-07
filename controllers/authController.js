require('dotenv').config();
const { User } = require('../models')
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendVerificationMail } = require('../utils/sendVerificationMail');

class authController {

  // halaman REGISTER | POST data user
  static async register(req, res, next) {
    try {
      const { name, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const unique_id = uuidv4()
      
      const newUser = await User.create({
        id: unique_id,
        user_role_id: 2,
        unique_id,
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        status: "offline",
        emailToken: crypto.randomBytes(64).toString("hex")
      });

      sendVerificationMail(newUser) // kirim email asli

      res.status(201).json({
        status: [201, 'Success'],
        halaman: 'Register',
        message: 'Registrasi Berhasil, Verifikasi email anda!',
        data: newUser
      });

    } catch (err) {
      console.error('Registration error:', err);

      res.status(500).json({
        status: [500, 'Failed'],
        halaman: 'Register',
        message: 'Email atau Username Sudah Terdaftar',
        error: err.message
      });
      
    }
  }


  // halaman LOGIN | GET, POST & UPDATE data user
  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email: email
      }
    })
      .then(async data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Login',
            message: 'Email Salah atau Tidak Terdaftar!'
          });
        }
        const passwordMatch = await bcrypt.compare(password, data.password);
        if (!passwordMatch) {
          return res.status(400).json({
            status: [400, 'Failed'],
            halaman: 'Login',
            message: `Password Salah untuk email : ${data.email}`
          });
        }
        if (data.isVerified === null || data.isVerified === false) {
          return res.status(401).json({
            status: [401, 'Failed'],
            halaman: 'Login',
            message: 'Email belum diverifikasi!'
          });
        }
        else {
          const JWTtime = process.env.JWT_EXPIRED_TIME
          const token = jwt.sign({ // data yang di encoded jadi JWT, diteruskan ke middleware JWT : middlewares/index.js
            unique_id: data.unique_id,
            username: data.username,
            user_role_id: data.user_role_id,
          }, secretKey, { expiresIn: JWTtime });

          data.update({ 
            status: 'online',
            remember_token: token, // UPDATE data token ke database
           }) 
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Login',
            message: 'Anda Berhasil Login',
            token
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Login',
          message: 'Something went wrong',
          error: err.message
        });
      });
  }

  // halaman verifikasi EMAIL | 
  static verifyEmail(req, res, nex) {
    try {
      const emailToken = req.body.emailToken;
      if (!emailToken) {
        return res.status(404).json({
          status: [404, 'Failed'],
          halaman: 'verifyEmail',
          message: 'emailToken Not Found!'
        });
      }
      User.findOne({
        where: {
          emailToken
        }
      })
        .then(async data => {
          if(data) {
            data.update({ 
              emailToken: null,
              isVerified: true,
             }) 
            return res.status(200).json({
              status: [200, 'Success'],
              halaman: 'verifyEmail',
              message: 'Email berhasil terverifikasi',
              data,
            });
          } else {
            return res.status(404).json({
              status: [404, 'Failed'],
              halaman: 'verifyEmail',
              message: 'Verifikasi email gagal, token salah!',
              data,
            });
          }
        })
    } catch (err) {
      return res.status(500).json({
        status: [500, 'Failed'],
        halaman: 'verifyEmail',
        message: 'Something went wrong',
        error: err.message
      });
    }
  }

  // halaman resend email verification
  static async resendVerification(req, res, next) {
    const { email } = req.body;
    User.findOne({
      where: {
        email: email
      }
    })
      .then(async data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Login',
            message: 'Email Salah atau Tidak Terdaftar!'
          });
        }
        else {
          sendVerificationMail(data)
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Login',
            message: 'Email verifikasi terkirim, cek email anda',
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Login',
          message: 'Something went wrong',
          error: err.message
        });
      });
  }

  // halaman LOGOUT | GET & UPDATE data user ( middlewares : JWT | login needed )
  static logout(req, res, next) {
    const { unique_id } = req.userData;
    User.findOne({
      where: {
        unique_id
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Logout',
            message: 'Token Salah atau Anda Belum Login!'
          });
        }
        else {
          data.update({ 
            status: 'offline',
            remember_token: null  // UPDATE to NULL data token ke database
          }) 
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Logout',
            message: 'Anda Berhasil Logout',
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Logout',
          message: 'Something went wrong',
          error: err
        });
      });
  }
  
}

module.exports = authController