# Grupo13IoT
Hackaton Microsoft 19/03/2017

Integrantes:
 - Miguel Villamizar
 - Daniel Quiroga
 - Camilo Guavita

El grupo de recursos de azure que se compartio desde la cuenta ulrich.1@hotmail.com y se llama Hack_ioTHub contiene pruebas conceptuales del uso de los servicios de azure.

Descripcion del uso de los servicios que estan siendo usados:

-IoThub :  conexion de los dispositivos a la nube.

-Stream Analytic : Para revisar la informacion en tiempo real que entra del cliente, como consultas de productos, posicion para poder saber si se le muestran promociones o sugerencias de productos por ejemplo. Este analiza y envia enventos a colas de proceso para enviar la informacion que requiera el cliente o deseemos enviarle.

-Azure store: almacenamiento de las consulas y compras del cliente para analisis de compras y saber si le puede interesar un producto en especifico.

-Colas de mensajes: reciben la informacion de los diferentes evnetos que sucede en el Stream Analytic.

-Azure Function:  para el procesamiento de los mensajes que entran en las colas de mensajes.

-Logic App: para hacer el enlace entre las colas de mensajes y la funcion de azure que las procesa para enviar las notificaciones al cliente o la empresa.

-Cognitive services: para el analisis de imagen del producto que el cliente quiere consultar.

-Power Bi : visualizacion de informacion como por ejemplo productos mas vendidos, posiciones de los clientes, zonas de la tienda mas transitadas, etc.




