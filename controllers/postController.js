require('dotenv').config();
const { User_post, User } = require('../models')
// const slug = require('slug')
var slugify = require('slugify')

class postController {

  // halaman POST PEKERJAAN | GET all data user_posts ( middlewares : JWT | login needed ) (alot)
  static getPost(req, res, next) {
    // console.log(User_post)
    User_post.findAll({
      order: [['id', 'DESC']],
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        res.status(200).json({
          status: [200, 'Success'],
          halaman: 'Home',
          message: 'Berhasil GET all Data User_posts',
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

  // halaman POST PEKERJAAN | GET Yours all data user_posts ( middlewares : JWT | login needed ) (one)
  static getYourPost(req, res, next) {
    const { unique_id } = req.userData; // hasil decoded dari middleware verifyToken    
    User_post.findAll({
      where: {
        unique_id
      },
      order: [["id", "DESC"]],
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Post',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Post',
            message: `Semua Postinganmu Username : ${data.username}`,
            data
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Post',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | GET all data user_posts by unique_id ( middlewares : JWT | login needed ) (alot)
  static getPostByUniqueId(req, res, next) {
    const { unique_id } = req.params; // hasil decoded dari middleware verifyToken    
    User_post.findAll({
      where: {
        unique_id
      },
      order: [["id", "DESC"]],
    })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'getPostByUniqueId',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'getPostByUniqueId',
            message: `Semua Postingan Berdasarkan unique_id : ${unique_id}`,
            data
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'getPostByUniqueId',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | GET data user_posts by slug ( middlewares : JWT | login needed ) (one)
  static getPostBySlug(req, res, next) {
    const { slug } = req.params;
    User_post.findOne({
      where: {
        slug,
      },
      include: {
        model: User,
        as: 'user'
      }
    })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            status: [404, "Failed"],
            halaman: "Post",
            message: "Data Post Tidak Ditemukan!",
          });
        } else {
          return res.status(200).json({
            status: [200, "Success"],
            halaman: "Post",
            message: `Semua Postinganmu Berdasarkan Slug : ${data.slug}`,
            data,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          status: [500, "Failed"],
          halaman: "Post",
          message: "Something went wrong",
          error: err,
        });
      });
  }

  // halaman POST PEKERJAAN | GET all data user_posts by category, from params url ( middlewares : JWT | login needed ) (alot)
  static getPostByCategory(req, res, next) {
    const { post_category } = req.params;
    User_post.findAll({
      where: {
        post_category
      },
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Post',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Post',
            message: `Kategori Postingan Berdasarkan ${data.post_category}`,
            data
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'Post',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | GET all data user_posts by tags, from params url ( middlewares : JWT | login needed ) (alot)
  static getPostByTags(req, res, next) {
    const { post_tags } = req.params;
    User_post.findAll({
      where: {
        post_tags
      },
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Post',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Post',
            message: `Kategori Postingan Berdasarkan ${data.post_tags}`,
            data
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'post',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | GET all data user_posts by terbaru, from params url ( middlewares : JWT | login needed ) (alot)
  static getPostByTerbaru(req, res, next) {
    User_post.findAll({
      order: [['id', 'DESC']],
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Post',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Post',
            message: `Kategori Postingan Berdasarkan id terbaru/terbesar`,
            data,
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'post',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | GET all data user_posts by terlama, from params url ( middlewares : JWT | login needed ) (alot)
  static getPostByTerlama(req, res, next) {
    User_post.findAll({
      order: [['id', 'ASC']],
      include: {
        model: User,
        as: 'user'
      }
    })
      .then(data => {
        if (data.length === 0) {
          return res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'Post',
            message: 'Data Post Tidak Ditemukan!'
          });
        }
        else {
          return res.status(200).json({
            status: [200, 'Success'],
            halaman: 'Post',
            message: `Kategori Postingan Berdasarkan id terlama/terkecil`,
            data,

          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'post',
          message: 'Something went wrong',
          error: err
        });
      });
  }

  // halaman POST PEKERJAAN | POST create data user_posts ( middlewares : JWT | login needed )
  static async createPostingan(req, res, next, fileName) {
    const { unique_id } = req.userData
    try {
      const {
        post_title, post_desc,
        post_category, post_tags, skills,
        min_price, max_price, post_worktime, post_worktime_time
      } = req.body;
      
      const currentDate = new Date(); // Dapatkan tanggal saat ini
      const expirationDate = new Date(); // Tambahkan 30 hari ke tanggal saat ini
      expirationDate.setDate(currentDate.getDate() + 30);
      
      // Fungsi untuk membuat slug
      const createSlug = (title) => {
        const formattedTitle = slugify(title)
        return formattedTitle
      };
      
      const slugFormated = createSlug(post_title); // Buat slug dari post_title
      const file = fileName;
      const skillsArray = skills.split(',');
      const newUser_post = await User_post.create({
        unique_id,
        slug: Date.now() + '-' + slugFormated,
        post_img: file,
        post_title,
        post_desc,
        post_category,
        post_tags,
        skills : skillsArray,
        min_price,
        max_price,
        post_worktime: post_worktime + ' ' + post_worktime_time,
        post_expired_in: expirationDate,
      });

      res.status(201).json({
        status: [201, 'Success'],
        halaman: 'Post',
        message: 'Postingan Berhasil ditambahkan!',
        data: newUser_post
      });
    } catch (err) {
      console.error('Postingan error:', err);
      res.status(500).json({
        status: [500, 'Failed'],
        halaman: 'Post',
        message: 'Gagal Posting',
        error: err.message
      });
    }
  }

  // halaman EDIT POSTINGAN | UPDATE data POSTINGAN by id ( middlewares : JWT | login needed )
  static updatePostingan(req, res, next, fileName) {
    const { slug } = req.params;
    const {
      post_title, post_desc,
      post_category, post_tags, skills,
      min_price, max_price, post_worktime, post_worktime_time
    } = req.body;

    // Fungsi untuk membuat slug
    const createSlug = (title) => {
      const formattedTitle = slugify(title)
      return formattedTitle
    };
    const slugFormated = createSlug(post_title);
    const skillsArray = skills.split(',');
    const file = fileName;

    const updatedPostingan = {
      slug: Date.now() + '-' + slugFormated,
      post_img: file, 
      post_title,
      post_desc, 
      post_category,
      post_tags, 
      skills : skillsArray,
      min_price,
      max_price,
      post_worktime: post_worktime + ' ' + post_worktime_time,
    }
    User_post.findOne({
      where: {
        slug,
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({
            status: [404, 'Success'],
            halaman: 'updatePostingan',
            message: 'Data tidak ditemukan!',
            data: updatedPostingan
          });
        } else {
          return User_post.update(updatedPostingan, { where: { slug } })
        }
      })
      .then(data => {
        res.status(200).json({
          status: [200, 'Success'],
          halaman: 'updatePostingan',
          message: 'Postingan berhasil di update!',
          data: updatedPostingan
        });
      })
      .catch(err => {
        res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'updatePostingan',
          message: 'Something went wrong!',
          error: err
        });
      })
  }

  static deletePostingan(req, res, next) {
    User_post.findByPk(req.params.id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            status: [404, 'Failed'],
            halaman: 'deletePostingan',
            message: 'Data tidak ditemukan!',
          });
        } else {
          return User_post.destroy({ where: { id: req.params.id } })
        }
      })
      .then(data => {
        res.status(200).json({
          status: [200, 'Success'],
          halaman: 'deletePostingan',
          message: 'Postingan berhasil di delete!',
        });
      })
      .catch(err => {
        res.status(500).json({
          status: [500, 'Failed'],
          halaman: 'deletePostingan',
          message: 'Something went wrong!',
          error: err
        });
      })
  }
}

module.exports = postController