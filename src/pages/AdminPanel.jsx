import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Scale,
  FileText,
  Check,
  X,
  Plus,
  AlertCircle,
  Building2,
  DollarSign,
  Award,
  Edit2,
  Users,
  AlertTriangle,
  Lock,
  Unlock,
  Sliders
} from 'lucide-react';

export const AdminPanel = () => {
  const {
    verifications,
    updateVerification,
    priceData,
    updatePriceBenchmark,
    orders,
    notices,
    usersList,
    toggleUserVerification,
    disputes,
    setDemoPanelOpen,
    showToast,
    t
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('verifications'); // 'verifications', 'users', 'prices', 'orders', 'disputes', 'notices'
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [newPriceVal, setNewPriceVal] = useState('');

  // New notice form state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('Government Scheme');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');

  const totalPlatformFee = orders.reduce((acc, curr) => acc + curr.buyerCommissionAmount, 0);
  const totalVolume = orders.reduce((acc, curr) => acc + curr.sellerAgreedAmount, 0);

  const handlePriceSave = (id) => {
    if (!newPriceVal || Number(newPriceVal) <= 0) return;
    updatePriceBenchmark(id, newPriceVal);
    setEditingPriceId(null);
    setNewPriceVal('');
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeSummary) return;
    showToast('New circular published to tribal seller and buyer notice boards!', 'success');
    setNewNoticeTitle('');
    setNewNoticeSummary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>JUT / JSLPS Administrative Secretariat</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            {t('adminPortalTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200">
            {t('adminSubtitle')}
          </p>
        </div>

        {/* Controls & Financial Tally */}
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <button
            onClick={() => setDemoPanelOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-forest-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Sliders className="w-4 h-4" />
            <span>{t('mogDockTitle')}</span>
          </button>
          
          <div className="bg-purple-900/80 p-4 rounded-2xl border border-purple-700 text-right space-y-0.5">
            <div className="text-[11px] text-purple-300 font-bold uppercase">{t('sustainabilityFundLabel')}</div>
            <div className="text-2xl font-extrabold text-emerald-300 font-display">
              ₹{totalPlatformFee.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-purple-300">{t('totalPlatformVolume')}: ₹{totalVolume.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-sand-300 pb-2 overflow-x-auto scrollbar-none">
        
        <button
          onClick={() => setActiveAdminTab('verifications')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'verifications'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{t('tabVerifications')} ({verifications.filter(v => v.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'users'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('tabUsersDirectory')}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('prices')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'prices'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t('tabPriceRules')}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'orders'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{t('tabOrdersMonitoring')}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('disputes')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'disputes'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t('tabDisputes')}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('notices')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'notices'
              ? 'bg-purple-900 text-white shadow'
              : 'bg-white text-sand-800 hover:bg-sand-100 border border-sand-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t('tabCirculars')}</span>
        </button>

      </div>

      {/* Tab 1: User Verifications Queue */}
      {activeAdminTab === 'verifications' && (
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-forest-900">Pending Seller & Buyer Verification Requests</h2>
            <p className="text-xs text-sand-600">Review tribal SHG affiliations and buyer GST credentials for platform safety</p>
          </div>

          <div className="divide-y divide-sand-200">
            {verifications.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-forest-900 text-sm">{item.name || item.companyName}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.type === 'seller' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.type === 'seller' ? 'Tribal Collector' : 'Buyer Enterprise'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'approved' ? 'bg-green-100 text-green-800' : item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs text-sand-600 space-x-3">
                    <span>Phone: {item.phone}</span>
                    {item.gstin && <span>GST: <strong>{item.gstin}</strong></span>}
                    {item.district && <span>District: {item.district}</span>}
                    {item.groupType && <span>Group: {item.groupType}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => updateVerification(item.id, 'approved')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => updateVerification(item.id, 'rejected')}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-sand-500">
                      Processed as {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: User & Entity Directory Management (Mock User Panel) */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-forest-900">Registered Users & Business Entities</h2>
              <p className="text-xs text-sand-600">Overview of active collectors, SHGs, and procurement enterprises</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-sand-100 rounded-full text-sand-800">
              Total {usersList.length} Entities
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand-100 text-sand-800 font-bold uppercase">
                <tr>
                  <th className="p-3">User / Group</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Volume / Spend</th>
                  <th className="p-3">Verification Badge</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-sand-50">
                    <td className="p-3 font-bold text-forest-900">{u.name}</td>
                    <td className="p-3 font-semibold text-sand-700">{u.type}</td>
                    <td className="p-3 text-sand-600">{u.district}</td>
                    <td className="p-3 text-sand-600">{u.phone}</td>
                    <td className="p-3 font-bold text-forest-900">{u.sales || u.spend}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        u.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {u.verified ? '✓ Verified' : '⏳ Pending'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleUserVerification(u.id)}
                        className="px-2.5 py-1 rounded-lg bg-sand-200 hover:bg-sand-300 text-sand-900 font-bold text-[11px]"
                      >
                        {u.verified ? 'Revoke Badge' : 'Grant Verified'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Price Benchmark Rules Editor */}
      {activeAdminTab === 'prices' && (
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-forest-900">District Fair Benchmark Price Controller</h2>
            <p className="text-xs text-sand-600">Update MSP floor benchmarks to safeguard gatherers from distress pricing</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand-100 text-sand-800 font-bold uppercase">
                <tr>
                  <th className="p-3">Produce & District</th>
                  <th className="p-3">Current Benchmark (₹)</th>
                  <th className="p-3">Last Synced</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {priceData.map((p) => (
                  <tr key={p.id} className="hover:bg-sand-50">
                    <td className="p-3 font-bold text-forest-900">
                      {p.productName} ({p.district})
                    </td>
                    <td className="p-3">
                      {editingPriceId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={newPriceVal}
                            onChange={(e) => setNewPriceVal(e.target.value)}
                            placeholder={p.currentPrice.toString()}
                            className="w-20 p-1.5 border border-sand-400 rounded text-xs font-bold"
                          />
                          <button
                            onClick={() => handlePriceSave(p.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="px-2 py-1 bg-sand-200 text-sand-800 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-extrabold text-forest-900">
                          ₹{p.currentPrice} /{p.unit}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sand-600">{p.lastUpdated}</td>
                    <td className="p-3 text-right">
                      {editingPriceId !== p.id && (
                        <button
                          onClick={() => {
                            setEditingPriceId(p.id);
                            setNewPriceVal(p.currentPrice.toString());
                          }}
                          className="px-3 py-1 rounded-lg bg-sand-100 hover:bg-sand-200 text-sand-800 font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Update Price</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Order Monitoring & Revenue */}
      {activeAdminTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-forest-900">All Live Marketplace Orders</h2>
              <p className="text-xs text-sand-600">3% commission charged to buyers only • 0% deducted from tribal gatherers</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              {orders.length} Active Orders
            </span>
          </div>

          <div className="divide-y divide-sand-200 text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-forest-900 text-sm">Order #{ord.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold capitalize text-[10px]">
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-sand-700 mt-1">
                    {ord.productName} ({ord.quantity} {ord.unit})
                  </div>
                  <div className="text-sand-500 text-[11px]">
                    Buyer: {ord.buyerName} ➔ Seller: {ord.sellerName}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-sand-500">Seller Total:</div>
                    <div className="font-bold text-forest-900">₹{ord.sellerAgreedAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-emerald-700 font-semibold">3% Fee (Revenue):</div>
                    <div className="font-bold text-emerald-800">₹{ord.buyerCommissionAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sand-500">Buyer Total:</div>
                    <div className="font-extrabold text-purple-950">₹{ord.buyerTotalAmount.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Dispute Resolution Desk */}
      {activeAdminTab === 'disputes' && (
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-forest-900">Quality Inspection & Arbitration Desk</h2>
            <p className="text-xs text-sand-600">Tribal livelihood grievance redressal and escrow arbitration</p>
          </div>

          <div className="space-y-3">
            {disputes.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded text-[10px]">
                    Ticket #{d.id} • Order {d.orderId}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                    {d.status}
                  </span>
                </div>

                <div className="font-bold text-forest-900 text-sm">{d.issue}</div>
                <div className="text-sand-600">
                  Buyer: {d.buyerName} ↔ Seller: {d.sellerName}
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-sand-200 text-[11px] text-emerald-900 font-medium">
                  <strong>Resolution Notes: </strong>{d.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Circulars & Notice Publisher */}
      {activeAdminTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-forest-900">Active Scheme & Training Notices</h2>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded text-[10px]">
                      {n.category}
                    </span>
                    <span className="text-sand-500">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-forest-900 text-sm">{n.title}</h3>
                  <p className="text-sand-700">{n.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-sand-300 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-forest-900">Publish New Notice</h2>
            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-sand-800 mb-1">Circular Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MSP support update for Kusmi Lac..."
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-sand-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-sand-800 mb-1">Category:</label>
                <select
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-sand-300 text-xs"
                >
                  <option value="Government Scheme">Government Scheme</option>
                  <option value="Price Notification">Price Notification</option>
                  <option value="Training Circular">Training Circular</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sand-800 mb-1">Details / Summary:</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Write message for tribal collectors and buyers..."
                  value={newNoticeSummary}
                  onChange={(e) => setNewNoticeSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-sand-300 text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold shadow"
              >
                Publish Notice to Mandi
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
