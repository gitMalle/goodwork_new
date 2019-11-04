import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
import AuthApi from "../api/user";
import history from "../history";

export default class UserStore {
  @persist("object")
  @observable
  user = {};

  @observable email = "";
  @observable name = "";
  @observable emailorphone = "";
  @persist
  @observable
  isLoggedIn = false;
  @observable loading = false;
  @observable error = false;
  @observable errorText = "";
  @persist
  @observable
  token = "";
  @observable categories = [];
  @observable isSupplier = false;
  @observable service_cities = [];
  @observable service_days = [];
  @observable isHydrated = false;

  @observable
  registerInfo = {
    registerName: "",
    registerType: "",
    registerEmailOrPhone: "",
    registerPassword: "",
    registerAreas: [],
    registerDays: [],
    sms_token: "",
    document: {}
  };

  @action
  deleteErrors = () => {
    this.registerError = false;
    this.registerErrorText = "";
    this.errorText = "";
    this.error = false;
  };

  @action
  async register(cb, errCb) {
    this.deleteErrors();
    this.loading = true;
    this.registerError = false;
    let isSms = false;
    try {
      let res = null;
      if (/^09[0-9]+$/.test(this.registerInfo.registerEmailOrPhone)) {
        console.log("here");
        res = this.isSupplier
          ? await AuthApi.registerSupplier(
              this.registerInfo.registerName,
              this.registerInfo.registerEmailOrPhone,
              "phone",
              this.registerInfo.registerType,
              this.registerInfo.registerPassword
            )
          : await AuthApi.registerCustomer(
              this.registerInfo.registerName,
              this.registerInfo.registerEmailOrPhone,
              "phone",
              this.registerInfo.registerPassword
            );
        isSms = true;
      } else {
        console.log(this.registerInfo);
        const email = this.registerInfo.registerEmailOrPhone.toLowerCase();
        res = this.isSupplier
          ? await AuthApi.registerSupplier(
              this.registerInfo.registerName,
              email,
              "email",
              this.registerInfo.registerType,
              this.registerInfo.registerPassword
            )
          : await AuthApi.registerCustomer(
              this.registerInfo.registerName,
              email,
              "email",
              this.registerInfo.registerPassword
            );
        isSms = false;
      }
      console.log(res);

      if (isSms) {
        if (!res.data.result.includes(" ")) {
          this.sms_token = res.data.result;
          cb();
        } else {
          this.registerErrorText = "An error has occurred.";
          this.registerError = true;
        }
      } else {
        if (res.data.result) {
          cb();
        } else {
          this.registerErrorText = "An error has occurred.";
          this.registerError = true;
          errCb();
        }
      }
    } catch (e) {
      console.log(e);
      this.registerErrorText = "An error has occurred.";
      this.registerError = true;
      errCb();
    }
    this.loading = false;
  }

