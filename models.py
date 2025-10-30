"""
Data models for the Financial Planning Application
"""
from datetime import datetime
from typing import List, Dict, Optional
from dataclasses import dataclass, field
from enum import Enum


class GoalType(Enum):
    """Types of financial goals"""
    HOUSE_PURCHASE = "house_purchase"
    EDUCATION = "education"
    RETIREMENT = "retirement"
    EMERGENCY_FUND = "emergency_fund"
    INVESTMENT = "investment"
    DEBT_REPAYMENT = "debt_repayment"
    OTHER = "other"


class GoalStatus(Enum):
    """Status of goal achievability"""
    ACHIEVABLE = "achievable"
    CHALLENGING = "challenging"
    NOT_ACHIEVABLE = "not_achievable"
    NEEDS_ADJUSTMENT = "needs_adjustment"


@dataclass
class Income:
    """Represents a source of income"""
    source: str
    amount: float
    frequency: str  # monthly, annually
    is_guaranteed: bool = True
    
    def monthly_amount(self) -> float:
        """Convert to monthly amount"""
        if self.frequency.lower() == 'annually':
            return self.amount / 12
        return self.amount


@dataclass
class Expense:
    """Represents an expense"""
    category: str
    amount: float
    frequency: str  # monthly, annually
    is_essential: bool = True
    
    def monthly_amount(self) -> float:
        """Convert to monthly amount"""
        if self.frequency.lower() == 'annually':
            return self.amount / 12
        return self.amount


@dataclass
class Asset:
    """Represents an asset"""
    name: str
    asset_type: str  # property, investment, savings, vehicle, etc.
    current_value: float
    growth_rate: float = 0.0  # Annual growth rate as percentage
    is_liquid: bool = False


@dataclass
class FinancialGoal:
    """Represents a financial goal"""
    goal_id: str
    goal_type: GoalType
    name: str
    target_amount: float
    target_date: str  # ISO format date
    priority: int = 1  # 1 is highest priority
    current_savings: float = 0.0
    monthly_contribution: float = 0.0
    notes: str = ""
    
    def months_until_target(self) -> int:
        """Calculate months until target date"""
        target = datetime.fromisoformat(self.target_date)
        now = datetime.now()
        months = (target.year - now.year) * 12 + (target.month - now.month)
        return max(0, months)
    
    def required_monthly_savings(self) -> float:
        """Calculate required monthly savings"""
        months = self.months_until_target()
        if months <= 0:
            return 0.0
        remaining_amount = self.target_amount - self.current_savings
        return max(0, remaining_amount / months)


@dataclass
class Client:
    """Represents a client (individual or family)"""
    client_id: str
    name: str
    client_type: str  # individual, family
    age: int
    dependents: int = 0
    incomes: List[Income] = field(default_factory=list)
    expenses: List[Expense] = field(default_factory=list)
    assets: List[Asset] = field(default_factory=list)
    liabilities: List[Dict] = field(default_factory=list)
    goals: List[FinancialGoal] = field(default_factory=list)
    risk_tolerance: str = "moderate"  # conservative, moderate, aggressive
    
    def total_monthly_income(self) -> float:
        """Calculate total monthly income"""
        return sum(income.monthly_amount() for income in self.incomes)
    
    def total_monthly_expenses(self) -> float:
        """Calculate total monthly expenses"""
        return sum(expense.monthly_amount() for expense in self.expenses)
    
    def monthly_surplus(self) -> float:
        """Calculate monthly surplus/deficit"""
        return self.total_monthly_income() - self.total_monthly_expenses()
    
    def total_assets_value(self) -> float:
        """Calculate total value of assets"""
        return sum(asset.current_value for asset in self.assets)
    
    def total_liabilities(self) -> float:
        """Calculate total liabilities"""
        return sum(liability.get('amount', 0) for liability in self.liabilities)
    
    def net_worth(self) -> float:
        """Calculate net worth"""
        return self.total_assets_value() - self.total_liabilities()
