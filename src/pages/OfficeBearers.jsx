import React, { useState, useEffect } from 'react';
import '../assets/styles/OfficeBearers.css'; // Import your CSS styles



const OfficeBearers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [bearers, setBearers] = useState([]);

  // Sample data for office bearers
  useEffect(() => {
    const sampleData = [
      { id: 1, name: 'John Smith', position: 'President', department: 'Computer Science' },
      { id: 2, name: 'Sarah Johnson', position: 'Vice President', department: 'Electrical Engineering' },
      { id: 3, name: 'Michael Brown', position: 'Secretary', department: 'Mechanical Engineering' },
      { id: 4, name: 'Emily Davis', position: 'Treasurer', department: 'Civil Engineering' },
      { id: 5, name: 'David Wilson', position: 'Event Coordinator', department: 'Computer Science' },
      { id: 6, name: 'Jennifer Lee', position: 'Public Relations', department: 'Electrical Engineering' },
      { id: 7, name: 'Robert Taylor', position: 'Technical Head', department: 'Mechanical Engineering' },
      { id: 8, name: 'Amanda Clark', position: 'Design Head', department: 'Civil Engineering' },
      { id: 9, name: 'Christopher Martinez', position: 'Marketing Head', department: 'Computer Science' },
      { id: 10, name: 'Jessica Anderson', position: 'Content Writer', department: 'Electrical Engineering' },
      { id: 11, name: 'Daniel Thomas', position: 'Web Developer', department: 'Mechanical Engineering' },
      { id: 12, name: 'Elizabeth White', position: 'Graphic Designer', department: 'Civil Engineering' },
      { id: 13, name: 'Matthew Harris', position: 'Social Media Manager', department: 'Computer Science' },
      { id: 14, name: 'Michelle Garcia', position: 'Volunteer Coordinator', department: 'Electrical Engineering' },
      { id: 15, name: 'Andrew Rodriguez', position: 'Faculty Advisor', department: 'Mechanical Engineering' },
      { id: 16, name: 'Stephanie Lewis', position: 'Alumni Coordinator', department: 'Civil Engineering' },
      { id: 17, name: 'Joshua Walker', position: 'Tech Support', department: 'Computer Science' },
      { id: 18, name: 'Nicole Hall', position: 'Documentation', department: 'Electrical Engineering' },
      { id: 19, name: 'Kevin Allen', position: 'Logistics', department: 'Mechanical Engineering' },
      { id: 20, name: 'Kimberly Young', position: 'Outreach', department: 'Civil Engineering' },
      { id: 21, name: 'Thomas King', position: 'Research Head', department: 'Computer Science' },
      { id: 22, name: 'Rachel Scott', position: 'Workshop Coordinator', department: 'Electrical Engineering' },
      { id: 23, name: 'Charles Green', position: 'Project Manager', department: 'Mechanical Engineering' },
      { id: 24, name: 'Samantha Adams', position: 'HR Manager', department: 'Civil Engineering' },
      { id: 25, name: 'Anthony Nelson', position: 'Finance Head', department: 'Computer Science' },
      { id: 26, name: 'Rebecca Carter', position: 'Creative Director', department: 'Electrical Engineering' },
      { id: 27, name: 'Benjamin Mitchell', position: 'Operations Head', department: 'Mechanical Engineering' },
      { id: 28, name: 'Victoria Perez', position: 'Quality Assurance', department: 'Civil Engineering' },
    ];
    setBearers(sampleData);
  }, []);

  // Filter bearers based on search term and department filter
  const filteredBearers = bearers.filter(bearer => {
    const matchesSearch = bearer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bearer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bearer.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || bearer.department === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Get unique departments for filter buttons
  const departments = [...new Set(bearers.map(bearer => bearer.department))];

return (
    <div className="office-bearers-page">
        <div className="office-bearers-container">
            <header data-aos="fade-down">
                <h1>Office Bearers - 2k25</h1>
                <p className="subtitle">Meet the dedicated team leading our organization forward</p>
            </header>

            <div className="search-filter-row">
                <div className="search-container" data-aos="fade-up" data-aos-delay="100">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name, position, or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-buttons" data-aos="fade-up" data-aos-delay="200">
                    <button
                        className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setFilter('all')}
                    >
                        All Departments
                    </button>
                    {departments.map(dept => (
                        <button
                            key={dept}
                            className={filter === dept ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter(dept)}
                        >
                            {dept}
                        </button>
                    ))}
                </div>
            </div>

            <div className="office-bearers-grid">
                {filteredBearers.length > 0 ? (
                    filteredBearers.map((bearer, index) => (
                        <div
                            key={bearer.id}
                            className="bearer-card"
                            data-aos="zoom-in"
                            data-aos-delay={index % 7 * 100}
                        >
                            <h3 className="bearer-name">{bearer.name}</h3>
                            <p className="bearer-position">{bearer.position}</p>
                            <span className="bearer-department">{bearer.department}</span>
                        </div>
                    ))
                ) : (
                    <div className="no-results" data-aos="fade-up">
                        No office bearers found matching your search.
                    </div>
                )}
            </div>
        </div>
        
    </div>
);
};

export default OfficeBearers;