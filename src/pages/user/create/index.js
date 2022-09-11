import Layout from "@/components/layout";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getSession } from "next-auth/react";

export default function CreateStudent() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [gender, setGender] = useState("Male");
  const [error, setError] = useState(null);

  const onChange = (e) => setProfilePhoto(e.target.files[0]);
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
    console.log(e.target.value);
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
    fd.append("photo", profilePhoto);
    fd.append("gender", gender);
    try {
      const response = await fetch(`${process.env.API_URL}/student`, {
        method: "POST",
        body: fd,
      });
      const json = await response.json();

      if (response.status > 400) {
        throw new Error(json.error);
      } else {
        alert(" Student Data Saved Successfully !");
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
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center">
                <img
                  src={
                    profilePhoto
                      ? URL.createObjectURL(profilePhoto)
                      : "/images/profile.svg"
                  }
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
                      placeholder="Enter your first name "
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
                      placeholder="Enter your last name "
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
                      placeholder="Enter your address"
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
                      defaultValue="Delhi"
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
                      placeholder="Enter your email "
                      required
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
                      defaultValue="Class X"
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
                    <button type="submit" className="btn btn-primary mt-4 mb-4">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
