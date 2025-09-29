import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EditJobPage = () => {
  
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
  
    const [jobTitle, setJobTitle] = useState("")
    const [jobType, setJobType] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")

    const navigate = useNavigate();

  const updateJob = async(job) => {

    try{
    const response = await fetch("/api/jobs",
      {method:"PUT",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify(job),
      }
     )
  
    if (!response.ok) {
      const errorText = await response.text(); 
      console.error("Failed to update job:", errorText);
      return response.ok;
    }
    const data = await response.json();
    console.log("Job updated successfully:", data);
  } catch (error) {
    console.error("Error while updating job:", error);
    return false;
}
};


  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
        setJobTitle(data.title);
        setJobType(data.type);
        setJobDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };
       fetchJob();
  }, [id]);



  const submitForm = async(e) => {
    e.preventDefault();

    const updatedJob = {
        id,
        jobTitle,
        jobType,
        jobDescription,
        company:{
            name:companyName,
            contactEmail,
            contactPhone,
        }

    }

      const success = await updateJob(updatedJob);
    if (success) {
       toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } else {
       toast.error("Failed to update the job");
    }
   
  };

  return (
    <div className="create">
        <h2>Update Job</h2>
        {loading?(
            <p>Loading...</p>
        ):error ?(
            <p>{error}</p>
        ):(
        
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setJobType(e.target.value)}>
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
        )}
    </div>
  );
};

export default EditJobPage;
