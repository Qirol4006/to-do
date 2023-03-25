import {inject, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import axios from "axios";


export default function (){

//    region State
    const tasksList = ref([])
    const store = useStore()
    const dataLoaded = ref(false)
    const newTaskDialogShow = ref(false)
    const newTaskData = ref({name: '', description: '', isCompleted: false, listId: 0})
    const swal = inject('$swal')
    const editTaskDialog = ref(false)
    const deleteId = ref(0)
    let deleteDialogShow = ref(false)
    // endregion

    // region Directives
    onMounted(async () => {
        await getTasks()
    })
    watch(() => store.state.selectedList,
        async () => {
            await getTasks()
        })
    // endregion

    // region Methods
    async function getTasks(){
        dataLoaded.value = false
        const id = store.state.selectedList.toString()
        await axios.get('/task?listId=' + id).then(res => {
            tasksList.value = res.data
        })
        dataLoaded.value = true
    }

    async function saveTask(){
        newTaskData.value.listId = store.state.selectedList
        if (!newTaskData.value.name){
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Task name is not entered!',
            })
            return
        }

        await axios.post('/task', newTaskData.value).then(async () => {
            newTaskDialogShow.value = false
            newTaskData.value = {name: '', description: '', isCompleted: false, listId: 0}
            await getTasks()
        })
            .catch(err => {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data,
            })
        })
    }
    async function closeDialog() {
        newTaskDialogShow.value = false
        editTaskDialog.value = false
        await getTasks()
    }

    async function updateTask(data){
        await axios.post('/task/update', data).then(async () => {
            await getTasks()
        })
    }

    async function deleteTask(id){
        await axios.get('/task/del?id=' + id.toString())
            .then(async () => {
                deleteId.value = 0
                deleteDialogShow.value = false
                await getTasks()
            })
            .catch(error => {
                console.log(error.response.data)
            })

    }
    async function chekTask(task){
        task.isCompleted = !task.isCompleted
        await axios.post('/task/update', task).then(async () => {
            await getTasks()
        })
    }

    // endregion

    return{
    //     State
        tasksList,
        dataLoaded,
        newTaskDialogShow,
        newTaskData,
        editTaskDialog,
        deleteId,

    //     Methods
        saveTask,
        closeDialog,
        getTasks,
        updateTask,
        deleteTask,
        chekTask,
    }
}