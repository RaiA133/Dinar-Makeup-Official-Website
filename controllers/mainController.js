class mainController {
  // halaman HEALTH-CHECK | Testing Routes
  static healthCheck(req, res, next) {
    res.status(200).json({
      status: [200, 'Success'],
      halaman: 'Health-check',
      message: 'Routes berjalan dengan baik',
    })
  }

  // halaman test token | Testing Routes | juga mengembalikan hasil decoded dari token
  static testSession(req, res, next) {
    const { id, unique_id, user_role_id, username } = req.userData;         // tanpa dikirim ke socket.io
    try {
      res.status(200).json({
        status: [200, 'Success'],
        halaman: 'Test-Session-Login',
        message: 'Routes berjalan dengan baik',
        tokenDecoded: { id, unique_id, user_role_id, username },
      })
    }
    catch (error) {
      return res.status(401).json({
        status: 'Failed',
        halaman: 'Test-Session-login',
        message: 'Sesi Login Berakhir.',
        err: err.message
      });
    }
  }

}

module.exports = mainController
