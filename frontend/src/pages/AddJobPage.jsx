import {useState} from 'react'


const AddJobPage = () => {
  const [jobTitle, setJobTitle] = useState("")
  const [jobType, setJobType] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  const addJob = async() => {

    try{
    const response = await fetch("/api/jobs",
      {method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify(
      {
        title: jobTitle,
        type: jobType,
        description: jobDescription,
        company:{
          name: companyName,
          contactEmail,
          contactPhone,
        }
        })
      }
     )
  
    if (!response.ok) {
      const errorText = await response.text(); 
      console.error("Failed to add job:", errorText);
      return;
    }
    const data = await response.json();
    console.log("Job added successfully:", data);
  } catch (error) {
    console.error("Error while adding job:", error);
  }
};



  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm called");
    addJob()
   
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select onChange={(e) => setJobType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button type="submit" >Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
