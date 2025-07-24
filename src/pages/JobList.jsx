import React, {useEffect, useState} from 'react'
import api from '../api/jobsoid';
import { useNavigate } from 'react-router-dom';
import {Pointer, Search, X, MapPin, Building2, Variable} from 'lucide-react';
import '../styles/JobList.less';

const JobList = () => {

    // State Variables   
    const [jobs, setJobs] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [functions, setFunctions] = useState([]);
    const [filters, setFilters] = useState({search: '',department: '', location: '',function: ''});
    const [appliedFilters, setAppliedFilters] = useState({});
    const navigate= useNavigate();

    // To Fetch Data using API 
    useEffect(()=>{
        api.get('/departments').then(res => setDepartments(res.data));
        api.get('/locations').then(res => setLocations(res.data));
        api.get('/functions').then(res => setFunctions(res.data));
    }, []);
    
    useEffect(() => {
        const params = {};
        if (filters.search) params.q = filters.search;
        if (filters.department) params.dept = filters.department;
        if (filters.location) params.loc = filters.location;
        if (filters.function) params.fun = filters.function;
    
        api.get('/jobs', { params }).then(res => setJobs(res.data));
        setAppliedFilters({ ...filters });
      }, [filters]);

    const clearFilter = (key) => {
        const newFilters = { ...filters, [key]: ''};
        setFilters(newFilters);
    }

    const getFilterLabel = (key, value) => {
      if (!value) return null;
      let source = [];
      if (key === 'department') source = departments;
      if (key === 'location') source = locations;
      if (key === 'function') source = functions;
      const match = source.find(item => item.id === parseInt(value));
      return match?.title || value;
    };

    const handleChange = (e)=>{
        setFilters({ ...filters, [e.target.name]: e.target.value});
    };

    const clearAll = () => {
        setFilters({ search: '', department: '', location: '', function: ''});
    }

  return (
    <div className='job-list'>
      <div className='job-list__search'>
        <h1 style={{ marginLeft: '20px' }}>Job Openings</h1>
        <div className='job-list__search-bar'>
            <input type="text" name='search' value={filters.search} placeholder='Search your job' onChange={handleChange}/> <Search id='icon-search' size={22} />
        </div>
        <div className='job-list__search_department'>
            <select name="department" onChange={handleChange} value={filters.department}>
                <option value="">Department</option>
                {departments.map(dep => <option value={dep.id} key={dep.id}>{dep.title}</option>)}
            </select>
            <select name="location" onChange={handleChange} value={filters.location}>
                <option value="">Location</option>
                {locations.map(loc => <option value={loc.id} key={loc.id}>{loc.title}</option>)}
            </select>
            <select name="function" onChange={handleChange} value={filters.function}>
                <option value="">Function</option>
                {functions.map(fun => <option value={fun.id} key={fun.id}>{fun.title}</option>)}
            </select>
        </div>
      </div>
      {Object.entries(filters).filter(([_, val]) => val).length > 0 && (
        <div className='job-list_Filters'>
          <div>
            {Object.entries(filters).map(([key, val]) => (
              val ? (
                <div className='job-list_Filters-section'>
                  <span key={key} style={{ background: '#ffffff', padding: '5px 10px', borderRadius: '20px' }}>
                  {getFilterLabel(key, val)}
                  <X size={14} style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => clearFilter(key)} />
                </span>
                </div>
              ) : null
            ))}
          </div>
          <div>
          <span onClick={clearAll} style={{ cursor: 'pointer', color: 'green', float: 'right' }}>Clear All</span>
          </div>
        </div>
      )}
      <div>
      <div className="job-list_groups" >
        {departments.map(dep => {
          const jobsInDept = jobs.filter(job => job.department?.id === dep.id);
          if (!jobsInDept.length) return null;

          return (
            <div key={dep.id} className="job-list_groups_department">
              <h2 style={{ borderBottom: '2px solid #3b5bfd', display: 'inline-block' }}>{dep.title}</h2>
              {jobsInDept.map(job => (
                <div key={job.id} className="job-list_groups_department_job-card" >
                  <div className="job-list_groups_department_job-card_info" style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                  <h3>{job.title}</h3>
                  <p>
                    <Building2 size={14} style={{ marginRight: '5px' }} />{job.department?.title}
                    <MapPin size={14} style={{ margin: '0 5px' }} />{job.location?.title}
                    <span style={{ background: '#e8e9f0', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}>{job.type?.toUpperCase()}</span>
                  </p>
                  </div>
                  <div className="job-list_groups_department_job-card_actions" >
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #3b5bfd', padding: '4px 12px', borderRadius: '20px', color: '#3b5bfd', textDecoration: 'none' }}>Apply</a>
                    <button onClick={() => navigate(`/jobs/${job.id}`)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  )
}

export default JobList
