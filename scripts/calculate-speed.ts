/**
 * 3D Printing Speed and Kinematic Optimization Calculator
 * 
 * This module provides tools to calculate printing speeds based on flow rate
 * and perform kinematic optimization analysis to evaluate motion efficiency
 * across different acceleration profiles.
 */

export interface KinematicParameters {
  readonly flowRate: number;
  readonly nozzleWidth: number;
  readonly layerHeight: number;
  readonly mass: number;
  readonly speedOffset: number;
  readonly displacement: number;
  readonly baselineValue: number;
}

export interface KinematicResults {
  readonly actualSpeed: number;
  readonly massToGravityRatio: number;
  readonly gForce: number;
  readonly transitTimeMs: number;
  readonly deviationFromBaseline: number;
}

/**
 * Calculates the actual speed reached considering acceleration and distance.
 * Uses the peak speed of a trapezoidal or triangular profile.
 */
function getActualSpeed(targetSpeed: number, acceleration: number, displacement: number): number {
  const speedLimit = Math.sqrt(acceleration * displacement);
  return Math.min(targetSpeed, speedLimit);
}

/**
 * Calculates the transit time (ms) for a move using standard trapezoidal/triangular motion profile.
 */
function calculateTransitTime(displacement: number, targetSpeed: number, acceleration: number): number {
  if (targetSpeed <= 0 || acceleration <= 0) return 0;

  // If target speed is not reachable (triangular profile)
  if (targetSpeed * targetSpeed / acceleration > displacement) {
    // Triangular: time = 2 * v_peak / a = 2 * sqrt(d/a)
    return 2 * Math.sqrt(displacement / acceleration) * 1000;
  } else {
    // Trapezoidal: time = (d / v_target) + (v_target / a)
    return (displacement / targetSpeed + targetSpeed / acceleration) * 1000;
  }
}

export function calculateKinematics(params: KinematicParameters, acceleration: number): KinematicResults {
  const {
    flowRate,
    nozzleWidth,
    layerHeight,
    mass,
    displacement,
    baselineValue,
  } = params;

  const targetSpeed = flowRate / (nozzleWidth * layerHeight);
  const actualSpeed = getActualSpeed(targetSpeed, acceleration, displacement);

  if (actualSpeed <= 0) {
    throw new Error("Actual speed must be greater than zero for calculation.");
  }

  // G-Force is acceleration divided by gravity (9806.65 mm/s^2)
  const gForce = acceleration / 9806.65;
  
  // Mass ratio (for context, though gForce is the primary metric)
  const massToGravityRatio = mass / 9806.65; 
  
  const transitTimeMs = calculateTransitTime(displacement, targetSpeed, acceleration);
  const deviationFromBaseline = transitTimeMs - baselineValue;

  return {
    actualSpeed,
    massToGravityRatio,
    gForce,
    transitTimeMs,
    deviationFromBaseline,
  };
}

function runScenarios() {
  const flowRate = 100; // mm^3/s
  const machineConstants = {
    mass: 25000.0, // in grams
    speedOffset: 18.0,
    displacement: 20.0,
    baselineValue: 250.0, // Adjusted baseline for demonstration
  };

  const nozzleScenarios: { name: string; width: number; height: number }[] = [
    { name: "0.25mm Nozzle", width: 0.25, height: 0.1 },
    { name: "0.4mm Nozzle", width: 0.42, height: 0.2 },
    { name: "0.6mm Nozzle", width: 0.62, height: 0.3 },
    { name: "0.8mm Nozzle", width: 0.84, height: 0.4 },
    { name: "1.0mm Nozzle", width: 1.05, height: 0.5 },
  ];

  const accelerations: number[] = [];
  for (let a = 1000; a <= 10000; a += 1000) accelerations.push(a);
  for (let a = 15000; a <= 50000; a += 5000) accelerations.push(a);
  for (let a = 60000; a <= 250000; a += 10000) accelerations.push(a);

  for (const nozzle of nozzleScenarios) {
    console.log(`\n====================================================================================================`);
    console.log(`ANALYSIS FOR: ${nozzle.name}`);
    console.log(`Settings: Flow ${flowRate} mm³/s | Width: ${nozzle.width}mm | Height: ${nozzle.height}mm`);
    console.log(`====================================================================================================`);
    
    console.log(
      `${"Accel (mm/s²)".padEnd(15)} | ${"Actual Speed (mm/s)".padEnd(20)} | ${"G-Force (g)".padEnd(12)} | ${"Transit Time (ms)".padEnd(18)} | ${"Time Delta (ms)".padEnd(15)}`
    );
    console.log(`----------------------------------------------------------------------------------------------------`);

    let previousTransitTime: number | null = null;

    for (const accel of accelerations) {
      const params: KinematicParameters = {
        ...machineConstants,
        flowRate,
        nozzleWidth: nozzle.width,
        layerHeight: nozzle.height,
      };

      try {
        const res = calculateKinematics(params, accel);
        const timeSaved = previousTransitTime !== null ? previousTransitTime - res.transitTimeMs : 0;

        console.log(
          `${accel.toString().padEnd(15)} | ` +
          `${res.actualSpeed.toFixed(1).padStart(20)} | ` +
          `${res.gForce.toFixed(3).padStart(12)} | ` +
          `${res.transitTimeMs.toFixed(2).padStart(18)} | ` +
          `${timeSaved.toFixed(2).padStart(15)}`
        );

        previousTransitTime = res.transitTimeMs;
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.log(`${accel.toString().padEnd(15)} | Error: ${errMsg}`);
      }
    }
  }
}

runScenarios();
