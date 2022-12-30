import {authHost, host} from "./index";
import {getBrandUrl} from "../helpers/getUrl";
import {toast} from "react-toastify";

export const getAllBrands = async () => {
    const resp = await host.get(getBrandUrl())
    return resp.data
}
export const getSingleBrand = async (id) => {
    const resp = await host.get(getBrandUrl() + `/${id}`)
    return resp.data
}

export const createNewBrand = async (data) => {

    try {
        const resp = await authHost.post(getBrandUrl(), data)
        toast.success('Brand successfully created!', {
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