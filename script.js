let notes = []
const form = document.querySelector('.form')
const input = document.querySelector('#input-note')
const select= document.querySelector('#category')
const notesList = document.querySelector('.notes-list')
const searchInput = document.querySelector('#search-input')
const noteCount = document.querySelector('#note-count')

function saveNotes(){
    localStorage.setItem('notes',JSON.stringify(notes))
}

form.addEventListener('submit',(event) =>{
        event.preventDefault();


const noteText = input.value

const selectedCategory = select.value

if(noteText.trim() === ""){
    console.log("Cannot submit empty textbox")
    return
}
if (selectedCategory === ""){
    console.log("please select a category")
    return
}


const createdAt = new Date()
const id = notes.length + 1


const newNote = {
    id:id,
    text:noteText,
    category:selectedCategory,
    createdAt: createdAt
    
}

notes.push(newNote)

renderNotes()

input.value = ''
select.value=''

})

function renderNotes() {
    notesList.innerHTML = ''


    const searchText = searchInput.value.trim().tolowerCase()

    const filteredNotes = notes.filter(note =>
        note.text.tolowerCase().includes(searchText)
    )

    noteCount.textContent = `Notes: ${notes.length}`

    if(filteredNotes.length === 0){
        const message = document.createElement('li')

        if(searchText.length !== ''){
            message.textContent = 'No match'
        }else{
            message.textContent = 'No notes yet.Add your first note!'
        }
        notesList.appendChild(message)
        return
    }
  for (const note of filteredNotes) {
        const card = document.createElement('li')

        const title = document.createElement('h4')
        title.textContent = note.text

        const category = document.createElement('small')
        category.textContent = note.category

        const date = document.createElement('p')
        date.textContent = note.createdAt

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.type = 'button'

        deleteButton.addEventListener('click', () => {
            notes = notes.filter(item => item.id !== note.id)

            saveNotes()
            renderNotes()
        })

        card.append(title, category, date, deleteButton)
        notesList.appendChild(card)
    }
}

searchInput.addEventListener('input', renderNotes)

renderNotes()