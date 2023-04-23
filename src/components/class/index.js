export let lists = []


function setLists() {
    localStorage.setItem('x2h3D46jQz6', JSON.stringify(lists))
}

export function countTasksDone() {
    let nameList = lists[0]?.name.toLowerCase()
    let countChecks = document.getElementById("count-checks")
    let list = lists.filter(el => el.name === nameList)
    let tasksDone = list[0]?.tasks.filter(el => el.done == true)

    if (countChecks) {
        if (list[0].tasks.length > 0) {
            countChecks.innerText = tasksDone.length + " / " + list[0].tasks.length
        } else {
            countChecks.innerText = "AGUARDANDO ITENS..."
        }
    } else {
        if (list[0]?.tasks.length > 0) {
            dones = tasksDone.length
            tasksAmount = " / " + list[0].tasks.length
        } else {
            dones = "AGUARDANDO"
            tasksAmount = " ITENS..."
        }
    }

}

export let dones = ""
export let tasksAmount = ""
let itemChanged = ''
let nameChanged = ''

export class Functions {
    static addNewList() {
        document.getElementById("modal").style.display = "flex"
    }

    static cancelModal() {
        if (document.getElementById("modal")) {
            document.getElementById("modal").style.display = "none"
        } else {
            document.getElementById("modal-change").style.display = "none"
            document.getElementById("modal-delete").style.display = "none"
        }
    }

    static generateNewList() {
        let input = document.getElementById("name-list")
        let nameList = input.value.toLowerCase()
        if (input.value.length > 0) {
            let listExist = lists.filter(el => el.name === nameList)

            if (listExist.length === 0) {
                let newList = {
                    name: nameList,
                    tasks: []
                }

                lists.unshift(newList)
                setLists()
                countTasksDone()
                window.location.href = "/lists"
            } else {
                alert("JÁ EXISTE UMA LISTA COM ESSE NOME")
            }
        } else {
            alert("DIGITE UM NOME PARA A LISTA")
        }
    }

    static openList(el) {
        let nameList = el.target.innerText.toLowerCase()
        let index = lists.findIndex(el => el.name === nameList)

        let list = lists.find((el) => {
            return el.name == nameList
        })

        lists.splice(index, 1)
        lists.unshift(list)

        setLists()
        window.location.href = "/lists"
    }

    static createTask() {
        let nameTask = document.getElementById('name-task')
        let nameList = document.getElementById('name-list').innerText.toLowerCase()
        let listTasks = document.getElementById("tasks")

        let create = false
        let list = lists.filter((element => element.name === nameList))
        list[0].tasks.forEach(el => {
            if (el.name == nameTask.value.toLowerCase() && el.done == false) { // NA HORA DE VALIDAR O DONE, PARA TRANSFORMAR O DONE EM FALSE NOVAMENTE, PRECISA CONFERIR SE NÃO EXISTE NEM UMA OUTRA TASK NA MESMA LISTA COM O MESMO NOME JÁ COM O DONE DESMARCADO
                return create = true
            }
        })

        if (nameTask.value.length > 0 && create == false) {
            let item = document.createElement("li")
            item.classList.add("item")

            let checkbox = document.createElement('div')
            checkbox.classList.add('checkbox')

            let check = document.createElement("input")
            check.type = "checkbox"
            check.name = "check"
            check.classList.add("check")
            check.setAttribute('onclick', 'check)')

            checkbox.appendChild(check)

            let taskName = document.createElement("div")
            taskName.classList.add("task")
            taskName.innerText = nameTask.value

            let changeTask = document.createElement('div')
            changeTask.classList.add('change')
            changeTask.setAttribute("onclick", "this.openChangeTask")
            changeTask.innerHTML = '<i class="bi bi-pencil-fill"></i>'

            let del = document.createElement("div")
            del.classList.add("delete")
            del.setAttribute('onclick', 'this.deleteTask')
            del.innerHTML = '<i class="bi bi-trash3-fill"></i>'

            let actions = document.createElement('div')
            actions.classList.add('actions')
            actions.append(changeTask, del)

            item.append(checkbox, taskName, actions)
            listTasks.appendChild(item)

            list[0].tasks.push({ name: nameTask.value.toLowerCase(), done: false })
            setLists()
            countTasksDone()
            nameTask.value = ''
            document.location.reload(true);
        } else if (nameTask.value.length > 0 == false) {
            alert('CAMPO VAZIO!')
        } else {
            alert('JÁ EXISTE UMA TAREFA COM ESSE MESMO NOME QUE AINDA NÃO FOI FEITA!')
            create = false
        }
    }

