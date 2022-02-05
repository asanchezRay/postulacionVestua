# Enunciado 3

> Implementar un método de verificación lógica de paréntesis. Es decir, implementar el método `parenthesisChecker(str)` que recibe un `string` como parámetro y devuelve un `boolean`. La respuesta del método debe ser `true` si la cadena de `string` es válida en términos de paréntesis (`( )`, `[ ]`, `{ }`), i.e. cada apertura de paréntesis se cierra correctamente. A continuación se muestran ejemplos de `string` válidos e inválidos.
> 
> **Ejemplos válidos**: la función debe devuelve `true`.
>
> - `parenthesisChecker('a * (b + c)')` → `true`
> - `parenthesisChecker('a * (b + c * [d])')` → `true`
> - `parenthesisChecker('[]{}()abc{([])}')` → `true`
>
> **Ejemplos válidos**: la función debe devuelve `false`.
>
> - `parenthesisChecker('(()')` → `false`
> - `parenthesisChecker('(([))')` → `false`
> - `parenthesisChecker('([)]')` → `false`

# Razonamiento

El problema solo pide validar si los distintos tipos de paréntesis se encuentran correctamente posicionados o no, para resolver esto, hay que entender previamente que la lógica de los paréntesis permite abrir un paréntesis cuando uno quiera, sin embargo, solo puede cerrar el último que se abrió, este comportamiento es idéntico al que posee la estructura de datos pila (puedo agregar cuando quiera, sin embargo, solo puedo eliminar el último), por lo cual se utilizó una pila que cada vez que se abría algún tipo de paréntesis, se agregaba ese paréntesis a la pila, sin embargo, cuando era un paréntesis de cierre, se debían verificar principalmente 2 cosas, que la pila no estuviese vacía (Si esto ocurre, significa que está intentando cerrar un paréntesis que jamás abrió) y que el tipo de paréntesis que cierra, sea el mismo tipo de paréntesis que se encuentra en el tope de la pila, de ser ese el caso, se saca el paréntesis de la pila y se sigue analizando los demás paréntesis, en caso de que los paréntesis no coincidan, inmediatamente se da por entendido que el orden de los paréntesis no es el correcto, por lo que no es necesario seguir analizando. Finalmente, una vez que se hayan analizado todos los paréntesis, hay que verificar que la pila se encuentre vacía, ya que, si tiene algún elemento dentro, quiere decir que hay al menos un paréntesis que no fue cerrado correctamente, lo que significa que la lógica de los paréntesis es incorrecta. 