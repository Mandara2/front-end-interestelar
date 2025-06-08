// Matriz de adyacencia para validar tarjetas de crédito
const matrizTarjetaCredito = [
  { "\\d": 1 },
  { "\\d": 2 },
  { "\\d": 3 },
  { "\\d": 4 },
  { " ": 5 },
  { "\\d": 6 },
  { "\\d": 7 },
  { "\\d": 8 },
  { "\\d": 9 },
  { " ": 10 },
  { "\\d": 11 },
  { "\\d": 12 },
  { "\\d": 13 },
  { "\\d": 14 },
  { " ": 15 },
  { "\\d": 16 },
  { "\\d": 17 },
  { "\\d": 18 },
  { "\\d": 19 },
  { " ": 20 },
  { "\\d": 21 },
  { "\\d": 22 },
  { "/": 23 },
  { "\\d": 24 },
  { "\\d": 25 },
  { "\\d": 26 },
  { "\\d": 27 },
  { " ": 28 },
  { "\\d": 29 },
  { "\\d": 30 },
  { "\\d": 31 },
];

export function validarTarjetaCredito(cadena) {
  console.log("Validando tarjeta de crédito:", cadena);
  let estado = 0;

  // Verificaciones preliminares
  if (cadena.length === 0) {
    return {
      valido: false,
      error: "Cadena vacía",
      errorPosicion: 0,
    };
  }

  // Verificación previa de formato completo para detectar errores semánticos temprano
  if (cadena.length >= 30) {
    const partes = cadena.split(" ");
    if (partes.length >= 5) {
      const fecha = partes[4];
      if (fecha && fecha.includes("/")) {
        const [mes, anio] = fecha.split("/").map(Number);

        if (!isNaN(mes) && (mes < 1 || mes > 12)) {
          return {
            valido: false,
            error: "Mes inválido (debe estar entre 01 y 12)",
            errorPosicion: cadena.indexOf(fecha),
          };
        }

        const anioActual = new Date().getFullYear();
        if (!isNaN(anio) && (anio < anioActual || anio > anioActual + 10)) {
          return {
            valido: false,
            error: `Año inválido (debe estar entre ${anioActual} y ${
              anioActual + 10
            })`,
            errorPosicion: cadena.indexOf(fecha) + 3,
          };
        }
      }

      // Verificar CVV si existe
      if (partes.length >= 6) {
        const cvv = partes[5];
        if (cvv && (cvv.length < 3 || cvv.length > 3)) {
          const errorMsg =
            cvv.length < 3
              ? "CVV debe tener 3 dígitos"
              : "CVV no puede tener más de 3 dígitos";
          return {
            valido: false,
            error: errorMsg,
            errorPosicion: cadena.indexOf(cvv),
          };
        }
      }
    }
  }

  for (let i = 0; i < cadena.length; i++) {
    const c = cadena[i];
    const transiciones = matrizTarjetaCredito[estado];

    if (!transiciones) {
      return {
        valido: false,
        error: "Formato demasiado largo",
        errorPosicion: i,
      };
    }

    const siguienteEstado = Object.keys(transiciones).find((key) =>
      new RegExp(key).test(c)
    );

    if (siguienteEstado) {
      estado = transiciones[siguienteEstado];
    } else {
      // Detectar tipos de errores específicos
      let errorMsg = "";
      if (c === "-") {
        errorMsg = "No se permiten guiones, use espacios como separadores";
      } else if (/[a-zA-Z]/.test(c)) {
        errorMsg = "No se permiten letras, solo números y espacios";
      } else if (estado === 23 && c !== "/" && /\d/.test(c)) {
        errorMsg = "Se esperaba '/' después del mes";
      } else if (Object.keys(transiciones).includes("\\d") && !/\d/.test(c)) {
        errorMsg = "Se esperaba un dígito";
      } else if (Object.keys(transiciones).includes(" ") && c !== " ") {
        errorMsg = "Se esperaba un espacio";
      } else {
        errorMsg = `Carácter inválido '${c}', se esperaba '${Object.keys(
          transiciones
        )
          .join(" o ")
          .replace("\\d", "dígito")
          .replace(" ", "espacio")}'`;
      }

      return {
        valido: false,
        error: errorMsg,
        errorPosicion: i,
      };
    }
  }

  if (estado === 31) {
    const partes = cadena.split(" ");

    // Validar número de tarjeta (debe tener exactamente 16 dígitos)
    const numeroTarjeta = partes.slice(0, 4).join("");
    if (numeroTarjeta.length !== 16 || !/^\d{16}$/.test(numeroTarjeta)) {
      return {
        valido: false,
        error: "El número de tarjeta debe tener exactamente 16 dígitos",
        errorPosicion: 0,
      };
    }

    // Validar fecha
    const fecha = partes[4];
    if (!fecha || !fecha.includes("/")) {
      return {
        valido: false,
        error: "Formato de fecha inválido, use MM/AAAA",
        errorPosicion: cadena.indexOf(partes[4]),
      };
    }

    const [mes, anio] = fecha.split("/").map(Number);

    if (isNaN(mes) || mes < 1 || mes > 12) {
      return {
        valido: false,
        error: "Mes inválido (debe estar entre 01 y 12)",
        errorPosicion: cadena.indexOf(fecha),
      };
    }

    const anioActual = new Date().getFullYear();
    if (isNaN(anio) || anio < anioActual || anio > anioActual + 10) {
      return {
        valido: false,
        error: `Año inválido (debe estar entre ${anioActual} y ${
          anioActual + 10
        })`,
        errorPosicion: cadena.indexOf(fecha) + 3,
      };
    }

    // Validar CVV
    const cvv = partes[5];
    if (!cvv) {
      return {
        valido: false,
        error: "CVV faltante",
        errorPosicion: cadena.length,
      };
    }

    if (cvv.length < 3) {
      return {
        valido: false,
        error: "CVV debe tener 3 dígitos",
        errorPosicion: cadena.indexOf(cvv),
      };
    }

    if (cvv.length > 3) {
      return {
        valido: false,
        error: "CVV no puede tener más de 3 dígitos",
        errorPosicion: cadena.indexOf(cvv) + 3,
      };
    }

    if (!/^\d{3}$/.test(cvv)) {
      return {
        valido: false,
        error: "CVV debe contener solo dígitos",
        errorPosicion: cadena.indexOf(cvv),
      };
    }

    return { valido: true };
  }

  // Detectar si la cadena está incompleta
  let errorMsg = "Formato incompleto";
  if (estado >= 0 && estado <= 19) {
    errorMsg = "Número de tarjeta incompleto";
  } else if (estado >= 20 && estado <= 27) {
    errorMsg = "Fecha de expiración incompleta";
  } else if (estado >= 28 && estado <= 30) {
    errorMsg = "CVV incompleto";
  }

  return {
    valido: false,
    error: errorMsg,
    errorPosicion: cadena.length,
  };
}