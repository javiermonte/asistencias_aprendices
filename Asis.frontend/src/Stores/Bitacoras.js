import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./Usuario";


export const UseBitacoraStore = defineStore("bitacora", () => {

    const UseUsuario = UseUsuarioStore()

    let loading =ref (false)

    const listarBitacora = async (fechaInicial, fechaFinal) => {
        loading.value=true
        try {
            let res = await axios.get('http://localhost:4000/api/Bitacora/ListarBitacoras', {
                params: {
                    FechaInicial: new Date(fechaInicial).toISOString(),
                    FechaFinal: new Date(fechaFinal).toISOString()
                },
                headers: {
                    "x-token": UseUsuario.xtoken// Cambiar el header al estándar Authorization
                }
            });
            Notify.create({
                color: "positive",
                message: "Datos entre estas fechas",
                icon: "check_circle",
                timeout: 2500,
            });
            return res;
        } catch (error) {
            console.log('No Exixten Bitácoras', error);
            Notify.create({
                color: "negative",
                message: "Error Al Mostrar Las Bitácoras.",
                icon: "error",
                timeout: 2500,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }

    const listar= async (fechaInicial, fechaFinal) => {
       
        try {
            let res = await axios.get('http://localhost:4000/api/Bitacora/listar', {
                headers: {
                    "x-token": UseUsuario.xtoken
                }
            });
            Notify.create({
                color: "positive",
                message: "Datos SegúN Las Fechas.",
                icon: "check_circle",
                timeout: 2500,
            });
            return res;
        } catch (error) {
            console.log('No Hay Bitácoras', error);
            Notify.create({
                color: "negative",
                message: "Error Al Mostrar Las Bitácoras.",
                icon: "error",
                timeout: 2500,
            });
            return error;
        }
    }
    const registrarAprendiz = async (documento) => {
        loading.value=true    
        try {
            let res = await axios.post('http://localhost:4000/api/Bitacora/Insertar', {
                Documento: documento        
            }
            )
            console.log(res)
            return res
        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
                 message: error.response.data.message ||error.response.data.errors[0].msg ,
                icon: "error",
                timeout: 2500,
            });

            return error
        } finally {
            loading.value=false
        }
    }


    return {
        listarBitacora,listar, registrarAprendiz,loading
    }
})


