import "../../Styles/JobFilters.css";
function JobFilters({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
  setPage
}){
const resetFilters =()=>{
  setSearch("");
    setLocation("");
    setJobType("");
    setPage(1); 
};

  return(
    <div className="filters-container">
        <input type="text" placeholder="Search Jobs.." value={search} onChange={(e)=>setSearch(e.target.value)}/>
     
     <select value={location} onChange={(e)=>setLocation(e.target.value)}>
        <option value="">All Locations</option>
        <option value="Remote">Remote</option>
     </select>

     <select value={jobType} onChange={(e)=>setJobType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Full-Time">Full-Time</option>
     </select>

     <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
    </div>
  );
}
export default JobFilters;