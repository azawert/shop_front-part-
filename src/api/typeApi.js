import {authHost, host} from "./index";
import {getTypeUrl} from "../helpers/getUrl";
import {toast} from "react-toastify";

export const getAllTypes = async () => {
    const resp = await host.get(getTypeUrl())
    return resp.data
}

export const createNewType = async (data) => {
    try {
        const resp = await authHost.post(getTypeUrl(), data)
        toast.success('Type successfully created!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return resp.data
    } catch (e) {
        console.log(e)
        toast.error(e.response.data.message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

}