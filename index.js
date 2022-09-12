
const draggableList = document.getElementById('draggable-list')
const check = document.getElementById('check')

const richestPeople = [
    'Jeff Bezos',
    'Bill gates',
    'Mark Zuckerberg',
    'Larry Page',
    'Warren Buffet'
]

const listItems = []

let dragStartIndex

createList()

function createList(){
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            // console.log(person);
            const listItem = document.createElement('li')
            // listItem.classList.add('wrong')
            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fa fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem)

            draggableList.append(listItem)
        })

        addEventListeners()
}

function dragStart(e){
    console.log('drag start');
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex);
}
function dragOver(e){
    console.log('drag over');
    e.preventDefault()
}
function dragDrop(e){
    console.log('drag drop');
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')

}
function dragEnter(e){
    // console.log('drag enter');
    this.classList.add('over')
}
function dragLeave(e){
    // console.log('drag leave');
    this.classList.remove('over')
}

function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

function addEventListeners(e){
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong')
        }
        else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

check.addEventListener('click', checkOrder)