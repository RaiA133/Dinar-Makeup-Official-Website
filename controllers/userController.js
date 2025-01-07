require('dotenv').config();
const { User } = require('../models')
const { Op } = require('sequelize');

class userController {

  // halaman PROFILE | GET data user by id ( middlewares : JWT | login needed )
  static getUserById(req, res, next) {
    const { unique_id } = req.userData; // hasil decoded dari middleware verifyToken
    User.findOne({
      where: {
        unique_id
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Profile',
            message: [
              'Anda Belum Login !',
              'token false'
            ]
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Profile',
            message: 'Berhasil Masuk Ke Profile',
            data
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Profile',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman EDIT PROFILE | UPDATE data user by id ( middlewares : JWT | login needed )
  static updateProfile(req, res, next, fileName) {
    const { unique_id } = req.userData; // hasil decoded dari middleware verifyToken
    const {
      name, username, email,
      hapus_img, birth_date,
      birth_place, about, company,
      job, country, address, contact,
      web_link, github_link, fb_link, ig_link
    } = req.body;
    const imgProfileValue = hapus_img ? hapus_img : fileName;
    // console.log('asd', username)
    // return
    const updatedUser = {
      name, username, email,
      img_profile: imgProfileValue, birth_date,
      birth_place, about, company,
      job, country, address, contact,
      web_link, github_link, fb_link, ig_link
    }
    User.findOne({
      where: {
        username,
        unique_id: {
          [Op.not]: unique_id // kecuali email sendiri
        }
      }
    })
      .then(existingUser => {
        if (existingUser) {
          console.log(existingUser)
          // Email is already in use
        res.status(400).json({
          status: [400, 'Failed'],
          halaman: 'Profile',
          message: 'Username tidak tersedia.'
        });
        } else {
          // Update the user's profile
          User.findOne({
            where: {
              unique_id
            }
          })
            .then(data => {
              if (!data) {
                res.status(404).json({
                  status: [404, 'Failed'],
                  halaman: 'updateProfile',
                  message: 'Data Tidak Ditemukan!'
                });
              } else {
                // Update the user's profile if email is not in use
                data.update(updatedUser)
                res.status(200).json({
                  status: [200, 'Success'],
                  halaman: 'updateProfile',
                  message: 'Data Berhasil Diupdate!',
                  data: updatedUser
                });
              }
            })
            .catch(err => {
              res.status(500).json({
                status: [500, 'Failed'],
                halaman: 'updateProfile',
                message: 'Something went wrong',
                error: err
              });
            });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'updateProfile',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // get data user by unique_id from params
  static getUserByUniqueId(req, res, next) {
    const { unique_id } = req.params; // hasil decoded dari middleware verifyToken
    User.findOne({
      where: {
        unique_id
      }
    })
      .then(data => {
        // if (!data) {
        //   return res.status(404).json({
        //     status: [404, 'Failed'],
        //     halaman: 'getUserByUniqueId',
        //     message: 'Data User Tidak Ditemukan'
        //   });
        // }
        // else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'getUserByUniqueId',
            message: `Data User Dengan unique_id: ${unique_id} ditemukan`,
            data
          });
        // }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'getUserByUniqueId',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // get all data user (none admin)
  static getUser(req, res, next) {
    User.findAll({
      order: [['no', 'ASC']],
    })
      .then(data => {
        res.status(200).json({
          status: [200, 'Success'],
          halaman: 'Home',
          message: 'Berhasil GET all Data Users',
          data,
        })
      })
      .catch(err => {
        res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Home',
          message: 'Something went wrong',
          error: err
        })
      })
  }
  
}

module.exports = userController