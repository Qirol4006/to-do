import {inject, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default function (){

    // region State
    let username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const name = ref('')
    const lastName = ref('')
    const swal = inject('$swal')
    const router = useRouter()
    const store = useStore()

    // endregion

    // region Methods

    async function login() {
        if (!username.value) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Username is not entered!',
            })
            return
        }
        if (!password.value || password.value.length < 4) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'The password was entered incorrectly!',
            })
            return
        }
        await axios.post('/login', {
            username: username.value,
            password: password.value
        }).then(async r => {
            localStorage.setItem("token", r.data)
        }).catch(() => {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Password or username wrong!',
            })
        })
        setTimeout(() => {router.push('/list'); }, 1000)
    }

    async function register(){
        if (!username.value) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Username is not entered!',
            })
            return
        }
        if (!lastName.value) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Lastname is not entered!',
            })
            return
        }
        if (!name.value) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'First name is not entered!',
            })
            return
        }
        if (!password.value || password.value.length < 4) {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'The password was entered incorrectly!',
            })
            return
        }
        if (password.value !== confirmPassword.value){
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Password not matches!',
            })
            return
        }

        await axios.post('/user/register', {
            name: name.value,
            username: username.value,
            lastName: lastName.value,
            password: password.value
        }).then(() => {
            router.push('/login')
        }).catch(e => {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data,
            })
        })
    }

    // endregion

    return {
        // State
        username,
        password,
        confirmPassword,
        name,
        lastName,

        // Methods
        login,
        register,
    }
}