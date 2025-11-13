// 📦 Dependencias
const XLSX = require('xlsx');
const path = require('path');
const db = require('./src/config/firebase'); // tu conexión a Firestore

// 🔹 Función para leer Excel
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
}

// 🔹 Función para subir los registros a Firestore
async function upload(file, collectionName, idField = null) {
  const data = readExcel(path.join(__dirname, 'data', file));
  console.log(`📂 Subiendo ${data.length} registros a ${collectionName}`);

  for (const record of data) {
    try {
      // Verificamos que el campo ID exista y tenga valor
      if (idField && record[idField] !== null && record[idField] !== undefined && record[idField] !== '') {
        const docId = String(record[idField]).trim(); // Convertimos a string limpio
        const docData = { ...record }; // copiamos todo
        delete docData[idField]; // quitamos el campo idFoto del cuerpo

        await db.collection(collectionName).doc(docId).set(docData);
        console.log(`✅ Documento ${docId} subido a ${collectionName}`);
      } else {
        console.warn(`⚠️ Registro sin campo ${idField}, se agregará con ID automático`);
        await db.collection(collectionName).add(record);
      }
    } catch (err) {
      console.error(`❌ Error subiendo registro con ${idField}: ${record[idField]} → ${err.message}`);
    }
  }

  console.log(`✅ Carga completa en colección: ${collectionName}`);
}

// 🚀 Ejecutar la carga
(async () => {
  try {
    await upload('banners.xlsx', 'banners', 'idFoto'); // <-- asegúrate que la columna del Excel se llame exactamente idFoto
    console.log('🚀 Todo listo.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error general:', err);
    process.exit(1);
  }
})();

