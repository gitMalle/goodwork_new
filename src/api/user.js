import axios from "axios";
import ENV from "./env";
import qs from "qs";

const AUTH_ENDPOINT = "/api/auth";
const REGISTER_CUSTOMER = "/api/auth/register/customer";
const REGISTER_SUPPLIER = "/api/auth/register/supplier";
const VERIFY_SMS_ENDPOINT = "/api/auth/sms_verify";
const RESEND_CODE_ENDPOINT = "/api/auth/resend_code";
const EMAIL_VERIFY_ENDPOINT = "/api/auth/email_verify";
const RESEND_EMAIL_ENDPOINT = "/api/auth/resend_email_token";
const LOGIN_ENDPOINT = "/api/auth/login";
const GET_USER_DETAILS_ENDPOINT = "/api/auth/get_user_details";
const UPDATE_USER_DETAILS_ENDPOINT = "/api/auth/update";
const RESET_PASSWORD_ENDPOINT = "/api/auth/reset_password";
const SAVE_SERVICE_CITIES = "/api/service_cities/update";
const SAVE_SERVICE_DAYS = "/api/service_days/update";
const UPLOAD_DOCS = "/api/auth/upload_images/documents";
const UPLOAD_WORKS = "/api/auth/upload_images/works";
const GET_CATEGORIES = "/api/categories/get";
const UPDATE_SERVICES = "/api/services/update";
const GET_DAYS = "/api/service_days/get";
const GET_CITIES = "/api/service_cities/get";
const UPLOAD_PROFILE_PIC = "/api/auth/upload_image";

const RESET_PASSWORD_TOKEN_ENDPOINT = "/api/auth/reset_password_token";

function registerCustomer(name, emailorphone, type = null, password) {
  if (type === "phone") {
    const query = qs.stringify({
      name,
      phone: emailorphone,
      password,
      source: "web"
    });
    return axios.post(`${ENV}${REGISTER_CUSTOMER}`, query);
  } else {
    const query = qs.stringify({
      name,
      email: emailorphone,
      password,
      source: "web"
    });
    return axios.post(`${ENV}${REGISTER_CUSTOMER}`, query);
  }
}

function registerSupplier(
  name,
  emailorphone,
  type = null,
  businessclass,
  password
) {
  if (type === "phone") {
    const query = qs.stringify({
      name,
      phone: emailorphone,
      class: businessclass,
      password,
      source: "web"
    });
    return axios.post(`${ENV}${REGISTER_SUPPLIER}`, query);
  } else {
    const query = qs.stringify({
      name,
      email: emailorphone,
      password,
      class: businessclass,
      source: "web"
    });
    return axios.post(`${ENV}${REGISTER_SUPPLIER}`, query);
  }
}

function loginPhone(phone, password, type = "provider") {
  return axios.post(
    `${ENV}${LOGIN_ENDPOINT}`,
    qs.stringify({ phone, password, type })
  );
}

function loginEmail(email, password) {
  console.log(email + password);
  return axios.post(
    `${ENV}${LOGIN_ENDPOINT}`,
    qs.stringify({ email, password })
  );
}

function getUserDetails(token) {
  return axios.get(`${ENV}${GET_USER_DETAILS_ENDPOINT}`, {
    params: {
      token
    }
  });
}

function updateAreas(token, city_ids) {
  return axios.post(
    `${ENV}${SAVE_SERVICE_CITIES}?${qs.stringify({ token, city_ids })}`
  );
}

function updateDays(token, day_ids) {
  return axios.post(
    `${ENV}${SAVE_SERVICE_DAYS}?${qs.stringify({ token, day_ids })}`
  );
}

function resendEmailToken(email) {
  return axios.get(`${ENV}${RESEND_EMAIL_ENDPOINT}?${qs.stringify({ email })}`);
}

function updateDescription(token, description) {
  return axios.post(
    `${ENV}${UPDATE_USER_DETAILS_ENDPOINT}?${qs.stringify({
      token,
      description
    })}`
  );
}

function updateEmail(token, email) {
  return axios.post(`${ENV}${UPDATE_USER_DETAILS_ENDPOINT}?${qs.stringify({
    token,
    email
  })}`)
}

function updateUsername(token, name) {
  return axios.post(`${ENV}${UPDATE_USER_DETAILS_ENDPOINT}?${qs.stringify({
    token,
    name
  })}`)
}

function uploadDocument(token, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(
    `${ENV}${UPLOAD_DOCS}?${qs.stringify({ token })}`,
    formData,
    config
  );
}

function uploadPortfolioItem(token, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(
    `${ENV}${UPLOAD_WORKS}?${qs.stringify({ token })}`,
    formData,
    config
  );
}

function getCategories(token) {
  return axios.get(`${ENV}${GET_CATEGORIES}`, {
    params: {
      token
    }
  });
}

function updateCategories(token, services) {
  console.log(services);
  console.log(qs.stringify({ services }));
  return axios.post(
    `${ENV}${UPDATE_SERVICES}?${qs.stringify({ token, services })}`
  );
}

function verifySms(confirmation_token, sms_code) {
  return axios.post(
    `${ENV}${VERIFY_SMS_ENDPOINT}?${qs.stringify({
      confirmation_token,
      sms_code
    })}`
  );
}

function resendSms(phone) {
  return axios.post(
    `${ENV}${RESEND_CODE_ENDPOINT}?${qs.stringify({
      phone
    })}`
  );
}

function getCities(token) {
  return axios.get(`${ENV}${GET_CITIES}`, {
    params: {
      token
    }
  });
}

function getDays(token) {
  return axios.get(`${ENV}${GET_DAYS}`, {
    params: {
      token
    }
  });
}

function uploadProfilePic(token, pic) {
  const formData = new FormData();
  formData.append("file", pic);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(
    `${ENV}${UPLOAD_PROFILE_PIC}?${qs.stringify({ token })}`,
    formData,
    config
  );
}

export default {
  registerCustomer,
  registerSupplier,
  loginPhone,
  loginEmail,
  getUserDetails,
  updateAreas,
  updateDays,
  resendEmailToken,
  uploadDocument,
  getCategories,
  updateCategories,
  verifySms,
  resendSms,
  getCities,
  getDays,
  uploadProfilePic,
  updateDescription,
  updateEmail,
  updateUsername,
  uploadPortfolioItem
};
