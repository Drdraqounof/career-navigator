(function() { // Immediately Invoked Function Expression (IIFE) to create a private scope
      const contentData = [ // Array holding all content objects (code, video, event, article, project, etc.)
        { // First content item
          id: 'react-hooks', // Unique ID for this item
          type: 'code', // Type of content is code
          title: 'Custom React Hooks for API Calls', // Title of the content
          description: 'A reusable custom hook for handling API requests with loading states, error handling, and caching.', // Short description of the content
          content: 'const useApi = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(setData)\n      .finally(() => setLoading(false));\n  }, [url]);\n  \n  return { data, loading };\n};', // Code snippet stored as a string
          language: 'JavaScript', // Programming language used
          likes: 45, // Number of likes
          comments: 12, // Number of comments
          shares: 8, // Number of shares
          timestamp: '2 hours ago', // When it was posted
          tags: ['React', 'JavaScript', 'Hooks'] // Tags related to this content
        },
        { // Second content item
          id: 'docker-tutorial', // Unique ID for the item
          type: 'video', // Type is video
          title: 'Docker Fundamentals: From Zero to Production', // Title
          description: 'Complete Docker tutorial covering containers, images, volumes, and deployment strategies.', // Description
          thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop', // Thumbnail image link
          duration: '28:45', // Video length
          views: 1250, // Number of views
          likes: 89, // Number of likes
          comments: 23, // Number of comments
          shares: 15, // Number of shares
          timestamp: '1 day ago', // Time since posted
          tags: ['Docker', 'DevOps', 'Tutorial'] // Tags
        },
        { // Third content item
          id: 'tech-meetup', // Unique ID
          type: 'event', // Type is event
          title: 'Philadelphia Tech Meetup - November', // Title
          description: 'Monthly meetup for Philadelphia tech professionals featuring talks on AI, blockchain, and career development.', // Description
          date: '2025-11-28', // Event date
          time: '6:00 PM', // Event time
          location: 'WeWork Center City', // Event location
          attendees: 87, // Number of attendees
          likes: 34, // Number of likes
          comments: 18, // Number of comments
          shares: 22, // Number of shares
          timestamp: '3 days ago', // Time since posted
          tags: ['Networking', 'Philadelphia', 'Tech'] // Tags
        },
        { // Fourth content item
          id: 'microservices', // Unique ID
          type: 'article', // Type is article
          title: 'Building Scalable Microservices with Node.js', // Title
          description: 'Deep dive into microservices architecture, covering service discovery, API gateways, and data consistency patterns.', // Description
          readTime: '12 min read', // Estimated read time
          likes: 156, // Likes
          comments: 34, // Comments
          shares: 67, // Shares
          timestamp: '5 days ago', // Time since posted
          tags: ['Node.js', 'Architecture', 'Microservices'] // Tags
        },
        { // Fifth content item
          id: 'portfolio', // Unique ID
          type: 'project', // Type is project
          title: 'Personal Portfolio Website Redesign', // Title
          description: 'Complete redesign using React, Next.js, and Tailwind CSS. Features dark mode, animations, and responsive design.', // Description
          technologies: ['React', 'Next.js', 'Tailwind CSS'], // Technologies used
          likes: 78, // Likes
          comments: 19, // Comments
          shares: 25, // Shares
          timestamp: '1 week ago', // Time since posted
          tags: ['React', 'Portfolio', 'Web Design'] // Tags
        },
        { // Sixth content item
          id: 'python-automation', // Unique ID
          type: 'code', // Type is code
          title: 'Python Script for Automated Data Processing', // Title
          description: 'Automated script for reading CSV files, cleaning data, and generating reports with visualizations.', // Description
          content: 'import pandas as pd\n\ndf = pd.read_csv("data.csv")\ndf = df.dropna()\nstats = df.groupby("month").agg({\n  "revenue": "sum",\n  "users": "count"\n})\nprint(stats)', // Python code snippet
          language: 'Python', // Programming language
          likes: 92, // Likes
          comments: 27, // Comments
          shares: 18, // Shares
          timestamp: '1 week ago', // Time since posted
          tags: ['Python', 'Data Science'] // Tags
        }
      ]; // End of contentData array

      let currentTab = 'all'; // Variable to store currently active tab (default is "all")
      let likedContent = new Set(['react-hooks', 'microservices']); // Set storing IDs of liked content

      const typeIcons = { // Mapping of content types to emoji icons
        code: '💻',
        video: '🎥',
        event: '📅',
        article: '📝',
        project: '🚀'
      };

      function getFilteredContent() { // Function to filter content based on selected tab
        if (currentTab === 'all') return contentData; // If "all", return everything
        return contentData.filter(item => item.type === currentTab); // Else filter by type
      }

      function createContentCard(item) { // Function to build a card element for each content item
        const card = document.createElement('div'); // Create a div element for card
        card.className = 'content-card fade-in'; // Add class for styling and animation
        
        let preview = ''; // Initialize variable for content preview
        
        if (item.type === 'code') { // If content is code
          preview = `<div class="code-preview"><div class="code-language">${item.language}</div><pre><code>${item.content.substring(0, 150)}...</code></pre></div>`; // Show language and code snippet
        } else if (item.type === 'video') { // If content is video
          preview = `<div class="video-preview"><img src="${item.thumbnail}" class="video-thumbnail" alt="Video"><button class="play-button">▶</button><div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.7); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${item.duration}</div></div>`; // Thumbnail, play button, and duration
        } else if (item.type === 'event') { // If content is event
          const date = new Date(item.date); // Convert date string to Date object
          const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(); // Format date
          preview = `<div class="event-preview"><div class="event-date">${monthDay}</div><div class="event-time">${item.time}</div><div style="font-size: 0.9rem; margin-top: 0.5rem;">📍 ${item.location}</div></div>`; // Show date, time, and location
        } else if (item.type === 'article') { // If content is article
          preview = `<div style="background: linear-gradient(135deg, #43e97b, #38f9d7); border-radius: 8px; padding: 1.5rem; color: white; margin-bottom: 1rem; text-align: center;"><div style="font-size: 2rem; margin-bottom: 0.5rem;">📖</div><div style="font-size: 1.1rem; font-weight: 600;">${item.readTime}</div></div>`; // Show read time
        } else if (item.type === 'project') { // If content is project
          preview = `<div style="background: linear-gradient(135deg, #fa709a, #fee140); border-radius: 8px; padding: 1.5rem; color: white; margin-bottom: 1rem;"><div style="font-size: 2rem; text-align: center; margin-bottom: 1rem;">🚀</div><div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">${item.technologies.map(t => `<span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${t}</span>`).join('')}</div></div>`; // Show technologies
        }

        const isLiked = likedContent.has(item.id); // Check if this item is liked
        
        // Build the inner HTML of the card
        card.innerHTML = ` 
          <div class="content-header-bar">
            <div class="content-type-icon ${item.type}">${typeIcons[item.type]}</div> 
            <div class="content-info">
              <h3 class="content-title">${item.title}</h3> 
              <div class="content-meta">${item.timestamp} • ${item.tags.join(', ')}</div> 
            </div>
          </div>
          <div class="content-body">
            ${preview} 
            <p class="content-description">${item.description}</p> 
            <div class="content-stats"> 
              <div class="stat"><span>❤️</span><span class="stat-number" data-stat="likes">${item.likes}</span><span>likes</span></div>
              <div class="stat"><span>💬</span><span class="stat-number">${item.comments}</span><span>comments</span></div>
              <div class="stat"><span>🔄</span><span class="stat-number">${item.shares}</span><span>shares</span></div>
              ${item.views ? `<div class="stat"><span>👁️</span><span class="stat-number">${item.views}</span><span>views</span></div>` : ''} 
              ${item.attendees ? `<div class="stat"><span>👥</span><span class="stat-number">${item.attendees}</span><span>attending</span></div>` : ''} 
            </div>
            <div class="content-actions">
              <div class="action-buttons"> 
                <button class="action-btn ${isLiked ? 'liked' : ''}" data-action="like" data-id="${item.id}">${isLiked ? '❤️' : '🤍'} Like</button>
                <button class="action-btn" data-action="comment">💬 Comment</button> 
                <button class="action-btn" data-action="share">🔄 Share</button> 
              </div>
              <div class="timestamp">${item.timestamp}</div> 
            </div>
          </div>
        `;
        
        return card; // Return built card
      }

      function renderContent() { // Function to render all content
        const container = document.getElementById('contentContainer'); // Get container element
        container.innerHTML = ''; // Clear container
        
        const items = getFilteredContent(); // Get filtered content
        
        if (items.length === 0) { // If no items
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;"><div style="font-size: 3rem; margin-bottom: 1rem;">📝</div><h3>No content yet</h3><p>Start sharing your knowledge!</p></div>'; // Show empty state
          return; // Exit function
        }
        
        items.forEach((item, idx) => { // Loop through items
          const card = createContentCard(item); // Create card for each item
          container.appendChild(card); // Add to container
          setTimeout(() => card.classList.add('visible'), idx * 100); // Animate appearance
        });
      }

      function handleLike(itemId, button) { // Function to handle like/unlike
        const item = contentData.find(i => i.id === itemId); // Find item by ID
        if (!item) return; // If not found, stop
        
        if (likedContent.has(itemId)) { // If already liked
          likedContent.delete(itemId); // Remove from liked
          item.likes--; // Decrease like count
          button.innerHTML = '🤍 Like'; // Change button text
          button.classList.remove('liked'); // Remove "liked" class
          showNotification('Removed from liked content', 'info'); // Show notification
        } else { // If not liked yet
          likedContent.add(itemId); // Add to liked
          item.likes++; // Increase like count
          button.innerHTML = '❤️ Like'; // Change button text
          button.classList.add('liked'); // Add "liked" class
          showNotification('Liked!', 'success'); // Show notification
        }
        
        const statEl = button.closest('.content-card').querySelector('[data-stat="likes"]'); // Find likes element
        if (statEl) statEl.textContent = item.likes; // Update like count
      }

      function showNotification(msg, type) { // Function to display temporary notifications
        const notif = document.createElement('div'); // Create notification element
        notif.style.cssText = `position: fixed; top: 100px; right: 20px; background: ${type === 'success' ? '#10b981' : '#667eea'}; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 3000; animation: slideInRight 0.3s ease; font-weight: 600;`; // Apply styles
        notif.textContent = msg; // Set message
        document.body.appendChild(notif); // Add to body
        setTimeout(() => { // Auto-remove after delay
          notif.style.animation = 'slideOutRight 0.3s ease'; // Exit animation
          setTimeout(() => notif.remove(), 300); // Remove element
        }, 3000);
      }

      document.getElementById('contentTabs').addEventListener('click', (e) => { // Add event listener for tab switching
        const btn = e.target.closest('.tab-button'); // Find clicked tab button
        if (!btn) return; // If not a button, stop
        
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active')); // Remove active class from all
        btn.classList.add('active'); // Set clicked tab as active
        currentTab = btn.dataset.tab; // Update currentTab
        renderContent(); // Re-render content
      });

      document.getElementById('contentContainer').addEventListener('click', (e) => { // Event delegation for content actions
        const action = e.target.closest('[data-action]'); // Find clicked action button
        if (!action) return; // If none, stop
        
        e.stopPropagation(); // Stop event bubbling
        const actionType = action.dataset.action; // Get action type
        
        if (actionType === 'like') { // If like button clicked
          handleLike(action.dataset.id, action); // Handle like
        } else if (actionType === 'comment') { // If comment button clicked
          showNotification('Comments coming soon!', 'info'); // Show notification
        } else if (actionType === 'share') { // If share button clicked
          showNotification('Link copied to clipboard!', 'success'); // Show notification
        }
      });
        
      document.getElementById('editProfileBtn').addEventListener('click', () => { // Handle edit profile button
        showNotification('Edit profile coming soon!', 'info');
      });

      document.getElementById('shareProfileBtn').addEventListener('click', () => { // Handle share profile button
        showNotification('Profile link copied!', 'success');
      });

      document.getElementById('createContentBtn').addEventListener('click', () => { // Handle create content button
        showNotification('Create content coming soon!', 'info');
      });

      document.getElementById('searchInput').addEventListener('input', (e) => { // Handle search input
        const query = e.target.value.toLowerCase(); // Get search query
        if (!query) { // If query empty
          renderContent(); // Show all content
          return;
        }
        
        const container = document.getElementById('contentContainer'); // Get content container
        container.innerHTML = ''; // Clear container
        
        const filtered = contentData.filter(item =>  // Filter content by title, description, or tags
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(t => t.toLowerCase().includes(query))
        );
        
        if (filtered.length === 0) { // If no results
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;"><div style="font-size: 3rem;">🔍</div><h3>No results found</h3></div>'; // Show "no results" message
          return;
        }
        
       filtered.forEach(item => {// If results found
          const card = createContentCard(item); // Create card for each item
          card.classList.add('visible');
          container.appendChild(card);
        });
      });

      renderContent();
    })();