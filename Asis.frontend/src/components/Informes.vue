<template>
  <div>
    <div class="title">
      <h3>Informes</h3>
    </div>

    <hr class="divider" />

    <div class="date">
      <input type="datetime-local" v-model="fechaInicial" name="fechaInicial" id="fechaInicial" />
      <input type="datetime-local" v-model="fechaFinal" name="fechaFinal" id="fechaFinal" />

      <q-btn :loading="UseBitacora.loading" color="green" @click="Buscar">
        Buscar
        <template v-slot:loading>
          <q-spinner color="white" size="1em" />
        </template>
      </q-btn>
    </div>

    <!-- Tabla -->
    <div class="q-pa-md q-gutter-sm">
      <div class="table">


        
        <q-table title="Informes" :rows="rows" :columns="columns" row-key="name"></q-table>

      </div>
    </div>

    <!-- Botones de carga y descarga -->
    <div class="actions">
      <q-btn color="blue" label="Cargar Archivo" @click="cargarArchivo">
        <input type="file" ref="fileInput" style="display: none" @change="manejarArchivo" />
      </q-btn>

      <q-btn color="green" label="Descargar Informe en PDF" @click="descargarInformePdf" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { UseBitacoraStore } from "../Stores/bitacoras";
import jsPDF from "jspdf-autotable"; // Importar jsPDF para generar el PDF

let fechaInicial = ref("");
let fechaFinal = ref("");
const UseBitacora = UseBitacoraStore();
const rows = ref([]);
const columns = ref([
  { name: "Numero", label: "N°", align: "left", field: "numero", sortable: true },
  { name: "nombreAprendiz", label: "Aprendiz", align: "left", field: "nombreAprendiz", sortable: true },
  { name: "telefonoAprendiz", label: "Número de Teléfono", align: "left", field: "telefonoAprendiz", sortable: true },
  { name: "emailAprendiz", label: "Email", align: "left", field: "emailAprendiz", sortable: true },
  { name: "nombreFicha", label: "Programa de Formación", align: "center", field: "nombreFicha", sortable: true },
  { name: "FechaHora", label: "Fecha y Hora", align: "center", field: "FechaHora", sortable: true },
]);

onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await UseBitacora.listar();
  rows.value = res?.data || [];
}

async function Buscar() {
  let res = await UseBitacora.listarBitacora(fechaInicial.value, fechaFinal.value);
  rows.value = res?.data?.map((item, index) => ({ ...item, numero: index + 1 })) || [];
}

// Manejar archivo cargado
function cargarArchivo() {
  const fileInput = this.$refs.fileInput;
  fileInput.click();
}

function manejarArchivo(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("Contenido del archivo:", e.target.result);
    };
    reader.readAsText(file);
  }
}

// Descargar informe en PDF
function descargarInformePdf() {
  const pdf = new jsPDF();
  pdf.setFontSize(14);
  pdf.text("Informe de Asistencia", 10, 10);

  // Crear la tabla en el PDF
  const tableColumn = columns.value.map((col) => col.label); // Encabezados
  const tableRows = rows.value.map((row) =>
    columns.value.map((col) => row[col.field] || "")
  );

  pdf.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  // Descargar el PDF
  pdf.save("informe.pdf");
}
</script>

<style>
.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
}

.file-input {
  display: none;
}
</style>