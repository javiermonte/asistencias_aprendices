<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Usuarios</h3>
    </div>

    <hr class="divider" />
    <q-btn label="Crear" icon="add_circle" color="green" @click="AbrirModalUser = true" />
    <div class="q-pa-mad">
      
      <q-table :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-Opciones="props">
          <q-td :props="props">
            <q-btn round color="white" :style="{ border: '2px solid green' }"
              @click="Abrir(props.row), AbrirModal = true">
              <q-icon name="edit" style="color: green" />
            </q-btn>
            
            <q-btn icon="close" round color="red" @click="Activar(props.row._id)" v-if="props.row.Estado == 1" />
            <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)" v-else />
            <q-btn icon="delete" round color="red" @click="Eliminar(props.row._id)" />
          </q-td>
        </template>

        <template v-slot:body-cell-Estado="props">
          <q-td :props="props">
            <p style="color: green;" v-if="props.row.Estado == 1">Activo</p>
            <p style="color: red;" v-else>Inactivo</p>
          </q-td>
        </template>


        
        <template v-slot:body-cell-Numero="props">
          <q-td :props="props">
            {{ props.pageIndex + 1 }}
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="AbrirModal" persistent>
      <q-card style="min-width: 350px; margin-top: 0">
        <q-card-section>
          <div class="iconoAprendiz">
            <!-- <img src="https://cdn-icons-png.flaticon.com/512/5825/5825337.png" alt="" /> -->
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <label for="codigo">Nombre</label> -->

          <!-- <label for="codigo">codigo</label> -->
          <q-input dense v-model="email" placeholder="Editar" autofocus color="green" @keyup.enter="prompt = false" />
          <br />

          <q-input dense v-model="nombre" placeholder=" Nombre" autofocus color="green" @keyup.enter="prompt = false" />
          <br />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />

          <!-- <q-btn  label="Enviar" color="green" @click="EditarUsuario()"> -->
          <q-btn label="Enviar" color="green" @click="console.log('Botón clickeado'); EditarUsuario()">

            <!-- <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template> -->
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="AbrirModalUser" persistent>
      <q-card style="min-width: 350px; margin-top: 0">
        <q-card-section>
          <div class="iconoAprendiz">
            <!-- <img src="https://cdn-icons-png.flaticon.com/512/5825/5825337.png" alt="" /> -->
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <label for="codigo">Nombre</label> -->

          <!-- <label for="codigo">codigo</label> -->
          <q-input dense v-model="email" placeholder="Email" autofocus color="green" @keyup.enter="prompt = false" />
          <br />

          <q-input dense v-model="nombre" placeholder=" Nombre" autofocus color="green" @keyup.enter="prompt = false" />
          <br />

          <q-input dense v-model="Contraseña" placeholder=" Contraseña" autofocus color="green" @keyup.enter="prompt = false" />
          <br />

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="p = false" color="red" v-close-popup />

          <!-- <q-btn  label="Enviar" color="green" @click="EditarUsuario()"> -->
          <q-btn label="Enviar" color="green" @click="console.log('Botón clickeado'); CrearUser()">

            <!-- <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template> -->
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>


<script setup>
import { ref, onBeforeMount, warn } from 'vue';
import axios from 'axios';
import { UseUsuarioStore } from '../Stores/Usuario';



let res = ref('')
let id = ref('')
let nombre = ref('')
let email = ref('')
let AbrirModal = ref(false)
let AbrirModalUser = ref(false)
let Contraseña = ref('')
const UseUsuario = UseUsuarioStore()

onBeforeMount(() => {
  traer();
});

function limpiarCampos() {
  nombre.value = "",
    email.value = ""
}

async function traer() {
  res = await UseUsuario.listarUsuarios()
  rows.value = res.data
}

async function Abrir(row) {
  console.log("Abrir:", row);
  AbrirModal.value = true
  nombre.value = row.Nombre
  email.value = row.Email
  id.value = row._id;


}

async function EditarUsuario() {
  // console.log("Entrando a EditarUsuario");
  // console.log("ID:", id.value);
  // console.log("Nombre:", nombre.value);
  // console.log("Email:", email.value);
  const res = await UseUsuario.actualizarUsuario(id.value, nombre.value, email.value)
  if (res) {
    AbrirModal.value = false
    limpiarCampos()
    await traer()
  } else {
    AbrirModal.value = true
  }
}

async function CrearUser () {
  const res = await UseUsuario.registrar( nombre.value, email.value,Contraseña.value)
  if (res.status===200) {
    AbrirModalUser.value = false
    limpiarCampos()
    await traer()
  } else {
    AbrirModalUser.value = true
  }
}


const rows = ref([])
const columns = ref([
  { name: 'Numero', align: 'center', label: 'N°', field: 'Numero', sortable: true },
  { name: 'Nombre', align: 'center', label: 'Usuario', field: 'Nombre', sortable: true },
  { name: 'Email', label: 'Email', field: 'Email', sortable: true },
  { name: 'Estado', label: 'Estado', field: 'Estado', sortable: true },
  { name: 'Opciones', label: 'Opciones' },
])




async function Activar(id) {
  console.log(id)
  try {
    let res = await axios.put(`http://localhost:4000/api/Usuario/Desactivar/${id}`, {
      headers: {
        "x-token": UseUsuario.xtoken
      }
    })
    await traer()
  } catch (error) {
    console.log(error.message);
  }
}

async function Desactivar(id) {
  console.log(id);
  try {
    let res = await axios.put(`http://localhost:4000/api/Usuario/Activar/${id}`, {
      headers: {
        "x-token": UseUsuario.xtoken
      }
    })

    await traer()
  } catch (error) {
    console.log(error);

  }

}

async function Eliminar(id) {
  try {
    let res = await axios.delete(`http://localhost:4000/api/Usuario/Eliminar/${id}`, {
      headers: {
        "x-token": UseUsuario.xtoken
      }
    })

    await traer()
  } catch (error) {
    console.log(error);

  }
}



</script>
<!-- 
<template>

</template> -->