  @action
  async updateAreasReg(cb) {
    this.deleteErrors();
    this.loading = true;
    try {
      const cities = this.registerInfo.registerAreas.map(area => area.value);
      const res = await AuthApi.updateAreas(this.token, cities);
      if (res) {
        // Updated successfully;
        cb();
      } else {
        this.error = true;
        this.errorText = "Couldn't update service areas.";
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }
  @action
  async updateDaysReg(cb) {
    this.loading = true;
    try {
      const days = this.registerInfo.registerDays.map(day => day.value);
      const res = await AuthApi.updateDays(this.token, days);
      console.log(res);
      if (res.data.success) {
        // Updated successfully;
        cb();
      } else {
        this.error = true;
        this.errorText = "Couldn't update service days.";
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }

  @action
  async login(phoneoremail, password) {
    this.deleteErrors();
    this.loading = true;
    try {
      let res = null;
      if (/^09[0-9]+$/.test(phoneoremail)) {
        res = await AuthApi.loginPhone(phoneoremail, password);
      } else {
        const email = phoneoremail.toLowerCase();
        res = await AuthApi.loginEmail(email, password);
        console.log(res);
      }
      if (!res.data.result.includes(" ")) {
        // User login successful, information returned and saved in store
        this.token = res.data.result;
        await this.getUserDetails();
        await this.getDays();
        await this.getCities();
        console.log(this.token);
        console.log(this.user);
        history.push("/settings");
      } else {
        console.log("error");
        this.error = true;
        this.errorText = "No such user";
      }
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "No such user or password.";
    }
    this.loading = false;
  }

  @action
  async loginPostRegister(cb) {
    this.deleteErrors();
    this.loading = true;
    const emailorphone = this.registerInfo.registerEmailOrPhone;
    const password = this.registerInfo.registerPassword;
    try {
      let res = null;
      if (/^[0-9]*$/.test(emailorphone)) {
        res = await AuthApi.loginPhone(emailorphone, password);
      } else {
        const email = emailorphone.toLowerCase();
        res = await AuthApi.loginEmail(email, password);
        console.log(res);
      }
      if (!res.data.result.includes(" ")) {
        // User login successful, information returned and saved in store
        console.log(res);
        this.token = res.data.result;
        await this.updateAreasReg();
        await this.updateDaysReg();
        await this.getUserDetails();
        await this.getDays();
        await this.getCities();
        cb();
      } else {
        this.error = true;
        this.errorText = " Did you confirm your email?";
      }
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Did you confirm your email?";
    }
    this.loading = false;
  }

  @action
  async resendEmailToken() {
    console.log("resend");
    this.deleteErrors();
    this.loading = true;
    const email = this.registerInfo.registerEmailOrPhone;
    try {
      const res = await AuthApi.resendEmailToken(email);
      if (res.data.result) {
        // Resend Successful
        // Set message maybe?
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async resendSms() {
    this.deleteErrors();
    this.loading = true;
    const phone = this.registerInfo.registerEmailOrPhone;
    try {
      const res = await AuthApi.resendSms(phone);
      if (res.data.result) {
        // Resend Successful
        // Set message maybe?
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async verifySms(code) {
    this.deleteErrors();
    this.loading = true;
    const phone = this.registerInfo.registerEmailOrPhone;
    try {
      const res = await AuthApi.verifySms(this.registerInfo.sms_token, code);
      if (res.data.result) {
        // Resend Successful
        // Set message maybe?
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async uploadDocuments() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.uploadDocument(
        this.token,
        this.registerInfo.document
      );
      console.log(res);
      if (res.data.result.preview_path) {
        // cb();
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async uploadDocumentsTwo(file) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.uploadDocument(
        this.token,
        file
      );
      console.log(res);
      if (res.data.result.preview_path) {
        // cb();
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async uploadPortfolioItem(item) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.uploadPortfolioItem(this.token, item);
      console.log("Uploaded item");
      console.log(res);
      if (res.data.result.preview_path) {
        // cb();
        this.getUserDetails();
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @action
  async getCategories() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.getCategories(this.token);
      console.log("Categories");
      console.log(res);
      if (res.data.success) {
        this.categories = res.data.data;
      } else {
        this.error = true;
        this.errorText = "An error has occurred.";
      }
    } catch (e) {
      console.log(e);
      this.errorText = "An error has occurred.";
    }
    this.loading = false;
  }

  @computed
  get getCheckedCats() {
    let checkedCats = [];
    this.categories.forEach(cat => {
      if (cat.children.length > 0) {
        const checked = cat.children.filter(obj => obj.checked);
        checkedCats = checkedCats.concat(checked);
        cat.children.forEach(cat2 => {
          if (cat2.children.length > 0) {
            const checked2 = cat2.children.filter(obj => obj.checked);
            checkedCats = checkedCats.concat(checked2);
          }
        });
      }
    });
    return checkedCats.map(cat => {
      return {
        id: cat.id
      };
    });
  }

  @action
  checkCat(i, o) {
    if (this.categories[i].children[o].checked !== undefined) {
      console.log(this.categories[i].children[o]);
      this.categories[i].children[o].checked = !this.categories[i].children[o]
        .checked;
    } else {
      this.categories[i].children[o].checked = true;
    }
    console.log(this.categories[i].children[o].checked);
  }

  @action
  async updateServices(cb) {
    this.deleteErrors();
    if (this.getCheckedCats.length > 0) {
      this.loading = true;
      console.log(this.getCheckedCats);
      try {
        const res = await AuthApi.updateCategories(
          this.token,
          this.getCheckedCats
        );
        console.log(res);
        if (res.data.success) {
          cb();
        } else {
          this.error = true;
          this.errorText = "Couldn't update services.";
        }
      } catch (e) {
        console.log(e);
        this.errorText = "Couldn't update services.";
      }
      this.loading = false;
    }
  }

  @action
  async getDays() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.getDays(this.token);
      console.log(res);
      if (res.data.data.length > 0) {
        this.service_days = res.data.data.map(day => {
          return day.day.id;
        });
      }
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Couldn't get days.";
    }
    this.loading = false;
  }

  @action
  async getCities() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.getCities(this.token);
      console.log(res);
      if (res.data.data.length > 0) {
        this.service_cities = res.data.data.map(city => {
          return city.city.id;
        });
      }
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Couldn't get cities.";
    }
    this.loading = false;
  }

  @action
  getUserDetails = async () => {
    this.deleteErrors();
    this.loading = true;
    console.log("GET USER DETAILS");
    try {
      const userdetails = await AuthApi.getUserDetails(this.token);
      console.log(userdetails.data.result);
      this.user = userdetails.data.result[0];
      this.isLoggedIn = true;
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error fetching user deets";
    }
    this.loading = false;
  };

  @action
  async updateProfilePic(pic) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.uploadProfilePic(this.token, pic);
      console.log(res);
      await this.getUserDetails();
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating profile pic";
    }
    this.loading = false;
  }

  @action
  async updateDescription(description) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.updateDescription(this.token, description);
      console.log(res);
      await this.getUserDetails();
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating description";
    }
    this.loading = false;
  }

  @action
  async updateEmail(email) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.updateEmail(this.token, email);
      console.log(res);
      await this.getUserDetails();
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating email";
    }
    this.loading = false;
  }

  @action
  async updateName(name) {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.updateUsername(this.token, name);
      console.log(res);
      await this.getUserDetails();
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating name";
    }
    this.loading = false;
  }

  @action
  async updateDays() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.updateDays(
        this.token,
        this.service_days.slice()
      );
      console.log(res);
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating days";
    }
    this.loading = false;
  }

  @action
  async updateAreas() {
    this.deleteErrors();
    this.loading = true;
    try {
      const res = await AuthApi.updateAreas(
        this.token,
        this.service_cities.slice()
      );
      console.log(res);
    } catch (e) {
      console.log(e);
      this.error = true;
      this.errorText = "Error updating cities";
    }
    this.loading = false;
  }

  @computed
  get getGalleryImages() {
    let arr = [];
    console.log(this.user);
    this.user.works_images[0].assets.forEach((obj, index) => {
      const newObj = {
        src: obj.asset.path,
        thumbnail: obj.asset.path,
        thumbnailWidth: 50,
        thumbnailHeight: 50,
        caption: `${this.user.name}-${index + 1}`
      };
      arr.push(newObj);
    });
    return arr;
  }

  @computed
  get getDocuments() {
    let arr = [];
    this.user.document_images[0].assets.forEach((obj, index) => {
      const newObj = {
        src: obj.asset.path,
        thumbnail: obj.asset.path,
        thumbnailWidth: 50,
        thumbnailHeight: 50,
        caption: `${this.user.name}-${index + 1}`
      };
      arr.push(newObj);
    });
    return arr;
  }

  @action
  logout = () => {
    this.user = {};

    this.email = "";
    this.emailorphone = "";

    this.isLoggedIn = false;
    this.loading = false;
    this.error = false;
    this.errorText = "";
    this.token = "";
    this.categories = [];
    this.isSupplier = false;
    this.service_cities = [];
    this.service_days = [];

    this.registerInfo = {
      registerName: "",
      registerType: "",
      registerEmailOrPhone: "",
      registerPassword: "",
      registerAreas: [],
      registerDays: [],
      sms_token: "",
      document: {}
    };
  };
}
