"""
Example Usage of the Financial Planning Application
This script demonstrates how to use the application programmatically
"""
from models import Client, Income, Expense, Asset, FinancialGoal, GoalType
from financial_planner import FinancialPlanner
from datetime import datetime, timedelta
import uuid


def create_example_client():
    """Create an example client profile"""
    
    print("=" * 70)
    print("Creating Example Client Profile")
    print("=" * 70)
    
    # Create a client
    client = Client(
        client_id=str(uuid.uuid4()),
        name="Sarah and David Johnson",
        client_type="family",
        age=38,
        dependents=2,
        risk_tolerance="moderate"
    )
    
    # Add income sources
    client.incomes = [
        Income(
            source="Sarah - Software Engineer",
            amount=65000,
            frequency="monthly",
            is_guaranteed=True
        ),
        Income(
            source="David - Teacher",
            amount=42000,
            frequency="monthly",
            is_guaranteed=True
        ),
        Income(
            source="Freelance Work",
            amount=72000,
            frequency="annually",
            is_guaranteed=False
        )
    ]
    
    # Add monthly expenses
    client.expenses = [
        Expense(category="Housing (Bond)", amount=18000, frequency="monthly", is_essential=True),
        Expense(category="Groceries", amount=9000, frequency="monthly", is_essential=True),
        Expense(category="Transportation", amount=6000, frequency="monthly", is_essential=True),
        Expense(category="Utilities", amount=3500, frequency="monthly", is_essential=True),
        Expense(category="Medical Aid", amount=5500, frequency="monthly", is_essential=True),
        Expense(category="School Fees", amount=8000, frequency="monthly", is_essential=True),
        Expense(category="Insurance", amount=3000, frequency="monthly", is_essential=True),
        Expense(category="Entertainment", amount=5000, frequency="monthly", is_essential=False),
        Expense(category="Domestic Help", amount=4000, frequency="monthly", is_essential=False),
        Expense(category="Clothing", amount=3000, frequency="monthly", is_essential=False),
    ]
    
    # Add assets
    client.assets = [
        Asset(
            name="Family Home",
            asset_type="property",
            current_value=3200000,
            growth_rate=6.5,
            is_liquid=False
        ),
        Asset(
            name="Emergency Savings Account",
            asset_type="savings",
            current_value=75000,
            growth_rate=5.5,
            is_liquid=True
        ),
        Asset(
            name="Retirement Annuity (Sarah)",
            asset_type="investment",
            current_value=450000,
            growth_rate=10.0,
            is_liquid=False
        ),
        Asset(
            name="Retirement Annuity (David)",
            asset_type="investment",
            current_value=280000,
            growth_rate=10.0,
            is_liquid=False
        ),
        Asset(
            name="Unit Trusts",
            asset_type="investment",
            current_value=150000,
            growth_rate=9.0,
            is_liquid=True
        ),
        Asset(
            name="Vehicle (2020 SUV)",
            asset_type="vehicle",
            current_value=320000,
            growth_rate=-12.0,
            is_liquid=False
        ),
    ]
    
    # Add liabilities
    client.liabilities = [
        {"type": "Home Loan", "amount": 2400000, "monthly_payment": 18000},
        {"type": "Car Finance", "amount": 180000, "monthly_payment": 4500},
        {"type": "Personal Loan", "amount": 50000, "monthly_payment": 2500},
    ]
    
    # Define financial goals
    client.goals = [
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.EMERGENCY_FUND,
            name="Emergency Fund (6 months expenses)",
            target_amount=390000,  # 6 months of expenses
            target_date=(datetime.now() + timedelta(days=365*2)).strftime("%Y-%m-%d"),
            priority=1,
            current_savings=75000,
            notes="Priority: Build to cover 6 months of family expenses"
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.EDUCATION,
            name="Children's University Education Fund",
            target_amount=1200000,
            target_date=(datetime.now() + timedelta(days=365*10)).strftime("%Y-%m-%d"),
            priority=2,
            current_savings=0,
            notes="For both children's tertiary education"
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.RETIREMENT,
            name="Retirement at 65",
            target_amount=8000000,
            target_date=(datetime.now() + timedelta(days=365*27)).strftime("%Y-%m-%d"),
            priority=3,
            current_savings=730000,
            notes="Combined retirement target for comfortable lifestyle"
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.DEBT_REPAYMENT,
            name="Pay off Personal Loan",
            target_amount=50000,
            target_date=(datetime.now() + timedelta(days=365*1)).strftime("%Y-%m-%d"),
            priority=1,
            current_savings=0,
            notes="Clear high-interest debt"
        ),
        FinancialGoal(
            goal_id=str(uuid.uuid4()),
            goal_type=GoalType.HOUSE_PURCHASE,
            name="Holiday Home (Garden Route)",
            target_amount=2000000,
            target_date=(datetime.now() + timedelta(days=365*15)).strftime("%Y-%m-%d"),
            priority=4,
            current_savings=0,
            notes="Aspirational goal for retirement"
        ),
    ]
    
    return client


