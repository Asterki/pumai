const translation = {
  "error-messages": {
    "internal-error":
      "Se produjo un error interno, por favor intente nuevamente más tarde",
    "network-error":
      "No se ha podido conectar al servidor, las funciones que requieren conexión no estarán disponibles hasta que se restablezca la conexión",
    "invalid-parameters":
      "Por favor, asegúrese de haber proporcionado toda la información requerida en el formato requerido. No es común que ocurra, pero si lo hace, contacte soporte técnico.",
    unauthorized:
      "Su sesión ha expirado o no tiene permiso para acceder a esta página. Por favor, inicie sesión nuevamente.",
    forbidden:
      "No tienes permiso para acceder a esta página o realizar esta acción.",
    "not-found": "El recurso solicitado no fue encontrado.",
    "invoice-number-range-exceeded":
      "El rango de números de factura ha sido excedido. Por favor, actualice el rango en la configuración del sistema.",
    "invoice-range-expired":
      "El rango de facturas ha expirado. Por favor, actualice el rango en la configuración del sistema.",
    "invalid-terminal":
      "Terminal no autorizado, si es un error, por favor contacte al administrador del sistema.",
    "query-too-long":
      "La consulta proporcionada es demasiado larga. Por favor, reduzca la longitud de la consulta.",
  },

  features: {
    preferences: {
      components: {
        PreferencesModal: {
          title: "Preferencias de Usuario",
          buttons: {
            cancel: "Cancelar",
            save: "Guardar",
          },
          fields: {
            name: {
              label: "Nombre",
              placeholder: "Ingrese su nombre",
            },
            location: {
              label: "Ubicación",
              options: {
                "UNAH-Comayagua": "UNAH Comayagua",
                "UNAH-Tegucigalpa": "UNAH Tegucigalpa",
              },
            },
            theme: {
              label: "Tema",
              options: {
                dark: "Oscuro",
                light: "Claro",
              },
            },
            replyStyles: {
              label: "Estilo de Respuesta",
              options: {
                formal: "Formal",
                informal: "Informal",
              },
            },
          },
        },
      },
      hooks: {
        usePreferencesModal: {
          messages: {
            success: "Preferencias guardadas exitosamente. Recargando...",
            error:
              "Error al guardar las preferencias. Por favor, intente nuevamente.",
          },
        },
      },
    },
  },

  layouts: {
    general: {
      sidebar: {
        preferences: "Preferencias",
        docrepo: "Repositorio de Documentos",
        chat: "Chat",
        about: "Acerca de",
        admin: "Administración",
      },
    },
    admin: {
      sidebar: {
        title: "Panel de Administración PumAI",
        documents: "Documentos",
        logs: "Registros",
      },
    },
  },

  pages: {
    chat: {
      title: "Chat AI",
      input: {
        placeholder: "Escribe tu mensaje...",
        sendButton: "Enviar",
      },
      disclaimer:
        "La información proporcionada por este chat AI es solo para fines informativos. Por favor, verifica cualquier dato crítico con fuentes autorizadas.",
    },

    about: {
      title: "Acerca de",
      description:
        "Esta aplicación está diseñada para proporcionar una experiencia de usuario óptima con funcionalidades avanzadas de inteligencia artificial.",
      welcomeMessage:
        "¡Bienvenido, {{name}}! Gracias por usar nuestra aplicación.",
    },

    auth: {
      login: {
        title: "Iniciar Sesión",
        description: "Por favor, ingrese sus credenciales para iniciar sesión.",
        fields: {
          email: "Correo Electrónico",
          emailPlaceholder: "Ingrese su correo electrónico",
          password: "Contraseña",
          passwordPlaceholder: "Ingrese su contraseña",
          tfaCode: "Código de Autenticación de Dos Factores",
          tfaCodePlaceholder: "Ingrese su código TFA",
        },
        submit: "Iniciar Sesión",
        back: "Regresar al Inicio",
      },
    },
    admin: {
      index: {
        greetings: {
          morning: "Buenos días",
          afternoon: "Buenas tardes",
          evening: "Buenas noches",
        },
        description:
          "Bienvenido al sistema administrativo del Hospital San Benito José. Aquí puedes gestionar todos los aspectos relacionados con la administración del hospital, incluyendo pacientes, citas, personal médico y más.",

        items: {
          index: "Panel De Control",
          title: "Panel de Control",
          pharmacy: "Farmacia",
          preclinic: "Preclínica",
          consulting: "Consultorio",
          patients: "Pacientes",
          accounts: "Cuentas",
          "account-roles": "Roles de Cuentas",
          emails: "Correos Electrónicos",
          logs: "Registros Técnicos",
        },
      },
    },
  },

  dashboard: {
    componentes: {
      navbar: {},
    },

    sidebar: {
      title: "Dashboard",
      chat: "Chat",
      preferences: "Preferencias",
      about: "Acerca de",
    },
  },
};

export default translation;
