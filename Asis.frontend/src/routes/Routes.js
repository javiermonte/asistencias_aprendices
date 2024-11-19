
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Bitacora from "../components/Bitacora.vue"
import Aprendiz from "../components/Aprediz.vue"
import Ficha from "../components/Ficha.vue"
import Usuario from "../components/Usuario.vue"
import Informes from "../components/Informes.vue"
import InicioH from "../components/InicioHome.vue"
import OlvidoContrasena from "../components/OlvidoContraseña.vue"
import RegistroA from "../components/RegistroA.vue"
import Main from "../components/Main.vue"


import { createRouter, createWebHashHistory } from "vue-router"


const routes = [
    { path: "/", component: Main },
    {
        path: "/Home", component: Home, children: [
            { path: "", redirect: "/Home/InicioH" },
            { path: "InicioH", component: InicioH },
            { path: "Bitacora", component: Bitacora },
            { path: "Aprendiz", component: Aprendiz },
            { path: "Ficha", component: Ficha },
            { path: "Usuario", component: Usuario },
            { path: "Informes", component: Informes },

        ]
    },
    { path: "/Login", component: Login },
    { path: "/OlvidoContrasena", component: OlvidoContrasena },

    { path: "/RegistroA", component: RegistroA }

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})