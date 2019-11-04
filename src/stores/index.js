import UserStore from "./UserStore";
import JobStore from "./JobStore";
import { create } from 'mobx-persist';

const hydrate = create({
  storage: localStorage
});

const userStore = new UserStore();
const jobStore = new JobStore();

hydrate('user', userStore).then(() => {
    userStore.isHydrated = true;
});

export default { userStore, jobStore };