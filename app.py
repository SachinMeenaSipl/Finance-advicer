"""
Flask REST API for Financial Planning Application

⚠️ SECURITY NOTICE:
This application uses in-memory storage for demonstration purposes only.
For production use, implement:
- Proper database storage (PostgreSQL, MySQL, etc.)
- Data encryption for sensitive financial information
- User authentication and authorization (OAuth2, JWT)
- Input validation and sanitization
- HTTPS/TLS encryption for API communication
- Rate limiting and API security best practices
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import Client, Income, Expense, Asset, FinancialGoal, GoalType
from financial_planner import FinancialPlanner
from typing import Dict
import uuid


app = Flask(__name__)
CORS(app)

# In-memory storage (⚠️ DEMO ONLY - Use a database in production)
clients_db: Dict[str, Client] = {}


def create_sample_client():
    """Create a sample client for demonstration"""
    client_id = str(uuid.uuid4())
    
    client = Client(
        client_id=client_id,
        name="John and Mary Smith",
        client_type="family",
        age=35,
        dependents=2,
        risk_tolerance="moderate"
    )
    
    # Add incomes
    client.incomes = [
        Income(source="John's Salary", amount=45000, frequency="monthly", is_guaranteed=True),
        Income(source="Mary's Salary", amount=35000, frequency="monthly", is_guaranteed=True),
    ]
    
    # Add expenses
    client.expenses = [
        Expense(category="Housing", amount=15000, frequency="monthly", is_essential=True),
        Expense(category="Groceries", amount=8000, frequency="monthly", is_essential=True),
        Expense(category="Transportation", amount=5000, frequency="monthly", is_essential=True),
        Expense(category="Utilities", amount=3000, frequency="monthly", is_essential=True),
        Expense(category="Insurance", amount=4000, frequency="monthly", is_essential=True),
        Expense(category="Entertainment", amount=4000, frequency="monthly", is_essential=False),
        Expense(category="Education", amount=6000, frequency="monthly", is_essential=True),
    ]
    
    # Add assets
    client.assets = [
        Asset(name="Family Home", asset_type="property", current_value=2500000, growth_rate=6.0, is_liquid=False),
        Asset(name="Emergency Savings", asset_type="savings", current_value=50000, growth_rate=5.0, is_liquid=True),
        Asset(name="Retirement Fund", asset_type="investment", current_value=350000, growth_rate=10.0, is_liquid=False),
        Asset(name="Vehicle", asset_type="vehicle", current_value=180000, growth_rate=-10.0, is_liquid=False),
    ]
    
    # Add liabilities
    client.liabilities = [
        {"type": "Home Loan", "amount": 1800000, "monthly_payment": 15000},
        {"type": "Car Loan", "amount": 120000, "monthly_payment": 3500},
    ]
    
    # Add goals
    client.goals = [
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.EMERGENCY_FUND,
            name="Emergency Fund",
            target_amount=270000,  # 6 months expenses
            target_date="2026-12-31",
            priority=1,
            current_savings=50000,
            monthly_contribution=5000
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.EDUCATION,
            name="Children's University Education",
            target_amount=800000,
            target_date="2035-01-01",
            priority=2,
            current_savings=0,
            monthly_contribution=3000
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.RETIREMENT,
            name="Retirement at 65",
            target_amount=5000000,
            target_date="2054-12-31",
            priority=3,
            current_savings=350000,
            monthly_contribution=8000
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.HOUSE_PURCHASE,
            name="Holiday Home",
            target_amount=1500000,
            target_date="2032-06-30",
            priority=4,
            current_savings=0,
            monthly_contribution=5000
        ),
    ]
    
    clients_db[client_id] = client
    return client


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Financial Planning API'})


@app.route('/api/clients', methods=['POST'])
def create_client():
    """Create a new client"""
    data = request.json
    
    client_id = str(uuid.uuid4())
    client = Client(
        client_id=client_id,
        name=data.get('name', ''),
        client_type=data.get('client_type', 'individual'),
        age=data.get('age', 30),
        dependents=data.get('dependents', 0),
        risk_tolerance=data.get('risk_tolerance', 'moderate')
    )
    
    clients_db[client_id] = client
    
    return jsonify({
        'success': True,
        'client_id': client_id,
        'message': 'Client created successfully'
    }), 201


@app.route('/api/clients/<client_id>', methods=['GET'])
def get_client(client_id):
    """Get client information"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    return jsonify({
        'client_id': client.client_id,
        'name': client.name,
        'client_type': client.client_type,
        'age': client.age,
        'dependents': client.dependents,
        'risk_tolerance': client.risk_tolerance,
        'income_count': len(client.incomes),
        'expense_count': len(client.expenses),
        'asset_count': len(client.assets),
        'goal_count': len(client.goals)
    })


