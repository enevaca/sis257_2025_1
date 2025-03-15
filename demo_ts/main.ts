// Esto es un comentario
/* Esto es un
 * Comentario en múltiples líneas
 */

import { Estudiante, Persona } from "./poo";

// Tipo de Datos
// Boolean
let esActivo: boolean = true; // let: El ámbito es local, funciona dentro del scope (función, ciclo, if, {})
var esActivo2: boolean = false; // var: El ámbito es global, funciona en todo el archivo
const esActivo3: boolean = false; // Utilizado para constantes

// Number
let entero: number = 20;
let enteroLargo: number = 46546546465466;
let real: number = 3.1416;
let binario: number = 0b101;
let octal: number = 0o11;
let hexadecimal: number = 0xA;

// String
let sigla: string = 'SIS257';
let materia: string = 'Desarrollo de Aplicación Int/Internet II';
let concatenar: string = sigla + ' - ' + materia;
let concatenar2: string = `${sigla} - ${materia}`;
let mayusculas: string = concatenar.toUpperCase();
let minusculas: string = concatenar.toLowerCase();
let reemplazo: string = concatenar.replace(/ /g, '*');
let subcadena: string = concatenar.substring(0, 10);
let separar: string[] = materia.split(' ');
let repetir: string = sigla.repeat(3);
let sinEspaciosExtremos: string = concatenar.trim();
let logintudCadena: number = concatenar.length;

// Array
let array: string[] = ['uno', 'dos', 'tres', 'cuatro'];
let arrayNumerico: number[] = [1, 2, 3, 4, 5];
let longitudArray: number = arrayNumerico.length;
let doble: number[] = arrayNumerico.map(n => n * 2);
let factorial: number = arrayNumerico.reduce((prev, curr) => prev * curr);
let revertir: number[] = arrayNumerico.reverse();
let impares: number[] = arrayNumerico.reverse().filter(n => n % 2 == 1);
array.shift(); // Elimina el primer elemento
array.pop();   // Elimina el último elemento
array.push('cinco') // Inserta un nuevo elemento

// Tuple
let tuple = [true, 6.3, 'Hola', [5, 6, 7]];

// Enum
enum sexo { M = 'Masculino', F = 'Femenino'};
enum color { red = 'Rojo', yellow = 'Amarillo', green = 'Verde' };
enum tipo { par = 0, impar = 1 };

// Any
let cualquiera: any = 'Cualquier valor';
cualquiera = 65;

// Object
let objeto: object = { nombre: 'Juan', apellidos: 'Pérez' };

// Estructuras de control
let contiene: boolean;
if (materia.includes('Desarrollo')) contiene = true;
else contiene = false;
contiene = materia.includes('Desarrollo') ? true : false;
contiene = materia.includes('Desarrollo');

for (let i in array) console.log('for in: ' + i); // Obtiene las posiciones
for (let i of array) console.log('for of: ' + i); // Obtiene los valores
array.forEach(i => console.log('forEach: ' + i)); // Obtiene los valores

// interfaces
interface Coche {
  placa: string,
  chasis: string,
}
let coche: Coche = { placa: '3216-FNP', chasis: '24654654DF54F' };

// funciones
function saludo(nombre: string):void {
  console.log(`Hola ${nombre}`);
  
}
saludo('Juan');

// POO
let persona: Persona = new Persona('123456', 'Juan', 'Pérez', 'López', new Date('2008-05-16'));
persona.saludar();

let estudiante: Estudiante = new Estudiante('654321', 'María', 'Suárez', 'Aro', new Date('2010-12-25'), '35-254');
estudiante.saludar();
