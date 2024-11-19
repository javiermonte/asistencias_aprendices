<template>
    <div class="table-container">
      <table>
        <!-- Encabezado del Acta -->
        <tr>
          <td colspan="11" class="title-row">
            REGISTRO DE ASISTENCIA Y APROBACIÓN DEL ACTA No- ______ DEL DÍA {{ fechaDia }} DEL MES DE {{ fechaMes }} DEL AÑO {{ fechaAnio }}
          </td>
        </tr>
        <!-- Fila para Objetivo y contenido -->
        <tr>
          <td colspan="2" class="objective-title">
            OBJETIVO (S)
          </td>
          <td colspan="9" class="objective-content">
            Registro de asistencia de la ficha {{ fichaSeleccionada }}
          </td>
        </tr>
        <!-- Encabezados de la tabla -->
        <tr>
          <th class="small-column">No.</th>
          <th class="nombre">NOMBRES Y APELLIDOS</th>
          <th class="documento">No. DOCUMENTO</th>
          <th>PLANTA</th>
          <th>CONTRATISTA</th>
          <th>OTRO ¿CUAL?</th>
          <th class="dependencia">DEPENDENCIA/ EMPRESA</th>
          <th class="correo">CORREO ELECTRÓNICO</th>
          <th class="telefono">TELÉFONO/EXT. SENA</th>
          <th class="autoriza">AUTORIZA GRABACIÓN</th>
          <th>FIRMA O PARTICIPACIÓN VIRTUAL</th>
        </tr>
        <!-- Filas de datos dinámicas -->
        <tr v-for="(fila, index) in fillRows()" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ fila.nombre || '' }}</td>
          <td>{{ fila.documento || '' }}</td>
          <td>{{ fila.planta || '' }}</td>
          <td>{{ fila.contratista || '' }}</td>
          <!-- <td>{{ fila.otro ? 'Aprendiz' : '' }}</td> -->
          <td>{{ fila.nombre? 'Aprendiz' : '' }}</td>
          <td>{{ fila.nombre? 'SENA-CAT' :'' }}</td>
          <td>{{ fila.emailAprendiz || '' }}</td>
          <td>{{ fila.telefonoAprendiz || '' }}</td>
          <td>{{ fila.autoriza || '' }}</td>
          <td>
            <div v-if="fila.firma">
              <img :src="fila.firma" alt="Firma" style="max-width: 100px; max-height: 100px;" />
            </div>
            <span v-else></span>
          </td>
        </tr>
      </table>
    </div>
  </template>