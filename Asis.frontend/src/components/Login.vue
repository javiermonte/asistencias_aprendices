<template>
  <div id="login">
    <div class="InicioSecion">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="iconoAprendiz"></div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="email"
            placeholder="Email"
            autofocus
            color="green"
            @keyup.enter="inicioSecion = false"
          />
          <br />
          <q-input
            dense
            v-model="password"
            placeholder="Password"
            :type="showPassword ? 'text' : 'password'"
            color="green"
            @keyup.enter="inicioSecion = false"
          >
            <template v-slot:append>
              <q-icon
                name="visibility"
                @click="togglePasswordVisibility"
                v-if="!showPassword"
                style="cursor: pointer"
              />
              <q-icon
                name="visibility_off"
                @click="togglePasswordVisibility"
                v-if="showPassword"
                style="cursor: pointer"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn :loading="useUsuario.loading" color="green" @click="secionIniciada()">
            Iniciar Sesión
            <template v-slot:loading>
              <q-spinner color="white" size="1em" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UseUsuarioStore } from "../Stores/Usuario";
import { useRouter } from "vue-router";

let email = ref("");
let password = ref("");
let showPassword = ref(false);

const useUsuario = UseUsuarioStore();
const router = useRouter();

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function secionIniciada() {
  let res = await useUsuario.Login(email.value, password.value);
  if (res && res.status === 200) {
    router.push("/Home");
  }
}
</script>

<style>
#login {
  justify-content: center;
  width: 100%;
  background-color: azure;
  height: 100vh;
}

.InicioSecion {
  display: grid;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.contraseñaRecuperar {
  color: #008000;
}
</style>
