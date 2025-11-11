import React, { useState, useEffect } from 'react';
import '../assets/styles/OfficeBearers.css';

const OfficeBearers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('ALL');
    const [bearers, setBearers] = useState([]);

    // Sample data for office bearers including the new positions
    useEffect(() => {
        const sampleData = [
            // Secretaries
            { id: 200, name: 'MAHASHWIN V', position: 'SECRETARY', department: 'CSE' },
            
            // Joint Secretaries
            { id: 131, name: 'SUDHARSAN M', position: 'JOINT SECRETARY', department: 'MECH' },
            { id: 132, name: 'KRISHNAKUMAR N', position: 'JOINT SECRETARY', department: 'AI-ML' },
            { id: 133, name: 'AJAYKUMAR P', position: 'JOINT SECRETARY', department: 'CIVIL' },
            { id: 134, name: 'HARISHREE L G', position: 'JOINT SECRETARY', department: 'MSC' },
            { id: 142, name: 'SANJAY S', position: 'JOINT SECRETARY', department: 'MTS' },
            
            // Additional Secretaries
            { id: 135, name: 'DIVYA BALA R', position: 'ADDITIONAL SECRETARY', department: 'FT' },
            { id: 136, name: 'MARIA SUBIKSHA S', position: 'ADDITIONAL SECRETARY', department: 'AI-DS' },
            { id: 137, name: 'ADITHYA A', position: 'ADDITIONAL SECRETARY', department: 'MECH' },
            { id: 138, name: 'GURUPRASATH R', position: 'ADDITIONAL SECRETARY', department: 'BSC' },
            { id: 139, name: 'JAI PRASAANTH L', position: 'ADDITIONAL SECRETARY', department: 'EIE' },
            { id: 140, name: 'RAGAVI.P', position: 'ADDITIONAL SECRETARY', department: 'ECE' },
            { id: 141, name: 'AISHWARYA KARUPPUCHAMY', position: 'ADDITIONAL SECRETARY', department: 'CSE' },
            
            // Treasurers
            { id: 201, name: 'KAVIN S', position: 'TREASURER', department: 'AI-DS' },
            
            // Joint Treasurers
            { id: 202, name: 'SAKTHIVEL S', position: 'JOINT TREASURER', department: 'AI-DS' },
            { id: 203, name: 'ARUL MURUGAN S', position: 'JOINT TREASURER', department: 'CSE' },
            { id: 204, name: 'SUDHARSHAN R', position: 'JOINT TREASURER', department: 'CHEM' },
            { id: 205, name: 'JESTIN A', position: 'JOINT TREASURER', department: 'CIVIL' },
            { id: 206, name: 'NITHESH KUMAR K', position: 'JOINT TREASURER', department: 'CSD' },
            
            
            // Additional Treasurers
            { id: 207, name: 'SANDHIYA T', position: 'ADDITIONAL TREASURER', department: 'ECE' },
            { id: 208, name: 'KOTHAISRI S', position: 'ADDITIONAL TREASURER', department: 'EEE' },
            { id: 209, name: 'ELAKIYA S', position: 'ADDITIONAL TREASURER', department: 'IT' },
            { id: 210, name: 'ROSHINNI S', position: 'ADDITIONAL TREASURER', department: 'CSE' },
            { id: 211, name: 'NATHIN M', position: 'ADDITIONAL TREASURER', department: 'MECH' },
            { id: 212, name: 'ROKITH NITHI A', position: 'ADDITIONAL TREASURER', department: 'MTS' },
            
            // Executive Members
            { id: 1, name: 'NAGUL KRISHNA S', position: 'EXECUTIVE MEMBER', department: 'MTS' },
            { id: 2, name: 'BHUSHAAN M', position: 'EXECUTIVE MEMBER', department: 'MTS' },
            { id: 3, name: 'Suganth G', position: 'EXECUTIVE MEMBER', department: 'MTS' },
            { id: 4, name: 'REKHA M', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
            { id: 5, name: 'GAYATHRI. S', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
            { id: 6, name: 'MOHAMED AASHIQ M', position: 'EXECUTIVE MEMBER', department: 'MSC' },
            { id: 7, name: 'ARJUN V', position: 'EXECUTIVE MEMBER', department: 'MSC' },
            { id: 8, name: 'HARINEE K R', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 9, name: 'THAMYA P', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 10, name: 'A KERLIN REX', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 11, name: 'ROSHIKA J R', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 12, name: 'Adhirai M K', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 13, name: 'Tamilmalar S', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 14, name: 'P Nithyashree', position: 'EXECUTIVE MEMBER', department: 'EIE' },
            { id: 15, name: 'ANUSHRI N', position: 'EXECUTIVE MEMBER', department: 'EIE' },
            { id: 16, name: 'AARTHI', position: 'EXECUTIVE MEMBER', department: 'EIE' },
            { id: 17, name: 'Mohammed Shahin', position: 'EXECUTIVE MEMBER', department: 'EIE' },
            { id: 18, name: 'NAGARJUN P', position: 'EXECUTIVE MEMBER', department: 'EEE' },
            { id: 19, name: 'SRI NANDHINI', position: 'EXECUTIVE MEMBER', department: 'EEE' },
            { id: 20, name: 'AARATHANA M', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
            { id: 21, name: 'JIEVA M', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
            { id: 22, name: 'POOJA SRI G', position: 'EXECUTIVE MEMBER', department: 'AUTO' },
            { id: 23, name: 'DEEPIHAA A', position: 'EXECUTIVE MEMBER', department: 'AUTO' },
            { id: 24, name: 'HEMASHREE A', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 25, name: 'M.GEETHA SRI', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 26, name: 'SWATHI K K', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 27, name: 'SUDESHNA KR', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 28, name: 'RITHANYAA V N', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 29, name: 'Dhanusya T', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 30, name: 'PRITHIHA SRI P', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 31, name: 'LAKSHANAGANESAR', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 32, name: 'Lekkala tharini', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 33, name: 'HARSHITHA R', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 34, name: 'DHARANEESH S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 35, name: 'AMIRTHAVARSHNI.D', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 36, name: 'INIYA SS', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 37, name: 'NADHIN P', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 38, name: 'Tanisha G', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 39, name: 'Madhumitha R', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 40, name: 'NITHEESH .A.S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 41, name: 'SIVA SARVESH S', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 42, name: 'SACHIN A', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 43, name: 'SWETHA I', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 44, name: 'KARUNYA SRI C', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 45, name: 'JOSHITHA GAWRI B', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 46, name: 'DHANANAANDHAN S', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 47, name: 'RASHWANTH.M', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 48, name: 'Sanjay Kumar.U', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 49, name: 'DHANA SRI A', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 50, name: 'MEHAA GANESH', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 51, name: 'RAJASHREE P', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 52, name: 'Sakthi K', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 53, name: 'HARSHAVARTHINI A', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 54, name: 'BARINISTHA V', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 55, name: 'VIMAL M', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 56, name: 'R.DURGA DEVI', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
            { id: 57, name: 'SHREYA S', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
            { id: 58, name: 'Vishal k', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
            { id: 59, name: 'ROHIT S', position: 'EXECUTIVE MEMBER', department: 'MECH' },
            { id: 60, name: 'Jane Silvia E', position: 'EXECUTIVE MEMBER', department: 'MECH' },
            { id: 61, name: 'S.SUJITHA', position: 'EXECUTIVE MEMBER', department: 'MECH' },
            { id: 62, name: 'ANUSHYA R', position: 'EXECUTIVE MEMBER', department: 'FT' },
            { id: 63, name: 'G.BHARANEETHARAN', position: 'EXECUTIVE MEMBER', department: 'FT' },
            { id: 64, name: 'Mohanapriyan S', position: 'EXECUTIVE MEMBER', department: 'FT' },
            { id: 65, name: 'AJAY K S', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 66, name: 'SRUTHI.B', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 67, name: 'R.G.SAKTHI SHRI', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 68, name: 'Varushini.S', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 69, name: 'A.Sivasadhana', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 70, name: 'RANJANI B', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            
            // Additional Executive Members (71-94)
            { id: 71, name: 'ARUN KUMAR S', position: 'EXECUTIVE MEMBER', department: 'MECH' },
            { id: 72, name: 'PRIYA DHARSHINI K', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 73, name: 'GOWTHAM RAJ M', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 74, name: 'SNEHA PRIYA R', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 75, name: 'KARTHIK RAGHAVAN', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 76, name: 'DIVYA SHREE L', position: 'EXECUTIVE MEMBER', department: 'EEE' },
            { id: 77, name: 'MANIKANDAN P', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
            { id: 78, name: 'SUBHASHREE G', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
            { id: 79, name: 'VENKATESH KUMAR R', position: 'EXECUTIVE MEMBER', department: 'AI-ML' },
            { id: 80, name: 'KEERTHI VASAN S', position: 'EXECUTIVE MEMBER', department: 'CSD' },
            { id: 81, name: 'BHARATHI PRIYA M', position: 'EXECUTIVE MEMBER', department: 'FT' },
            { id: 82, name: 'DINESH KUMAR A', position: 'EXECUTIVE MEMBER', department: 'MSC' },
            { id: 83, name: 'KAVITHA RANI P', position: 'EXECUTIVE MEMBER', department: 'EIE' },
            { id: 84, name: 'SURYA PRAKASH K', position: 'EXECUTIVE MEMBER', department: 'BSC' },
            { id: 85, name: 'NITHYA SHREE D', position: 'EXECUTIVE MEMBER', department: 'AUTO' },
            { id: 86, name: 'RAMESH BABU S', position: 'EXECUTIVE MEMBER', department: 'MTS' },
            { id: 87, name: 'JANANI LAKSHMI R', position: 'EXECUTIVE MEMBER', department: 'CSE' },
            { id: 88, name: 'PRASANTH KUMAR M', position: 'EXECUTIVE MEMBER', department: 'ECE' },
            { id: 89, name: 'SATHYA MOORTHY G', position: 'EXECUTIVE MEMBER', department: 'IT' },
            { id: 90, name: 'DEEPIKA RANI L', position: 'EXECUTIVE MEMBER', department: 'AI-DS' },
            { id: 91, name: 'VIJAY ANAND K', position: 'EXECUTIVE MEMBER', department: 'EEE' },
            { id: 92, name: 'MEERA PRIYA S', position: 'EXECUTIVE MEMBER', department: 'CIVIL' },
            { id: 93, name: 'KIRAN KUMAR R', position: 'EXECUTIVE MEMBER', department: 'MECH' },
            { id: 94, name: 'LAVANYA DEVI M', position: 'EXECUTIVE MEMBER', department: 'CHEM' },
            
            { id: 401, name: 'KAMALESHWARAN AB', position: 'DOCUMENTATION TEAM', department: 'MECH' },
            { id: 402, name: 'ANJANA B', position: 'DOCUMENTATION TEAM', department: 'IT' },
            { id: 403, name: 'TEJASHRI P', position: 'DOCUMENTATION TEAM', department: 'MSC' },
            { id: 404, name: 'JAYARAJ M', position: 'DOCUMENTATION TEAM', department: 'CSE' },
            { id: 405, name: 'BOBBY MAGDALIN.S', position: 'DOCUMENTATION TEAM', department: 'CSE' },
            { id: 406, name: 'MANISH B L', position: 'DOCUMENTATION TEAM', department: 'AIDS' },
            { id: 407, name: 'RAMYA M', position: 'DOCUMENTATION TEAM', department: 'AIDS' },
            { id: 408, name: 'SAMVARDHIKA K', position: 'DOCUMENTATION TEAM', department: 'AIDS' },
            { id: 409, name: 'RITHANYA S', position: 'EVENT MANAGEMENT TEAM', department: 'CSE' },
            { id: 410, name: 'SUDHEEKSHA S', position: 'EVENT MANAGEMENT TEAM', department: 'AI-ML' },
            { id: 411, name: 'NISAR A', position: 'EVENT MANAGEMENT TEAM', department: 'IT' },
            { id: 412, name: 'VIJAYAKUMAR R', position: 'EVENT MANAGEMENT TEAM', department: 'MSC' },
            { id: 413, name: 'DEVAKI M', position: 'EVENT MANAGEMENT TEAM', department: 'EIE' },
            { id: 414, name: 'THARUN KISHOR C', position: 'EVENT MANAGEMENT TEAM', department: 'CHEM' },
            { id: 415, name: 'JOTHINA T', position: 'EVENT MANAGEMENT TEAM', department: 'CIVIL' },
            { id: 416, name: 'CHANDRU S', position: 'EVENT MANAGEMENT TEAM', department: 'CSD' },
            { id: 417, name: 'NITHIN M N', position: 'EVENT MANAGEMENT TEAM', department: 'MTS' },
            { id: 418, name: 'DHARNESH MG', position: 'EVENT MANAGEMENT TEAM', department: 'EEE' },
            { id: 419, name: 'MADHUMITHA U K', position: 'EVENT MANAGEMENT TEAM', department: 'ECE' },
            { id: 420, name: 'SATHYA PRIYA M', position: 'EVENT MANAGEMENT TEAM', department: 'CSD' },
            { id: 421, name: 'PREETHI S', position: 'EVENT MANAGEMENT TEAM', department: 'BSC' },
            { id: 422, name: 'NIVETHA G', position: 'EVENT MANAGEMENT TEAM', department: 'AI-DS' },
            { id: 423, name: 'PRITHIVIRAJ B', position: 'EVENT MANAGEMENT TEAM', department: 'MECH' },
            { id: 424, name: 'ABHINAV K', position: 'MEDIA TEAM', department: 'CSE' },
            { id: 425, name: 'VINODH T', position: 'MEDIA TEAM', department: 'CSE' },
            { id: 426, name: 'GIRIDHARAN.B', position: 'MEDIA TEAM', department: 'MTS' },
            { id: 427, name: 'ROHIT .S.J', position: 'MEDIA TEAM', department: 'FT' },
            { id: 428, name: 'ANBUCHELVAN A', position: 'MEDIA TEAM', department: 'IT' },
            { id: 429, name: 'HARISH KANNAN N', position: 'MEDIA TEAM', department: 'CSE' },
            { id: 430, name: 'BHUVANESHWARANS', position: 'MEDIA TEAM', department: 'MECH' },
            { id: 431, name: 'FATHIM NISHA S', position: 'MEDIA TEAM', department: 'MCA' },
            { id: 432, name: 'MONIKA R J', position: 'ANCHORING', department: 'AI-DS' },
            { id: 433, name: 'SATHYAA S', position: 'ANCHORING', department: 'AI-DS' },
            { id: 434, name: 'RAMGANESH S', position: 'ANCHORING', department: 'EIE' },
            { id: 435, name: 'SUJITHA M K', position: 'ANCHORING', department: 'CSD' },
            { id: 436, name: 'ASWIKA V G', position: 'ANCHORING', department: 'MSC' },
            { id: 437, name: 'SANMUGA PRAGATHI S', position: 'ANCHORING', department: 'EEE' },
            { id: 438, name: 'NAVEENKUMAR R', position: 'WEB/POSTER DESIGNER', department: 'IT' },
            { id: 439, name: 'JAGATHEESHWARI L', position: 'WEB/POSTER DESIGNER', department: 'IT' },
            { id: 440, name: 'NITHIN D', position: 'WEB/POSTER DESIGNER', department: 'AI-ML' },
            { id: 441, name: 'ROSHINI M', position: 'WEB/POSTER DESIGNER', department: 'CSD' },
            { id: 442, name: 'SHANMUGA PRIYA S S', position: 'WEB/POSTER DESIGNER', department: 'CSE' },
            { id: 443, name: 'KAMALESHWARAN A', position: 'SYSTEM ADMIN', department: 'CSE' },
            { id: 444, name: 'SARVAYESWARAN L', position: 'SYSTEM ADMIN', department: 'MTS' },
            { id: 445, name: 'DIVYADHARSHAN M S', position: 'SYSTEM ADMIN', department: 'ECE' },
            { id: 446, name: 'POORNIMA R K', position: 'SYSTEM ADMIN', department: 'AI-ML' },
            { id: 447, name: 'DHARSHINI.S.K', position: 'SYSTEM ADMIN', department: 'AI-DS' },
            { id: 448, name: 'MUTHU VENKATESH V', position: 'SYSTEM ADMIN', department: 'MECH' },
            { id: 449, name: 'SREYA R', position: 'SYSTEM ADMIN', department: 'CSE' },
            { id: 450, name: 'DHARUNYA R', position: 'SOCIAL MEDIA', department: 'CIVIL' },
            { id: 451, name: 'MOHAMMED FAZAL R', position: 'SOCIAL MEDIA', department: 'ECE' },
            { id: 452, name: 'NAVEEN P', position: 'SOCIAL MEDIA', department: 'AI-DS' },
            { id: 453, name: 'DHARSHINI K S', position: 'SOCIAL MEDIA', department: 'EIE' },
            { id: 454, name: 'KARTHIK R', position: 'SOCIAL MEDIA', department: 'CIVIL' },
            { id: 455, name: 'NAVEEN R', position: 'SOCIAL MEDIA', department: 'MECH' },
            // Advisory Committee Members
            { id: 301, name: 'MANIVANNAN D', position: 'ADVISORY COMMITTEE', department: 'AIDS' },
            { id: 302, name: 'ARAVINDH B', position: 'ADVISORY COMMITTEE', department: 'ECE' },
            { id: 303, name: 'THEJAS BARGAW N', position: 'ADVISORY COMMITTEE', department: 'MTS' },
            { id: 304, name: 'SANTHOSH S', position: 'ADVISORY COMMITTEE', department: 'MTS' },
            { id: 305, name: 'SRINIVASAN V', position: 'ADVISORY COMMITTEE', department: 'MTS' },
            { id: 306, name: 'SUDHIKSHA R', position: 'ADVISORY COMMITTEE', department: 'CHEM' },
            { id: 307, name: 'DEEPINI R', position: 'ADVISORY COMMITTEE', department: 'CIVIL' },
            { id: 308, name: 'KARUPPUCHAMY AISHWARYA', position: 'ADVISORY COMMITTEE', department: 'CSE' },
            { id: 309, name: 'C KAVITHA', position: 'ADVISORY COMMITTEE', department: 'FT' },
            { id: 310, name: 'MADHUMITHA.V', position: 'ADVISORY COMMITTEE', department: 'EEE' },
            { id: 311, name: 'TAMIZHMARAN S', position: 'ADVISORY COMMITTEE', department: 'MECH' },
            { id: 312, name: 'LAKSITHA S', position: 'ADVISORY COMMITTEE', department: 'CSD' },
            { id: 313, name: 'MITHUN KISHORE S', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
            { id: 314, name: 'DHEEPISHA G', position: 'ADVISORY COMMITTEE', department: 'CSE' },
            { id: 315, name: 'PRAJESSH.P', position: 'ADVISORY COMMITTEE', department: 'MTS' },
            { id: 316, name: 'ELAKIYA A', position: 'ADVISORY COMMITTEE', department: 'EEE' },
            { id: 317, name: 'SUBBULAKSHMI C', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
            { id: 318, name: 'THEERTHAA S V', position: 'ADVISORY COMMITTEE', department: 'FT' },
            { id: 319, name: 'ARAVIND S', position: 'ADVISORY COMMITTEE', department: 'AIDS' },
            { id: 320, name: 'CHRISTANJALIN S.R', position: 'ADVISORY COMMITTEE', department: 'BSC' },
            { id: 321, name: 'LOGESH K', position: 'ADVISORY COMMITTEE', department: 'AI-ML' },
           
        ];
        setBearers(sampleData);
    }, []);

    // Only show SECRETARY and TREASURER as filter buttons
    const categories = [
        'ALL',
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

    // Function to group positions under main categories
    const getGroupedPositions = (position) => {
        const positionUpper = position.toUpperCase();
        if (positionUpper.includes('SECRETARY')) return 'SECRETARY';
        if (positionUpper.includes('TREASURER')) return 'TREASURER';
        // For exact matches, return the exact position
        return positionUpper;
    };

    // Filter bearers based on search term and category filter
    const filteredBearers = bearers.filter(bearer => {
        const groupedPosition = getGroupedPositions(bearer.position);
        const exactPosition = bearer.position.toUpperCase();
        
        // Search functionality - check if search term matches name, position, or department
        const searchMatches = searchTerm.trim() === '' || 
            bearer.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            bearer.position.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            bearer.department.toLowerCase().includes(searchTerm.toLowerCase().trim());

        // Filter functionality
        let filterMatches = true;
        if (filter !== 'ALL') {
            // For SECRETARY and TREASURER, include all related positions
            if (filter === 'SECRETARY') {
                filterMatches = groupedPosition === 'SECRETARY';
            } else if (filter === 'TREASURER') {
                filterMatches = groupedPosition === 'TREASURER';
            } else {
                // For other categories, match exact position
                filterMatches = exactPosition === filter.toUpperCase();
            }
        }

        // Return true only if both search and filter conditions are met
        return searchMatches && filterMatches;
    });

    return (
        <div className="office-bearers-page">
            <div className="office-bearers-container">
                <header>
                    <h1>Office Bearers - 2k25</h1>
                    <p className="subtitle">Meet the dedicated team leading our organization forward</p>
                    <div className="count-display">
                        <span className="count-badge">
                            {filteredBearers.length} 
                            {filteredBearers.length === 1 ? ' Member' : ' Members'}
                            {filter !== 'ALL' && ` in ${filter}`}
                            {searchTerm && ` matching "${searchTerm}"`}
                        </span>
                    </div>
                </header>

                <div className="search-filter-row">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, position, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                                title="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <div className="filter-buttons">
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
                            >
                                <h3 className="bearer-name">{bearer.name}</h3>
                                <p className="bearer-position">{bearer.position}</p>
                                <span className="bearer-department">{bearer.department}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            {searchTerm ? 
                                `No office bearers found for "${searchTerm}"${filter !== 'ALL' ? ` in ${filter}` : ''}. Try different search terms or clear the search.` :
                                `No office bearers found in the ${filter} category.`
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfficeBearers;