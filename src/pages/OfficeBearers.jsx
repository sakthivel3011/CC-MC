import React, { useState, useEffect } from 'react';
import '../assets/styles/OfficeBearers.css'; // Import your CSS styles



const OfficeBearers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [bearers, setBearers] = useState([]);

  // Sample data for office bearers
  useEffect(() => {
    const sampleData = [
      { id: 1, name: 'ANIKET M', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
      { id: 2, name: 'PRITHIVIRAJ B', position: 'EXECUTIVE MEMBER', department: 'MECH' },
      { id: 3, name: 'HEMALATHA S', position: 'EXECUTIVE MEMBER', department: 'IT' },
      { id: 4, name: 'KAVIDHARSHINI K S', position: 'EXECUTIVE MEMBER', department: 'MSC' },
      { id: 5, name: 'RAHUL RAMAN. A', position: 'EXECUTIVE MEMBER', department: 'MTS' },
      { id: 6, name: 'HIRITIK ROOSHAN V', position: 'EXECUTIVE MEMBER', department: 'MTS' },
      { id: 7, name: 'VASANTHAN B', position: 'EXECUTIVE MEMBER', department: 'MECH' },
      { id: 8, name: 'ELAKKIYA S', position: 'EXECUTIVE MEMBER', department: 'IT' },
      { id: 9, name: 'NAVIN M', position: 'EXECUTIVE MEMBER', department: 'IT' },
      { id: 10, name: 'VAISHNAVI ELANGO', position: 'EXECUTIVE MEMBER', department: 'IT' },
      { id: 11, name: 'DHARSHANA PRIYA V', position: 'EXECUTIVE MEMBER', department: 'EIE' },
      { id: 12, name: 'KIRUTHIKHA M', position: 'EXECUTIVE MEMBER', department: 'EIE' },
      { id: 13, name: 'RAGUL K B', position: 'EXECUTIVE MEMBER', department: 'EEE' },
      { id: 14, name: 'NISHA SHREE B', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 15, name: 'KAVINAYA J', position: 'EXECUTIVE MEMBER', department: 'ECE' },
      { id: 16, name: 'KAVIN KUMAR P', position: 'EXECUTIVE MEMBER', department: 'ECE' },
      { id: 17, name: 'DHIVASHINI J', position: 'EXECUTIVE MEMBER', department: 'ECE' },
      { id: 18, name: 'NITHISH.V.S.', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 19, name: 'THIRICHAND K', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 20, name: 'PRAHADHEESH S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 21, name: 'PRAHADHEESH S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 22, name: 'PAVIN R', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 23, name: 'SABARIRAM RAMPRAKASH PREMA', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 24, name: 'KAVIAMUDHAN K S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 25, name: 'THAYANAND V P', position: 'EXECUTIVE MEMBER', department: 'CSE' },
      { id: 26, name: 'SOUNDARYA B', position: 'EXECUTIVE MEMBER', department: 'CSD' },
      { id: 27, name: 'NAVASHREE P', position: 'EXECUTIVE MEMBER', department: 'CSD' },
      { id: 28, name: 'D.MALAVIKA', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
      { id: 29, name: 'BHAWYA R G', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
      { id: 30, name: 'VIJAYARAMAN M', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
      { id: 31, name: 'HARSHINI.D', position: 'EXECUTIVE MEMBER', department: 'BSC' },
      { id: 32, name: 'RITESH S', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 33, name: 'SANTHOSH P', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 34, name: 'DHANISHA P', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 35, name: 'SHANJEEVINI A S', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
      { id: 36, name: 'JANANI K', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
      { id: 37, name: 'DIVYA T', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
      { id: 38, name: 'BALAMANOJ N', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 39, name: 'NEDUMIDAL C', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 40, name: 'DEVASREE J', position: 'EXECUTIVE MEMBER', department: 'CT-UG' },
      { id: 41, name: 'ARUNKUMAR S', position: 'EXECUTIVE MEMBER', department: 'AUTO' },
      { id: 42, name: 'LAKSHANA S', position: 'EXECUTIVE MEMBER', department: 'BSC' },
      { id: 43, name: 'SEEMA', position: 'EXECUTIVE MEMBER', department: 'AIDS' },
      { id: 44, name: 'SRI ARCHANADEVI R', position: 'EXECUTIVE MEMBER', department: 'AIDS' },
      { id: 45, name: 'MANIVANNAN D', position: 'EXECUTIVE MEMBER', department: 'AIDS' },
      { id: 46, name: 'PRAGATHISH', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
      { id: 47, name: 'DIVYA SHREE M', position: 'EXECUTIVE MEMBER', department: 'BSC' },
      { id: 48, name: 'TANISHA HAFNAA H M', position: 'EXECUTIVE MEMBER', department: 'MSC' },
      { id: 49, name: 'GURUPRASATH S B', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
      { id: 50, name: 'KAMALESHWARAN AB', position: 'DOCUMENTATION TEAM', department: 'MECH' },
      { id: 51, name: 'ANJANA B', position: 'DOCUMENTATION TEAM', department: 'IT' },
      { id: 52, name: 'TEJASHRI P', position: 'DOCUMENTATION TEAM', department: 'MSC' },
      { id: 53, name: 'JAYARAJ M', position: 'DOCUMENTATION TEAM', department: 'CSE' },
      { id: 54, name: 'BOBBY MAGDALIN.S', position: 'DOCUMENTATION TEAM', department: 'CSE' },
      { id: 55, name: 'RITHANYA S', position: 'EVENT MANAGEMENT TEAM', department: 'CSE' },
      { id: 56, name: 'SUDHEEKSHA S', position: 'EVENT MANAGEMENT TEAM', department: 'AI-ML' },
      { id: 57, name: 'NISAR A', position: 'EVENT MANAGEMENT TEAM', department: 'IT' },
      { id: 58, name: 'VIJAYAKUMAR R', position: 'EVENT MANAGEMENT TEAM', department: 'MSC' },
      { id: 59, name: 'DEVAKI M', position: 'EVENT MANAGEMENT TEAM', department: 'EIE' },
      { id: 60, name: 'THARUN KISHOR C', position: 'EVENT MANAGEMENT TEAM', department: 'CHEM' },
      { id: 61, name: 'JOTHINA T', position: 'EVENT MANAGEMENT TEAM', department: 'CIVIL' },
      { id: 62, name: 'CHANDRU S', position: 'EVENT MANAGEMENT TEAM', department: 'CSD' },
      { id: 63, name: 'DHARNESH MG', position: 'EVENT MANAGEMENT TEAM', department: 'EEE' },
      { id: 64, name: 'MADHUMITHA U K', position: 'EVENT MANAGEMENT TEAM', department: 'ECE' },
      { id: 65, name: 'SATHYA PRIYA M', position: 'EVENT MANAGEMENT TEAM', department: 'CSD' },
      { id: 66, name: 'PREETHI S', position: 'EVENT MANAGEMENT TEAM', department: 'BSC' },
      { id: 67, name: 'NIVETHA G', position: 'EVENT MANAGEMENT TEAM', department: 'AI-DS' },
      { id: 68, name: 'ABHINAV K', position: 'MEDIA TEAM', department: 'CSE' },
      { id: 69, name: 'VINODH T', position: 'MEDIA TEAM', department: 'CSE' },
      { id: 70, name: 'GIRIDHARAN.B', position: 'MEDIA TEAM', department: 'MTS' },
      { id: 71, name: 'ROHIT .S.J', position: 'MEDIA TEAM', department: 'FT' },
      { id: 72, name: 'ANBUCHELVAN A', position: 'MEDIA TEAM', department: 'IT' },
      { id: 73, name: 'HARISH KANNAN N', position: 'MEDIA TEAM', department: 'CSE' },
      { id: 74, name: 'BHUVANESHWARANS', position: 'MEDIA TEAM', department: 'MECH' },
      { id: 75, name: 'FATHIM NISHA S', position: 'MEDIA TEAM', department: 'MCA' },
      { id: 76, name: 'MONIKA R J', position: 'ANCHORING', department: 'AI-DS' },
      { id: 77, name: 'SATHYAA S', position: 'ANCHORING', department: 'AI-DS' },
      { id: 78, name: 'RAMGANESH S', position: 'ANCHORING', department: 'EIE' },
      { id: 79, name: 'SUJITHA M K', position: 'ANCHORING', department: 'CSD' },
      { id: 80, name: 'ASWIKA V G', position: 'ANCHORING', department: 'MSC' },
      { id: 81, name: 'SANMUGA PRAGATHI S', position: 'ANCHORING', department: 'EEE' },
      { id: 82, name: 'NAVEENKUMAR R', position: 'WEB/POSTER DESIGNER', department: 'IT' },
      { id: 83, name: 'JAGATHEESHWARI L', position: 'WEB/POSTER DESIGNER', department: 'IT' },
      { id: 84, name: 'NITHIN D', position: 'WEB/POSTER DESIGNER', department: 'AI-ML' },
      { id: 85, name: 'ROSHINI M', position: 'WEB/POSTER DESIGNER', department: 'CSD' },
      { id: 86, name: 'SHANMUGA PRIYA S S', position: 'WEB/POSTER DESIGNER', department: 'CSE' },
      { id: 87, name: 'KAMALESHWARAN A', position: 'SYSTEM ADMIN', department: 'CSE' },
      { id: 88, name: 'DIVYADHARSHAN M S', position: 'SYSTEM ADMIN', department: 'ECE' },
      { id: 89, name: 'POORNIMA R K', position: 'SYSTEM ADMIN', department: 'AI-ML' },
      { id: 90, name: 'DHARSHINI.S.K', position: 'SYSTEM ADMIN', department: 'AI-DS' },
      { id: 91, name: 'MUTHU VENKATESH V', position: 'SYSTEM ADMIN', department: 'MECH' },
      { id: 92, name: 'SREYA R', position: 'SYSTEM ADMIN', department: 'CSE' },
      { id: 93, name: 'DHARUNYA R', position: 'SOCIAL MEDIA', department: 'CIVIL' },
      { id: 94, name: 'MOHAMMED FAZAL R', position: 'SOCIAL MEDIA', department: 'ECE' },
      { id: 95, name: 'NAVEEN P', position: 'SOCIAL MEDIA', department: 'AI-DS' },
      { id: 96, name: 'DHARSHINI K S', position: 'SOCIAL MEDIA', department: 'EIE' },
      { id: 97, name: 'KARTHIK R', position: 'SOCIAL MEDIA', department: 'CIVIL' },
      { id: 98, name: 'NAVEEN R', position: 'SOCIAL MEDIA', department: 'MECH' },
      { id: 99, name: 'LOGESH K', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
      { id: 100, name: 'SUDHIKSHA R', position: 'ADVISORY COMMITTEE', department: 'CHEM' },
      { id: 101, name: 'DEEPINI R', position: 'ADVISORY COMMITTEE', department: 'CIVIL' },
      { id: 102, name: 'C KAVITHA', position: 'ADVISORY COMMITTEE', department: 'FT' },
      { id: 103, name: 'ANANDH CHANDRU S', position: 'ADVISORY COMMITTEE', department: 'MECH' },
      { id: 104, name: 'SARVESH S', position: 'ADVISORY COMMITTEE', department: 'MTS' },
      { id: 105, name: 'KRITTIKA M', position: 'ADVISORY COMMITTEE', department: 'EIE' },
      { id: 106, name: 'KAVIYA S', position: 'ADVISORY COMMITTEE', department: 'IT' },
      { id: 107, name: 'BHUVANKUMAR V', position: 'ADVISORY COMMITTEE', department: 'MCA' },
      { id: 108, name: 'MADHUMITHA.V', position: 'ADVISORY COMMITTEE', department: 'EEE' },
      { id: 109, name: 'TAMIZHMARAN S', position: 'ADVISORY COMMITTEE', department: 'MECH' },
      { id: 110, name: 'LAKSITHA S', position: 'ADVISORY COMMITTEE', department: 'CSD' },
      { id: 111, name: 'MITHUN KISHORE S', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
      { id: 112, name: 'DHEEPISHA G', position: 'ADVISORY COMMITTEE', department: 'CSE' },
      { id: 113, name: 'PRAJESSH.P', position: 'ADVISORY COMMITTEE', department: 'MTS' },
      { id: 114, name: 'ELAKIYA A', position: 'ADVISORY COMMITTEE', department: 'EEE' },
      { id: 115, name: 'SUBBULAKSHMI C', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
      { id: 116, name: 'THEERTHAA S V', position: 'ADVISORY COMMITTEE', department: 'FT' },
      { id: 117, name: 'ARAVIND S', position: 'ADVISORY COMMITTEE', department: 'AIDS' },
      { id: 118, name: 'CHRISTANJALIN S.R', position: 'ADVISORY COMMITTEE', department: 'BSC' },
      { id: 119, name: 'MAHASHWIN V', position: 'SECRETARY', department: 'CSE' },
      { id: 120, name: 'KAVIN S ', position: 'TREASURER', department: 'AI-DS' },
    ];
    setBearers(sampleData);
  }, []);

    // Only show specified categories in this order
    const categories = [
        'SECRETARY',
        'TREASURER',
        'ADVISORY COMMITTEE',
        'SOCIAL MEDIA',
        'SYSTEM ADMIN',
        'WEB/POSTER DESIGNER',
        'ANCHORING',
        'MEDIA TEAM',
        'EVENT MANAGEMENT TEAM',
        'DOCUMENTATION TEAM',
        'EXECUTIVE MEMBER'
    ];

    // Only include bearers whose position matches one of the specified categories
    const filteredBearers = bearers.filter(bearer => {
        const positionUpper = bearer.position.toUpperCase();
        const allowedCategories = categories.map(c => c.toUpperCase());
        const matchesCategory = allowedCategories.includes(positionUpper);

        const matchesSearch = bearer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             bearer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             bearer.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || positionUpper === filter.toUpperCase();

        return matchesCategory && matchesSearch && matchesFilter;
    });

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
                    {categories.map(category => (
                        <button
                            key={category}
                            className={filter === category ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter(category)}
                        >
                            {category}
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