import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  
const deleteJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to delete job:", errorText);
        return;
      }
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }

    }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-preview" key={job.id}>
          <Link to={`/jobs/${job.id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company: {job.company?.name}</p>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobListings;