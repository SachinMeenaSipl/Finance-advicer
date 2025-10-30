"""
Test script for Financial Planning Application
"""
import sys
sys.path.insert(0, '/home/runner/work/Finance-advicer/Finance-advicer')

from models import Client, Income, Expense, Asset, FinancialGoal, GoalType
from financial_planner import FinancialPlanner
from datetime import datetime, timedelta
import uuid


def test_client_creation():
    """Test creating a client"""
    print("Testing client creation...")
    client = Client(
        client_id="test-001",
        name="Test Client",
        client_type="individual",
        age=30,
        dependents=0
    )
    assert client.name == "Test Client"
    assert client.age == 30
    print("✓ Client creation test passed")


def test_cash_flow_calculation():
    """Test cash flow calculations"""
    print("\nTesting cash flow calculations...")
    client = Client(
        client_id="test-002",
        name="Cash Flow Test",
        client_type="individual",
        age=30
    )
    
    client.incomes = [
        Income(source="Salary", amount=50000, frequency="monthly"),
        Income(source="Bonus", amount=60000, frequency="annually")
    ]
    
    client.expenses = [
        Expense(category="Rent", amount=15000, frequency="monthly"),
        Expense(category="Insurance", amount=12000, frequency="annually")
    ]
    
    total_income = client.total_monthly_income()
    total_expenses = client.total_monthly_expenses()
    surplus = client.monthly_surplus()
    
    assert total_income == 55000  # 50000 + (60000/12)
    assert total_expenses == 16000  # 15000 + (12000/12)
    assert surplus == 39000
    print(f"  Monthly Income: R{total_income:,.2f}")
    print(f"  Monthly Expenses: R{total_expenses:,.2f}")
    print(f"  Monthly Surplus: R{surplus:,.2f}")
    print("✓ Cash flow calculation test passed")


def test_net_worth_calculation():
    """Test net worth calculations"""
    print("\nTesting net worth calculations...")
    client = Client(
        client_id="test-003",
        name="Net Worth Test",
        client_type="individual",
        age=40
    )
    
    client.assets = [
        Asset(name="House", asset_type="property", current_value=2000000),
        Asset(name="Savings", asset_type="savings", current_value=100000, is_liquid=True),
        Asset(name="Retirement", asset_type="investment", current_value=500000)
    ]
    
    client.liabilities = [
        {"type": "Mortgage", "amount": 1500000},
        {"type": "Car Loan", "amount": 200000}
    ]
    
    total_assets = client.total_assets_value()
    total_liabilities = client.total_liabilities()
    net_worth = client.net_worth()
    
    assert total_assets == 2600000
    assert total_liabilities == 1700000
    assert net_worth == 900000
    print(f"  Total Assets: R{total_assets:,.2f}")
    print(f"  Total Liabilities: R{total_liabilities:,.2f}")
    print(f"  Net Worth: R{net_worth:,.2f}")
    print("✓ Net worth calculation test passed")


def test_goal_feasibility():
    """Test goal feasibility assessment"""
    print("\nTesting goal feasibility assessment...")
    client = Client(
        client_id="test-004",
        name="Goal Test",
        client_type="family",
        age=35
    )
    
    client.incomes = [
        Income(source="Salary", amount=80000, frequency="monthly")
    ]
    
    client.expenses = [
        Expense(category="Living", amount=50000, frequency="monthly")
    ]
    
    # Achievable goal
    target_date = (datetime.now() + timedelta(days=365*5)).strftime("%Y-%m-%d")
    goal = FinancialGoal(
        goal_id="goal-001",
        goal_type=GoalType.HOUSE_PURCHASE,
        name="House Down Payment",
        target_amount=500000,
        target_date=target_date,
        priority=1,
        current_savings=100000
    )
    
    client.goals.append(goal)
    
    planner = FinancialPlanner(client)
    assessment = planner.assess_goal_feasibility(goal)
    
    print(f"  Goal: {assessment['goal_name']}")
    print(f"  Target: R{assessment['target_amount']:,.2f}")
    print(f"  Months Available: {assessment['months_available']}")
    print(f"  Required Monthly: R{assessment['required_monthly_with_returns']:,.2f}")
    print(f"  Status: {assessment['status']}")
    print(f"  Confidence: {assessment['confidence']}")
    
    assert assessment['status'] in ['achievable', 'challenging', 'not_achievable']
    print("✓ Goal feasibility test passed")


def test_savings_plan():
    """Test savings plan generation"""
    print("\nTesting savings plan generation...")
    client = Client(
        client_id="test-005",
        name="Savings Plan Test",
        client_type="family",
        age=40
    )
    
    client.incomes = [
        Income(source="Income", amount=100000, frequency="monthly")
    ]
    
    client.expenses = [
        Expense(category="Expenses", amount=60000, frequency="monthly")
    ]
    
    # Add multiple goals
    target_date_1 = (datetime.now() + timedelta(days=365*2)).strftime("%Y-%m-%d")
    target_date_2 = (datetime.now() + timedelta(days=365*5)).strftime("%Y-%m-%d")
    
    client.goals = [
        FinancialGoal(
            goal_id="g1",
            goal_type=GoalType.EMERGENCY_FUND,
            name="Emergency Fund",
            target_amount=360000,
            target_date=target_date_1,
            priority=1,
            current_savings=0
        ),
        FinancialGoal(
            goal_id="g2",
            goal_type=GoalType.RETIREMENT,
            name="Retirement",
            target_amount=3000000,
            target_date=target_date_2,
            priority=2,
            current_savings=0
        )
    ]
    
    planner = FinancialPlanner(client)
    savings_plan = planner.create_savings_plan()
    
    print(f"  Total Surplus: R{savings_plan['total_monthly_surplus']:,.2f}")
    print(f"  Total Allocated: R{savings_plan['total_allocated']:,.2f}")
    print(f"  Allocations:")
    for allocation in savings_plan['allocations']:
        print(f"    - {allocation['goal_name']}: R{allocation['allocated']:,.2f}")
    
    assert savings_plan['total_monthly_surplus'] == 40000
    print("✓ Savings plan test passed")


def test_recommendations():
    """Test recommendation generation"""
    print("\nTesting recommendation generation...")
    client = Client(
        client_id="test-006",
        name="Recommendations Test",
        client_type="individual",
        age=30
    )
    
    client.incomes = [
        Income(source="Salary", amount=50000, frequency="monthly")
    ]
    
    client.expenses = [
        Expense(category="Expenses", amount=30000, frequency="monthly")
    ]
    
    client.assets = [
        Asset(name="Savings", asset_type="savings", current_value=50000, is_liquid=True)
    ]
    
    planner = FinancialPlanner(client)
    recommendations = planner.generate_recommendations()
    
    print(f"  Generated {len(recommendations)} recommendations:")
    for rec in recommendations:
        print(f"    - {rec}")
    
    assert len(recommendations) > 0
    print("✓ Recommendations test passed")


def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("Financial Planning Application - Test Suite")
    print("=" * 60)
    
    try:
        test_client_creation()
        test_cash_flow_calculation()
        test_net_worth_calculation()
        test_goal_feasibility()
        test_savings_plan()
        test_recommendations()
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED")
        print("=" * 60)
        return 0
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
        return 1
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(run_all_tests())
