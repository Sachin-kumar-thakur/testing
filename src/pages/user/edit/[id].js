import Layout from "@/components/layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { getSession } from "next-auth/react";

export default function EditStudent({ data }) {
  const [birthDate, setBirthDate] = useState(new Date());
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null);
  const [userDetail, setUserDeatils] = useState(null);
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    contact: "",
    email: "",
    school: "",
    class: "",
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (data) {
      setUserDeatils(data);
      setGender(data.gender);
      setProfilePhoto(data.photo);
      setBirthDate(new Date(data.birthDate));
      setUserData({
        fname: data.firstName,
        lname: data.lastName,
        address: data.address,
        city: data.city,
        zip: data.zip,
        state: data.state,
        contact: data.contact,
        email: data.email,
        school: data.schoolName,
        class: data.class,
      });
    }
  }, []);

  const onChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    return (
      today.getMonth() -
      birthDate.getMonth() +
      12 * (today.getFullYear() - birthDate.getFullYear())
    );
  };

  const onChangeValue = (e) => {
    setGender(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getAge(birthDate) < 60) {
      alert(
        "You are too young to use this awesome software. Age should be above 5 years !"
      );
      return;
    }
    const fd = new FormData(e.target);
    fd.append("dob", birthDate);
    fd.append("photo", photo);
    fd.append("gender", gender);
    fd.append("fname", userData.fname);
    fd.append("lname", userData.lname);
    fd.append("address", userData.address);
    fd.append("city", userData.city);
    fd.append("zip", userData.zip);
    fd.append("contact", userData.contact);
    fd.append("email", userData.email);
    fd.append("school", userData.school);

    try {
      const response = await fetch(`${process.env.API_URL}/student/${id}`, {
        method: "PUT",
        body: fd,
      });
      const json = await response.json();

      if (response.status > 400) {
        throw new Error(json.error);
      } else {
        alert(" Student Updated Successfully !");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/student/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.status > 400) {
        throw new Error(json.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-12">
          {userDetail && (
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: 8, marginBottom: 16 }}
            >
              <div className="row justify-content-center">
                <div className="col-lg-4 text-center">
                  <img
                    src={profilePhoto ? profilePhoto : "/images/profile.svg"}
                    className="rounded mb-3"
                    width="200"
                    height="200"
                    objectfit="cover"
                    alt="profile"
                  />

                  <div className="text-center">
                    <input
                      type="file"
                      onChange={onChange}
                      className="form-control "
                    />
                  </div>
                </div>
                <div className="col-lg-8 align-items-center">
                  {error && <div className="error">{error}</div>}
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label htmlFor="fname" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="fname"
                        id="fname"
                        value={userData.fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label htmlFor="lname" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lname"
                        id="lname"
                        value={userData.lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        id="inputCity"
                        value={userData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="zip" className="form-label">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        id="zip"
                        value={userData.zip}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputState" className="form-label">
                        State
                      </label>
                      <select
                        id="inputState"
                        name="state"
                        className="form-select"
                        defaultValue={userData.state}
                      >
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Bihar">Bihar</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label htmlFor="contact" className="form-label">
                        Contact
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        id="contact"
                        value={userData.contact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={userData.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label htmlFor="school" className="form-label">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="school"
                        id="school"
                        value={userData.school}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputClass" className="form-label">
                        Class
                      </label>
                      <select
                        id="inputClass"
                        name="class"
                        className="form-select"
                        defaultValue={userData.class}
                      >
                        <option value="Class X">Class X</option>
                        <option value="Class XI">Class XI</option>
                        <option value="Class XII">Class XII</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">
                          Gender
                        </legend>
                        <div className="col-sm-10">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="gridRadios1"
                              value="Male"
                              onChange={onChangeValue}
                              checked={gender === "Male"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridRadios1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="gridRadios2"
                              value="Female"
                              onChange={onChangeValue}
                              checked={gender === "Female"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridRadios2"
                            >
                              Female
                            </label>
                          </div>
                          <div className="form-check disabled">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="gridRadios3"
                              value="Other"
                              disabled
                              onChange={onChangeValue}
                              checked={gender === "Other"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridRadios3"
                            >
                              Other
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-md-6 mb-2">
                      <label htmlFor="inputDate" className="form-label">
                        Birth Date
                      </label>

                      <DatePicker
                        className="form-control"
                        id="inputDate"
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="check"
                          id="gridCheck"
                          onChange={() => console.log("checked")}
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Agree with our terms and conditions !
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary mt-4 mb-4"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger mt-4 mb-4 ms-4"
                      >
                        Delete Student
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const id = context.params.id;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const response = await fetch(`${process.env.API_URL}/student/${id}`);
  const json = await response.json();

  return {
    props: { data: json.data },
  };
}
