const buttonsDelete = document.querySelectorAll("button.delete");

buttonsDelete.forEach((buttonDelete) => {
  console.log("working");
  buttonDelete.addEventListener("click", async () => {
    const id = buttonDelete.dataset.id;

    try {
      const res = await fetch("/api/programuotojai/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      try {
        const data = await res.json();
        console.log(data);
        window.location.href = window.location.href;
      } catch (err) {
        console.log("error from data", err);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
