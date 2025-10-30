# Financial Planning Application for South Africa 🏦

A comprehensive digital tool designed for financial advisers in South Africa to help their clients (individuals or families) plan their finances, set life goals, and assess goal achievability based on income, expenses, and assets.

## Features ✨

### Core Functionality
- **Client Management**: Track individual and family client profiles with comprehensive financial data
- **Financial Goal Setting**: Support for multiple goal types:
  - House Purchase 🏠
  - Education Savings 🎓
  - Retirement Planning 👴
  - Emergency Fund 💰
  - Investment Goals 📈
  - Debt Repayment 💳
  - Custom Goals

### Financial Analysis
- **Cash Flow Analysis**: Real-time income vs. expense tracking with surplus calculations
- **Net Worth Assessment**: Complete asset and liability tracking with debt-to-asset ratios
- **Goal Feasibility Analysis**: AI-powered assessment of goal achievability with confidence levels
- **Savings Plan Generation**: Automated allocation of surplus to goals based on priority
- **Financial Recommendations**: Intelligent suggestions tailored to South African market conditions

### Technical Features
- RESTful API for easy integration
- Web-based user interface
- Real-time calculations with investment return projections
- South African Rand (ZAR/R) currency support
- Inflation-adjusted projections (SA average ~5.5%)

## Installation 🚀

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/SachinMeenaSipl/Finance-advicer.git
   cd Finance-advicer
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Access the application**
   - API: http://localhost:5000
   - Web Interface: http://localhost:5000/static/index.html

## Quick Start 🎯

### Using the Web Interface

1. Start the application using `python app.py`
2. Open your browser to http://localhost:5000/static/index.html
3. Click "Create Demo Client" to generate a sample client with pre-populated data
4. Click "Load Analysis" to view comprehensive financial analysis
5. Review cash flow, net worth, goals, and recommendations

### Using the API

#### Create a Demo Client
```bash
curl -X POST http://localhost:5000/api/demo/create
```

#### Get Client Analysis
```bash
curl http://localhost:5000/api/clients/{client_id}/analysis
```

#### Create a New Client
```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "client_type": "individual",
    "age": 35,
    "dependents": 2,
    "risk_tolerance": "moderate"
  }'
```

#### Add Income
```bash
curl -X POST http://localhost:5000/api/clients/{client_id}/incomes \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Salary",
    "amount": 50000,
    "frequency": "monthly",
    "is_guaranteed": true
  }'
```

#### Add Expense
```bash
curl -X POST http://localhost:5000/api/clients/{client_id}/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Housing",
    "amount": 15000,
    "frequency": "monthly",
    "is_essential": true
  }'
```

#### Add Financial Goal
```bash
curl -X POST http://localhost:5000/api/clients/{client_id}/goals \
  -H "Content-Type: application/json" \
  -d '{
    "goal_type": "retirement",
    "name": "Retirement at 65",
    "target_amount": 5000000,
    "target_date": "2054-12-31",
    "priority": 1,
    "current_savings": 100000
  }'
```

## API Documentation 📚

### Endpoints

#### Health Check
- `GET /api/health` - Check API status

#### Client Management
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/{client_id}` - Get client details
- `GET /api/clients/{client_id}/analysis` - Get comprehensive financial analysis

#### Financial Data
- `POST /api/clients/{client_id}/incomes` - Add income source
- `POST /api/clients/{client_id}/expenses` - Add expense
- `POST /api/clients/{client_id}/assets` - Add asset
- `POST /api/clients/{client_id}/goals` - Add financial goal

#### Goal Assessment
- `GET /api/clients/{client_id}/goals/{goal_id}/assessment` - Assess specific goal

#### Demo
- `POST /api/demo/create` - Create demo client with sample data

## Project Structure 📁

```
Finance-advicer/
├── app.py                  # Flask API application
├── models.py              # Data models (Client, Income, Expense, etc.)
├── financial_planner.py   # Core financial analysis engine
├── requirements.txt       # Python dependencies
├── static/
│   └── index.html        # Web user interface
└── README.md             # This file
```

## Financial Calculations 💡

### Goal Feasibility Assessment
The application uses sophisticated algorithms to assess goal achievability:

1. **Simple Calculation**: `(Target Amount - Current Savings) / Months Available`
2. **Investment-Adjusted Calculation**: Factors in expected returns (8% annual default)
3. **Feasibility Scoring**:
   - **Achievable (High Confidence)**: Required savings ≤ 50% of surplus
   - **Achievable (Moderate)**: Required savings ≤ 80% of surplus
   - **Challenging**: Required savings ≤ 100% of surplus
   - **Not Achievable**: Required savings > surplus

### South African Market Context
- Default inflation rate: 5.5% (SA average)
- Conservative investment return: 8% annually
- Currency: South African Rand (ZAR/R)

## Example Use Cases 🎪

### Scenario 1: Young Family Planning
**Client**: Young couple (35 years old) with 2 children
**Goals**:
- Emergency fund (6 months expenses)
- Children's university education
- Retirement planning
- Holiday home purchase

**Analysis Provides**:
- Monthly surplus available: R35,000
- All goals assessed for feasibility
- Prioritized savings allocation
- Recommendations for expense reduction and income growth

### Scenario 2: Pre-Retirement Planning
**Client**: Individual (55 years old) nearing retirement
**Goals**:
- Retirement fund completion
- Debt-free status
- Medical insurance provision

**Analysis Provides**:
- Retirement readiness score
- Debt repayment timeline
- Asset reallocation suggestions

## Customization 🔧

### Adjusting Financial Parameters
Edit `financial_planner.py` to customize:
- `inflation_rate` - Default: 0.055 (5.5%)
- `default_investment_return` - Default: 0.08 (8%)

### Adding New Goal Types
Edit `models.py` to add new goal types to the `GoalType` enum:
```python
class GoalType(Enum):
    YOUR_NEW_GOAL = "your_new_goal"
```

## Security Notes 🔒

⚠️ **Important**: This application uses in-memory storage for demonstration purposes. For production use:
- Implement a proper database (PostgreSQL, MySQL, etc.)
- Add authentication and authorization
- Implement data encryption for sensitive financial information
- Add input validation and sanitization
- Use HTTPS for API communication

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available for educational and commercial use.

## Support 💬

For questions or support, please open an issue on GitHub.

## Acknowledgments 🙏

Built for financial advisers in South Africa to help their clients achieve their financial goals and build better financial futures.