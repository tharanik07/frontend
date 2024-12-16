import React,{useState} from "react";
function App() { 

  const[formData,setFormData] = useState({
    firstname:"",
    lastname:"",
    employeeid:"",
    email:"",
    phoneno:"",
    department:"",
    doj:"",
    role:"",
  });

  const[error,setError] = useState({});

  const handleChange=(e)=>{
    const {name,value} = e.target;

    setFormData((prevFormData)=>({
      ...prevFormData,
      [name]:value,
    }));

    setError((prevError)=>({
      ...prevError,
      [name]:undefined,
    }));

  }


  const handleBlur=(e)=>{
    const {name,value} = e.target;

    setError((prevError)=>({
      ...prevError,
      [name]:validate(name,value),
    }));
  }

  const validate =(name,value)=>{
    let error;
    if(name === 'firstname'){
      if(!value){
        error = 'Required';
      }
    }

    if(name === 'lastname'){
      if(!value){
        error = 'Required';
      }
    }

    if(name === 'employeeid'){
      if(!value){
        error ='Required';
      }
      else if(!/[a-zA-Z]/.test(value)){
        error = 'Employee ID must contain only alphanumeric characters';
      }
      else if(!/^[a-zA-Z0-9]+$/.test(value)){
        error = 'Employee ID must contain at least one alphabetic character';
      }
      else if(value.length>10){
        error = 'Less than 10';
      }
    }


    if(name === 'email'){
      if(!value){
        error ='Required';
      }
      else if(!/^\S+@\S+.\S+$/.test(value)){
        error = 'Enter valid Email';
      }
    }

    if (name === 'phoneno') {
      if (!value) {
        error = 'Phone No is required';
      } else if (!/^\d+$/.test(value)) {
        error = 'Phone No must contain digits only';
      } else if (value.length !== 10) {
        error = 'Phone No must be exactly 10 digits';
      }
    }

    if(name === 'department'){
      if(!value){
        error = 'Required';
      }
    }
    if(name === 'doj'){
      if(!value){
        error = 'Required';
      }
    }
    if(name === 'role'){
      if(!value){
        error = 'Required';
      }
    }

    return error;

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await fetch("http://localhost:5001/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success");
      } else {
        if (data.error === "Duplicate entry for email") {
          setError((prevError) => ({
            ...prevError,
            email: "Email already exists",
          }));
        }
        if (data.error === "Duplicate entry for employee ID") {
          setError((prevError) => ({
            ...prevError,
            employeeid: "Email already exists",
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      employeeid: "",
      email: "",
      phoneno: "",
      department: "",
      doj: "",
      role: "",
    });
    setError({});
  };



  return (
    <div className="pl-[380px] pt-2">
      <div className="bg-white w-[500px] rounded-md shadow-lg border-2 border-clr ">
        <div className="flex flex-col align-center items-center pt-1 pb-2">
          <p className="font-semibold text-xl text-clr">Employee Details</p>
        </div>
        <form onSubmit={handleSubmit} className="pt-2 px-10">

          <div className="flex flex-row gap-x-7 pb-2">

            <div className="">
              <label className="block pb-2">FirstName:</label>
              <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
                className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg"
              />
              {error.firstname && (<div><p className="text-red-500">{error.firstname}</p></div>)}
            </div>

            <div>
              <label className="block pb-2">LastName:</label>
              <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
                className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg"
              />
              {error.lastname && (<div><p className="text-red-500">{error.lastname}</p></div>)}
            </div>
          </div>

          <div className="pb-1">
            <label className="block pb-3">Employee ID:</label>
            <input
             type="text"
              name="employeeid"
             value={formData.employeeid}
             onChange={handleChange}
             onBlur={handleBlur}
            className='w-[300px] px-4 py-2 border border-gray-300 rounded-lg'
            />
            {error.employeeid && (<div><p className="text-red-500">{error.employeeid}</p></div>)}
          </div>

          <div className="pb-1">
            <label className="block pb-2">Email</label>
            <input
            type="text"
            name="email"
           value={formData.email}
           onChange={handleChange}
           onBlur={handleBlur}
            className='w-[300px] px-4 py-2 border border-gray-300 rounded-lg'
            />
            {error.email && (<div><p className="text-red-500">{error.email}</p></div>)}
          </div>

          <div className="pb-2">
            <label className="block pb-2">Phone No:</label>
            <input
            type="text"
            name="phoneno"
           value={formData.phoneno}
           onChange={handleChange}
           onBlur={handleBlur}
            className='w-[300px] px-4 py-2 border border-gray-300 rounded-lg'
            />
            {error.phoneno && (<div><p className="text-red-500">{error.phoneno}</p></div>)}
          </div>

          <div className="flex flex-row gap-x-7 pb-2">

            <div className="">
              <label className="block pb-2">Department:</label>
              <select
              type="text"
              name="department"
             value={formData.department}
             onChange={handleChange}
             onBlur={handleBlur}
                className="w-[200px] px-1 py-2 border border-gray-300 rounded-lg"
              >
                  <option value="" disabled selected>Select the Department</option>
                  <option >HR</option>
                  <option >Manager</option>
                  <option >Marketing</option>
                  <option >Select the Department</option>

              </select>
              {error.department && (<div><p className="text-red-500">{error.department}</p></div>)}
            </div>

            <div>
              <label className="block pb-2">Date of Joining:</label>
              <input
                type="date"
                name="doj"
                value={formData.doj}
                onChange={handleChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split("T")[0]}
                className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg"
              />
               {error.doj && (<div><p className="text-red-500">{error.doj}</p></div>)}
            </div>
          </div>

          <div className="pb-4">
            <label className="block pb-2">Role:</label>
            <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className='w-[300px] px-4 py-2 border border-gray-300 rounded-lg'
            />
             {error.role && (<div><p className="text-red-500">{error.role}</p></div>)}
          </div>

          <div className="flex flex-row gap-x-10 pl-28 pb-4">
            <div className="bg-green-600 rounded-lg hover:bg-green-400">
            <button type="submit" className="text-white px-2 py-1">Submit</button>
            </div>
            <div className="bg-red-600 rounded-lg hover:bg-red-400">
            <button type="button" onClick={handleReset} className="text-white px-2 py-1">Reset</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default App;
