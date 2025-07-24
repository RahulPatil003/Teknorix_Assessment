import React, { useEffect, useState } from 'react';
import { MapPin, Building2, Linkedin, Facebook, Twitter } from 'lucide-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/jobsoid';
import '../styles/JobDetails.less';

const JobDetails = () => {
  // State Variables
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/jobs/${id}`;
  // To Fetch data using API 
  useEffect(()=>{
    api.get(`/jobs/${id}`).then(res =>{
      const currentJob = Array.isArray(res.data) ? res.data[0] : res.data;
      setJob(currentJob);
      if(currentJob?.department?.id){
        api.get('/jobs', {params: {dept: currentJob.department.id} })
          .then(j => setRelatedJobs(j.data.filter(jd => jd.id !== currentJob.id)));
      }
    }).catch(err => console.error('Error fetching job:', err));
  }, [id]);

  if (!job) return <p>Loading......</p>

  return (
    <div className="job-Details">
      <div className="job-Details__Title">
        <div className="job-Details__Title-info">
          <p><h3>{job.department?.title} Department At Teknorix Systems Goa</h3></p>
          <h1>{job.title}</h1>
          <p className='job-Details__Title-info_details'>
            <span><Building2 size={14} /> {job.department?.title} </span>
            <span><MapPin size={14}/>  {job.location?.title } </span>
            <span style={{ background: '#e8e9f0', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}>{job.type?.toUpperCase()}</span>
          </p>
          <span><a href={job.applyUrl} target='_blank' rel='noopener noreferrer' style={{ border: '1px solid #3b5bfd', padding: '8px 16px', backgroundColor: '#3b5bfd' , borderRadius: '20px', color: '#ffffff', textDecoration: 'none' }}>Apply</a></span>
        </div>
      </div>
        
     <div className='job-Details__Container'>
     <div className="job-Details__Container-1">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>

      <div className='job-Details__Container-2'>
      <div className='job-Details__Container-2-Other_openings'>
        <h4>OTHER JOB OPENINGS</h4>
        {relatedJobs.map(j => (
          <div key={j.id}>
            <p><a href={job.applyUrl} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none' }}>{j.title}</a></p>
            <p style={{ display: 'flex', alignItems: 'center',  gap: '5px'}}><Building2 /> {j.department?.title || 'Department'} <MapPin /> {j.location?.title || 'Location'}</p>
          </div>
        ))}
      </div>
      <div className='job-Details__Container-2-Job_sharing'>
        <h4>SHARE JOB OPENINGS</h4>
        <div className='job-Details__Container-2-Job_sharing_icons'>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"><Facebook /></a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer"><Linkedin /></a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check this job out!`} target="_blank" rel="noopener noreferrer"><Twitter /></a>
        </div>
      </div>
      </div>
     </div>
    </div>
  )
}

export default JobDetails
