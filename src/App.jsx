import { useEffect, useState } from "react";

const initialFormData = {
  nome: "",
  description: "",
  price: 0,
  image: "",
  available: false,
  email: "",
};

function App() {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState(initialFormData); // object

  const [availableMessage, setAvailableMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // nel form della pizza se utente seleziona available, allora mostriamo il messaggio: attenzione, la pizza sarà visibile, altrimenti mostriamo il messaggio: attenzione, la pizza sarà nascosta
  useEffect(() => {
    if (formData.available) {
      console.log("attenzione, la pizza sarà visibile");
      setAvailableMessage("attenzione, la pizza sarà visibile");
    } else {
      console.log("attenzione, la pizza sarà nascosta");
      setAvailableMessage("attenzione, la pizza sarà nascosta");
    }
  }, [formData.available]);

  useEffect(() => {
    if (!formData.email.includes("@")) {
      console.log("Metti la chiocciola!");
      setEmailMessage("Metti la chiocciola!");
    } else {
      console.log("Bravo, ora ci siamo :)");
      setEmailMessage("Bravo, ora ci siamo :)");
    }
  }, [formData.email]);

  const handlePizzaForm = (event) => {
    event.preventDefault();

    // 1 creo l'oggetto della nuova pizza
    const newPizza = {
      ...formData,
      id: Date.now(),
    };

    // 2 creo la copia dell'array menu precedente, aggiungendo la nuova pizza
    const newArray = [...menu, newPizza];

    // 3. aggiorno lo stato del menu
    setMenu(newArray);

    // 4. Ripulisco i campi del form
    setFormData(initialFormData);
  };

  const cancella = (idDaCancellare) => {
    const newArray = menu.filter((curPizza) => curPizza.id !== idDaCancellare);
    setMenu(newArray);
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
  };

  return (
    <>
      <div className="container">
        <section>
          <h2>Le nostre pizze</h2>

          {menu.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {menu.map((curItem) => (
                <div className="col" key={curItem.id}>
                  <div className="card">
                    <div className="card-body">
                      <h4>{curItem.title}</h4>
                      <p>{curItem.description}</p>
                      <button
                        onClick={() => cancella(curItem.id)}
                        className="btn btn-danger"
                      >
                        Cancella
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nessuna pizza presente</p>
          )}
        </section>

        <section>
          <h3>Aggiungi una nuova pizza</h3>
          <form onSubmit={handlePizzaForm}>
            <div className="mb-3">
              <label htmlFor="pizzaName">Nome della pizza</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                id="pizzaName"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pizzaPrice">Prezzo</label>
              <input
                type="text"
                name="price"
                className="form-control"
                id="pizzaPrice"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pizzaImage">Immagine</label>
              <input
                type="text"
                className="form-control"
                name="image"
                id="pizzaImage"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email dove ordinare la pizza</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
              <p>{emailMessage}</p>
            </div>

            <div>
              <label htmlFor="pizzaDescription">Decrizione</label>
              <textarea
                name="description"
                id="pizzaDescription"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="my-3">
              <label htmlFor="available">Disponibile</label>
              <input
                id="available"
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
              />
              <div>{availableMessage}</div>
            </div>

            <button type="submit" className="btn btn-primary">
              Salva
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
