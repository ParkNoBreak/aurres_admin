import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from 'axios';
import moment from 'moment'

const alerShow = (title, message, type = 'success') => {

    toastr.options = {
        // positionClass: positionClass,
        timeOut: 7000,
        // extendedTimeOut: extendedTimeOut,
        closeButton: true,
        // debug: debug,
        progressBar: true,
        // preventDuplicates: preventDuplicates,
        // newestOnTop: newestOnTop,
        // showEasing: showEasing,
        // hideEasing: hideEasing,
        // showMethod: showMethod,
        // hideMethod: hideMethod,
        // showDuration: showDuration,
        // hideDuration: hideDuration
    };

    if (type == 'success') {
        toastr.success(message, title);
    } else {
        toastr.error(message, title);
    }
    // toastr.info(message, title);
    // toastr.warning(message, title);
}

const apiHeader = () => {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj && obj.accessToken) {
        // axios.defaults.headers.common["x-access-token"] = obj.accessToken;
        axios.defaults.headers.common["Authorization"] = "Bearer "+obj.accessToken;
        // delete axios.defaults.headers.common["Authorization"];
    } else {
        return {}
    }
}

const removeHeaderToken = () => {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["x-access-token"];
}

const dateformat = (date) => {
    return moment(date).format('DD MMM, YYYY - h:m A')
}

export {alerShow, apiHeader, dateformat, removeHeaderToken};