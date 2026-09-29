import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Droplets,
  Sun,
  ShieldCheck
} from 'lucide-react';

export const GradingGuidePage = () => {
  const { lang, setActiveTab, setCurrentRole } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 border border-forest-700 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Scientific Quality & Pricing Standard</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
          {lang === 'hi' ? 'वनोपज ग्रेडिंग एवं गुणवत्ता मार्गदर्शिका' : 'Minor Forest Produce Quality & Grading Guide'}
        </h1>
        <p className="text-xs sm:text-sm text-sand-200 max-w-3xl">
          Learn how proper harvesting, sorting, and sun-drying unlocks Grade-A premium prices from industrial buyers and pharmaceutical processors.
        </p>
      </div>

      {/* Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lac Grading */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">✨</span>
            <span className="px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 font-bold text-xs">
              Resin Benchmark
            </span>
          </div>

          <h2 className="text-xl font-bold text-forest-900">Kusmi & Rangeeni Lac Grading</h2>
          
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-extrabold text-emerald-950 text-sm flex items-center justify-between">
                <span>Grade A (Scraped Clean)</span>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Highest Rate (~₹510/kg)</span>
              </div>
              <p className="text-emerald-800">
                Purity &gt; 90%, moisture &lt; 5%. Free from twigs, dust, and bark. Harvested from Kusum trees during peak maturity.
              </p>
            </div>

            <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="font-bold text-sand-900 text-sm flex items-center justify-between">
                <span>Grade B (Dry Sticklac)</span>
                <span className="text-xs font-bold text-sand-700">~₹460/kg</span>
              </div>
              <p className="text-sand-700">
                Natural sticklac with minimal wood content, well-dried in shade to prevent blocking or clustering.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-sand-200 text-xs text-sand-600 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-honey-600 shrink-0" />
            <span><strong>Tip:</strong> Always spread scraped lac on clean cotton sheets in shade; avoid direct scorching noon sun.</span>
          </div>
        </div>

        {/* Mahua Flower Grading */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🌸</span>
            <span className="px-3 py-1 rounded-full bg-honey-100 text-honey-800 font-bold text-xs">
              Food & Herbal Grade
            </span>
          </div>

          <h2 className="text-xl font-bold text-forest-900">Dried Mahua Flower Grading</h2>
          
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-extrabold text-emerald-950 text-sm flex items-center justify-between">
                <span>Food Grade (Raised Mat Dried)</span>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Premium Rate (~₹46/kg)</span>
              </div>
              <p className="text-emerald-800">
                0% sand or soil contact. Dried on raised bamboo machans. Golden brown color, sugar content preserved, moisture &lt; 10%.
              </p>
            </div>

            <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="font-bold text-sand-900 text-sm flex items-center justify-between">
                <span>Standard Distillery Grade</span>
                <span className="text-xs font-bold text-sand-700">~₹40/kg</span>
              </div>
              <p className="text-sand-700">
                Standard bulk dried lot suitable for traditional industrial extraction.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-sand-200 text-xs text-sand-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Tip:</strong> Using nets under Mahua trees prevents dirt mixing and earns 25% higher prices.</span>
          </div>
        </div>

        {/* Forest Honey Grading */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🍯</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
              Unheated Raw Standard
            </span>
          </div>

          <h2 className="text-xl font-bold text-forest-900">Wild Forest Raw Honey</h2>
          
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-extrabold text-emerald-950 text-sm">Sal & Karanj Canopy Honey</div>
              <p className="text-emerald-800">
                Moisture &lt; 19%, pollen count &gt; 80,000 grains/gram. Raw unheated, cold filtered through double stainless mesh.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-sand-200 text-xs text-sand-600 flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
            <span><strong>Zero Sugar Guarantee:</strong> Never feed sugar syrup to wild rock bees; wild honey commands top export value.</span>
          </div>
        </div>

        {/* Tasar Cocoons Grading */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🧵</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
              Silk Weaving Standard
            </span>
          </div>

          <h2 className="text-xl font-bold text-forest-900">Wild Tasar Silk Cocoons</h2>
          
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-extrabold text-emerald-950 text-sm">Grade 1 (Hard Shell Jadwi)</div>
              <p className="text-emerald-800">
                Shell ratio &gt; 14%, unbroken peduncle, uniform compact beige cocoon with high continuous reelable yarn.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-sand-200 text-xs text-sand-600 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-forest-700 shrink-0" />
            <span><strong>Storage:</strong> Store in ventilated bamboo crates away from rodents and dampness.</span>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-sand-100 rounded-3xl p-6 sm:p-8 border border-sand-300 text-center space-y-3">
        <h3 className="text-xl font-bold text-forest-900">
          Ready to List Your Grade-A Produce?
        </h3>
        <p className="text-xs text-sand-600 max-w-lg mx-auto">
          Use VanMandi's voice assistant to upload your harvest batch and get verified buyers within 24 hours.
        </p>
        <button
          onClick={() => {
            setCurrentRole('seller');
            setActiveTab('seller-voice-add');
          }}
          className="px-6 py-3 bg-terracotta-600 hover:bg-terracotta-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md"
        >
          Open Voice Listing Helper →
        </button>
      </div>

    </div>
  );
};
