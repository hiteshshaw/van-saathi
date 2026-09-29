import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Download,
  Printer,
  Star,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  X
} from 'lucide-react';

export const BuyerOrdersView = () => {
  const { orders, showToast, t } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [reviewModalOrder, setReviewModalOrder] = useState(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('Excellent quality scraped lac! Clean packaging and high shellac yield.');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you! Your ${ratingStars}-star rating and review has been submitted for ${reviewModalOrder.sellerName}.`, 'success');
    setReviewModalOrder(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
            {t('buyerPortalBadge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 mt-2 font-display">
            {t('buyerInvoicesTitle')}
          </h1>
          <p className="text-xs text-sand-600">
            {t('escrowProtectionNote')}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-6"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-sand-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-forest-900">{t('orderIdLabel')} #{ord.id}</span>
                  <span className="text-xs font-semibold text-sand-500">• {ord.placedAt}</span>
                </div>
                <div className="text-xs text-sand-700 mt-0.5">
                  {t('harvestedByLabel')}: <strong className="text-forest-900">{ord.sellerName}</strong> ({ord.district})
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedInvoiceOrder(ord)}
                  className="px-3.5 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-sand-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-forest-800" />
                  <span>{t('btnViewInvoice')}</span>
                </button>

                {ord.status === 'paid' && (
                  <button
                    onClick={() => setReviewModalOrder(ord)}
                    className="px-3.5 py-2 rounded-xl bg-honey-100 hover:bg-honey-200 text-honey-900 font-bold text-xs flex items-center gap-1.5 transition-colors border border-honey-300"
                  >
                    <Star className="w-4 h-4 fill-honey-400 text-honey-600" />
                    <span>{t('btnRateSeller')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Tracking Progress Steps */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 text-center">
                
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow">
                    ✓
                  </div>
                  <div className="text-xs font-bold text-forest-900">Order Placed</div>
                  <div className="text-[10px] text-sand-500">Escrow Funded</div>
                </div>

                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold shadow ${
                    ord.status !== 'pending' ? 'bg-emerald-600 text-white' : 'bg-sand-200 text-sand-600'
                  }`}>
                    {ord.status !== 'pending' ? '✓' : '2'}
                  </div>
                  <div className="text-xs font-bold text-forest-900">Seller Confirmed</div>
                  <div className="text-[10px] text-sand-500">Lot Packaged</div>
                </div>

                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold shadow ${
                    ord.status === 'dispatched' || ord.status === 'delivered' || ord.status === 'paid'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sand-200 text-sand-600'
                  }`}>
                    {ord.status === 'dispatched' || ord.status === 'delivered' || ord.status === 'paid' ? '✓' : '3'}
                  </div>
                  <div className="text-xs font-bold text-forest-900">In Transit</div>
                  <div className="text-[10px] text-sand-500">Tracking: {ord.trackingNumber}</div>
                </div>

                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold shadow ${
                    ord.status === 'paid' ? 'bg-emerald-600 text-white' : 'bg-sand-200 text-sand-600'
                  }`}>
                    {ord.status === 'paid' ? '✓' : '4'}
                  </div>
                  <div className="text-xs font-bold text-forest-900">Payment Released</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">100% Payout to Tribal Seller</div>
                </div>

              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-forest-900 text-sm">{ord.productName}</span>
                <div className="text-sand-600">
                  {ord.quantity} {ord.unit} × ₹{ord.unitPrice}/{ord.unit}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sand-500">Seller Payout (0% fee):</div>
                  <div className="font-bold text-forest-900">₹{ord.sellerAgreedAmount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-sand-500">VanMandi Fee (3%):</div>
                  <div className="font-bold text-sand-800">₹{ord.buyerCommissionAmount.toLocaleString('en-IN')}</div>
                </div>
                <div className="text-right">
                  <div className="text-sand-500">Total Charged:</div>
                  <div className="text-base font-extrabold text-blue-950">₹{ord.buyerTotalAmount.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Mock PDF Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-sand-300 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-sand-300">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center font-bold">
                  VM
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-forest-900 font-display">VanMandi Official Procurement Invoice</h3>
                  <p className="text-[11px] text-sand-600">Jharkhand Forest Produce Digital Marketplace</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-2 rounded-lg bg-sand-100 hover:bg-sand-200 text-sand-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-sand-50 p-4 rounded-2xl border border-sand-200">
              <div>
                <div className="font-bold text-sand-500 uppercase">Invoice To (Buyer):</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">{selectedInvoiceOrder.buyerName}</div>
                <div className="text-sand-700">GSTIN: {selectedInvoiceOrder.buyerGstin}</div>
                <div className="text-sand-700">{selectedInvoiceOrder.buyerContact}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-sand-500 uppercase">Invoice Details:</div>
                <div className="font-bold text-forest-900 text-sm mt-0.5">INV-{selectedInvoiceOrder.id}</div>
                <div className="text-sand-700">Date: {selectedInvoiceOrder.placedAt}</div>
                <div className="text-emerald-700 font-bold">Status: {selectedInvoiceOrder.paymentStatus}</div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="text-xs bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-950">Supplying Collective (Seller): </span>
                <span className="text-emerald-900">{selectedInvoiceOrder.sellerName} ({selectedInvoiceOrder.district})</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold text-[10px]">
                0% Seller Fee
              </span>
            </div>

            {/* Items Table */}
            <table className="w-full text-left text-xs border border-sand-300 rounded-xl overflow-hidden">
              <thead className="bg-sand-100 text-sand-800 font-bold uppercase">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Unit Rate</th>
                  <th className="p-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                <tr>
                  <td className="p-3 font-semibold text-forest-900">
                    {selectedInvoiceOrder.productName}
                    <div className="text-[10px] text-sand-500 font-normal">Authentic Forest Harvest • Direct Tribal Sourcing</div>
                  </td>
                  <td className="p-3 text-right">{selectedInvoiceOrder.quantity} {selectedInvoiceOrder.unit}</td>
                  <td className="p-3 text-right">₹{selectedInvoiceOrder.unitPrice}</td>
                  <td className="p-3 text-right font-bold">₹{selectedInvoiceOrder.sellerAgreedAmount.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-sand-50/70">
                  <td className="p-3 text-sand-700">
                    VanMandi Digital Marketplace Service Fee (3% charged to Buyer only)
                  </td>
                  <td className="p-3 text-right">1</td>
                  <td className="p-3 text-right">3%</td>
                  <td className="p-3 text-right font-bold">₹{selectedInvoiceOrder.buyerCommissionAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
              <tfoot className="bg-forest-900 text-white font-bold text-sm">
                <tr>
                  <td colSpan="3" className="p-3 text-right">Total Payable:</td>
                  <td className="p-3 text-right text-emerald-300 font-extrabold">₹{selectedInvoiceOrder.buyerTotalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-sand-500">VanMandi IDEA TRIBE 2026 Prototype Sample Invoice</span>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Seller Review Modal */}
      {reviewModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleReviewSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-sand-300">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-forest-900">Rate Tribal Producer</h3>
              <button type="button" onClick={() => setReviewModalOrder(null)} className="text-sand-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-sand-600">
              Provide feedback for <strong>{reviewModalOrder.sellerName}</strong> on lot #{reviewModalOrder.id}. Honest reviews help tribal SHGs gain premium enterprise orders.
            </p>

            {/* Star selector */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRatingStars(s)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-8 h-8 ${s <= ratingStars ? 'fill-honey-400 text-honey-500' : 'text-sand-300'}`} />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-forest-900 mb-1">Written Feedback:</label>
              <textarea
                rows="3"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full p-3 rounded-xl border border-sand-300 text-xs text-sand-900 focus:ring-2 focus:ring-forest-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs shadow"
            >
              Submit Quality Review
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
