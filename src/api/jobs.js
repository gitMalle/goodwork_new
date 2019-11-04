import axios from "axios";
import ENV from "./env";

const JOBS_ENDPOINT = "/api/jobs/get";
const JOBS_LIST_ENDPOINT = "/api/jobs/get";

function getJobs(token) {
    return axios.get(`${ENV}${JOBS_LIST_ENDPOINT}`, {
        params: token
    });
}

function getJobDetails(refId) {
    return axios.get(`${ENV}${JOBS_ENDPOINT}`, {
        params: refId
    });
}

export default {
    getJobs,
    getJobDetails
};
