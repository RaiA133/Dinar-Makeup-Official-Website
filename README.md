## Di Mohon jangan PUSH Langsung ke Branch "master" / "development"

<br>

## Cara Branching (Backend)

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git checkout -b "BE/improvement/apa-yang-di-improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git checkout -b "BE/bugfix/apa-yang-di-fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git checkout -b "BE/feature/fitur-apa-yang-di-buat`

## Cara Branching (Frontend)

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git checkout -b "FE/improvement/apa-yang-di-improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git checkout -b "FE/bugfix/apa-yang-di-fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git checkout -b "FE/feature/fitur-apa-yang-di-buat`

## Cara Commit

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git commit -m "improvement: apa yang di improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git commit -m "bugfix: apa yang di fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git commit -m "feature: fitur apa yang di buat`


## Endpoint Response
response harus wajib berisi : 
- status: `Success / Failed`
- halaman: `Nama-halaman`
- message: `Pesan Keterangan`

jika ada data lain misal data yang ingin ditampilan sertakan diakhir. misalnya seperti data atau error pada 2 gambar dibawah.