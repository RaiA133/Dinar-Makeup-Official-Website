# # FINAL PROJECT | RAKAMIN ACADEMY | FSWD-5B

## Kelompok 1

- Raie Aswajjillah
- Affan Maulana Zulkarnain
- Muhammad Ikhsan Supriadi
- Iffat Nabil Wiridana
- Holid Muhamad Salman
- Hadiyantrama Oscar Santoso

```bash
npm install
```
Setelah melakukan `npm install` , lakukan setup file config.json untuk mengatur username & password dari databasemu.

# Di Mohon jangan PUSH Langsung ke Branch "master"

## Cara Branching (BackEnd)

- Jika kamu bermaksud untuk meng-_improve_ atau memperbaharui

  > `git checkout -b "improvement/apa-yang-di-improve`

- Jika kamu bermaksud untuk _Bug Fixing_

  > `git checkout -b "bugfix/apa-yang-di-fix`

- Jika kamu bermaksud untuk menambah _Feature_

  > `git checkout -b "feature/fitur-apa-yang-di-buat`

## Cara Branching (FrontEnd)

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

## Setup .env & config.json
Duplicate file `.env.example` jadi `.env` dan `config.example.json`  di folder config jadi `config.json`, lalu atur isi dari
kedua file tersebut sesuai dengan environment variable local mu.

Jika ingin melakukan `npm run start` ubah `NODE_ENV` pada file .env menjadi `NODE_ENV=development`. Jika `NODE_ENV=test` maka proses listening dari server tidak akan berjalan.

## Step Setup Database Utama*
```bash
npx sequelize-cli db:create
```
```bash
npx sequelize-cli db:migrate
```
```bash
npx sequelize-cli db:seed:all
```
Lakukan ``npx sequelize-cli db:migrate:undo`` jika ingin menghapus table.

## Endpoint Response
response harus wajib berisi : 
- status: `Success / Failed`
- halaman: `Nama-halaman`
- message: `Pesan Keterangan`

jika ada data lain misal data yang ingin ditampilan sertakan diakhir. misalnya seperti data atau error pada 2 gambar dibawah.

<img src="assets/img/readme/contoh-endpoint-return-1.png" height="120" title="hover text">
<img src="assets/img/readme/contoh-endpoint-return-2.png" height="120" alt="accessibility text">

## Developer Custom Script
```npm run fresh```  

untuk menjalankan `db:migrate:undo:all` , `db:migrate` dan `db:seed:all ` secara bersamaan pada sequelize, atau yang disebut refresh database. Atur `NODE_ENV` di .env menjadi `development` atau `test`.

## Unit Testing
untuk melakukan unit testing lakukan semua perintah dibawah : 
- ubah ``NODE_ENV=development`` menjadi ``NODE_ENV=test`` di `.env` ,
- jalankan ```npm run fresh``` di terminal
- jalankan ```npm run test``` di terminal