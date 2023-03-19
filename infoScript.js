const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);

const fetchOpt = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzQ4M2Y4MWI0MjAwMTM5YjI3ZjUiLCJpYXQiOjE2NzkwNDU3NjMsImV4cCI6MTY4MDI1NTM2M30.lV8g2VQV0zVsy-iRKlhc40_p4WNHnqf5sjKQ97EwCXk",
  },
};

window.onload = async () => {
  isLoading(true);
  const container = document.getElementById("product-details");
  try {
    const res = await fetch("https://striveschool-api.herokuapp.com/api/product/" + selectedId, fetchOpt);
    handleError(res);
    const productData = await res.json();
    console.log(productData);

    const { _id, name, description, brand, imageUrl, price, userId, createdAt, updatedAt, __v } = productData;

    container.innerHTML = `
                    <h2 class="fw-bold py-3 ps-2 mb-4">Dettagli Birra:</h2>
                    <p class="big"><strong>Nome: </strong> ${name}</p>
                    <hr>
                    <p class="big"><strong>Prezzo: </strong>${price}€</p>
                    <hr>
                    <p class="big"><strong>Descrizione: </strong>${description}</p>
                    <hr>
                    <p class="big"><strong>Brand: </strong>${brand}</p>
                    <hr>
                    
                    <h5 class="fw-bold py-3 ps-2">Server Details</h5>
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item ps-2 bg-warning"><strong>id:</strong> ${_id}</li>
                        <li class="list-group-item ps-2 bg-warning"><strong>userId:</strong> ${userId}</li>
                        <li class="list-group-item ps-2 bg-warning"><strong>createdAt:</strong> ${createdAt}</li>
                        <li class="list-group-item ps-2 bg-warning"><strong>updatedAt:</strong> ${updatedAt}</li>
                    </ul>
                    <button id="changeBtn" class="btn mt-5" onclick="handleClick()">Modifica prodotto</button>
                    `;
  } catch (err) {
    alert("ERROR: " + err.message);
  } finally {
    isLoading(false);
  }
};

const handleClick = () => {
  window.location.assign("./backoffice.html?id=" + selectedId, fetchOpt);
};

const handleError = (response) => {
  if (!response.ok) {
    let errorMessage = "";
    switch (response.status) {
      case 400:
        errorMessage = "400 = La richiesta non è stata fatta correttamente.";
        break;
      case 401:
        errorMessage = "401 = Non sei autorizzato ad accedere a questa risorsa.";
        break;
      case 403:
        errorMessage = "403 = Non hai i permessi necessari per accedere a questa risorsa.";
        break;
      case 404:
        errorMessage = "404 = La risorsa richiesta non è stata trovata.";
        break;
      case 500:
        errorMessage = "500 = Si è verificato un errore interno del server.";
        break;
      default:
        errorMessage = `Errore durante la richiesta: ${response.statusText}`;
        break;
    }
    throw new Error(errorMessage);
  }
};

const isLoading = (loadingState) => {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
