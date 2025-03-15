"use strict";
// Esto es un comentario
/* Esto es un
 * Comentario en múltiples líneas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const poo_1 = require("./poo");
// Tipo de Datos
// Boolean
let esActivo = true; // let: El ámbito es local, funciona dentro del scope (función, ciclo, if, {})
var esActivo2 = false; // var: El ámbito es global, funciona en todo el archivo
const esActivo3 = false; // Utilizado para constantes
// Number
let entero = 20;
let enteroLargo = 46546546465466;
let real = 3.1416;
let binario = 0b101;
let octal = 0o11;
let hexadecimal = 0xA;
// String
let sigla = 'SIS257';
let materia = 'Desarrollo de Aplicación Int/Internet II';
let concatenar = sigla + ' - ' + materia;
let concatenar2 = `${sigla} - ${materia}`;
let mayusculas = concatenar.toUpperCase();
let minusculas = concatenar.toLowerCase();
let reemplazo = concatenar.replace(/ /g, '*');
let subcadena = concatenar.substring(0, 10);
let separar = materia.split(' ');
let repetir = sigla.repeat(3);
let sinEspaciosExtremos = concatenar.trim();
let logintudCadena = concatenar.length;
// Array
let array = ['uno', 'dos', 'tres', 'cuatro'];
let arrayNumerico = [1, 2, 3, 4, 5];
let longitudArray = arrayNumerico.length;
let doble = arrayNumerico.map(n => n * 2);
let factorial = arrayNumerico.reduce((prev, curr) => prev * curr);
let revertir = arrayNumerico.reverse();
let impares = arrayNumerico.reverse().filter(n => n % 2 == 1);
array.shift(); // Elimina el primer elemento
array.pop(); // Elimina el último elemento
array.push('cinco'); // Inserta un nuevo elemento
// Tuple
let tuple = [true, 6.3, 'Hola', [5, 6, 7]];
// Enum
var sexo;
(function (sexo) {
    sexo["M"] = "Masculino";
    sexo["F"] = "Femenino";
})(sexo || (sexo = {}));
;
var color;
(function (color) {
    color["red"] = "Rojo";
    color["yellow"] = "Amarillo";
    color["green"] = "Verde";
})(color || (color = {}));
;
var tipo;
(function (tipo) {
    tipo[tipo["par"] = 0] = "par";
    tipo[tipo["impar"] = 1] = "impar";
})(tipo || (tipo = {}));
;
// Any
let cualquiera = 'Cualquier valor';
cualquiera = 65;
// Object
let objeto = { nombre: 'Juan', apellidos: 'Pérez' };
// Estructuras de control
let contiene;
if (materia.includes('Desarrollo'))
    contiene = true;
else
    contiene = false;
contiene = materia.includes('Desarrollo') ? true : false;
contiene = materia.includes('Desarrollo');
for (let i in array)
    console.log('for in: ' + i); // Obtiene las posiciones
for (let i of array)
    console.log('for of: ' + i); // Obtiene los valores
array.forEach(i => console.log('forEach: ' + i)); // Obtiene los valores
let coche = { placa: '3216-FNP', chasis: '24654654DF54F' };
// funciones
function saludo(nombre) {
    console.log(`Hola ${nombre}`);
}
saludo('Juan');
// POO
let persona = new poo_1.Persona('123456', 'Juan', 'Pérez', 'López', new Date('2008-05-16'));
persona.saludar();
let estudiante = new poo_1.Estudiante('654321', 'María', 'Suárez', 'Aro', new Date('2010-12-25'), '35-254');
estudiante.saludar();
