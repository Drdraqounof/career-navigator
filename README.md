# 🚀 Wayvian: AI-Powered Career Navigator

## Overview
Wayvian was created to address the hiring crisis driven by rapid AI adoption and the widespread lack of job-ready resumes. It delivers personalized, AI-guided career planning so students, graduates, and career changers can explore roles, identify skill gaps, and build actionable development plans that align with real-time labor market insights.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [User Personas](#user-personas)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
   3. [Local Development](#local-development)
   4. [Production Build](#production-build)
6. [Project Structure](#project-structure)
7. [Usage Instructions](#usage-instructions)
8. [Key Components](#key-components)
9. [Monetization Model](#monetization-model)
10. [Contribution Guidelines](#contribution-guidelines)

## Features

### Core Features
- **🎨 Interactive Landing Page**: Beautiful animated waves rendered with HTML Canvas
- **💬 AI Career Chat**: Intelligent conversational assistant powered by AI for personalized career guidance
- **👥 Multi-Persona Dashboard**: Tailored experiences for different user types
- **📝 Resume Upload**: Upload and analyze resumes for personalized recommendations
- **🔄 Chat History Management**: Save conversations to localStorage with refresh/new chat functionality
- **📊 Progress Tracking**: Visual progress indicators for career development goals
- **🌐 Professional Networking**: Network page for connecting with professionals
- **⚙️ User Settings**: Customizable user preferences and profile management

### Premium Features
- **Career Changer Tools** 🔄
  - Skills translation mapping
  - Upskilling roadmaps
  - Career pivot strategies
  
- **Working Professional Tools** 💼
  - Career advancement planning
  - Skills gap analysis
  - Executive presence building

### Free Features
- **High School Student** 🎓
  - College path finder
  - Academic strength analysis
  - Extracurricular planning
  
- **Recent Graduate** 👨‍🎓
  - Job market navigation
  - Resume & portfolio builder
  - Interview prep coaching

## User Personas

Wayvian serves four distinct user personas, each with tailored features and guidance:

### 1. 🎓 High School Student
**Focus**: Planning college path and exploring future career options
- College matching based on interests and grades
- Subject strength identification
- Extracurricular activity planning
- SAT/ACT preparation guidance

### 2. 👨‍🎓 Recent Graduate (Free Tier)
**Focus**: Entering the job market with a new degree
- Entry-level job search
- Resume writing assistance
- Interview preparation
- Salary negotiation basics
- First job guidance

### 3. 🔄 Career Changer (Premium)
**Focus**: Transitioning to a new field or industry
- Transferable skills identification
- Industry rebranding strategies
- Certification recommendations
- Career transition planning

### 4. 💼 Working Professional (Premium)
**Focus**: Advancing career and developing new skills
- Leadership development
- Industry trend tracking
- Promotion negotiation strategies
- Professional brand building

## Tech Stack

### Frontend Framework
- **React 19.2.0**: Latest React with concurrent features
- **Vite 7.1.10**: Lightning-fast build tool and dev server
- **React Router DOM 7.9.4**: Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS transformations
- **Autoprefixer 10.4.21**: Automatic vendor prefixing
- **Custom Canvas Animations**: Wave effects and visual enhancements

### Content & Utilities
- **React Markdown 10.1.0**: Markdown rendering for AI responses
- **LocalStorage API**: Persistent chat history and user data

### Testing & Quality
- **Testing Library**: React, DOM, and Jest DOM matchers
- **ESLint**: Code quality and consistency

### AI Integration
- **Custom AI Module** (`FindAI.js`): Intelligent career guidance engine

## Getting Started

### Prerequisites
- **Node.js**: Version 18 or newer
- **npm**: Version 9 or newer
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Installation
```bash
# Clone the repository
git clone https://github.com/Drdraqounof/career-navigator.git

# Navigate to project directory
cd career-navigator

# Install dependencies
npm install
```

### Environment Setup
Create a `.env` file in the root directory for any required API keys:
```bash
# Add your environment variables here
# VITE_AI_API_KEY=your_api_key_here
```

### Local Development
```bash
# Start development server
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure
```
career-navigator/
├── public/
│   └── assets/         # Static assets
├── src/
│   ├── components/
│   │   ├── dashboard/  # Dashboard components
│   │   ├── login/      # Authentication components
│   │   ├── net/        # Networking features
│   │   ├── pages/      # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProfessionalEvents.jsx
│   │   │   └── Settings.jsx
│   │   ├── profile/    # User profile components
│   │   ├── Test/       # Testing/assessment components
│   │   ├── FeatureChat.jsx
│   │   └── PaywallPopup.jsx
│   ├── App.jsx         # Main app component
│   ├── CareerChat.jsx  # AI chat interface
│   ├── FindAI.js       # AI integration module
│   ├── main.jsx        # App entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage Instructions

### For First-Time Users
1. **Select Your User Type**: Choose from High School Student, Recent Graduate, Career Changer, or Working Professional
2. **Explore Your Dashboard**: View personalized features and progress tracking
3. **Start a Conversation**: Use the AI Career Chat to get personalized guidance
4. **Upload Your Resume**: Get AI-powered analysis and recommendations (optional)

### Career Chat Features
- **Starter Prompts**: Quick-start questions based on your user type
- **Resume Analysis**: Upload PDF, DOC, or DOCX files for personalized feedback
- **Chat History**: Conversations automatically save to localStorage
- **New Chat**: Refresh button to start a new conversation
- **Markdown Support**: AI responses include formatted text, lists, and headers

### Dashboard Navigation
1. **User Type Selection**: Switch between different personas to explore various features
2. **Progress Tracking**: Monitor your career development across different areas
3. **Feature Cards**: Access specialized tools for your career stage
4. **Quick Actions**: Fast access to career planning resources

### Using Premium Features
- Career Changer and Working Professional features display a premium badge
- Clicking premium features triggers a paywall popup
- View pricing and upgrade options to unlock advanced tools

## Key Components

### CareerChat
The main conversational AI interface featuring:
- Real-time AI responses
- Resume upload and parsing
- Persistent chat history
- Beautiful wave animations
- Mobile-responsive design
- Markdown formatting for responses

### Dashboard
Persona-based dashboard with:
- User type selector with premium indicators
- Progress tracking visualizations
- Feature cards with action buttons
- Personalized welcome messages
- Quick prompt buttons

### PaywallPopup
Monetization component that:
- Displays premium benefits
- Shows upgrade call-to-action
- Non-intrusive modal design
- Clear pricing information

### Navigation Components
- Top navigation bar with branding
- Multi-page routing (Dashboard, Network, Settings)
- User authentication status
- Responsive mobile menu

## Monetization Model

### Free Tier
- Full access for High School Students
- Full access for Recent Graduates
- Basic career guidance
- Resume upload and analysis
- Chat history

### Premium Tier
Required for:
- Career Changer persona and features
- Working Professional persona and features
- Advanced career planning tools
- Executive coaching resources
- Industry-specific insights

**Premium Benefits Include**:
- ✨ Personalized career roadmaps
- 📊 Industry insights and trends
- 🎯 Advanced skill recommendations
- 🤝 Networking strategies
- 💡 Leadership development resources

## Contribution Guidelines

### How to Contribute
1. **Fork the Repository**: Create your own fork of the project
2. **Create a Feature Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install Dependencies**: Ensure everything builds locally
   ```bash
   npm install
   npm run dev
   ```
4. **Make Your Changes**: Follow the existing code style and conventions
5. **Test Your Changes**: Verify functionality across different user personas
6. **Commit Your Changes**: Use clear, descriptive commit messages
   ```bash
   git commit -m "Add: feature description"
   ```
7. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Submit a Pull Request**: Provide a clear description of changes and their purpose

### Code Standards
- Use functional React components with hooks
- Follow existing naming conventions
- Maintain responsive design principles
- Comment complex logic
- Keep components modular and reusable

### Areas for Contribution
- 🐛 Bug fixes and performance improvements
- ✨ New career guidance features
- 🎨 UI/UX enhancements
- 📱 Mobile responsiveness improvements
- 🧪 Test coverage expansion
- 📚 Documentation updates
- 🌐 Internationalization support

## Deployment

### Netlify
The project includes a `netlify.toml` configuration file for easy deployment:
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Vercel
The project includes a `vercel.json` configuration file:
```bash
npm run build
# Deploy using Vercel CLI or connect your repository
```

## License
This project is open source and available under standard open source licensing terms.

## Support & Contact
For questions, suggestions, or support:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues for similar questions

## Roadmap
- [ ] Advanced analytics dashboard
- [ ] Integration with job boards
- [ ] Skill assessment tests
- [ ] Mentor matching system
- [ ] Export career plans to PDF
- [ ] Mobile app development
- [ ] API for third-party integrations

---

**Built with ❤️ to help everyone navigate their career journey successfully.**
