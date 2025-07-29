# 🚀 TalentFlow - AI-Powered Hiring Platform

A modern, responsive hiring platform built with React and Tailwind CSS that helps companies find and manage top talent efficiently.

## ✨ Features

- **🎯 Smart Candidate Management** - Browse and filter through premium candidates
- **📊 Real-time Analytics** - Track hiring progress and team building metrics
- **🎨 Modern UI/UX** - Beautiful, responsive design with smooth animations
- **🔍 Advanced Search & Filters** - Find the perfect candidates quickly
- **📱 Mobile Responsive** - Works seamlessly on all devices
- **⚡ Fast Performance** - Optimized for speed and user experience

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom gradients and animations
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hiring-app.git
   cd hiring-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   # From the frontend directory
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 📁 Project Structure

```
hiring-app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   └── candidate.json   # Sample candidate data
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Layout/      # Header and layout components
│   │   │   ├── Dashboard/   # Dashboard and stats components
│   │   │   ├── Candidates/  # Candidate display components
│   │   │   └── Selection/   # Selection panel components
│   │   ├── contexts/        # React Context for state management
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Application entry point
│   └── package.json         # Frontend dependencies
├── backend/                 # Backend API (future implementation)
└── README.md               # This file
```

## 🎨 Key Components

- **Header** - Navigation and branding
- **WelcomeBanner** - Hero section with progress tracking
- **Dashboard** - Analytics and statistics
- **SearchAndFilters** - Search and filtering functionality
- **CandidateCard** - Individual candidate display
- **CandidateTable** - Tabular candidate view
- **SelectedCandidatesPanel** - Selected candidates management

## 📊 Data Structure

The application uses a sample `candidate.json` file with the following structure:

```json
{
  "candidates": [
    {
      "id": "unique-id",
      "name": "Candidate Name",
      "location": "City, Country",
      "score": 95,
      "latestRole": {
        "roleName": "Senior Developer",
        "company": "Tech Company"
      },
      "education": {
        "degrees": [
          {
            "degree": "Bachelor's",
            "subject": "Computer Science",
            "school": "University Name",
            "isTop50": true
          }
        ]
      },
      "skills": ["React", "Node.js", "TypeScript"],
      "salary": "$120,000",
      "experience": 5
    }
  ]
}
```

## 🎯 Features in Detail

### Candidate Management
- Browse through premium candidates
- View detailed candidate profiles
- Filter by skills, experience, and location
- Search functionality with real-time results

### Team Building
- Select up to 5 candidates for your team
- Track team progress and budget
- Real-time analytics dashboard
- Visual progress indicators

### Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Beautiful gradients and visual effects
- Intuitive user interface

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Code Style

- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, readable code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Create React App](https://create-react-app.dev/) for the development setup

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---