@app.route('/api/clients/<client_id>/analysis', methods=['GET'])
def analyze_client(client_id):
    """Get comprehensive financial analysis for a client"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    planner = FinancialPlanner(client)
    analysis = planner.get_comprehensive_analysis()
    
    return jsonify(analysis)


@app.route('/api/clients/<client_id>/incomes', methods=['POST'])
def add_income(client_id):
    """Add income to a client"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.json
    income = Income(
        source=data.get('source', ''),
        amount=float(data.get('amount', 0)),
        frequency=data.get('frequency', 'monthly'),
        is_guaranteed=data.get('is_guaranteed', True)
    )
    
    client.incomes.append(income)
    
    return jsonify({'success': True, 'message': 'Income added successfully'}), 201


@app.route('/api/clients/<client_id>/expenses', methods=['POST'])
def add_expense(client_id):
    """Add expense to a client"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.json
    expense = Expense(
        category=data.get('category', ''),
        amount=float(data.get('amount', 0)),
        frequency=data.get('frequency', 'monthly'),
        is_essential=data.get('is_essential', True)
    )
    
    client.expenses.append(expense)
    
    return jsonify({'success': True, 'message': 'Expense added successfully'}), 201


@app.route('/api/clients/<client_id>/assets', methods=['POST'])
def add_asset(client_id):
    """Add asset to a client"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.json
    asset = Asset(
        name=data.get('name', ''),
        asset_type=data.get('asset_type', ''),
        current_value=float(data.get('current_value', 0)),
        growth_rate=float(data.get('growth_rate', 0)),
        is_liquid=data.get('is_liquid', False)
    )
    
    client.assets.append(asset)
    
    return jsonify({'success': True, 'message': 'Asset added successfully'}), 201


@app.route('/api/clients/<client_id>/goals', methods=['POST'])
def add_goal(client_id):
    """Add financial goal to a client"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.json
    goal = FinancialGoal(
        goal_id=str(uuid.uuid4()),
        goal_type=GoalType(data.get('goal_type', 'other')),
        name=data.get('name', ''),
        target_amount=float(data.get('target_amount', 0)),
        target_date=data.get('target_date', ''),
        priority=int(data.get('priority', 1)),
        current_savings=float(data.get('current_savings', 0)),
        monthly_contribution=float(data.get('monthly_contribution', 0)),
        notes=data.get('notes', '')
    )
    
    client.goals.append(goal)
    
    return jsonify({'success': True, 'goal_id': goal.goal_id, 'message': 'Goal added successfully'}), 201


@app.route('/api/clients/<client_id>/goals/<goal_id>/assessment', methods=['GET'])
def assess_goal(client_id, goal_id):
    """Assess feasibility of a specific goal"""
    client = clients_db.get(client_id)
    
    if not client:
        return jsonify({'error': 'Client not found'}), 404
    
    goal = next((g for g in client.goals if g.goal_id == goal_id), None)
    
    if not goal:
        return jsonify({'error': 'Goal not found'}), 404
    
    planner = FinancialPlanner(client)
    assessment = planner.assess_goal_feasibility(goal)
    
    return jsonify(assessment)


@app.route('/api/demo/create', methods=['POST'])
def create_demo_client():
    """Create a demo client with sample data"""
    client = create_sample_client()
    
    return jsonify({
        'success': True,
        'client_id': client.client_id,
        'message': 'Demo client created successfully',
        'name': client.name
    }), 201


@app.route('/api/clients', methods=['GET'])
def list_clients():
    """List all clients"""
    clients_list = [
        {
            'client_id': client.client_id,
            'name': client.name,
            'client_type': client.client_type,
            'age': client.age
        }
        for client in clients_db.values()
    ]
    
    return jsonify({'clients': clients_list, 'count': len(clients_list)})


if __name__ == '__main__':
    # Create a demo client on startup
    print("Creating demo client...")
    demo_client = create_sample_client()
    print(f"Demo client created with ID: {demo_client.client_id}")
    print(f"Access analysis at: http://localhost:5000/api/clients/{demo_client.client_id}/analysis")
    print("\n⚠️  Running in development mode. For production, use a production WSGI server like Gunicorn.")
    
    # Use debug=False for security. Enable only during development if needed.
    import os
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
