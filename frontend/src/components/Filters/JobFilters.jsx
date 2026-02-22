import "../../Styles/JobFilters.css";

function JobFilters({ filters, setFilters, config, setPage }) {

  const handleChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    if (setPage) setPage(1);
  };

  const resetFilters = () => {
    const resetValues = {};
    config.forEach(field => {
      resetValues[field.name] = "";
    });

    setFilters(resetValues);
    if (setPage) setPage(1);
  };

  return (
    <div className="filters-container"> 

      {config.map(field => {

        if (field.type === "input") {
          return (
            <input
              key={field.name}
              className="filter-input"
              type="text"
              placeholder={field.placeholder}
              value={filters[field.name] || ""}
              onChange={(e) =>handleChange(field.name, e.target.value)}
            />
          );
        }

        if (field.type === "select") {
          return (
            <select
              key={field.name}
               className="filter-input"
              value={filters[field.name] || ""}
              onChange={(e) =>handleChange(field.name, e.target.value)}
            >
              <option value="">{field.defaultOption}</option>

              {field.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        }

        return null;
      })}

      <button className="reset-btn" onClick={resetFilters}>
        Reset Filters
      </button>

    </div>
  );
}

export default JobFilters;