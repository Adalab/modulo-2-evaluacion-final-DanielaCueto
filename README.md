#Desarrollar una aplicación web de búsqueda de series de TV que permite marcar y desmarcar las series favotitas y guardarlas en local storage. #

1.Estructura básica: Consta de dos partes:
[x]1.1.- Un campo de texto y un botón para buscar series por su título.

[x]1.2.- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

2.Búsqueda:
[]2.1.-Click sobre el botón de Buscar(ev) y la aplicación debe conectarse al API facilitado.

[]2.2.-Recoger el texto (value) introducido por la usuaria del campo de búsqueda.

[]2.3.- Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.

[]2.4.- Algunas series devueltas por el API no tienen imagen. Hay que mostrar una imagen de relleno (de placeholder.com).

[]2.5.- Pintar la información en la página (ya sea con inner.HTML o manipulando el DOM de forma avanzada).

3.Favoritos:
Indicar cuales son los favoritos. Al hacer click sobre una serie:

[]3.1.- El color de fondo y de fuente se intercambian para indicar que es una serie favorita.

[] 3.2.- Mostrar esos favoritos en una lista en la parte izquierda de la pantalla, debajo del formulario de búsqueda. (para esto crear una variable o constante tipo array en js para almacenar las series favoritas).

[]3.3.- Deben mantenerse en la página aunque la usuaria haga otra búsqueda.

4.Almacenamiento local:
[]4.1.- Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse.
