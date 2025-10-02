let currentUserType = null;
    let userMenuOpen = false;

    const userData = {
      student: {
        explored: 3,
        savedCareers: 5,
        identifiedSkills: 12,
        profile: { icon: '🎓', name: 'Alex Student' }
      },
      graduate: {
        applications: 23,
        interviews: 8,
        resumeScore: 78,
        profile: { icon: '👨‍🎓', name: 'Jordan Graduate' }
      },
      changer: {
        transitionProgress: 60,
        skillsLearned: 8,
        networkConnections: 15,
        profile: { icon: '🔄', name: 'Sam Changer' }
      },
      professional: {
        skillsMastered: 12,
        certifications: 3,
        marketPercentile: 95,
        profile: { icon: '💼', name: 'Morgan Pro' }
      }
    };

    const sampleData = {
      jobs: [
        {
          title: "Junior Frontend Developer",
          company: "TechStart Inc.",
          location: "Remote",
          salary: "$65,000 - $80,000",
          posted: "2 days ago"
        },
        {
          title: "Marketing Coordinator",
          company: "GrowthCorp",
          location: "New York, NY",
          salary: "$50,000 - $65,000",
          posted: "1 week ago"
        },
        {
          title: "Business Analyst",
          company: "DataFlow Solutions",
          location: "San Francisco, CA",
          salary: "$75,000 - $95,000",
          posted: "3 days ago"
        }
      ],
      courses: [
        {
          title: "Complete Python Bootcamp",
          provider: "CodeAcademy",
          duration: "40 hours",
          rating: "4.8/5",
          price: "$79"
        },
        {
          title: "Digital Marketing Fundamentals",
          provider: "Google",
          duration: "20 hours",
          rating: "4.6/5",
          price: "Free"
        },
        {
          title: "Project Management Professional",
          provider: "PMI",
          duration: "60 hours",
          rating: "4.9/5",
          price: "$299"
        }
      ],
      collegePrograms: [
        {
          program: "Computer Science",
          schools: ["MIT", "Stanford", "Carnegie Mellon"],
          requirements: "SAT: 1500+, GPA: 3.8+",
          prospects: "95% job placement rate"
        },
        {
          program: "Business Administration",
          schools: ["Wharton", "Harvard", "Northwestern"],
          requirements: "SAT: 1450+, GPA: 3.7+",
          prospects: "88% job placement rate"
        }
      ]
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    function selectUserType(type) {
      document.querySelectorAll('.user-type-card').forEach(card => {
        card.classList.remove('active');
      });
      
      document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
      });

      document.querySelector(`[data-type="${type}"]`).classList.add('active');
      document.getElementById(`${type}-dashboard`).classList.add('active');
      
      currentUserType = type;
      updateUserProfile(type);
      updateDashboardData(type);
      
      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }, 300);
    }

    function updateUserProfile(type) {
      const profile = userData[type].profile;
      document.getElementById('userIcon').textContent = profile.icon;
      document.getElementById('userName').textContent = profile.name;
    }

    function updateDashboardData(type) {
      const data = userData[type];
      
      switch(type) {
        case 'student':
          document.getElementById('student-explored').textContent = data.explored;
          document.getElementById('careers-saved').textContent = data.savedCareers;
          document.getElementById('skills-identified').textContent = data.identifiedSkills;
          document.getElementById('student-progress').style.width = `${data.explored * 10}%`;
          break;
        case 'graduate':
          document.getElementById('applications-sent').textContent = data.applications;
          document.getElementById('interviews-scheduled').textContent = data.interviews;
          break;
      }
    }

    function toggleUserMenu() {
      const menu = document.getElementById('userMenu');
      userMenuOpen = !userMenuOpen;
      menu.classList.toggle('active', userMenuOpen);
    }

    document.addEventListener('click', function(event) {
      const userProfile = document.querySelector('.user-profile');
      const userMenu = document.getElementById('userMenu');
      
      if (!userProfile.contains(event.target) && userMenuOpen) {
        userMenu.classList.remove('active');
        userMenuOpen = false;
      }
    });

    function showModal(title, content) {
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalBody').innerHTML = content;
      document.getElementById('featureModal').style.display = 'block';
    }

    function closeModal() {
      document.getElementById('featureModal').style.display = 'none';
    }

    window.onclick = function(event) {
      const modal = document.getElementById('featureModal');
      if (event.target == modal) {
        closeModal();
      }
    }

    function exploreCareers() {
      const content = `
        <div class="career-list">
          ${sampleData.careers.map(career => `
            <div class="career-item" onclick="saveCareer('${career.title}')">
              <div class="item-title">${career.title}</div>
              <div class="item-description">${career.description}</div>
              <div class="item-meta">
                <span>${career.growth}</span>
                <span>${career.salary}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" onclick="exploreMore()">Load More Careers</button>
      `;
      showModal('Explore Career Paths', content);
    }

    function takeAssessment() {
      const questions = [
        {
          question: "What type of work environment do you prefer?",
          options: ["Collaborative team setting", "Independent work", "Fast-paced startup", "Structured corporate"]
        },
        {
          question: "Which skills do you enjoy using most?",
          options: ["Analytical and problem-solving", "Creative and design", "Communication and leadership", "Technical and programming"]
        },
        {
          question: "What motivates you most in work?",
          options: ["Making a social impact", "Financial success", "Creative expression", "Continuous learning"]
        }
      ];

      const content = `
        <div id="assessmentContainer">
          ${questions.map((q, index) => `
            <div class="assessment-question">
              <div class="question-title">Question ${index + 1}: ${q.question}</div>
              <div class="question-options">
                ${q.options.map((option, optIndex) => `
                  <div class="option" onclick="selectOption(${index}, ${optIndex}, this)">
                    ${option}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" onclick="submitAssessment()" style="margin-top: 1rem;">Submit Assessment</button>
      `;
      showModal('Career Assessment', content);
    }

    function selectOption(questionIndex, optionIndex, element) {
      const siblings = element.parentNode.querySelectorAll('.option');
      siblings.forEach(sibling => sibling.classList.remove('selected'));
      element.classList.add('selected');
    }

    function submitAssessment() {
      const results = `
        <div style="text-align: center; padding: 2rem;">
          <h3 style="color: #667eea; margin-bottom: 1rem;">Assessment Complete!</h3>
          <p style="margin-bottom: 2rem;">Based on your responses, here are your top career matches:</p>
          <div style="display: grid; gap: 1rem;">
            <div style="background: #f8f9ff; padding: 1rem; border-radius: 10px;">
              <strong>Software Developer</strong> - 95% match
            </div>
            <div style="background: #f8f9ff; padding: 1rem; border-radius: 10px;">
              <strong>Data Analyst</strong> - 87% match
            </div>
            <div style="background: #f8f9ff; padding: 1rem; border-radius: 10px;">
              <strong>UX Designer</strong> - 82% match
            </div>
          </div>
          <button class="btn btn-primary" onclick="saveAssessmentResults()" style="margin-top: 1rem;">Save Results</button>
        </div>
      `;
      document.getElementById('modalBody').innerHTML = results;
    }

    function findJobs() {
      const content = `
        <div class="job-list">
          ${sampleData.jobs.map(job => `
            <div class="job-item" onclick="applyToJob('${job.title}', '${job.company}')">
              <div class="item-title">${job.title}</div>
              <div class="item-description">${job.company} • ${job.location}</div>
              <div class="item-meta">
                <span>${job.salary}</span>
                <span>Posted ${job.posted}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: 1rem;">
          <button class="btn btn-primary" onclick="searchMoreJobs()">Search More Jobs</button>
          <button class="btn btn-secondary" onclick="setJobAlerts()">Set Job Alerts</button>
        </div>
      `;
      showModal('Job Opportunities', content);
    }

    function startLearning() {
      const content = `
        <div class="course-list">
          ${sampleData.courses.map(course => `
            <div class="course-item" onclick="enrollCourse('${course.title}')">
              <div class="item-title">${course.title}</div>
              <div class="item-description">${course.provider} • ${course.duration}</div>
              <div class="item-meta">
                <span>Rating: ${course.rating}</span>
                <span>${course.price}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" onclick="browseCourses()">Browse All Courses</button>
      `;
      showModal('Learning Opportunities', content);
    }

    function viewCollegePrograms() {
      const content = `
        <div style="display: grid; gap: 1.5rem;">
          ${sampleData.collegePrograms.map(program => `
            <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 15px; border-left: 4px solid #667eea;">
              <h4 style="margin-bottom: 1rem; color: #333;">${program.program}</h4>
              <p><strong>Top Schools:</strong> ${program.schools.join(', ')}</p>
              <p><strong>Requirements:</strong> ${program.requirements}</p>
              <p><strong>Job Prospects:</strong> ${program.prospects}</p>
              <button class="btn btn-secondary" onclick="exploreProgram('${program.program}')" style="margin-top: 1rem;">Learn More</button>
            </div>
          `).join('')}
        </div>
      `;
      showModal('College Programs', content);
    }

    function improveResume() {
      const content = `
        <div style="display: grid; gap: 1rem;">
          <h4>Resume Improvement Suggestions:</h4>
          <div style="background: #fff3cd; padding: 1rem; border-radius: 10px; border-left: 4px solid #ffc107;">
            <strong>Add Keywords:</strong> Include "Python", "Machine Learning", "Agile" to match job descriptions
          </div>
          <div style="background: #d4edda; padding: 1rem; border-radius: 10px; border-left: 4px solid #28a745;">
            <strong>Quantify Achievements:</strong> Add specific numbers and results to your accomplishments
          </div>
          <div style="background: #f8d7da; padding: 1rem; border-radius: 10px; border-left: 4px solid #dc3545;">
            <strong>Fix Formatting:</strong> Ensure consistent font sizes and spacing throughout
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <button class="btn btn-primary" onclick="uploadResume()">Upload New Resume</button>
          <button class="btn btn-secondary" onclick="downloadTemplate()">Download Template</button>
        </div>
      `;
      showModal('Resume Optimization', content);
    }

    function practiceInterviews() {
      const content = `
        <div>
          <h4 style="margin-bottom: 1rem;">Choose Interview Type:</h4>
          <div style="display: grid; gap: 1rem;">
            <button class="btn btn-primary" onclick="startMockInterview('behavioral')">Behavioral Interview</button>
            <button class="btn btn-primary" onclick="startMockInterview('technical')">Technical Interview</button>
            <button class="btn btn-primary" onclick="startMockInterview('case')">Case Study Interview</button>
          </div>
          
          <h4 style="margin: 2rem 0 1rem 0;">Common Questions Practice:</h4>
          <div style="background: #f8f9ff; padding: 1rem; border-radius: 10px;">
            <p><strong>Question:</strong> "Tell me about yourself"</p>
            <textarea placeholder="Practice your answer here..." style="width: 100%; height: 100px; margin: 0.5rem 0; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;"></textarea>
            <button class="btn btn-secondary">Get Feedback</button>
          </div>
        </div>
      `;
      showModal('Interview Practice', content);
    }

    function salaryAnalysis() {
      const content = `
        <div style="text-align: center;">
          <h3 style="color: #667eea; margin-bottom: 2rem;">Your Market Value Analysis</h3>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem;">
            <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 15px;">
              <div style="font-size: 2rem; font-weight: bold; color: #667eea;">$125K</div>
              <div>Current Market Rate</div>
            </div>
            <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 15px;">
              <div style="font-size: 2rem; font-weight: bold; color: #667eea;">95th</div>
              <div>Percentile Ranking</div>
            </div>
          </div>
          
          <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
            <strong>Salary Increase Potential:</strong> 15-20% with additional certifications
          </div>
          
          <button class="btn btn-primary" onclick="negotiationTips()">Negotiation Tips</button>
        </div>
      `;
      showModal('Salary Analysis', content);
    }

    function saveCareer(career) {
      alert(`${career} saved to your career list!`);
      const savedElement = document.getElementById('careers-saved');
      if (savedElement) {
        const current = parseInt(savedElement.textContent);
        savedElement.textContent = current + 1;
      }
    }

    function applyToJob(title, company) {
      alert(`Application started for ${title} at ${company}!`);
      const appsElement = document.getElementById('applications-sent');
      if (appsElement) {
        const current = parseInt(appsElement.textContent);
        appsElement.textContent = current + 1;
      }
    }

    function enrollCourse(course) {
      alert(`Enrolled in ${course}! Check your learning dashboard.`);
    }

    function exploreProgram(program) {
      alert(`Exploring ${program} programs. Redirecting to detailed view...`);
    }

    function learnSkill(skill) {
      alert(`Starting learning path for ${skill}!`);
    }

    function exploreFeatures() {
      alert('Explore section - Find career opportunities, networking events, and industry insights!');
    }

    function showMyPlan() {
      const content = `
        <div>
          <h4>Your Personalized Career Plan</h4>
          <div style="margin: 1rem 0;">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 65%;"></div>
            </div>
            <p style="text-align: center; margin: 0.5rem 0;">Overall Progress: 65%</p>
          </div>
          
          <h5>Upcoming Milestones:</h5>
          <div style="display: grid; gap: 0.5rem; margin: 1rem 0;">
            <div style="padding: 0.5rem; background: #f0f8ff; border-radius: 5px;">✅ Complete Python Course</div>
            <div style="padding: 0.5rem; background: #fff8f0; border-radius: 5px;">📚 Network with 5 professionals</div>
            <div style="padding: 0.5rem; background: #f8f0ff; border-radius: 5px;">🎯 Apply to 10 positions</div>
          </div>
          
          <button class="btn btn-primary" onclick="updatePlan()">Update Plan</button>
        </div>
      `;
      showModal('My Career Plan', content);
    }

    function showSettings() {
      const content = `
        <div>
          <h4>Account Settings</h4>
          <div class="form-group">
            <label>Email Notifications</label>
            <select>
              <option>Daily digest</option>
              <option>Weekly summary</option>
              <option>Monthly updates</option>
              <option>Disabled</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Career Focus Area</label>
            <select>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Creative Arts</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Experience Level</label>
            <select>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
              <option>Executive Level</option>
            </select>
          </div>
          
          <button class="btn btn-primary" onclick="saveSettings()">Save Settings</button>
        </div>
      `;
      showModal('Settings', content);
    }

    function editProfile() {
      const content = `
        <div>
          <h4>Edit Profile</h4>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" value="${document.getElementById('userName').textContent}" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" value="user@example.com" />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" value="+1 (555) 123-4567" />
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea placeholder="Tell us about yourself..."></textarea>
          </div>
          <button class="btn btn-primary" onclick="saveProfile()">Save Profile</button>
        </div>
      `;
      showModal('Edit Profile', content);
      toggleUserMenu();
    }

    function viewProgress() {
      const content = `
        <div>
          <h4>Your Progress Overview</h4>
          <div style="margin: 2rem 0;">
            <div style="margin: 1rem 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Career Exploration</span>
                <span>75%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 75%;"></div>
              </div>
            </div>
            
            <div style="margin: 1rem 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Skill Development</span>
                <span>60%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 60%;"></div>
              </div>
            </div>
            
            <div style="margin: 1rem 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Network Building</span>
                <span>40%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 40%;"></div>
              </div>
            </div>
          </div>
          
          <h5>Recent Achievements:</h5>
          <div style="display: grid; gap: 0.5rem;">
            <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px;">🏆 Completed JavaScript Fundamentals</div>
            <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px;">🎯 Applied to 5 new positions</div>
            <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px;">🤝 Connected with 3 industry professionals</div>
          </div>
        </div>
      `;
      showModal('Progress Overview', content);
      toggleUserMenu();
    }

    function exportData() {
      alert('Exporting your career data... Download will start shortly.');
      toggleUserMenu();
    }

    function logoutUser() {
      if (confirm('Are you sure you want to logout?')) {
        alert('Logging out... Redirecting to login page.');
        toggleUserMenu();
      }
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        selectUserType('student');
      }, 1000);
    });

    function exploreMore() { alert('Loading more career options...'); }
    function saveAssessmentResults() { alert('Assessment results saved!'); closeModal(); }
    function searchMoreJobs() { alert('Searching additional job boards...'); }
    function setJobAlerts() { alert('Job alerts configured!'); }
    function browseCourses() { alert('Browsing course catalog...'); }
    function scholarshipSearch() { alert('Searching scholarships...'); }
    function findMentors() { alert('Finding mentors in your field...'); }
    function uploadResume() { alert('Resume upload feature...'); }
    function downloadTemplate() { alert('Downloading resume template...'); }
    function startMockInterview(type) { alert(`Starting ${type} interview simulation...`); }
    function negotiationTips() { alert('Loading salary negotiation guide...'); }
    function updatePlan() { alert('Plan update feature...'); }
    function saveSettings() { alert('Settings saved successfully!'); closeModal(); }
    function saveProfile() { alert('Profile updated successfully!'); closeModal(); }
    function showSavedCareers() { alert('Viewing saved careers...'); }
    function showIdentifiedSkills() { alert('Viewing identified skills...'); }
    function viewApplications() { alert('Viewing job applications...'); }
    function viewInterviews() { alert('Viewing scheduled interviews...'); }
    function trackApplications() { alert('Opening application tracker...'); }
    function atsCheck() { alert('Running ATS compatibility check...'); }
    function practiceBehavioral() { alert('Starting behavioral question practice...'); }
    function practiceSkills() { alert('Starting technical skills practice...'); }
    function researchCompanies() { alert('Opening company research tool...'); }
    function continuePlan() { alert('Continuing your transition plan...'); }
    function findCourses() { alert('Finding relevant courses...'); }
    function viewTrends() { alert('Viewing industry trends...'); }
    function viewOpportunities() { alert('Viewing new opportunities...'); }
    function newOpportunities() { alert('Loading new opportunities...'); }
    function viewMasteredSkills() { alert('Viewing mastered skills...'); }
    function viewCertifications() { alert('Viewing your certifications...'); }
    function setNewGoals() { alert('Setting new career goals...'); }
    function leadershipProgram() { alert('Opening leadership development program...'); }
    function feedback360() { alert('Starting 360-degree feedback process...'); }
    function connectPros() { alert('Connecting with industry professionals...'); }