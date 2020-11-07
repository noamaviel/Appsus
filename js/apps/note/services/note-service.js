// console.log('note-service');

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/local-storage-service.js'

const STORAGE_KEY = 'notesDB';

var gNotes = [];

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
    updateLocalStorage
}

function getNotes() {
    return _createNotes()
    .then(notes => {
        gNotes = notes;
        return Promise.resolve(notes);
    })
    .catch(err => {
        console.log('default notes', err);
    });
}


// function getNotes() {
//     return Promise.resolve(gNotes);
// }


function remove(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    gNotes.splice(idx, 1);
    storageService.storeToStorage(STORAGE_KEY, gNotes);
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
    storageService.storeToStorage(STORAGE_KEY, gNotes);
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
    storageService.storeToStorage(STORAGE_KEY, gNotes);
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
    storageService.storeToStorage(STORAGE_KEY, gNotes);
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
    gNotes[idx].style.backgroundColor = color;
    storageService.storeToStorage(STORAGE_KEY, gNotes);
}

function pinToStart(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    let note = { ...gNotes[idx] };
    gNotes.splice(idx, 1);
    gNotes.unshift(note);
    storageService.storeToStorage(STORAGE_KEY, gNotes);
}

function updateLocalStorage() {
    storageService.storeToStorage(STORAGE_KEY, gNotes);
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
    storageService.storeToStorage(STORAGE_KEY, gNotes);
}

function _createNotes() {
    let notes = storageService.loadFromStorage(STORAGE_KEY);
    if (notes) {
        return Promise.resolve(notes);
    } else {

        let notes = [
            {
                id: utilService.makeId(),
                type: "noteText",
                isPinned: true,
                info: {
                    txt: "Bye bye Trump :)"
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
                        { txt: "sleep", doneAt: null },
                        { txt: "eat", doneAt: 187111111 },
                        { txt: "take a shower", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#C1C1C1"
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
            },
            {
                id: utilService.makeId(),
                type: "noteText",
                isPinned: true,
                info: {
                    txt: "Price of my therapist: 400 NIS"
                },
                style: {
                    // backgroundColor: "#F5FFC6"
                    backgroundColor: "#BFE4DD"
                }
            },
            {
                id: utilService.makeId(),
                type: "noteTodo",
                isPinned: true,
                info: {
                    title: "Things to do:",
                    todos: [
                        { txt: "console.log", doneAt: null },
                        { txt: "empty local storage", doneAt: 187111111 },
                        { txt: "pull before push", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#C1C1C1"
                }
            },
            {
                id: utilService.makeId(),
                type: "noteText",
                isPinned: true,
                info: {
                    txt: "To be or Note to be :)"
                },
                style: {
                    // backgroundColor: "#F5FFC6"
                    backgroundColor: "#BFE4DD"
                }
            },
            {
                id: utilService.makeId(),
                type: "noteText",
                isPinned: true,
                info: {
                    txt: "Maya's number: 09-7963524"
                },
                style: {
                    // backgroundColor: "#F5FFC6"
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
                        { txt: "Chicken", doneAt: null },
                        { txt: "Vegetables", doneAt: 187111111 },
                        { txt: "Some apples", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#C1C1C1"
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
        ];
        storageService.storeToStorage(STORAGE_KEY, notes);
        return Promise.resolve(notes);
    }
}
