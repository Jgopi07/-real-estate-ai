import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, HelpCircle, Star, Compass, AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function AnalyticsPanel({ dataset, result, form }) {
  // Global statistical averages from dataset
  const globalStats = useMemo(() => {
    if (!dataset.length) {
      return {
        avgPrice: 5990812,
        avgArea: 1751,
        avgBedrooms: 3,
        avgBathrooms: 2.5,
        avgParking: 1,
        avgPricePerSqft: 3420,
      };
    }
    const totalPrice = dataset.reduce((sum, d) => sum + d.price, 0);
    const totalArea = dataset.reduce((sum, d) => sum + d.area, 0);
    const totalBeds = dataset.reduce((sum, d) => sum + d.bedrooms, 0);
    const totalBaths = dataset.reduce((sum, d) => sum + d.bathrooms, 0);
    const totalPark = dataset.reduce((sum, d) => sum + d.parking, 0);
    const totalPpsqft = dataset.reduce((sum, d) => sum + d.price / d.area, 0);

    return {
      avgPrice: totalPrice / dataset.length,
      avgArea: totalArea / dataset.length,
      avgBedrooms: totalBeds / dataset.length,
      avgBathrooms: totalBaths / dataset.length,
      avgParking: totalPark / dataset.length,
      avgPricePerSqft: totalPpsqft / dataset.length,
    };
  }, [dataset]);

  // Pricing premium calculations for smart ROI recommendations
  const parkingPremium = useMemo(() => {
    if (!dataset.length) return 250000;
    // Calculate difference between listings with parking vs no parking
    const withPark = dataset.filter((d) => d.parking > 0);
    const withoutPark = dataset.filter((d) => d.parking === 0);
    if (!withPark.length || !withoutPark.length) return 250000;
    const avgWith = withPark.reduce((sum, d) => sum + d.price, 0) / withPark.length;
    const avgWithout = withoutPark.reduce((sum, d) => sum + d.price, 0) / withoutPark.length;
    return Math.max(100000, Math.round(avgWith - avgWithout));
  }, [dataset]);

  const bedroomPremium = useMemo(() => {
    if (!dataset.length) return 450000;
    const currentBeds = dataset.filter((d) => d.bedrooms === form.bedrooms);
    const nextBeds = dataset.filter((d) => d.bedrooms === form.bedrooms + 1);
    if (!currentBeds.length || !nextBeds.length) return 450000;
    const avgCurrent = currentBeds.reduce((sum, d) => sum + d.price, 0) / currentBeds.length;
    const avgNext = nextBeds.reduce((sum, d) => sum + d.price, 0) / nextBeds.length;
    return Math.max(150000, Math.round(avgNext - avgCurrent));
  }, [dataset, form.bedrooms]);

  // Layout Performance analysis comparison
  const configSpecificAvg = useMemo(() => {
    if (!dataset.length) return null;
    const matches = dataset.filter(
      (d) => d.bedrooms === form.bedrooms && d.bathrooms === form.bathrooms
    );
    if (!matches.length) return null;
    const avgPriceMatches = matches.reduce((sum, d) => sum + d.price, 0) / matches.length;
    const pctDiff = ((avgPriceMatches - globalStats.avgPrice) / globalStats.avgPrice) * 100;
    return {
      count: matches.length,
      avgPrice: avgPriceMatches,
      pctDiff,
    };
  }, [dataset, form.bedrooms, form.bathrooms, globalStats]);

  // Pricing deviation metrics
  const currentValuation = result?.predicted_price || globalStats.avgPrice;
  const priceDiffVsAvg = currentValuation - globalStats.avgPrice;
  const pctDiffVsAvg = (priceDiffVsAvg / globalStats.avgPrice) * 100;
  const inputPricePerSqft = currentValuation / form.area;

  return (
    <div className="glass-card p-6 mt-6">
      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mb-2">
        <TrendingUp className="text-amber-400" size={20} />
        Advanced Analytics & Recommendations
      </h3>
      <p className="text-gray-400 text-xs mb-6">
        Machine-learned ROI modifiers and comparative dataset diagnostics for properties matching this space footprint
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* DATASET INSIGHTS PANEL */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 border-b border-white/5 pb-2">
            Dataset Market Diagnostics
          </h4>
          
          <div className="space-y-3.5">
            {/* Average comparison */}
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500 font-bold uppercase">Valuation Deviation</span>
              <p className="text-sm text-gray-300 mt-0.5">
                Current estimate is{" "}
                <span className={`font-extrabold ${priceDiffVsAvg >= 0 ? "text-emerald-400" : "text-purple-400"}`}>
                  {Math.abs(pctDiffVsAvg).toFixed(1)}% {priceDiffVsAvg >= 0 ? "above" : "below"}
                </span>{" "}
                overall dataset average (₹ {Math.round(globalStats.avgPrice / 100000).toFixed(0)}L).
              </p>
            </div>

            {/* Layout density analysis */}
            {configSpecificAvg && (
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-bold uppercase">Layout Performance</span>
                <p className="text-sm text-gray-300 mt-0.5">
                  Properties with <span className="text-white font-semibold">{form.bedrooms} bedrooms</span> &{" "}
                  <span className="text-white font-semibold">{form.bathrooms} bathrooms</span> are historically{" "}
                  <span className={`font-extrabold ${configSpecificAvg.pctDiff >= 0 ? "text-emerald-400" : "text-purple-400"}`}>
                    {Math.abs(configSpecificAvg.pctDiff).toFixed(1)}% {configSpecificAvg.pctDiff >= 0 ? "more" : "less"}
                  </span>{" "}
                  expensive than overall average listings.
                </p>
              </div>
            )}

            {/* Price per sqft trend */}
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500 font-bold uppercase">Pricing Efficiency</span>
              <p className="text-sm text-gray-300 mt-0.5">
                Valued at <span className="text-white font-bold">₹ {Math.round(inputPricePerSqft).toLocaleString()} / sqft</span>. 
                Database average for this footprint scale is ₹ {Math.round(globalStats.avgPricePerSqft).toLocaleString()} / sqft.
              </p>
            </div>
          </div>
        </div>

        {/* SMART RECOMMENDATIONS (ROI ESTIMATORS) */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 border-b border-white/5 pb-2">
            AI Value Recommendations
          </h4>

          <div className="space-y-4">
            {/* Recommendation 1: Parking Slot */}
            {form.parking === 0 && (
              <div className="glass-card bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20 p-4 rounded-xl flex gap-3 transition duration-200">
                <ArrowUpRight className="text-amber-400 shrink-0" size={18} />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Construct a Parking Space</h5>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Adding a single parking space in this segment historically increments valuation by{" "}
                    <span className="text-amber-400 font-bold">₹ {parkingPremium.toLocaleString()}</span> (approx{" "}
                    {((parkingPremium / currentValuation) * 100).toFixed(1)}% value boost).
                  </p>
                </div>
              </div>
            )}
            
            {form.parking > 0 && (
              <div className="glass-card bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 p-4 rounded-xl flex gap-3 transition duration-200">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Parking Premium Active</h5>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Your {form.parking}-slot parking configuration locks in an average of{" "}
                    <span className="text-emerald-400 font-bold">₹ {parkingPremium.toLocaleString()}</span> of additional valuation equity over standard listings.
                  </p>
                </div>
              </div>
            )}

            {/* Recommendation 2: Bedroom Upgrade */}
            {form.bedrooms < 5 && (
              <div className="glass-card bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/20 p-4 rounded-xl flex gap-3 transition duration-200">
                <ArrowUpRight className="text-purple-400 shrink-0" size={18} />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Convert to a {form.bedrooms + 1}-Bed Layout</h5>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Splitting spatial footprint to yield an extra bedroom adds an estimated average of{" "}
                    <span className="text-purple-400 font-bold">₹ {bedroomPremium.toLocaleString()}</span> in equity margin.
                  </p>
                </div>
              </div>
            )}
            
            {form.bedrooms === 5 && (
              <div className="glass-card bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 p-4 rounded-xl flex gap-3 transition duration-200">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Max Bedroom Density</h5>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Your 5-bedroom layout sits in the maximum structural capacity brackets. Spatially maximized for premium residential buyer groups.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}