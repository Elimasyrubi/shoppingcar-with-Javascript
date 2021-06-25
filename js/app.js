import Cursos from './cursos.js';

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

//Listeners
// "Agregar Carrito"
listaCursos.onclick = (e) => agregarCurso(e);
// Cuando se elimina un curso del carrito
carrito.onclick = (e) => elimicarCurso(e);
// Al Vaciar el carrito
vaciarCarrito.onclick = () => limpiarHtml();


//Funciones
const agregarCurso = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
};

const leerDatosCurso = (curso) => {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  if (articulosCarrito.some((cursos) => cursos.id === infoCurso.id)) {
       const index = articulosCarrito.findIndex(cursos => cursos.id === infoCurso.id);
       const cursos = articulosCarrito;
       cursos[index].cantidad += 1;
       //actualizar el carrito
       articulosCarrito = [...cursos];
  } else {
    //agregar elemento al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  updateCarrito();
};

//Actualizar el carrito en el html
const updateCarrito = () => {
  limpiarHtml();

  //recorre el carrito y genera el html
  articulosCarrito.forEach( curso =>{
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>  
        <img src="${imagen}" width=100>
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad} </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X   </a>
    </td>
    `
    contenedorCarrito.appendChild(row)
  })

  //actualizarPrecio();

}
//agregar el total
const actualizarPrecio = () => {
  //suma de precios
  const suma = articulosCarrito.reduce((totalPrice, curso) => {
    totalPrice = 0;
    totalPrice = totalPrice + curso.precio;
    return totalPrice;
  }  )

    const TotalRow = document.createElement('tr');
    TotalRow.innerHTML = `
    <td> Total = ${suma} </td>
  `
  contenedorCarrito.appendChild(TotalRow)
}
 

const elimicarCurso = (e) =>{
  e.preventDefault();
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    const newCourseList = articulosCarrito.filter(curso => curso.id !== cursoId);
    articulosCarrito = [...newCourseList];
    updateCarrito()

  }
}

//vaciar carrito
const limpiarHtml = () =>{
    while(contenedorCarrito.firstChild){
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


const cargarCursos = () =>{
  console.log(Cursos)
}
cargarCursos();




