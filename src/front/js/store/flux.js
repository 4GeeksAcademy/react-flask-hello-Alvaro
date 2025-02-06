const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token"),
			user: localStorage.getItem("user"),
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			//Creamos la funcion que controla la modificacion de token y user tanto en el store como en el localStorage
			setAuth : (token, user) => {
				setStore({"token":(token)});
				setStore({"user":(user)});
				if (token) {
					localStorage.setItem("token", token);
					localStorage.setItem("user", user);
				} else {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
				}
			},
		}
	}
};

export default getState;



// Guardar algo en el local storage: localStorage.setItem("usuario", response)
// Trar algo del local storage: localStorage.getItem("key")
// Borrar algo del local storage: handleLogout =()=>{localStorage.removeItem("key")}
