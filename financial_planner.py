"""
Financial Planning Engine - Core calculation and analysis logic
"""
from typing import List, Dict, Tuple
from models import Client, FinancialGoal, GoalStatus, GoalType
import math


class FinancialPlanner:
    """Core financial planning and analysis engine"""
    
    def __init__(self, client: Client):
        self.client = client
        self.inflation_rate = 0.055  # South Africa average ~5.5%
        self.default_investment_return = 0.08  # Conservative estimate
    
    def analyze_cash_flow(self) -> Dict:
        """Analyze client's cash flow"""
        monthly_income = self.client.total_monthly_income()
        monthly_expenses = self.client.total_monthly_expenses()
        surplus = self.client.monthly_surplus()
        
        return {
            'monthly_income': round(monthly_income, 2),
            'monthly_expenses': round(monthly_expenses, 2),
            'monthly_surplus': round(surplus, 2),
            'surplus_percentage': round((surplus / monthly_income * 100) if monthly_income > 0 else 0, 2),
            'annual_surplus': round(surplus * 12, 2)
        }
    
    def analyze_net_worth(self) -> Dict:
        """Analyze client's net worth"""
        total_assets = self.client.total_assets_value()
        total_liabilities = self.client.total_liabilities()
        net_worth = self.client.net_worth()
        
        liquid_assets = sum(
            asset.current_value for asset in self.client.assets if asset.is_liquid
        )
        
        return {
            'total_assets': round(total_assets, 2),
            'total_liabilities': round(total_liabilities, 2),
            'net_worth': round(net_worth, 2),
            'liquid_assets': round(liquid_assets, 2),
            'debt_to_asset_ratio': round((total_liabilities / total_assets * 100) if total_assets > 0 else 0, 2)
        }
    
    def assess_goal_feasibility(self, goal: FinancialGoal) -> Dict:
        """Assess if a financial goal is achievable"""
        months_available = goal.months_until_target()
        required_monthly = goal.required_monthly_savings()
        current_surplus = self.client.monthly_surplus()
        
        # Calculate with investment returns
        if months_available > 0:
            monthly_rate = self.default_investment_return / 12
            # Future value of current savings with growth
            fv_current = goal.current_savings * math.pow(1 + monthly_rate, months_available)
            
            # Required monthly payment to reach goal
            if monthly_rate > 0 and months_available > 0:
                denominator = math.pow(1 + monthly_rate, months_available) - 1
                if abs(denominator) > 0.0001:  # Avoid division by near-zero
                    required_with_returns = (goal.target_amount - fv_current) * monthly_rate / denominator
                else:
                    required_with_returns = (goal.target_amount - fv_current) / months_available
            else:
                required_with_returns = (goal.target_amount - fv_current) / months_available
            
            required_with_returns = max(0, required_with_returns)
        else:
            required_with_returns = required_monthly
            fv_current = goal.current_savings
        
        # Determine feasibility
        if required_with_returns <= current_surplus * 0.5:
            status = GoalStatus.ACHIEVABLE
            confidence = "high"
        elif required_with_returns <= current_surplus * 0.8:
            status = GoalStatus.ACHIEVABLE
            confidence = "moderate"
        elif required_with_returns <= current_surplus:
            status = GoalStatus.CHALLENGING
            confidence = "low"
        else:
            status = GoalStatus.NOT_ACHIEVABLE
            confidence = "very low"
        
        # Calculate shortfall
        shortfall = max(0, required_with_returns - current_surplus)
        
        return {
            'goal_id': goal.goal_id,
            'goal_name': goal.name,
            'target_amount': round(goal.target_amount, 2),
            'current_savings': round(goal.current_savings, 2),
            'months_available': months_available,
            'required_monthly_simple': round(required_monthly, 2),
            'required_monthly_with_returns': round(required_with_returns, 2),
            'current_surplus': round(current_surplus, 2),
            'status': status.value,
            'confidence': confidence,
            'shortfall': round(shortfall, 2),
            'achievability_percentage': round(min(100, (current_surplus / required_with_returns * 100) if required_with_returns > 0 else 100), 2)
        }
    
    def analyze_all_goals(self) -> List[Dict]:
        """Analyze all client goals"""
        results = []
        for goal in self.client.goals:
            assessment = self.assess_goal_feasibility(goal)
            results.append(assessment)
        
        # Sort by priority
        results.sort(key=lambda x: next(
            (g.priority for g in self.client.goals if g.goal_id == x['goal_id']), 999
        ))
        
        return results
    
    def create_savings_plan(self) -> Dict:
        """Create a comprehensive savings plan for all goals"""
        total_surplus = self.client.monthly_surplus()
        goal_assessments = self.analyze_all_goals()
        
        # Allocate surplus to goals by priority
        allocated_amount = 0
        allocations = []
        
        for assessment in goal_assessments:
            goal = next((g for g in self.client.goals if g.goal_id == assessment['goal_id']), None)
            if not goal:
                continue
            
            required = assessment['required_monthly_with_returns']
            available = total_surplus - allocated_amount
            
            if available > 0:
                allocation = min(required, available)
                allocated_amount += allocation
                
                allocations.append({
                    'goal_id': goal.goal_id,
                    'goal_name': goal.name,
                    'priority': goal.priority,
                    'required': round(required, 2),
                    'allocated': round(allocation, 2),
                    'shortfall': round(max(0, required - allocation), 2)
                })
            else:
                allocations.append({
                    'goal_id': goal.goal_id,
                    'goal_name': goal.name,
                    'priority': goal.priority,
                    'required': round(required, 2),
                    'allocated': 0,
                    'shortfall': round(required, 2)
                })
        
        return {
            'total_monthly_surplus': round(total_surplus, 2),
            'total_allocated': round(allocated_amount, 2),
            'remaining_surplus': round(total_surplus - allocated_amount, 2),
            'allocations': allocations
        }
    
    def generate_recommendations(self) -> List[str]:
        """Generate financial recommendations for the client"""
        recommendations = []
        
        cash_flow = self.analyze_cash_flow()
        net_worth = self.analyze_net_worth()
        
        # Cash flow recommendations
        if cash_flow['monthly_surplus'] < 0:
            recommendations.append("⚠️ Your expenses exceed income. Immediate budget review needed.")
        elif cash_flow['surplus_percentage'] < 10:
            recommendations.append("💡 Consider reducing discretionary expenses to increase savings rate.")
        elif cash_flow['surplus_percentage'] > 30:
            recommendations.append("✅ Excellent savings rate! Consider increasing investment contributions.")
        
        # Emergency fund check
        has_emergency_fund = any(
            goal.goal_type == GoalType.EMERGENCY_FUND for goal in self.client.goals
        )
        if not has_emergency_fund:
            target_emergency = cash_flow['monthly_expenses'] * 6
            recommendations.append(
                f"💰 Build an emergency fund of R{target_emergency:,.2f} (6 months expenses)."
            )
        
        # Debt recommendations
        if net_worth['debt_to_asset_ratio'] > 50:
            recommendations.append("📉 High debt-to-asset ratio. Prioritize debt reduction.")
        
        # Goal-specific recommendations
        goal_assessments = self.analyze_all_goals()
        not_achievable = [g for g in goal_assessments if g['status'] == GoalStatus.NOT_ACHIEVABLE.value]
        
        if not_achievable:
            recommendations.append(
                f"🎯 {len(not_achievable)} goal(s) need timeline or amount adjustments."
            )
        
        # Investment recommendations
        liquid_ratio = net_worth['liquid_assets'] / net_worth['total_assets'] * 100 if net_worth['total_assets'] > 0 else 0
        if liquid_ratio < 20:
            recommendations.append("💼 Consider increasing liquid assets for financial flexibility.")
        
        return recommendations
    
    def get_comprehensive_analysis(self) -> Dict:
        """Get complete financial analysis"""
        return {
            'client_info': {
                'name': self.client.name,
                'type': self.client.client_type,
                'age': self.client.age,
                'dependents': self.client.dependents,
                'risk_tolerance': self.client.risk_tolerance
            },
            'cash_flow': self.analyze_cash_flow(),
            'net_worth': self.analyze_net_worth(),
            'goals_analysis': self.analyze_all_goals(),
            'savings_plan': self.create_savings_plan(),
            'recommendations': self.generate_recommendations()
        }
