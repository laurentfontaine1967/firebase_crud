function Admin() {
  return (
    <div class="container">
      <h1>Dashboard</h1>
      <div class="row mt-5">
        <div class="col-sm">
          <div class="card mx-5">
            <div class="card-header">Liste des Utilisateurs</div>
            <div class="card-body">
              <h5 class="card-title">Modifier/Supprimer</h5>
              {/* <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p> */}
              <button link to="#" class="btn btn-primary">
                Utilisateurs
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card mx-5">
            <div class="card-header">Liste des Produits</div>
            <div class="card-body">
              <h5 class="card-title">Modifier/Supprimer</h5>
              {/* <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p> */}
              <button link to="#" class="btn btn-primary">
                Produits
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card mx-5">
            <div class="card-header">Statistiques</div>
            <div class="card-body">
              <h5 class="card-title">Produits/Utilisateurs</h5>
              {/* <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p> */}
              <button link to="#" class="btn btn-primary">
                Utilisateurs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
