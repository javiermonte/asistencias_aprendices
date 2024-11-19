<template>
    <div class="main-container">
      <div class="box">
        <h2>Bienvenido Aprendiz</h2>
        <form @submit.prevent="AsignarAsistencia">
          <label for="documento">Documento:</label>
          <input v-model="documento" type="text" id="documento" required />
  
          <button type="submit" class="btn" @click="registrarLlegada()" >Registrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { UseBitacoraStore } from '../Stores/bitacoras';
  
  const documento = ref('')
  const UseBitacora = UseBitacoraStore()
  
  async function registrarLlegada() {
        let res = await UseBitacora.registrarAprendiz(documento.value)
        console.log(res);

}

  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 30px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 25px;
  }
  
  .btn {
    background-color: green;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn:hover {
    background-color: green;
  }
  </style>
  