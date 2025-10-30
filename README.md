# Financial Planning Application (South Africa Edition) 🇿🇦

A modern, secure, and intelligent Financial Planning Web Application that empowers financial advisers to collect client data, calculate their financial health, plan future goals, and generate branded reports — all while ensuring POPIA compliance.

![Landing Page](https://github.com/user-attachments/assets/3e92e9dd-dd6d-4319-986c-b70f238c5f51)

## 🌟 Features

### For Advisers
- 📊 **Dashboard**: Real-time statistics and client overview
- 👥 **Client Management**: Add, edit, and view client profiles
- 🎯 **4-Step Wizard**: Comprehensive data collection workflow
  - Personal Details
  - Income & Expenses
  - Assets & Liabilities  
  - Financial Goals
- 💰 **Smart Calculations**: Automatic net worth, surplus, and goal feasibility analysis
- 📄 **Report Generation**: Ready for PDF export with branding

### For Admins
- 🏢 **Admin Portal**: Manage advisers and company settings
- 📈 **Performance Metrics**: Track adviser activity and portfolio values
- 🎨 **Branding**: Customize company logo and colors
- 📊 **Analytics**: System-wide statistics and insights

### South African Features
- 💵 **ZAR Currency**: Proper formatting (R###,###.00)
- 🏦 **Local Terminology**: Bond, Retirement Annuity, Medical Aid
- 🔒 **POPIA Compliant**: Security and data protection messaging
- 🇿🇦 **SA Focused**: Designed for South African market

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SachinMeenaSipl/Finance-advicer.git
cd Finance-advicer

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Design System

### Color Palette
- **Primary**: `#005B5C` (Deep Teal) - Trust and finance
- **Secondary**: `#FFD166` (Gold) - Optimism and growth
- **Accent**: `#3DCCC7` (Success) - Positive results
- **Background**: `#F8FAFB` (Light Gray)

### UI Features
- Glassmorphism effects with backdrop blur
- Card-based layouts
- Responsive design (tablets & laptops)
- Dark mode support
- Modern typography with system fonts

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── admin/                     # Admin portal
│   │   ├── dashboard/
│   │   └── login/
│   ├── clients/                   # Client management
│   │   ├── new/                   # Client wizard
│   │   └── page.tsx               # Clients list
│   ├── dashboard/                 # Adviser dashboard
│   ├── login/                     # Adviser authentication
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/                    # Reusable components
│   ├── dashboard/
│   │   └── Sidebar.tsx           # Navigation sidebar
│   ├── ui/
│   │   ├── ProgressCircle.tsx    # Goal progress visualization
│   │   └── StatCard.tsx          # Dashboard statistics
│   └── wizard/                    # Client wizard steps
│       ├── PersonalDetailsStep.tsx
│       ├── IncomeExpensesStep.tsx
│       ├── AssetsLiabilitiesStep.tsx
│       └── GoalsStep.tsx
├── lib/                           # Utilities
│   └── calculations.ts            # Financial calculations
└── types/                         # TypeScript definitions
    └── index.ts                   # Type definitions
```

## 💡 Key Calculations

### Net Monthly Surplus
```typescript
Net Surplus = Total Monthly Income - Total Monthly Expenses
```

### Net Worth
```typescript
Net Worth = Total Assets - Total Liabilities
```

### Future Value of Goals
```typescript
FV = PMT × ((1 + r)^n - 1) / r

Where:
- PMT = Monthly contribution
- r = Monthly growth rate (annual rate / 12)
- n = Total months (years × 12)
```

### Required Monthly Contribution
```typescript
PMT = Target Amount / ((1 + r)^n - 1) / r
```

## 🔐 Security Features

- Client-side form validation
- Secure authentication flow
- Data encryption ready (localStorage for demo)
- POPIA compliance messaging
- Role-based access control

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: React 18
- **Build Tool**: Webpack (Next.js)
- **Deployment**: Vercel-ready

## 📱 Screenshots

| Feature | Screenshot |
|---------|------------|
| Landing Page | ![Home](https://github.com/user-attachments/assets/3e92e9dd-dd6d-4319-986c-b70f238c5f51) |
| Adviser Login | ![Login](https://github.com/user-attachments/assets/92b20379-7897-4863-86e8-34f04e98fe17) |
| Dashboard | ![Dashboard](https://github.com/user-attachments/assets/7519fc0d-485b-451b-87f1-db34badfb572) |
| Client Wizard | ![Wizard](https://github.com/user-attachments/assets/d8283324-bcc4-48a3-a374-250b37f4ef36) |

## 🔮 Future Enhancements

- [ ] Backend API integration (PostgreSQL/MongoDB)
- [ ] PDF report generation with react-pdf
- [ ] Real JWT authentication
- [ ] Client self-service portal
- [ ] Banking API integrations
- [ ] Advanced data visualizations (Recharts/Chart.js)
- [ ] AI-powered recommendations
- [ ] Tax planning calculator
- [ ] Email notifications
- [ ] Mobile app (React Native)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sachin Meena**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for South African Financial Advisers