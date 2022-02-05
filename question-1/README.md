# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

Al calcular los primeros 7 pisos de manera manual, dan los siguientes resultados:
    n = 1 -> 1
    n = 2 -> 2
    n = 3 -> 3
    n = 4 -> 5
    n = 5 -> 8
    n = 6 -> 13
    n = 7 -> 21

Al ver la sucesión me di cuenta de que la solcuión correspondia a la suma de los 2 anteriores, lo cual se puede calcular con la siguiente función recursiva:
    f(n) = f(n-1) + f(n-2)

        f(1) = 1
        f(2) = 2

Al no tener un valor maximo para el valor n, opte por transformar la función recursiva en una función lineal para evitar problemas por el tamaño del callstack y de tiempo de ejecución.

De esa forma, la solución quedo en un ciclo que sumaba los ultimos 2 valores, similar a como se calcula Fibonacci.