    static checkTask(el) {
        let item = el.target.parentNode.parentNode
        let nameTask = item.children[1].innerText.toLowerCase()
        let nameList = document.getElementById("name-list").innerText.toLowerCase()

        let list = lists.filter(el => el.name == nameList)
        let taskCheck = list[0].tasks.filter(el => el.name === nameTask)

        if (item.children[0].children[0].checked) {
            item.children[1].style.textDecoration = "line-through"
            item.children[1].style.color = "gray"
            let check = taskCheck.filter(el => el.done == false)
            check[0].done = true
        } else {
            let exists = list[0].tasks.filter(el => el.name == nameTask && el.done == false)
            if (exists.length > 0) {
                alert("Já existe uma tarefa com esse nome na lista que ainda não foi feita!")
                item.children[0].children[0].checked = true
            } else {
                item.children[1].style.textDecoration = "none"
                item.children[1].style.color = "#fff"
                taskCheck[0].done = false
            }
        }

        setLists()
        countTasksDone()
    }

    static openChangeTask(el) {
        document.getElementById('modal-change').style.display = "flex"
        itemChanged = el.target.parentNode.parentNode.parentNode
        nameChanged = itemChanged.children[1].innerText
        document.getElementById('change-task').value = nameChanged
    }

    static changeTask(el) {
        let target = el.target
        let item = target.parentNode
        let newTask = item.children[1].value.toLowerCase()

        let nameList = document.getElementById('name-list').innerText.toLowerCase()

        if (newTask.length > 0) {
            let list = lists.filter((element => element.name === nameList))
            let taskDelete = list[0].tasks.filter((element => element.name === newTask && element.done == false))

            if (taskDelete.length < 1) {
                let arrTasks = list[0].tasks

                let index = arrTasks.findIndex(el => {
                    return el.name == nameChanged.toLowerCase() && el.done == itemChanged.children[0].children[0].checked
                })

                itemChanged.children[1].innerText = newTask
                arrTasks[index].name = newTask

                document.getElementById("change-task").value = ''
                document.getElementById("modal-change").style.display = "none"
                setLists()
            } else if (nameChanged.toLowerCase() === newTask) {
                alert("ESSE JÁ É O NOME DA ATUAL TAREFA!")
            } else {
                alert("JÁ EXISTE UMA TAREFA COM ESSE NOME QUE AINDA NÃO FOI FEITA!")
            }
        } else {
            alert('CAMPO VAZIO!')
        }
    }

    static openDeleteList() {
        document.getElementById("modal-delete").style.display = "flex"
    }

    static deleteList() {
        lists.splice(0, 1)
        setLists()
        window.location.href = '/'
    }

    static deleteTask(el) {
        let task = el.target.parentNode.parentNode.parentNode
        let tasks = document.getElementById("tasks")
        tasks.removeChild(task)

        let nameList2 = document.getElementById('name-list').innerText
        let nameList = nameList2.toLowerCase()

        let list = lists.filter((element => element.name === nameList))

        let nameTask = task.children[1].innerText.toLowerCase()
        let taskDelete = list[0].tasks.filter((element => element.name === nameTask))

        let arrTasks = list[0].tasks

        let index = arrTasks.findIndex(el => el == taskDelete[0])

        arrTasks.splice(index, 1)
        setLists()
        countTasksDone()
    }

    static closeList() {
        window.location.href = "/"
    }

    static windowToTop(el) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })

        setTimeout(() => {
            el.target.style.display = "none"
        }, 800)
    }

    static getLists() {
        let obj = JSON.parse(localStorage.getItem('x2h3D46jQz6'))
        if (obj) {
            obj.forEach(element => {
                lists.push(element)
            });
        }
    }

    static checkScroll() {
        let scroll = window.scrollY
        if (scroll > 0) {
            document.getElementById('click-to-top').style.display = "flex"
        } else if (scroll == 0) {
            document.getElementById('click-to-top').style.display = "none"
        }
    }
}
