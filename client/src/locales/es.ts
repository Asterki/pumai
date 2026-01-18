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

  common: {
    loggedInAs: "Conectado como {{name}} ({{email}})",
    search: "Buscar",
    cancel: "Cancelar",
    yes: "Sí",
    no: "No",
    save: "Guardar",
    update: "Actualizar",
    delete: "Eliminar",
    back: "Regresar",
    create: "Crear",
    actions: "Acciones",
    confirm: "Confirmar",
    loading: "Cargando...",
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
    accounts: {
      components: {
        table: {
          name: "Nombre",
          email: "Correo Electrónico",
          role: "Rol",
          deleted: "Eliminado",
          actions: "Acciones",

          total: "Mostrando {{range}} de {{total}} cuentas",

          actionButtons: {
            trigger: "Acciones",
            update: "Actualizar",
            changePassword: "Cambiar Contraseña",
            delete: "Eliminar",
            restore: "Restaurar",
            updateStatus: "Actualizar Estado",
          },
        },

        createModal: {
          title: "Crear Nueva Cuenta",
          fields: {
            name: "Nombre",
            namePlaceholder: "Ingrese el nombre completo",
            email: "Correo Electrónico",
            emailPlaceholder: "Ingrese la dirección de correo electrónico",
            password: "Contraseña",
            passwordPlaceholder: "Ingrese una contraseña segura",
            role: "Rol",
            selectRole: "Seleccione un rol",
          },
        },
      },
    },
    "account-roles": {
      components: {
        table: {
          name: "Nombre del Rol",
          description: "Descripción",
          actions: "Acciones",
          level: "Nivel de Permiso",
          totalPermissions: "Total de Permisos",
          createdAt: "Creado El",

          total: "Mostrando {{range}} de {{total}} roles de cuenta",
          deleted: "Este rol ha sido eliminado",

          actionButtons: {
            trigger: "Acciones",
            update: "Actualizar",
            delete: "Eliminar",
            restore: "Restaurar",
          },
        },

        createModal: {
          title: "Crear Nuevo Rol de Cuenta",
          fields: {
            name: "Nombre del Rol",
            namePlaceholder: "Ingrese el nombre del rol",
            description: "Descripción",
            descriptionPlaceholder: "Ingrese una descripción para el rol",
            level: "Nivel de Permiso",
            levelPlaceholder: "Ingrese el nivel de permiso (número)",
          },
        },

        deleteModal: {
          title: "Eliminar Rol de Cuenta",
          description:
            "¿Está seguro de que desea eliminar este rol de cuenta? Esta acción se puede revertir más tarde.",
        },
      },

      hooks: {
        useCreateModal: {
          messages: {
            success: "Rol de cuenta creado exitosamente.",
            error:
              "Error al crear el rol de cuenta. Por favor, intente nuevamente.",
          },
        },

        useDeleteModal: {
          messages: {
            success: "Rol de cuenta eliminado exitosamente.",
            error:
              "Error al eliminar el rol de cuenta. Por favor, intente nuevamente.",
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
        dashboard: "Panel de Control",
        chat: "Chat AI",
        accounts: "Cuentas",
        "account-roles": "Roles de Cuenta",
        logs: "Registros Técnicos",
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
        description: "Bienvenido al sistema administrativo de PumAI.",

        items: {
          index: "Panel De Control",
          title: "Panel de Control",

          documents: {
            title: "Gestión de Documentos",
            description:
              "Administra y organiza todos los documentos que la IA puede utilizar para responder a las consultas de los usuarios.",
          },
          accounts: {
            title: "Gestión de Cuentas",
            description:
              "Administra las cuentas de usuario dentro del sistema.",
          },
          "account-roles": {
            title: "Gestión de Roles de Cuenta",
            description:
              "Administra los roles y permisos de las cuentas de usuario.",
          },
        },
      },
      accounts: {
        title: "Gestión de Cuentas",
        description: "Administra las cuentas de usuario dentro del sistema.",
        createAccount: "Crear Nueva Cuenta",
        searchPlaceholder: "Buscar por nombre o correo electrónico",
        showDeleted: "Mostrar Cuentas Eliminadas",
      },
      "account-roles": {
        title: "Gestión de Roles de Cuenta",
        description:
          "Administra los roles y permisos de las cuentas de usuario.",
        createRole: "Crear Nuevo Rol de Cuenta",
        searchPlaceholder: "Buscar por nombre o descripción",
        showDeleted: "Mostrar Roles Eliminados",
      },
    },
  },
};

export default translation;
