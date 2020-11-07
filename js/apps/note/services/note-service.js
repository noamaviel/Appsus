// console.log('note-service');

import { utilService } from '../../../services/util-service.js'



const gNotes = _createNotes();

export const noteService = {
    getNotes,
    remove,
    addTxtNote,
    addImgNote,
    addTodoNote,
    addVideoNote,
    addNote,
    changeNoteColor,
    pinToStart,
}

function getNotes() {
    return gNotes;
}

// function getNotes() {
//     return Promise.resolve(gNotes);
// }


function remove(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    gNotes.splice(idx, 1);
}


function addNote(noteData) {
    // console.log('addNote', noteData);
    switch (noteData.type) {
        case 'noteText':
            addTxtNote(noteData)
            break;
        case 'noteImg':
            addImgNote(noteData)
            break;
        case 'noteTodo':
            addTodoNote(noteData)
            break;
        case 'noteVideo':
            addVideoNote(noteData)
            break;
    }
}



function addTxtNote(noteData) {
    let note = {
        id: utilService.makeId(),
        type: "noteText",
        isPinned: false,
        info: {
            txt: noteData.val
        },
        style: {
            backgroundColor: "#BFE4DD"
        }
    }
    gNotes.push(note);
}


function addImgNote(noteData) {

    let note = {
        type: "noteImg",
        info: {
            url: noteData.val,
            title: ''
        },
        style: {
            backgroundColor: "#F6B6B4"
        }
    }
    gNotes.push(note);
}


function addTodoNote(noteData) {
    let todo = {
        id: utilService.makeId(),
        type: "noteTodo",
        isPinned: false,
        info: {
            title: "Things to do:",
            todos: _getTodoArray(noteData.val)
        },
        style: {
            backgroundColor: "#C1C1C1"
        }
    }
    gNotes.push(todo);
}

function _getTodoArray(valStr) {
    let valArray = valStr.split(',')
    let todoArray = valArray.map(todoTxt => {
        return {
            txt: todoTxt,
            isDone: false,
            doneAt: null,
        }
    })
    console.log('todoArray', todoArray);
    return todoArray;
}

function changeNoteColor(noteId, color) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    gNotes[idx].style.backgroundColor = color
}

function pinToStart(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    let note = { ...gNotes[idx] };
    gNotes.splice(idx, 1);
    gNotes.unshift(note);
}


function addVideoNote(noteData) {

    let note = {
        id: utilService.makeId(),
        type: "noteVideo",
        isPinned: true,
        info: {
            videoUrl: noteData.val,
            title: "Video Title",
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    }
    gNotes.push(note);
}

function _createNotes() {


    let notes = [
        {
            id: utilService.makeId(),
            type: "noteText",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                // backgroundColor: "#F5FFC6"
                backgroundColor: "#F6B6B4"
            }
        },
        {
            id: utilService.makeId(),
            type: "noteImg",
            isPinned: true,
            info: {
                url: "https://picsum.photos/id/691/200/120",
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: "#F6B6B4"
            }
        },
        {
            id: utilService.makeId(),
            type: "noteTodo",
            isPinned: true,
            info: {
                title: "Things to do:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: "#F6B6B4"
            }
        },
        {
            id: utilService.makeId(),
            type: "noteVideo",
            isPinned: true,
            info: {
                videoUrl: "https://www.youtube.com/embed/vmC30m8jOZU",
                title: "Arthur!",
            },
            style: {
                backgroundColor: "#F6B6B4"
            }
        }
    ];
    return notes;
}
