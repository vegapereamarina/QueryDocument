//Con estos documentos realizaremos la colección de inventario.

db.inventory.insertMany([
    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
 ]);

 /*Para seleccionar todos los documentos de la colección: */

 db.inventory.find( {} );


 //El siguiente ejemplo selecciona de la colección de inventario todos los documentos donde el estado es igual a "D":

 db.inventory.find( { status: "D" } );


 //El siguiente ejemplo recupera todos los documentos de la colección de inventario donde el estado es igual a "A" o "D":

 db.inventory.find( { status: { $in: [ "A", "D" ] } } );



 /*Una consulta compuesta puede especificar condiciones para más de un campo en los documentos de la colección.
  Implícitamente, una conjunción lógica AND conecta las cláusulas de una consulta compuesta para que la consulta 
  seleccione los documentos de la colección que cumplen todas las condiciones.*/

 /*El siguiente ejemplo recupera todos los documentos de la colección de inventario donde el estado es igual a "A" y 
 la cantidad es menor que ($ lt) 30:*/

 db.inventory.find( { status: "A", qty: { $lt: 30 } } );


 /*Con el operador $or, 
 puede especificar una consulta compuesta que combine cada cláusula con una conjunción OR 
 lógica para que la consulta seleccione los documentos de la colección que coincidan con al menos una condición.*/

 /*El siguiente ejemplo recupera todos los documentos de la colección donde el estado es igual a "A" o 
 la cantidad es menor que ($ lt) 30: */

 db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } );


 /*En el siguiente ejemplo, el documento de consulta compuesta selecciona todos los documentos de la colección donde el estado 
 es igual a "A" y la cantidad es menor que ($ lt) 30 o el elemento comienza con el carácter p:*/

 db.inventory.find( {
    status: "A",
    $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
 } );






 /*Ahora explicación extra sobre "Logical Query Operators":*/




 /*Consultas AND con varias expresiones que especifican el mismo campo:*/
 /*Significado del valor $and en el ejemplo: El valor del campo "price" no es igual a 1,99 y "price" existe*/

 db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } );
 
 /*También puede ser construido por un AND implícito, combinando las expresiones del operador para el campo de price.*/

 db.inventory.find( { price: { $ne: 1.99, $exists: true } } );




 /*Consultas NOT con varias expresiones que especifican el campo*/
 /*Significado del valor $not en el ejemplo: el valor del campo "price" es menor o igual a 1,99 or, el campo "price" no existe */

 db.inventory.find( { price: { $not: { $gt: 1.99 } } } )

 /*La siguiente consulta selecciona todos los documentos de la colección de inventario donde el valor del campo del artículo 
 no comienza con la letra p*/

 db.inventory.find( { item: { $not: /^p.*/ } } )




 /*Consultas OR con varias expresiones que especifican el campo*/
 /*Esta consulta seleccionará todos los documentos de la colección de inventario donde el valor del campo de cantidad 
 es menor que 20 o el valor del campo de precio es igual a 10. */

 db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

 













