require('dotenv').config();
const { User, User_post } = require('../models')
const { User_role } = require('../models')


class adminController {
  // halaman ADMIN | GET all data user ( middlewares : JWT | login needed )
  static getUser(req, res, next) {
    const {user_role_id } = req.params
    User.findAll({
      where: {
        user_role_id
      },
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

  static getUserByUniqueId(req, res, next) {
    const { unique_id } = req.params; // hasil decoded dari middleware verifyToken
    User.findOne({
      where: {
        unique_id
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'getUserByUniqueId',
            message: `Data User dengan unique_id ${unique_id} Tidak Ditemukan`,
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'getUserByUniqueId',
            message: `Data User dengan unique_id ${unique_id} ditemukan`,
            data
          });
        }
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

  static getUserRole(req, res, next) {
    User_role.findAll()
      .then(data => {
        res.status(200).json({
          status: [200, 'Success'],
          halaman: 'Home',
          message: 'Berhasil GET all Data Role',
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

  // halaman ADMIN | DELETE data user by id ( middlewares : JWT | login needed )
  static deleteUserById(req, res, next) {
    const { id } = req.params; // hasil decoded dari middleware verifyToken
    User.destroy({
      where: {
        id,
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Administrator',
            message: [
              'Anda Belum Login!',
              'Data Tidak ada'
            ]
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Administrator',
            message: `Data User Berhasil Dihapus`,
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Administrator',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman ADMIN | DELETE data user by unique_id & delete all his post ( middlewares : JWT | login needed )
  static deleteUserByUniqueId(req, res, next) {
    const { unique_id } = req.params;
    User_post.destroy({ // delete semua postingan user
      where: {
        unique_id,
      }
    })
      .then(data => {
        if (!data) {
          User.findOne({
            where: {
              unique_id
            }
          })
            .then(data => {
              if (!data) {
                return res.status(404).json({
                  status: [404, 'Failed'],
                  halaman: 'getUserByUniqueId',
                  message: `Data User dengan unique_id ${unique_id} Tidak Ditemukan`,
                });
              }
              else {
                User.destroy({ where: { unique_id } }) // delete semua user
                return res.status(200).json({
                  status: [200, 'Success'],
                  halaman: 'Administrator',
                  message: `Username ${data.username} berhasil di delete! (tidak memiliki postingan)`,
                });
              }
            })
        }
        else {
          User.findOne({
            where: {
              unique_id
            }
          })
            .then(data => {
              if (!data) {
                return res.status(404).json({
                  status: [404, 'Failed'],
                  halaman: 'getUserByUniqueId',
                  message: `Data User dengan unique_id ${unique_id} Tidak Ditemukan`,
                });
              }
              else {
                User.destroy({ where: { unique_id } }) // delete semua user
                return res.status(200).json({
                  status: [200, 'Success'],
                  halaman: 'Administrator',
                  message: `Username ${data.username} Beserta Seluruh Postingannya berhasil di delete!`,
                });
              }
            })
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Administrator',
          message: 'Something went wrong',
          error: err
        });
      });
  }
}

module.exports = adminController