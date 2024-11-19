<!-- <template>
  
  <div class="main-container">
    <div class="btnAsis">
      <router-link to="/Asistencia">
       <button class="btn">Asistencia</button> ...
      </router-link>
    </div>
    <div class="button-group">
      <router-link to="/RegistroA">
        <button class="btn">Aprendiz</button>
      </router-link>
      <router-link to="/Login">
        <button class="btn">Instructor</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url('URL_DE_TU_IMAGEN'); /* Cambia esto por la URL de tu imagen */
  background-size: cover; /* Ajusta la imagen al tamaño del contenedor */
  background-position: center; /* Centra la imagen */
}

.button-group {
  margin-top: 40px;
}

.btn {
  background-color: rgba(76, 175, 80, 0.9); /* Color con transparencia */
  color: white;
  padding: 15px 30px;
  margin: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 20px;
}

.btn:hover {
  background-color: rgba(69, 160, 73, 0.9);
}
</style> -->









<template>
  <div class="main-container">
    <div class="btnAsis">
      <router-link to="/Asistencia">
        <!-- Enlace para la asistencia, si lo necesitas -->
      </router-link>
    </div>
    
    <!-- Botones para seleccionar registro de aprendiz o login de instructor -->
    <div class="button-group">
      <router-link to="/RegistroA">
        <button class="btn">Aprendiz</button>
      </router-link>
      <router-link to="/Login">
        <button class="btn">Instructor</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style scoped>
/* Asegúrate de que el contenedor principal cubra toda la pantalla */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url('https://lostramites.com.co/wp-content/uploads/Sena-Logo-marca-de-agua.jpg'); /* URL de la imagen */
  background-size: cover; /* Cubre todo el contenedor */
  background-position: center;
  background-attachment: fixed; /* Para hacer que el fondo se mantenga fijo al hacer scroll */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  padding: 0 20px; /* Añadir padding para evitar que los botones queden pegados en pantallas pequeñas */
}

/* Botones */
.button-group {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espacio entre botones */
  width: 100%;
  max-width: 400px; /* Limita el ancho de los botones */
}

.btn {
  background-color: rgba(76, 175, 80, 0.9); /* Color con transparencia */
  color: white;
  padding: 15px 30px;
  margin: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 20px;
  width: 100%; /* Para que los botones ocupen todo el ancho disponible */
  max-width: 100%;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: rgba(69, 160, 73, 0.9);
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .btn {
    font-size: 16px; /* Reduce el tamaño de fuente en pantallas pequeñas */
    padding: 10px 20px;
  }

  .button-group {
    width: 100%; /* Botones ocupan el 100% del ancho en pantallas pequeñas */
    max-width: 300px; /* Ajusta el ancho máximo en pantallas pequeñas */
  }
}

/* Estilos para pantallas muy pequeñas */
@media (max-width: 480px) {
  .btn {
    font-size: 14px;
    padding: 8px 16px;
  }

  .main-container {
    padding: 0 10px; /* Reduce el padding en pantallas muy pequeñas */
  }
}
</style>
