
import { CalculatorDef } from '../types';
import { FINANCE_CALCULATORS as LEGACY_FINANCE } from '../calculators/finance';
import { HEALTH_CALCULATORS as LEGACY_HEALTH } from '../calculators/health';
import { UTILITY_CALCULATORS as LEGACY_UTILITY } from '../calculators/utility';
import { ENGINEERING_CALCULATORS as LEGACY_ENGINEERING } from '../calculators/engineering';

// Modular Math Registry
import { CIRCLE_CALCULATOR } from '../math_calculators/geometry/circle_calc';
import { BASIC_STATS_CALCULATOR } from '../math_calculators/statistics/basic_stats';
import { LINEAR_EQUATION_CALCULATOR } from '../math_calculators/algebra/linear_equation';
import { MATH_CALCULATORS as LEGACY_MATH } from '../calculators/math';

// Core Math Suite
import { BASIC_ARITHMETIC } from '../math_calculators/basic/standard';
import { SCIENTIFIC_ADVANCED } from '../math_calculators/scientific/advanced';
import { MATRIX_CALCULATOR } from '../math_calculators/algebra/matrix';
import { COMPLEX_NUMBER_CALC } from '../math_calculators/advanced/complex';
import { EQUATION_SYSTEM_SOLVER } from '../math_calculators/algebra/equation_system';
import { PROBABILITY_CALC } from '../math_calculators/statistics/probability';
import { NUMBER_THEORY_CALC } from '../math_calculators/theory/number_theory';
import { TRIG_CALCULATOR } from '../math_calculators/scientific/trig_calc';
import { GRAPHING_CALC } from '../math_calculators/graphing/plotter';
import { FRACTION_CALC } from '../math_calculators/fractions/fraction_calc';
import { BASE_CONVERTER } from '../math_calculators/conversions/base_converter';

// Advanced Finance Suite
import { LOAN_EMI_CALC } from '../finance_calculators/loans/loan_emi';
import { LUMPSUM_CALC } from '../finance_calculators/investment/lumpsum';
import { NPV_CALC } from '../finance_calculators/investment/irr_npv';
import { US_TAX_CALC } from '../finance_calculators/tax/us_income_tax';
import { PAYROLL_CALC } from '../finance_calculators/salary/payroll_calc';
import { CRYPTO_PROFIT_CALC } from '../finance_calculators/investment/crypto_profit';
import { RETIREMENT_CALC } from '../finance_calculators/retirement/retirement_planner';

// Health & Fitness Suite
import { BMI_CALC } from '../health_calculators/fitness/bmi_calc';
import { BODY_FAT_CALC } from '../health_calculators/fitness/body_fat';
import { HEART_RATE_CALC } from '../health_calculators/fitness/heart_rate';
import { DOSAGE_CALC } from '../health_calculators/medical/dosage_calc';
import { PREGNANCY_CALC } from '../health_calculators/medical/pregnancy_calc';
import { SLEEP_CALC } from '../health_calculators/lifestyle/sleep_calc';

// Engineering & Science Suite
import { PROJECTILE_MOTION_CALC } from '../engineering_calculators/physics/motion_calc';
import { MOLARITY_CALC } from '../engineering_calculators/chemistry/molarity_calc';
import { RC_FILTER_CALC } from '../engineering_calculators/electronics/filter_calc';
import { CONCRETE_CALC } from '../engineering_calculators/civil/concrete_calc';
import { STRESS_STRAIN_CALC } from '../engineering_calculators/mechanical/stress_calc';

// Utility & Time Suite
import { AGE_CALCULATOR } from '../utility_calculators/time/age_calc';
import { TIMEZONE_CALCULATOR } from '../utility_calculators/time/timezone_calc';
import { UNIVERSAL_CONVERTER } from '../utility_calculators/conversions/universal_units';
import { CURRENCY_CONVERTER } from '../utility_calculators/finance/currency_calc';
import { PERCENTAGE_PRO } from '../utility_calculators/math/percentage_pro';

// Advanced / Power Suite
import { FORMULA_BUILDER } from '../advanced_calculators/formula_builder/calc';
import { SYMBOLIC_MATH } from '../advanced_calculators/symbolic/calc';
import { SCENARIO_COMPARISON } from '../advanced_calculators/comparison/calc';
import { MONTE_CARLO_SIM } from '../advanced_calculators/simulations/monte_carlo';
import { API_BRIDGE } from '../advanced_calculators/api/connector';

const RAW_CALCULATORS: CalculatorDef[] = [
  ...LEGACY_FINANCE,
  LOAN_EMI_CALC,
  LUMPSUM_CALC,
  NPV_CALC,
  US_TAX_CALC,
  PAYROLL_CALC,
  CRYPTO_PROFIT_CALC,
  RETIREMENT_CALC,
  ...LEGACY_HEALTH,
  BMI_CALC,
  BODY_FAT_CALC,
  HEART_RATE_CALC,
  DOSAGE_CALC,
  PREGNANCY_CALC,
  SLEEP_CALC,
  ...LEGACY_ENGINEERING,
  PROJECTILE_MOTION_CALC,
  MOLARITY_CALC,
  RC_FILTER_CALC,
  CONCRETE_CALC,
  STRESS_STRAIN_CALC,
  ...LEGACY_UTILITY,
  AGE_CALCULATOR,
  TIMEZONE_CALCULATOR,
  UNIVERSAL_CONVERTER,
  CURRENCY_CONVERTER,
  PERCENTAGE_PRO,
  FORMULA_BUILDER,
  SYMBOLIC_MATH,
  SCENARIO_COMPARISON,
  MONTE_CARLO_SIM,
  API_BRIDGE,
  BASIC_ARITHMETIC,
  SCIENTIFIC_ADVANCED,
  FRACTION_CALC,
  BASE_CONVERTER,
  TRIG_CALCULATOR,
  GRAPHING_CALC,
  CIRCLE_CALCULATOR,
  BASIC_STATS_CALCULATOR,
  LINEAR_EQUATION_CALCULATOR,
  MATRIX_CALCULATOR,
  COMPLEX_NUMBER_CALC,
  EQUATION_SYSTEM_SOLVER,
  PROBABILITY_CALC,
  NUMBER_THEORY_CALC,
  ...LEGACY_MATH
];

// Safety Wrapper: Ensures calculations don't throw errors that break the app
export const CALCULATORS = RAW_CALCULATORS.map(calc => ({
  ...calc,
  calculate: (inputs: Record<string, any>) => {
    try {
      const result = calc.calculate(inputs);
      // Deep sanitization of results
      Object.keys(result).forEach(key => {
        if (typeof result[key] === 'number' && !isFinite(result[key])) {
          result[key] = 'Error: Range exceeded';
        }
      });
      return result;
    } catch (e) {
      console.error(`Calculation failed for ${calc.id}:`, e);
      return { error: true, message: 'Computation failed' };
    }
  }
}));

export const getCalculator = (id: string) => CALCULATORS.find(c => c.id === id);

export const getCalculatorsByCategory = () => {
  const grouped: Record<string, CalculatorDef[]> = {};
  CALCULATORS.forEach(calc => {
    if (!grouped[calc.category]) grouped[calc.category] = [];
    grouped[calc.category].push(calc);
  });
  return grouped;
};
