import PopUp from "../../../component/popUp";
import React, { useState } from "react";
import SideAlert from "../../../component/sideAlert";
import error from "/src/assets/error.svg";

function SignUp({ createID, setCreateID, setIdstatus }) {
  const theme = "#7150B7";
  const btn = `px-4 mb-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-[${theme}]`;

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i <= 100; i++) {
    years.push(currentYear - i);
  }

  const Gender = ["Female", "Male", "Other"];

  // State variables for input values
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [misData, setmisData] = useState(false);

  // Function to close the side alert after 2 seconds
  const handleCloseSideAlert = () => {
    setTimeout(() => setmisData(false), 1500);
  };

  const submitHandeler = () => {
    if (firstName != "" && surname != "" && mobile != "" && password != "") {
      const userID = {
        firstName: firstName,
        lastName: surname,
        fullName: firstName + " " + surname,
        pass: password,
        mobile: mobile,
      };

      localStorage.setItem("userID", JSON.stringify(userID));
      setCreateID(false);
      setIdstatus(true);
    } else {
      setmisData(true);
      handleCloseSideAlert();
    }
  };
  // Reset input fields when createID is false
  React.useEffect(() => {
    if (!createID) {
      setFirstName("");
      setSurname("");
      setMobile("");
      setPassword("");
    }
  }, [createID]);

  return (
    <PopUp
      css={"w-[370px] md:w-[470px]"}
      Title={"Sign Up"}
      Click={createID}
      setClick={setCreateID}
      misData={misData}
      error={error}
      note={"fill all the information properly"}
      color={"bg-red-400"}
      Section={
        <>
          <p className="px-5 opacity-60 pt-1">It's quick and easy</p>
          <hr className="my-4 border" />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="px-5 flex flex-col"
          >
            <div className="flex gap-2">
              <input
                className={`${btn} py-2 mb-3 bg-gray-100 w-full`}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className={`${btn} py-2 mb-3 bg-gray-100 w-full`}
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>

            <input
              className={`${btn} py-2 mb-3 bg-gray-100 w-full`}
              type="text"
              placeholder="Mobile number or email address"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              className={`${btn} py-2 mb-3 bg-gray-100 w-full`}
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* date of birth */}
            <p className="font-light text-sm mb-1">Date of birth</p>
            <div className="flex gap-3 mb-3">
              <select className={`${btn} py-2 w-full`}>
                {dates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select className={`${btn} py-2 w-full`}>
                {months.map((month, index) => (
                  <option value={month} key={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select className={`${btn} py-2 w-full`}>
                {years.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* gender */}
            <p className="font-light text-sm">Gender</p>
            <div className="flex gap-3 mb-3">
              {Gender.map((item, index) => (
                <label
                  htmlFor={item}
                  key={index}
                  className={`${btn} flex py-2 justify-between items-center gap-3 w-full`}
                >
                  <label htmlFor={item}>{item}</label>
                  <input type="radio" name="gender" id={item} />
                </label>
              ))}
            </div>

            {/* terms and conditions */}
            <p className="text-[12px] font-thin">
              People who use our service may have uploaded your contact
              information to Friendzone. Learn more.
            </p>

            <p className="text-[12px] font-thin py-2">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>

            <button
              onClick={submitHandeler}
              className={`${btn}  mt-5 py-1 px-10 bg-[#3eb227] hover:bg-[#3ca626] font-bold text-xl text-white`}
            >
              Sign Up
            </button>
          </form>
        </>
      }
    />
  );
}

export default SignUp;
