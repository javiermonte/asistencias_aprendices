<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-xs q-mb-md justify-center">
      <div class="col-xs-6 col-md-3">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">

            APRENDICES

</q-card-section>
<q-card-section class="text-center">
  <!-- <img src="..." alt="Aprendiz" class="my-card-image"> -->
</q-card-section>
<q-card-actions align="center">
  <q-btn flat label="👁" to="Aprendiz" color="green" />
</q-card-actions>
</q-card>
</div>


<div class="col-xs-6 col-md-3">
<q-card class="my-card">
<q-card-section class="text-center bg-green text-white">

            BITACORAS

          </q-card-section>
          <q-card-section class="text-center">
            <!-- <img src="..." alt="Bitacora" class="my-card-image"> -->
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="👁" to="Bitacora" color="green" />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-6 col-md-3">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">


            FICHAS

</q-card-section>
<q-card-section class="text-center">
  <!-- <img src="..." alt="Fichas" class="my-card-image"> -->
</q-card-section>
<q-card-actions align="center">
  <q-btn flat label="👁" to="Ficha" color="green" />
</q-card-actions>
</q-card>
</div>


<div class="col-xs-6 col-md-3">
<q-card class="my-card">
<q-card-section class="text-center bg-green text-white">



            INFORMES

</q-card-section>
<q-card-section class="text-center">
  <!-- <img src="..." alt="Informes" class="my-card-image"> -->
</q-card-section>
<q-card-actions align="center">
  <q-btn flat label="👁" to="Informes" color="green" />
</q-card-actions>
</q-card>
</div>

<div class="col-xs-6 col-md-3">
        <q-card class="my-card">
          <q-card-section class="text-center bg-green text-white">


            USUARIOS

          </q-card-section>
          <q-card-section class="text-center">
            <!-- <img src="..." alt="Usuario" class="my-card-image"> -->
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="👁" to="Usuario" color="green" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'MyCards'
}
</script>

<style scoped>
* {
  margin: 0;
}
.row {
  justify-content: center; /* Centra las tarjetas horizontalmente */
}
.col-xs-6 {
  display: flex;
  justify-content: center; /* Centra el contenido dentro de la columna */
}
.my-card {
  width: 100%; /* Ajusta el ancho al 100% de la columna */
  max-width: 250px; /* Limita el ancho máximo de las tarjetas */
}
.my-card-image {
  width: 100%;
  max-height: 170px;
  object-fit: cover;
}
.bg-green {
  background-color: #4caf50; /* Color verde */
}
.text-white {
  color: white;
}
</style>
