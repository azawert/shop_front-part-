import {getDeviceUrl, getRatingUrl} from "../helpers/getUrl";
import {authHost, host} from "./index";
import {toast} from "react-toastify";

export const getAllDevices = async (brandId, typeId, limit,page) => {
    const resp = await host.get(getDeviceUrl(), {
        params: {brandId, typeId, limit,page}
    })
    return resp.data
}

export const getSingleDevice = async (id) => {
    const resp = await host.get(getDeviceUrl() + `/${id}`)
    return resp.data
}

export const createNewDevice = async (data) => {
    try {
        const resp = await authHost.post(getDeviceUrl(), data)
        toast.success(`Device successfully created!`, {
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

export const updateRating = async (data) => {
    try {
        const resp = await authHost.post(getRatingUrl(), data)
        toast.success(`Rating updated!`, {
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
        toast.error(`${e.message}`, {
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