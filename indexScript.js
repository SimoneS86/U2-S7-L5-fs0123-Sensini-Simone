const fetchPrincipale = async () => {
  isLoading(true);
  console.log("inizio");

  const fetchOpt = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzQ4M2Y4MWI0MjAwMTM5YjI3ZjUiLCJpYXQiOjE2NzkwNDU3NjMsImV4cCI6MTY4MDI1NTM2M30.lV8g2VQV0zVsy-iRKlhc40_p4WNHnqf5sjKQ97EwCXk",
    },
  };

  try {
    const products = await fetchWithErrors("https://striveschool-api.herokuapp.com/api/product/", fetchOpt);
    const grid = document.getElementById("product-container");

    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col";
      col.innerHTML += `
                    <div class="card">
                        <img src="${product.imageUrl}" class="card-img-top" alt="img libro">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.brand}</p>
                            <p class="card-text">${product.price}€</p>
                            
                            <a href="./info.html?id=${product._id}" id="info-button" class="btn btn-primary">Scopri di più</a>
                            <a href="./backoffice.html?id=${product._id}" id="modifica-button" class="btn btn-primary">Modifica</a>
                        </div>
                    </div>
                    `;

      grid.appendChild(col);
    });
  } catch (err) {
    alert("ERROR: " + err.message);
  } finally {
    isLoading(false);
  }
};

window.onload = () => {
  fetchPrincipale();
  console.log("ultimo");
};

const fetchWithErrors = async (url, options) => {
  const response = await fetch(url, options);
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
  return response.json();
};

const isLoading = (loadingState) => {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
