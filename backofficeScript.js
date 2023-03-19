const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
const fetchOpt = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzQ4M2Y4MWI0MjAwMTM5YjI3ZjUiLCJpYXQiOjE2NzkwNDU3NjMsImV4cCI6MTY4MDI1NTM2M30.lV8g2VQV0zVsy-iRKlhc40_p4WNHnqf5sjKQ97EwCXk",
  },
};
const endpoint = selectedId
  ? "https://striveschool-api.herokuapp.com/api/product/" + selectedId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = selectedId ? "PUT" : "POST";

window.onload = async () => {
  if (selectedId) {
    isLoading(true);
    const form = document.querySelector("form");
    form.querySelectorAll(".form-text.text-danger").forEach((warning) => (warning.style.display = "none"));
    form.querySelectorAll(".form-control:required").forEach((elem) => elem.classList.add("is-valid"));
    document.getElementById("subtitle").innerText = "Modifica prodotto";
    document.getElementById("delete-btn").classList.remove("d-none");
    document.getElementById("crea-btn").innerText = "Modifica";

    try {
      const resp = await fetch(endpoint, fetchOpt);
      handleError(resp);
      const productData = await resp.json();
      const { _id, name, description, brand, imageUrl, price, userId, createdAt, updatedAt, __v } = productData;
      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("imageUrl").value = imageUrl;
      document.getElementById("brand").value = brand;
      document.getElementById("price").value = price;
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
      isLoading(false);
    }
  }
};

const handleValidate = function () {
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!name) {
    document.getElementById("name").classList.add("is-invalid");
  } else {
    document.getElementById("name").classList.remove("is-invalid");
    document.getElementById("name").classList.add("is-valid");
    document.getElementById("name-form-text").style.display = "none";
  }
  if (!description) {
    document.getElementById("description").classList.add("is-invalid");
  } else {
    document.getElementById("description").classList.remove("is-invalid");
    document.getElementById("description").classList.add("is-valid");
    document.getElementById("description-form-text").style.display = "none";
  }

  if (!brand) {
    document.getElementById("brand").classList.add("is-invalid");
  } else {
    document.getElementById("brand").classList.remove("is-invalid");
    document.getElementById("brand").classList.add("is-valid");
    document.getElementById("brand-form-text").style.display = "none";
  }
  if (!imageUrl) {
    document.getElementById("imageUrl").classList.add("is-invalid");
  } else {
    document.getElementById("imageUrl").classList.remove("is-invalid");
    document.getElementById("imageUrl").classList.add("is-valid");
    document.getElementById("imageUrl-form-text").style.display = "none";
  }

  if (!price) {
    document.getElementById("price").classList.add("is-invalid");
  } else {
    document.getElementById("price").classList.remove("is-invalid");
    document.getElementById("price").classList.add("is-valid");
    document.getElementById("price-form-text").style.display = "none";
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    imageUrl: document.getElementById("imageUrl").value,
    brand: document.getElementById("brand").value,
    price: document.getElementById("price").value,
  };

  try {
    isLoading(true);
    const resp = await fetch(endpoint, {
      method: method,
      body: JSON.stringify(newProduct),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzQ4M2Y4MWI0MjAwMTM5YjI3ZjUiLCJpYXQiOjE2NzkwNDU3NjMsImV4cCI6MTY4MDI1NTM2M30.lV8g2VQV0zVsy-iRKlhc40_p4WNHnqf5sjKQ97EwCXk",
        "Content-Type": "application/json",
      },
    });
    handleError(resp);
    if (resp.ok) {
      const newProductObj = await resp.json();
      if (selectedId) {
        alert("Risorsa con l'id " + newProductObj._id + ", modificata con successo");
      } else {
        alert("Risorsa con l'id " + newProductObj._id + ", creata con successo");
        const form = document.querySelector("form");
        form.reset();
      }
    }
  } catch (error) {
    alert("ERROR: " + error.message + " La richiesta non è andata a buon fine");
  } finally {
    isLoading(false);
  }
  window.location.assign("./index.html?id=" + selectedId);
};

const handleDelete = async () => {
  isLoading(true);
  const hasAccepted = confirm("Sei convinto di voler elimilare il prodotto?");
  if (hasAccepted) {
    try {
      const resp = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzQ4M2Y4MWI0MjAwMTM5YjI3ZjUiLCJpYXQiOjE2NzkwNDU3NjMsImV4cCI6MTY4MDI1NTM2M30.lV8g2VQV0zVsy-iRKlhc40_p4WNHnqf5sjKQ97EwCXk",
        },
      });
      handleError(resp);
      const deletedObj = await resp.json();
      alert("Hai eliminato il prodotto " + deletedObj.name);
      window.location.assign("./index.html");
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
      isLoading(false);
    }
  }
  isLoading(false);
};

const handleReset = function () {
  const hasAccepted = confirm("Sei sicuro di voler cancellare tutti i campi inseriti?");
  if (hasAccepted) {
    const form = document.querySelector("form");
    form.reset();
    form.querySelectorAll(".form-text.text-danger").forEach((warning) => (warning.style.display = "block"));
    form.querySelectorAll(".form-control:required").forEach((elem) => elem.classList.add("is-invalid"));
  }
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
