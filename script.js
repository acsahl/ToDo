const inputBox = documnet.getElementbyId("input-box");

const listContainer = documnet.getElementbyId("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Be sure to write down a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
    }
}