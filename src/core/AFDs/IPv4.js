const matrizIPv4 = [
  { "\\d": 1 }, // 0: inicio -> primer dígito del primer octeto
  { "\\d": 2, "\\.": 4 }, // 1: primer octeto (1 dígito) -> segundo dígito o punto
  { "\\d": 3, "\\.": 4 }, // 2: primer octeto (2 dígitos) -> tercer dígito o punto
  { "\\.": 4 }, // 3: primer octeto (3 dígitos) -> punto
  { "\\d": 5 }, // 4: primer punto -> primer dígito del segundo octeto
  { "\\d": 6, "\\.": 8 }, // 5: segundo octeto (1 dígito) -> segundo dígito o punto
  { "\\d": 7, "\\.": 8 }, // 6: segundo octeto (2 dígitos) -> tercer dígito o punto
  { "\\.": 8 }, // 7: segundo octeto (3 dígitos) -> punto
  { "\\d": 9 }, // 8: segundo punto -> primer dígito del tercer octeto
  { "\\d": 10, "\\.": 12 }, // 9: tercer octeto (1 dígito) -> segundo dígito o punto
  { "\\d": 11, "\\.": 12 }, // 10: tercer octeto (2 dígitos) -> tercer dígito o punto
  { "\\.": 12 }, // 11: tercer octeto (3 dígitos) -> punto
  { "\\d": 13 }, // 12: tercer punto -> primer dígito del cuarto octeto
  { "\\d": 14 }, // 13: cuarto octeto (1 dígito) -> segundo dígito
  { "\\d": 15 }, // 14: cuarto octeto (2 dígitos) -> tercer dígito
  {}, // 15: cuarto octeto (3 dígitos) -> estado final
];

export function validarIPv4(cadena) {
  console.log("Validando IPv4:", cadena);
  let estado = 0;

  // Verificaciones preliminares
  if (cadena.length === 0) {
    return {
      valido: false,
      error: "Cadena vacía",
      errorPosicion: 0,
    };
  }

  if (cadena.startsWith(".")) {
    return {
      valido: false,
      error: "No puede comenzar con un punto",
      errorPosicion: 0,
    };
  }

  if (cadena.endsWith(".")) {
    return {
      valido: false,
      error: "No puede terminar con un punto",
      errorPosicion: cadena.length - 1,
    };
  }

  // Verificar dobles puntos
  if (cadena.includes("..")) {
    return {
      valido: false,
      error: "No se permiten puntos consecutivos",
      errorPosicion: cadena.indexOf(".."),
    };
  }

  // Verificar espacios
  if (cadena.includes(" ")) {
    return {
      valido: false,
      error: "No se permiten espacios en direcciones IP",
      errorPosicion: cadena.indexOf(" "),
    };
  }

  // Verificar comas (error común)
  if (cadena.includes(",")) {
    return {
      valido: false,
      error: "Use puntos como separadores, no comas",
      errorPosicion: cadena.indexOf(","),
    };
  }

  for (let i = 0; i < cadena.length; i++) {
    const c = cadena[i];
    const transiciones = matrizIPv4[estado];

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
      if (/[a-zA-Z]/.test(c)) {
        errorMsg = "No se permiten letras en direcciones IP";
      } else if (c === "-") {
        errorMsg = "No se permiten guiones en direcciones IP";
      } else if (Object.keys(transiciones).includes("\\d") && !/\d/.test(c)) {
        errorMsg = "Se esperaba un dígito";
      } else if (Object.keys(transiciones).includes("\\.") && c !== ".") {
        errorMsg = "Se esperaba un punto separador";
      } else {
        errorMsg = `Carácter inválido '${c}', se esperaba '${Object.keys(
          transiciones
        )
          .join(" o ")
          .replace("\\d", "dígito")
          .replace("\\.", "punto")}'`;
      }

      return {
        valido: false,
        error: errorMsg,
        errorPosicion: i,
      };
    }
  }

  // Estados válidos finales: 13 (1 dígito), 14 (2 dígitos), 15 (3 dígitos) para el cuarto octeto
  if (estado === 13 || estado === 14 || estado === 15) {
    const partes = cadena.split(".");

    if (partes.length !== 4) {
      return {
        valido: false,
        error: `Se esperaban 4 octetos, se encontraron ${partes.length}`,
        errorPosicion: 0,
      };
    }

    for (let i = 0; i < partes.length; i++) {
      const parte = partes[i];

      // Verificar que no esté vacío
      if (parte === "") {
        return {
          valido: false,
          error: `Octeto ${i + 1} está vacío`,
          errorPosicion:
            cadena.indexOf("..") >= 0
              ? cadena.indexOf("..")
              : cadena.split(".").slice(0, i).join(".").length,
        };
      }

      // Verificar que sea numérico
      if (!/^[0-9]+$/.test(parte)) {
        return {
          valido: false,
          error: `Octeto ${
            i + 1
          } ('${parte}') contiene caracteres no numéricos`,
          errorPosicion: cadena.indexOf(parte),
        };
      }

      // Verificar ceros a la izquierda (excepto para "0")
      if (parte.length > 1 && parte.startsWith("0")) {
        return {
          valido: false,
          error: `Octeto ${
            i + 1
          } ('${parte}') no puede tener ceros a la izquierda`,
          errorPosicion: cadena.indexOf(parte),
        };
      }

      const numero = Number(parte);

      // Verificar rango
      if (numero < 0) {
        return {
          valido: false,
          error: `Octeto ${i + 1} ('${parte}') no puede ser negativo`,
          errorPosicion: cadena.indexOf(parte),
        };
      }

      if (numero > 255) {
        return {
          valido: false,
          error: `Octeto ${
            i + 1
          } ('${parte}') está fuera de rango (máximo 255)`,
          errorPosicion: cadena.indexOf(parte),
        };
      }
    }

    return { valido: true };
  }

  // Detectar si la cadena está incompleta
  let errorMsg = "Formato incompleto";
  const partes = cadena.split(".");
  if (partes.length < 4) {
    errorMsg = `Faltan ${4 - partes.length} octeto(s)`;
  }

  return {
    valido: false,
    error: errorMsg,
    errorPosicion: cadena.length,
  };
}

window.validarTarjetaCredito = validarTarjetaCredito;
window.validarIPv4 = validarIPv4;
