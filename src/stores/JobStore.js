import { observable, action } from "mobx";
import JobsApi from "../api/jobs";
import store from "./";

export default class JobStore {
    @observable all_jobs = [];
    @observable jobs_pending = [];
    @observable jobs_confirmed = [];

    @observable loading = false;
    @observable errorText = "";
    @observable hasError = false;

    @action
    async getJobs() {
        this.hasError = false;
        this.errorText = "";
        this.loading = true;
        try {
            console.log(store.userStore.token);
            const res = await JobsApi.getJobs(store.userStore.token);
            console.log(res);
            if (res.data.success) {
                this.all_jobs = res.data.data;
            } else {
                this.hasError = true;
                this.errorText = res.data.message;
            }
        } catch (err) {
            console.log(err);
            this.hasError = true;
            this.errorText = "Something went wrong.";
        }
        this.loading = false;
    }
}
