class ListNotes extends HTMLElement {
  static baseURL = "https://notes-api.dicoding.dev/v2";
  baseURLl = "https://notes-api.dicoding.dev/v2";
  _notes = [];
  constructor() {
    super();
    this._style = document.createElement("style");
  }
  async connectedCallback() {
    await this.fetchData();
    this.render();
  }

  loading() {
    setTimeout(() => {
      console.log("loading");
    }, 5000);
  }

  async deleteData(note_Id) {
    try {
      const response = await fetch(`${ListNotes.baseURL}/notes/${note_Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.status) {
        throw new Error("ck erro bro ");
      }
      const data = await response.json();
      this.fetchData = data;
      this.render();
      console.log("sukses:", data);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchData() {
    try {
      const response = await fetch(`${ListNotes.baseURL}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this._notes = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  set notes(data) {
    this._notes = data;
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
      display:block;
    }
            .card-wrapper{
              display: grid;
              grid-template-column:1fr;
              gap:1rem;
            }
            .cardNotes {
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
                color:black;
                background-color:#E8EDFF;
                display:grid;
                padding:1rem;
                 
                grid-template-columns:1fr 1fr 0.5fr;
                grid-template-areas:
                'title title button'
                'body body button '
                'data date button';
                
                gap:0.5rem

              }

            .cardTitle {
              grid-area: title;
                font-size:1.5rem;
            }
            .cardBody {
              grid-area:body;
                font-size:1rem;
                
            }
            .button{
              grid-area:button;
              justify-self: end;
            }
            .button button{
            font-size:1rem;
            background-color: red;
            color:white;
            padding:0.5rem;
            border: none;
            border-radius:0.5rem;
            }
            .cardDate{
             
              grid-area:date;
              font-size:0.8rem;
              color:gray;
              justify-self: start;
            }
            @media only screen and (max-width: 508px){
              .cardTitle {
                  font-size:1rem;
              }
              .cardBody {
                  font-size:0.8rem;
                  
              }
              .cardDate {
                font-size:0.6rem;
                
            }
                
            }
        `;
  }
  render() {
    console.log(this._notes);
    this._updateStyle();
    let notesHTML = "";
    this._notes.map((note) => {
      notesHTML += `
      <div class="cardContainer">
          <div class="cardNotes">
              <div class="cardTitle">
                  <h3>${note.data.title}</h3>
              </div>
              <div class="cardBody">
                  <p>${note.data.body}</p>
              </div>
              <div class="cardDate">
                  <p>${note.data.createdAt}</p>
              </div>
              <div class="button">
                  <button class="delete-button" data-id="${note.data.id}">delete</button>
              </div>
          
          </div>
      </div>
      `;
    });
    this.innerHTML = `
            ${this._style.outerHTML}
            <div class="card-wrapper">
                ${notesHTML}
            </div>
        `;
    this.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", () => {
        const noteId = button.getAttribute("data-id");
        this.deleteData(noteId);
      });
    });
  }
}

customElements.define("list-notes", ListNotes);
