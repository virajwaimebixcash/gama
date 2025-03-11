import { useState, useEffect, useRef } from 'react'
import GoalD from '../../images/GoalD.png'
import { useNavigate } from "react-router-dom";
function TimelineComponent() {
  // Timeline items state
  const [timelineItems, setTimelineItems] = useState([
    {
      id: 1,
      title: <img src={GoalD} />,
      completed: true,
      progress: 75
    },
    {
      id: 2,
      title: <img src={GoalD} />,
      completed: true,
      progress: 65
    },
    {
      id: 3,
      title: <img src={GoalD} />,
      completed: true,
      progress: 35
    },
    {
      id: 4,
      title: <img src={GoalD} />,
      completed: false,
      progress: 65
    },
    {
      id: 5,
      title: <img src={GoalD} />,
      completed: false,
      progress: 25
    }
  ]);

  // Menu state
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
   const navigate = useNavigate();
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle menu function
  const toggleMenu = (id, event) => {
    event.stopPropagation();
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Handle view item
  const handleView = (item) => {
    navigate("/GoalReview");
  };

  // Handle delete item
  const handleDeleteItem = (id) => {
    setTimelineItems(timelineItems.filter(item => item.id !== id));
    setMenuOpen(null);
  };

  // Handle progress update
  const handleUpdateProgress = (id, e) => {
    const progress = parseInt(e.target.value, 10);
    setTimelineItems(timelineItems.map(item => 
      item.id === id 
        ? { 
            ...item, 
            progress, 
            completed: progress === 100 
          } 
        : item
    ));
  };

  // Calculate overall progress percentage
  const totalProgress = timelineItems.reduce((sum, item) => sum + item.progress, 0);
  const progressPercentage = timelineItems.length > 0 ? totalProgress / timelineItems.length : 0;

  return (
    <div className="app-container fullwhitesnospace" >
      <div className='timelineheads'>Goal Timeline</div>
      
      {/* Overall Progress Bar */}
   
      
      {/* Timeline Component */}
      <div className="timeline-container">
        {timelineItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${item.completed ? 'completed' : ''}`}
          >
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{item.title}</h3>
                <div className="menu-container dateintimeline" ref={menuOpen === item.id ? menuRef : null}>
                 <table className='fulwids'>
                  <tr>
                    <td>
                      <div className='dateinbxs'>June</div>
                      <div className='maindts'>2024</div>
                    </td>
                    <td> <button 
                    className="menu-button txtransicons" 
                    onClick={(e) => toggleMenu(item.id, e)}
                  >
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </button>
                  {menuOpen === item.id && (
                    <div className="menu-dropdown">
                      <button onClick={() => handleView()}>View</button>
                      <button onClick={() => handleDeleteItem()}>Delete</button>
                    </div>
                  )}</td>
                  </tr>
                 </table>
                 
                </div>
              </div>
              <p className="timeline-date">{item.date}</p>
              <p>{item.content}</p>
              
              {/* Individual Item Progress Bar */}
              <div className="item-progress-container">
             <div>
              <div>
              <span className='darkbls'>Audi Q5</span>
              <span className='bluespans'>65 Lacks</span>
              </div>
              <div className="rightlitex item-progress-text">{item.progress}% Complete</div>

              </div> 
                <div className="item-progress-bar">
                  <div 
                    className="item-progress-fill" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                
             
              </div>
              
              {item.completed && <div className="completion-badge">Completed</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimelineComponent
 
 