def display_analysis(client):
    """Display comprehensive financial analysis"""
    
    print("\n" + "=" * 70)
    print(f"FINANCIAL ANALYSIS FOR: {client.name}")
    print("=" * 70)
    
    # Create planner
    planner = FinancialPlanner(client)
    
    # Get comprehensive analysis
    analysis = planner.get_comprehensive_analysis()
    
    # Display Client Info
    print("\n📋 CLIENT INFORMATION")
    print("-" * 70)
    print(f"Type: {analysis['client_info']['type'].title()}")
    print(f"Age: {analysis['client_info']['age']} years")
    print(f"Dependents: {analysis['client_info']['dependents']}")
    print(f"Risk Tolerance: {analysis['client_info']['risk_tolerance'].title()}")
    
    # Display Cash Flow
    print("\n💰 CASH FLOW ANALYSIS")
    print("-" * 70)
    cf = analysis['cash_flow']
    print(f"Monthly Income:     R{cf['monthly_income']:>12,.2f}")
    print(f"Monthly Expenses:   R{cf['monthly_expenses']:>12,.2f}")
    print(f"                    {'-' * 20}")
    surplus_symbol = "+" if cf['monthly_surplus'] >= 0 else ""
    print(f"Monthly Surplus:    R{surplus_symbol}{cf['monthly_surplus']:>12,.2f}")
    print(f"Savings Rate:       {cf['surplus_percentage']:>13.1f}%")
    print(f"Annual Surplus:     R{cf['annual_surplus']:>12,.2f}")
    
    # Display Net Worth
    print("\n🏦 NET WORTH SUMMARY")
    print("-" * 70)
    nw = analysis['net_worth']
    print(f"Total Assets:       R{nw['total_assets']:>12,.2f}")
    print(f"Total Liabilities:  R{nw['total_liabilities']:>12,.2f}")
    print(f"                    {'-' * 20}")
    print(f"Net Worth:          R{nw['net_worth']:>12,.2f}")
    print(f"Liquid Assets:      R{nw['liquid_assets']:>12,.2f}")
    print(f"Debt-to-Asset:      {nw['debt_to_asset_ratio']:>13.1f}%")
    
    # Display Goals Analysis
    print("\n🎯 FINANCIAL GOALS ASSESSMENT")
    print("-" * 70)
    for i, goal in enumerate(analysis['goals_analysis'], 1):
        status_emoji = {
            'achievable': '✅',
            'challenging': '⚠️',
            'not_achievable': '❌'
        }
        print(f"\n{i}. {goal['goal_name']}")
        print(f"   Status: {status_emoji.get(goal['status'], '?')} {goal['status'].upper()} ({goal['confidence']} confidence)")
        print(f"   Target: R{goal['target_amount']:,.2f} in {goal['months_available']} months")
        print(f"   Current Savings: R{goal['current_savings']:,.2f}")
        print(f"   Required Monthly: R{goal['required_monthly_with_returns']:,.2f}")
        print(f"   Achievability: {goal['achievability_percentage']:.0f}%")
    
    # Display Savings Plan
    print("\n💼 RECOMMENDED SAVINGS ALLOCATION")
    print("-" * 70)
    sp = analysis['savings_plan']
    print(f"Available Monthly Surplus: R{sp['total_monthly_surplus']:,.2f}")
    print(f"\nAllocation by Priority:")
    for allocation in sp['allocations']:
        allocated_pct = (allocation['allocated'] / sp['total_monthly_surplus'] * 100) if sp['total_monthly_surplus'] > 0 else 0
        print(f"  Priority {allocation['priority']}: {allocation['goal_name']}")
        print(f"    Allocated: R{allocation['allocated']:,.2f} ({allocated_pct:.1f}%)")
        if allocation['shortfall'] > 0:
            print(f"    Shortfall: R{allocation['shortfall']:,.2f}")
    
    # Display Recommendations
    print("\n📊 FINANCIAL RECOMMENDATIONS")
    print("-" * 70)
    for i, rec in enumerate(analysis['recommendations'], 1):
        print(f"{i}. {rec}")
    
    print("\n" + "=" * 70)


def main():
    """Main function"""
    
    # Create example client
    client = create_example_client()
    
    # Display analysis
    display_analysis(client)
    
    print("\n✨ Analysis Complete!")
    print("\nThis example demonstrates:")
    print("  • Creating a comprehensive client profile")
    print("  • Adding income sources, expenses, assets, and liabilities")
    print("  • Setting multiple financial goals with priorities")
    print("  • Generating detailed financial analysis")
    print("  • Assessing goal feasibility")
    print("  • Creating optimized savings allocation plans")
    print("  • Generating personalized recommendations")
    print("\n" + "=" * 70)


if __name__ == "__main__":
    main()
