let urlport="https://bkkbn-api.herokuapp.com/https://projectbkkbn.herokuapp.com/api/";
let urlportrefresh="https://projectbkkbn.herokuapp.com/api/";


 // Vuser
export const urlPostLogin=urlport+'vuser/showUser'
export const urlAddVuser=urlport+'vuser/storeUser'
export const urlEditVuser=urlport+'vuser/updateUser'
export const urlUbahPassword=urlport+'vuser/ubahPassword'
export const urlGetVuser=urlport+'vuser/getUser'
export const urlDeleteUser=urlport+'vuser/deleteUser'

// setting
export const urlShowSetting=urlport+'setting/showSetting'
export const urlAddSetting=urlport+'setting/storeSetting'
export const urlEditSetting=urlport+'setting/updateSetting'
export const urlGetSetting=urlport+'setting/getSetting'
export const urlDeleteSetting=urlport+'setting/deleteSetting'

// kel data
export const urlShowKelompokData=urlport+'kelompok-data/showKelompokData'
export const urlAddKelompokData=urlport+'kelompok-data/storeKelompokData'
export const urlEditKelompokData=urlport+'kelompok-data/updateKelompokData'
export const urlGetKelompokData=urlport+'kelompok-data/getKelompokData'
export const urlDeleteKelompokData=urlport+'kelompok-data/deleteKelompokData'

// targetKK
export const urlShowTargetKk=urlport+'target-kk/showTargetKk'
export const urlShowTargetKkPerProv=urlport+'target-kk/showTargetKkPerProv'
export const urlAddTargetKk=urlport+'target-kk/storeTargetKk'
export const urlEditTargetKk=urlport+'target-kk/updateTargetKk'
export const urlGetTargetKk=urlport+'target-kk/getTargetKk'
export const urlDeleteTargetkk=urlport+'target-kk/deleteTargetKk'

 //provinsi
export const urlProv=urlport+'provinsi/getProvinsi'
export const urlAddProv=urlport+'provinsi/storeProv'
export const urlEditProv=urlport+'provinsi/updateProv'
export const urlDeleteProv= urlport+ 'provinsi/deleteProv'
export const urlLaporanProv=urlport+'provinsi/laporanProv'
export const urlLaporanPerProv=urlport+'provinsi/laporanPerProv'

 //Kecamatan
 export const urlKec=urlport+'kecamatan/getKecamatan'
 export const urlAddKec=urlport+'kecamatan/storeKec'
 export const urlEditKec=urlport+'kecamatan/updateKec'
 export const urlShowKec=urlport+'kecamatan/showKecamatan'
 export const urlShowKecs=urlport+'kecamatan/showKecamatans'
 export const urlDeleteKec=urlport+'kecamatan/deleteKec'
 export const urlLaporanKec=urlport+'kecamatan/laporanKec'
 export const urlShowPerKec=urlport+'kecamatan/show-per-kec'

// Kelurahan
export const urlKel = urlport+'kelurahan/getKelurahan'
export const urlAddKel = urlport+'kelurahan/storeKel'
export const urlEditKel = urlport+'kelurahan/updateKel'
export const urlShowKel = urlport + 'kelurahan/showKel'
export const urlDeleteKel = urlport+'kelurahan/deleteKel'
export const urlLaporanKel=urlport+'kelurahan/laporanKel'
export const urlLaporanPerKel=urlport+'kelurahan/laporanPerKel'

//Kabupaten
export const urlShowKab=urlport+'kabupaten/showKabupaten'
export const urlShowsKab=urlport+'kabupaten/showsKabupaten'
 export const urlKab=urlport+'kabupaten/getKabupaten'
 export const urlDeleteKab=urlport+'kabupaten/deleteKab'
 export const urlAddKab=urlport+'kabupaten/storeKab'
 export const urlEditKab=urlport+'kabupaten/updateKab'
 export const urlLaporanKab=urlport+'kabupaten/laporanKab'
 export const urlLaporanPerKab=urlport+'kabupaten/show-per-kab'

 //RW
export const urlShowRw=urlport+'rw/showRw'
export const urlRw=urlport+'rw/getRw'
export const urlAddRw=urlport+'rw/storeRw'
export const urlEditRw=urlport+'rw/updateRw'
export const urlDeleteRw=urlport +'rw/deleteRw'

//RT
export const urlShowRt=urlport+'rt/showRt'
export const urlRt=urlport+'rt/getRt'
export const urlAddRt=urlport+'rt/storeRt'
export const urlEditRt=urlport+'rt/updateRt'
export const urlDeleteRt=urlport +'rt/deleteRt'

//LaporanSensus
export const urlShowLaporanSensusID=urlport +'laporan-sensus/indonesia'
export const urlShowLaporanSensusPerProv=urlport +'laporan-sensus/perprov'
export const urlShowLaporanSensusPerKab=urlport +'laporan-sensus/perkab'
export const urlShowLaporanSensusPerKec=urlport +'laporan-sensus/perkec'
export const urlShowLaporanSensusPerKel=urlport +'laporan-sensus/perkel'

//User Access Survey
export const urlGetUserAccessSurvey = urlport + 'user-access-survey/get'
export const urlPostLoginUser = urlport + 'user-access-survey/showUAS'
export const urlAddUserAccessSurvey = urlport + 'user-access-survey/store'
export const urlEditUserAccessSurvey = urlport + 'user-access-survey/update'
export const urlDeleteUserAccessSurvey = urlport + 'user-access-survey/delete'

//Form KK
export const urlGetFormKK = urlport + 'form-kk/getFormKK'
export const urlAddFormKK = urlport + 'form-kk/storeFormKK'
export const urlEditFormKK = urlport + 'form-kk/updateFormKK'
export const urlDeleteFormKK = urlport + 'form-kk/deleteFormKK'
export const urlAccForm = urlport +'form-kk/acceptFormKK'
export const urlGetIdKK = urlport + 'form-kk/getIdKK'
export const urlAccKK = urlport + 'form-kk/acceptFormKK'
export const urlshowKKPerprov = urlport + 'form-kk/showKKPerprov'

//Anggota KK
export const urlGetAnggotaKK = urlport + 'anggota-kk/getAnggotaKK'
export const urlShowAnggotaKK=urlport+'anggota-kk/showAnggotaKK'
export const urlAddAnggotaKK=urlport+'anggota-kk/storeAnggotaKK'
export const urlEditAnggotaKK=urlport+'anggota-kk/updateAnggotaKK'
export const urlGetNIKAnggota=urlport+'anggota-kk/getNIKAnggota'

//KB
export const urlGetKB = urlport + 'data-kb/getKB'
export const urlUpdateKB = urlport + 'data-kb/updateKB'
export const urlEditKB = urlport + 'data-kb/editKB'
export const urlShowNama = urlport + 'data-kb/showNama'
export const urlAddKB = urlport + 'data-kb/addKB'
export const urlDeleteKB = urlport + 'data-kb/deleteKB'

// Realisasi
export const urlshowRealisasiID = urlport + 'realisasi/id'
export const urlRealisasiPerprov = urlport + 'realisasi/perprov'
export const urlRealisasiPerkab = urlport + 'realisasi/perkab'
export const urlRealisasiKBID = urlport + 'realisasi/kbId'
export const urlRealisasiKBPerProv = urlport + 'realisasi/alatKbPerProv'
export const urlRealisasiKBPerKab = urlport + 'realisasi/alatKbPerKab'
