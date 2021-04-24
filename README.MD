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
➖➖➖➖➖➖➖➖➖➖➖
*>> <NOMOR>. <NAMA> <ICON>*
_Update status._
_Contoh: '>> 1. Fulanah 💯'_
_Contoh (short): '>> 1 💯'_

*>> recap*
_Melihat recap terakhir._

*>> recap-hari <N>*
_Melihat status recap di hari ke-N. Dan mengubah perhitungan menjadi Hari ke-N._
_Contoh: '>> recap-hari 3'_

*>> belum-recap*
_Me-list daftar nama yang belum recap pada hari ke-N._

➖➖➖➖➖➖➖➖➖➖➖

*>> ubah-periode*
_Update periode._
_Contoh: '>> ubah-periode 26 April - 3 Mei 2021'

*>> ubah-pjh <GRUP KE-N> <NAMA>*
_Ubah PJH grup._
_Contoh: '>> ubah-pjh 2 Fulanah'

*>> ubah-admin | ubah-asmin | ubah-bendahara <NAMA>*
_Update pengelola._
_Contoh: '>> ubah-admin Fulanah_Binti_Fulan'_

➖➖➖➖➖➖➖➖➖➖➖

*>> tambah-doa <PESAN>*
_Menambahkan list doa._

*>> hapus-doa*
_Menghapus doa terakhir dari list doa._

*>> tambah-motivasi <PESAN>*
_Menambahkan list motivasi._

*>> hapus-motivasi*
_Menghapus motivasi terakhir dari list motivasi._

*>> tambah-catatan <PESAN>*
_Menambahkan list catatan._

*>> hapus-catatan*
_Menghapus catatan terakhir dari list catatan._

*>> ubah-catatan-penting <PESAN>*
_Mengubah catatan penting._

➖➖➖➖➖➖➖➖➖➖➖

*>> help*
_Kumpulan perintah._
