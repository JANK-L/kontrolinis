const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;

  const vardas = form.elements["vardas"].value;
  const tech = form.elements["tech"].value;
  const laisvas = form.elements["laisvas"].value;
  const ilguma = form.elements["ilguma"].value;
  const platuma = form.elements["platuma"].value;
  const location = { type: "Point", coordinates: [ilguma, platuma] };

  console.log(vardas, tech, laisvas, ilguma, platuma, location);

  try {
    console.log("SENDING DATA");
    const res = await fetch("/api/programuotojai/" + id, {
      method: "PUT",
      body: JSON.stringify({ vardas, tech, laisvas, location }),
      headers: { "Content-Type": "application/json" },
    });

    try {
      const data = await res.json();
      console.log(data);
      window.location.href = "/api/list";
    } catch (err) {
      console.log("error from data", err);
    }
  } catch (err) {
    console.log(err);
  }
});
