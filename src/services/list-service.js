import {inject, onMounted, ref, watch} from "vue";
import axios from "axios";
import router from "@/router";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default function (){

//     region State
    const lists = ref([])
    const listInfo = ref({title: '', description: ''})
    let dataLoaded = ref(false)
    const store = useStore()
    const route = useRoute()
    const showDialog = ref(false)
    const editDialog = ref(false)
    const swal = inject('$swal')
    let editInfo = ref({})
    let deleteDialogShow = ref(false)
    let deleteId = ref(0)

    // endregion

    // region Hooks
    onMounted(async () => {
        await getAllLists()
        checkListId()
    })

    watch(() => router.currentRoute.value,
        () => {
            checkListId()
        })
    // endregion

    // region Methods
    async function getAllLists(){
        dataLoaded.value = false
        await axios.get('/list').then(res => {
            lists.value = res.data
        })
        dataLoaded.value = true
    }

    function checkListId(){
        const id = route.query.id
        store.commit('setSelectedList', parseInt(id))
    }

    async function saveList(){
        if (!listInfo.value.title){
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'List title is not entered!',
            })
            return
        }

        await axios.post('/list', listInfo.value).then(async () => {
            showDialog.value = false
            listInfo.value = {title: '', description: ''}
            await getAllLists()
        })
            .catch(err => {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data,
                })
            })
    }

    async function closeDialog(){
        showDialog.value = false
        await getAllLists()
    }

    async function closeEditDialog(){
        editDialog.value = false
        await getAllLists()
    }

    async function updateList(data){
        await axios.post('/list/update', data).then(async () => {
            await getAllLists()
        })
    }

    async function deleteList(id){
        await axios.get('/list/del?id=' + id.toString())
            .then(async () => {
                deleteId.value = 0
                deleteDialogShow.value = false
                await getAllLists()
            })
            .catch(error => {
                console.log(error.response.data)
            })

    }

    // endregion


    return{
    //     State
        lists,
        listInfo,
        dataLoaded,
        showDialog,
        editDialog,
        editInfo,
        deleteDialogShow,
        deleteId,

    //     Methods
        saveList,
        closeDialog,
        closeEditDialog,
        updateList,
        deleteList,
    }
}