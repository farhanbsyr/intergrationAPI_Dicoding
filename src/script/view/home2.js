document.addEventListener("DOMContentLoaded", () => {
  const inputTitle = document.getElementById("title");
  const inputBody = document.getElementById("deskripsi");
  const submitForm = document.getElementById("form");
  const baseURL = "https://notes-api.dicoding.dev/v2";
  const btnSubmit = document.getElementById("btn-submit");
  submitForm.addEventListener("submit", async function (event) {
    event.preventDefault(event);

    const note = {
      title: inputTitle.value,
      body: inputBody.value,
    };

    btnSubmit.classList.add("loading");
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error(Error);
      }

      const newNote = await response.json();
      inputTitle.value = "";
      inputBody.value = "";
      const listNotes = document.querySelector("list-notes");
      if (listNotes) {
        // cara memperbaruhi data di custom element
        const currentNotes = listNotes._notes;
        currentNotes.push(newNote);
        listNotes.notes = currentNotes;
      }
    } catch (error) {
      console.error("error posting data", error);
    } finally {
      btnSubmit.classList.remove("loading");
    }
  });
});
