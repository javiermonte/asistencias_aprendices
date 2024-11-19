<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Fichas</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Crear" icon="add_circle" color="green" @click="AbrirModal = true" />
      

      <div class="table-container">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn round color="white" :style="{ border: '2px solid green' }" @click="Abrir(props.row)">
                <q-icon name="edit" style="color: green" />
              </q-btn>
              <q-btn icon="close" round color="red" @click="Activar(props.row._id)" v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)" v-else />
            </q-td>
          </template>
          
          <template v-slot:body-cell-Estado1="props">
            <q-td :props="props">
              <p v-if="props.row.Estado == 1" class="custom-font" style="color: green">Activo</p>
              <p v-else class="custom-font" style="color: red">Inactivo</p>
            </q-td>
          </template>

          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.pageIndex + 1 }}</span>
            </q-td>
          </template>
          
          <template v-slot:body-cell-Nombre1="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.row.Nombre }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-Codigo1="props">
            <q-td :props="props">
              <span class="custom-font">{{ props.row.Codigo }}</span>
            </q-td>
          </template>
          
        </q-table>
      </div>

      <q-dialog v-model="AbrirModal" persistent>
        <q-card style="min-width: 350px; margin-top: 0">
          <q-card-section>
            <div class="iconoAprendiz">
              <!-- <img src="https://img.icons8.com/?size=100&id=41414&format=png&color=000000" alt="" /> -->
            </div>
            <div class="text">
              {{ p == true ? "Editar Ficha" : "Agregar Ficha" }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <!-- <label for="codigo">Nombre</label> -->
            <q-input dense v-model="nombre" placeholder=" Nombre" autofocus color="green"
              @keyup.enter="prompt = false" />
            <br />

            <!-- <label for="codigo">codigo</label> -->
            <q-input dense v-model="codigo" placeholder="Codigo" autofocus color="green"
              @keyup.enter="prompt = false" />
            <br />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />

            <q-btn :loading="useFicha.loading" label="Enviar" color="green" @click="CrearFicha()">
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { UseFichaStore } from "../Stores/Fichas";

let inf = ref("");
let AbrirModal = ref(false);
let codigo = ref("");
let nombre = ref("");
let p = ref(false);
let id = ref("");

const useFicha = UseFichaStore();

const rows = ref([]);
// ficha
onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await useFicha.listarFicha();
  rows.value = res.data;
}

function limpiarCampos() {
  nombre.value = "";
  codigo.value = "";
}

async function CrearFicha() {
  console.log(p.value);
  
let res;
if (p.value ) {
    // Editando una ficha existente
    res = await useFicha.EditarFicha(id.value, nombre.value, codigo.value);
  } else {
    // Creando una nueva ficha
    res = await useFicha.crearFicha(codigo.value, nombre.value);

  }

  // Verificar el estado de la respuesta
  if (res) {
    await traer(); // Refrescar los datos
    AbrirModal.value = false; // Cerrar modal en caso de éxito
    p.value = false
    limpiarCampos(); // Limpiar campos
  } else {
    AbrirModal.value = true; // Mantener modal abierto en caso de error
  }
}

function Abrir(row) {
  AbrirModal.value = true;
  p.value = true;
  codigo.value = row.Codigo;
  nombre.value = row.Nombre;
  id.value = row._id;
}

async function Activar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Ficha/Desactivar/${id}`);
    traer();
  } catch (error) {
    console.log(error);
  }
}
async function Desactivar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Ficha/Activar/${id}`);
    traer();
  } catch (error) {
    console.log(error);
  }
}

const columns = ref([
  { name: "Numero", align: "center", label: "N°", field: "Numero" },

  {
    name: "Nombre1",
    required: true,
    label: "Nombre del Programa",
    align: "center",
    field: "Nombre",
    sortable: true,
  },
  {
    name: "Codigo1",
    align: "center",
    label: "Numero de ficha",
    field: "Codigo",
    sortable: true,
  },
  { name: "Estado1", label: "Estado", field: "Estado", sortable: true },
  { name: "opciones", label: "Opciones", align: "center" },
]);
</script>

<style>
* {
  margin: 0%;
  font-family: 'Roboto', Arial, sans-serif
}

.container {
  width: 90%;
  margin: 0 auto;
}

.titleFirst {
  margin: 15px 15px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto', Arial, sans-serif
}

.divider {
  width: 100%;
  border: 2px solid rgb(53, 164, 81);
}

.table-container {
  width: 100%;
  margin-top: 20px;
}

.q-table {
  width: 100%;
}

/* Define una clase para el estilo de la fuente y tamaño de la letra */
.custom-font {
  font-family: "Arial", sans-serif; /* Cambia "Arial" por la fuente que prefieras */
  font-size: 16px; /* Cambia a tu tamaño de letra preferido */
}

/* Estilos para los encabezados de la tabla */
.q-table th {
  background-color: rgb(81, 204, 81); /* Cambia esto por el color de fondo que prefieras */
  color: #333; /* Cambia esto por el color de texto que prefieras */
  font-size: 15px; /* Ajusta el tamaño de la letra */
  font-family: 'Roboto', Arial, sans-serif; /* Cambia "Arial" por la fuente que prefieras */
  font-weight: bold;
  padding: 10px; /* Ajusta el padding si es necesario */
}

.q-btn {
  margin: 0 5px;
}

.q-dialog__backdrop {
  backdrop-filter: blur(5px);
  /* Ajusta el nivel de desenfoque */
  background-color: rgba(0,
      0,
      0,
      0.5);
  /* Opcional: Ajusta la opacidad del fondo */
}
</style>
