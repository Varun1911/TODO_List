const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#listcontainer');

document.querySelector('.addButton').addEventListener('click', addTask);
document.addEventListener('keydown', (e) =>
{
    if(e.key === "Enter")
    {
        addTask();
    }
});


(function Init()
{
    loadData();
})();

function addTask()
{
    if(inputBox.value === '')
    {
        alert('Please enter a valid task');
    }
    else
    {
        // console.log(inputBox.value);
        let li  = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        //cross btn
        let span = document.createElement("span");
        span.setAttribute('class', 'crossBtn');
        span.innerHTML = "\u00d7";
        li.appendChild(span);


        //reorder btn
        let reorderBtn = document.createElement("button");
        reorderBtn.setAttribute('class', 'reorderBtn');
        let reorderImg = document.createElement("img");
        reorderImg.setAttribute('src', 'https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Bars-icon.png');
        reorderBtn.appendChild(reorderImg);
        li.appendChild(reorderBtn);
        reorderBtn.addEventListener("dragstart", dragStartLI);
        reorderBtn.addEventListener("dragend", dragEndLI);
        
        inputBox.value = "";
        saveData();
    }
}


listContainer.addEventListener('click', function(e)
{
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
    }

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }

    saveData();
},false);



//Storing tasks in browser
function saveData()
{
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData()
{
    listContainer.innerHTML = localStorage.getItem("data");
}



//rearranging task order
function dragStartLI(eventArgs)
{
    toggleClassDragging(eventArgs, true);
}


function dragEndLI(eventArgs)
{
    toggleClassDragging(eventArgs, false)
}


function toggleClassDragging(eventArgs, state)
{
    let li = eventArgs.currentTarget.parentElement;
    if(li.tagName === "LI")
    {
        if(state)
        {
            li.classList.add("dragging");
        }
        else
        {
            li.classList.remove("dragging");
        }
        li.setAttribute('draggable', state);
    }
}


function reorderList(e)
{
    e.preventDefault();
    const draggingItem = listContainer.querySelector(".dragging");
    const siblings = [...listContainer.querySelectorAll("li:not(.draggable)")];
    
    let nextSibling = siblings.find(sibling => {
        const rect = sibling.getBoundingClientRect();
        return e.clientY <= rect.top + sibling.offsetHeight / 2; 
    })

    // console.log(nextSibling);
    listContainer.insertBefore(draggingItem, nextSibling);
}

listContainer.addEventListener("dragover", reorderList);