import {getAuthUrl, getCheckUrl, getRegUrl} from "../helpers/getUrl";
import {authHost, host} from "./index";
import {toast} from "react-toastify";

export const registration = async (data) => {
    try {
        const resp = await host.post(getRegUrl(), data)
        return resp.data
    } catch (e) {
        alert(e)
    }
}
export const checkAuth = async () => {
    try {
        const resp = await authHost.get(getCheckUrl())
        return resp.data
    } catch (e) {
        alert(e)
    }
}

export const login = async ({password, email}) => {
    try {
        const resp = await host.post(getAuthUrl(), {password, email, user: 'ADMIN'})
        toast.success('Successfully logged in! Wait 5 seconds and you will be redirected', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return resp.data
    } catch (e) {
        toast.error(e.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}


