import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState('')

	const [listaTareas, setListaTareas] = useState([])

	const agregarTarea = () => {
		setListaTareas([...listaTareas, tarea])
		setTarea('')
	}

	const pulsarEnter = (e) => {
		if (e.key === 'Enter') {
			agregarTarea()
		}
	}

	const eliminarTarea = (index) => {
		setListaTareas(nuevaLista => nuevaLista.filter((_, i) => i !== index))
	}

	return (
		<>
			<div className="container mx-auto m-5 ">
				<h1 className="text-center text-uppercase shadow rounded-4 m-2 p-2 mx-auto bg-light bg-opacity-50">lista de tareas</h1>
				<div className="row mx-auto">
					<div className="shadow rounded-4 m-2 p-2 bg-light bg-opacity-50" style={{ minHeight: "250px" }}>
						<div className="row m-3">
							<div className="col-md-10 col-12 mb-2 mb-md-0">
								<input
									className="form-control"
									type="text"
									placeholder="Introduce la tarea"
									onChange={e => setTarea(e.target.value)}
									onKeyDown={pulsarEnter}
									value={tarea}
									name="tarea"
								/>
							</div>

							<div className="col-md-2 col-12">
								<button type="button" className="btn btn-primary w-100 w-md-auto " onClick={agregarTarea}>Agregar</button>
							</div>
						</div>
						{
							listaTareas.map((tarea, index) => {
								return (
									<div key={index} className="d-flex justify-content-between" >
										<p>- {tarea}</p>
										<p className={`eliminar ${eliminarTarea === false ? false : true}`} onClick={() => eliminarTarea(index)}><i className="fa-solid fa-circle-xmark" style={{ color: "#a50000ff" }}></i></p>
									</div>
								)
							})
						}
					</div>
				</div>
			</div >
		</>
	);
};

export default Home;