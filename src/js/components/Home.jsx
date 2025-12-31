import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState('')

	const [listaTareas, setListaTareas] = useState([])

	const API_URL = "https://playground.4geeks.com/todo"

	const USER = 'Lorenzo'

	const getUser = async () => {

		const response = await fetch(`${API_URL}/users/${USER}`)

		if (!response.ok) {
			console.log('User no existe');
			crearUser()
			return
		}

		const data = await response.json()
		console.log(data);
		setListaTareas(data.todos)
	}

	const crearUser = async () => {
		const response = await fetch(`${API_URL}/users/${USER}`, {
			method: 'POST'
		})
		if (!response.ok) {
			return
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	const agregarTarea = async () => {

		if (!tarea.trim()) {
			return
		}

		const response = await fetch(`${API_URL}/todos/${USER}`, {
			method: "POST",
			body: JSON.stringify({ label: tarea }),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			console.log('Tarea no Válida');
			return
		}

		if (response.ok) {
			getUser()
			setTarea('')
		}
	}

	const pulsarEnter = (e) => {
		if (e.key === 'Enter') {
			agregarTarea()
		}
	}

	const eliminarTarea = async (id) => {

		const response = await fetch(`${API_URL}/todos/${id}`, {
			method: "DELETE",
			body: JSON.stringify({ label: tarea }),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (response.ok) {
			getUser()
		}
	}

	return (
		<>
			<div className="container mx-auto m-5 ">
				<h1 className="text-center text-uppercase shadow rounded-4 m-2 p-2 mx-auto bg-light bg-opacity-50">lista de tareas</h1>
				<div className="row mx-auto">
					<div className="shadow rounded-4 m-2 p-2 bg-light bg-opacity-50" style={{ minHeight: "250px" }}>
						<div className="row m-3">
							<div className="col-12 mx-auto text-center fw-bold mb-4">{USER}</div>
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
							listaTareas.map((item, index) => {
								return (
									<div key={index} className="d-flex justify-content-between" >
										<p>- {item.label}</p>
										<p onClick={() => eliminarTarea(item.id)}><i className="fa-solid fa-circle-xmark" style={{ color: "#a50000ff" }}></i></p>
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
