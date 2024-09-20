import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export const useAppStore = defineStore("storeId", {
  state: () => ({
    bootstrap,
    identificador: null, // Almacena el identificador del usuario
    tipoPersona: null,   // Almacena el tipo de persona
    login: false,
    verificationCode:''
  }),

  actions: {
    setIdentificador(id) {
      this.identificador = id;
    },
    setTipoPersona(tipo) {
      this.tipoPersona = tipo;
    },
    setLogin(login) {
      this.login = login; 
    },
    setVerificationCode(verificationCode) {
      this.verificationCode = verificationCode; 
    },
    clearSession() {
      this.identificador = null;
      this.tipoPersona = null;
    },
  },
});
