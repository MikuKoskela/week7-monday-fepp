import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const JobListing = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      }
    };

    getJob();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Company:</strong> {job.company?.name}</p>
      <p><strong>Email:</strong> {job.company?.contactEmail}</p>
      <p><strong>Phone:</strong> {job.company?.contactPhone}</p>
    </div>
  );
};

export default JobListing;