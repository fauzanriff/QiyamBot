# Whastapp Muslimah Qiyam Bot

WhatsApp Bot to manage qiyam report.

## How To Use

1. Clone this repository

2. Install npm packages (open it in terminal)

```
npm install
```

3. Rename config.example.json to config.json and set config file

```json
{
    "botPrefix": "SELECT YOUR BOT PREFIX HERE",
    "botNumber": "ENTER YOUR BOT NUMBER",
    "botHttpPort": "ENTER YOUR CUSTOM BOT HTTP PORT",
    "mongoPath": "ENTER YOUR MONGODB CONNECTION"
}
```

4. Optional : Install **nodemon** as global

```
npm install -g nodemon
```

4. Optional : Install **chromium** as global

```
npm install -g chromium
```

5. Optional : For use chromium change in index.js
```js
const client = new Client({
  // to run chromium set headless = false
  puppeteer: { headless: true },
  session: sessionCfg,
});
```

6. Run bot as **watch** or **start** script

```
npm run start
```

## Command

### Member Action
```ssh
>> <NOMOR>. <NAMA> <ICON>
```
Update status.
Ex: `>> 1. Fulanah 💯`
Ex (short): `>> 1 💯`

```ssh
>> recap
```
Melihat recap terakhir.

```ssh
>> recap-hari <N>
```
Melihat status recap di hari ke-N. Dan mengubah perhitungan menjadi Hari ke-N.
Ex: `>> recap-hari 3`

```ssh
>> belum-recap
```
Me-list daftar nama yang belum recap pada hari ke-N.

### Group Management

```ssh
>> ubah-periode
```
Update periode.
Ex: `>> ubah-periode 26 April - 3 Mei 2021`

```ssh
>> ubah-pjh <GRUP KE-N> <NAMA>
```
Ubah PJH grup.
Ex: `>> ubah-pjh 2 Fulanah`

```ssh
>> ubah-admin | ubah-asmin | ubah-bendahara <NAMA>
```
Update pengelola.
Ex: `>> ubah-admin Fulanah_Binti_Fulan`

### Group Meta

```ssh
>> tambah-doa <PESAN>
```
Menambahkan list doa.

```ssh
>> hapus-doa
```
Menghapus doa terakhir dari list doa.

```ssh
>> tambah-motivasi <PESAN>
```
Menambahkan list motivasi.

```ssh
>> hapus-motivasi
```
Menghapus motivasi terakhir dari list motivasi.

```ssh
>> tambah-catatan <PESAN>
```
Menambahkan list catatan.

```ssh
>> hapus-catatan
```
Menghapus catatan terakhir dari list catatan.

```ssh
>> ubah-catatan-penting <PESAN>
```
Mengubah catatan penting.

### Others

```ssh
>> help
```
Kumpulan perintah.
