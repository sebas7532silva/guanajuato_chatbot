const XLSX = require('xlsx');
const path = require('path');
const db = require('./src/config/firebase');

function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
}

async function upload(file, collectionName, idField = null) {
  const data = readExcel(path.join(__dirname, 'data', file));
  console.log(`📂 Subiendo ${data.length} registros a ${collectionName}`);

  for (const record of data) {
    if (idField && record[idField]) {
      const docId = String(record[idField]);
      delete record[idField];
      await db.collection(collectionName).doc(docId).set(record);
    } else {
      await db.collection(collectionName).add(record);
    }
  }

  console.log(`✅ ${collectionName} completado.`);
}

(async () => {
  try {
    await upload('oficinas.xlsx', 'idOficina');
    await upload('requisitos.xlsx', 'requisitos', 'reqId');
    await upload('requisitos-tramites.xlsx', 'requisitos-tramites', 'reqDocId');
    await upload('tramites.xlsx', 'tramites', 'TramiteId');
    console.log('🚀 Carga completa en Firestore.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();

