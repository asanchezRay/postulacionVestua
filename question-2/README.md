# Enunciado 2

> En la carpeta [question-2](https://bitbucket.org/vestua-com/questions/src/main/question-2/) se ha exportado eventos de navegación de usuarios anonimizados de la plataforma Vestuá. Se le pide al equipo de Ingeniería que hagan un análisis sobre los datos de navegación. En particular se solicita:
>
> - Calcular la cantidad de visitas únicas por cada producto. (No contar cuando un usuario reviso mas de una vez un producto)
> - Calcular la cantidad de clicks únicos por cada producto.
> - Calular el CTR (*Clickthrough Rate*) de cada producto.
> 
> El set de datos contiene la siguiente estructura:
> 
> - `user`: id del usuario que ejecutó el evento.
> - `entityId`: id de la entidad al que el usuario ejecutó el evento.
> - `entityType`: tipo de entidad al que se ejecutó el evento.
> - `eventType`: tipo de evento. Puede ser `impression` o `click`.
> 
> Como miembro del equipo de ingeniería, te solicitan modificar el archivo [script.js](https://bitbucket.org/vestua-com/questions/src/main/question-2/script.js) para que pueda leer el set de datos y generar un archivo `output.csv` con las siguientes columnas:
> 
> - `productId`: id del producto.
> - `clicks`: cantidad de *clicks* únicos que tiene el producto
> - `impressions`: cantidad de impresiones únicas que tiene el producto.
> - `ctr`: métrica CTR del producto.

# Razonamiento

## Nota
Para resolver el problema utilice algunas dependencias, por lo cual es necesario ejecutar

```
npm install
```

## Supuestos asumidos
Tanto para las visitas únicas (impressions) como para los clicks únicos entendí lo siguiente:

Si un usuario hace click 5 veces a un mismo producto, ese producto al ser el mismo usuario que ha clickeado sobre el, contara como que le han hecho un solo click, si en un futuro otro usuario realiza 4 clicks sobre el mismo producto, el producto contara estos 4 click como 1 solo, lo que llevaría al producto a tener 2 click únicos. En otras palabras, cuenta cuantos usuarios distintos han clickeado sobre el producto. Esta misma lógica la asumí para las visitas.

En cuanto al ctr, lo calcule como lo siguiente:
    ctr = clicks únicos  / visitas únicas 

El archivo output.csv de ejemplo utilizaba 4 decimales para expresar el ctr, por lo cual lo deje de la misma manera y no lo lleve a porcentaje.


## Explicación

Para resolver este problema, lo dividí en problemas más pequeños los cuales son detallados a continuación:

## Lectura del csv

Para poder leer el archivo csv BrowsingEvents.csv cree la función ``readCSV(args)`` la cual se encarga principalmente de leer el archivo y guardar cada una de las filas en un arreglo en formato Json llamado _csvData_.

## Procesamiento de datos

Una vez que la lectura del archivo ha concluido, se llama a la función ``filter(navigationData)``, en esta función lo primero que se hace es recorrer el arreglo que tiene cada una de las filas leídas del .csv, para cada uno de las filas, se consulta si el id del producto ha sido procesado previamente o no. Para esto utilizo una estructura Set que no permite guardar elementos duplicados, si el elemento no existe en el Set llamado uniqueProductsId, significa que el producto no se había procesado previamente.

Si el producto no ha sido procesado previamente se agrega al Set uniqueProductsId, luego se crea una instancia del producto, para ello utilice la clase ProductData, una vez que la instancia ha sido creada, se pregunta por que tipo de evento realizo el usuario sobre ese producto, si fue una impression o un click y se suma al atributo correspondiente de la clase ProductData, posteriormente se agrega a la lista llamada processedData que tiene todos los productos que ya han sido procesados previamente.

En caso de que el producto si haya sido procesado previamente, lo que hago es buscar el índice de ese producto en la lista ProcessedData, posteriormente, le sumo al atributo correspondiente al tipo de evento, ya sea impression o click.

### Clase ProductData
Esta clase posee principalmente 4 atributos: productId, clicks, impressions y ctr, los cuales son los 4 atributos que corresponden a las columnas del archivo _output.csv._, por otra parte, hay 2 propiedades mas, las cuales son userClicks y userImpressions, ambos son un set que almacenaran los ids de los usuarios que han realizado la acción en cuestión (Impression o click).

Adicionalmente, aparte del constructor, hay 3 métodos adicionales, el método ``addClick(user)`` lo primero que realiza es una verificación de que un usuario en especifico no haya realizado un click previamente, para esto se consulta si el id del usuario se encuentra o no en el Set userClicks, si no se encuentra, se añade al Set, se le suma uno al contador de clicks y se calcula el ctr. Similar ocurre con la función ``addImpresions(user)``, con la diferencia de que se consulta al Set que corresponde a las impressions.

Finalmente, tenemos la función ``calculateCtr()`` que calcula el ctr de acuerdo a la función matemática definida previamente en los supuestos asumidos.

## Escritura de datos

Para la escritura de los datos en el archivo output.csv cree la función ``writeCSV(processedData)`` con la cual utilizando la dependencia csv-writer, cree el encabezado del csv, una lista data que extrae solo los datos necesarios de la lista processedData, y finalmente se escribe en el archivo output.csv.




