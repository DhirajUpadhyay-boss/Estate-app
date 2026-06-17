import React from 'react'

const PropertyTrend = () => {
  return (
    <div>
      <h1>Work is in progress.... </h1>
    </div>
  )
}



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadscrumb from "../components/Breadcrumb";
import InputField from "../components/ui/InputField";
import Dropdown from "../components/ui/Dropdown";

export default function AddProductIndividualDetails() {
  const navigate = useNavigate();
  const TABS = ["PRODUCT DETAIL", "ACCOUNT DETAIL"];
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState([]);

  // ── Fetch product categories 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product-category")
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw?.items)
          ? raw.items
          : Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        setCategories(list);
      })
      .catch(() => setCategories([]));
  }, []);

  const [formData, setFormData] = useState({
    category: "",
    product_name: "",
    product_id: "",
    ext_product_id: "",
    start_date: "",
    end_date: "",
    status: true,
    repayment_frequency: "Monthly",
    moratorium: "0",
    tenure: "",
    interest_rate: "",
    apr_rate: "",
    eir_interest_rate: "",
    calculation_method: "Broken Period (First inst)",
    full_broken: "Principal",
    flexl_emi: "Last FlexI EMI",
    emi_round_up: "",
    emi_round_off_type: "Round Off",
    security_amount: "",
    processing_fee: "",
    processing_fee_rate: "",
    auto_calculation: false,
    stamp_duty: "",
    auto_calculation_stamp: false,
    stamp_duty_rate: "",
    legal_fee: "",
    auto_calculation_legal: false,
    legal_fee_rate: "",
    document_charges: "",
    auto_calculation_document: false,
    document_fee_rate: "",
    application_fee: "",
    auto_calculation_application: false,
    application_fee_rate: "",
    technical_evaluation_charges: "",
    advance_principal: "Advance Principal",
    advance_principal_rate: "",
    penalty_charges: "",
    penalty_rate: "",
    penal_interest_rate: "",
    bounce_charges: "",
    prepay_penalty: "",
    login_fees: "",
    auto_calculation_login: false,
    login_fees_rate: "",
    early_settlement_rate: "",
    tax: "",
    lpf_gst_code: "",
    lpf_gst_flag: false,
    document_charges_gst_code: "",
    document_charges_gst_flag: false,
    stamp_duty_gst_code: "",
    stamp_duty_gst_flag: false,
    application_fee_gst_code: "",
    application_fee_gst_flag: false,
    legal_fee_gst_code: "",
    legal_fee_gst_flag: false,
    penalty_charges_gst_code: "",
    penalty_charges_gst_flag: false,
    bounce_charges_gst_code: "",
    bounce_charges_gst_flag: false,
    technical_evaluation_gst_code: "",
    technical_evaluation_gst_flag: false,
    early_settlement_gst_code: "",
    early_settlement_gst_flag: false,
    auto_calculation_penalty: false,
    auto_calculation_settlement: false,
  });

  const [accountData, setAccountData] = useState({
    category_id: "",
    product_name: "",
    principal_account: "",
    interest_income_account: "",
    process_fee_account: "",
    broken_interest: "",
    income_receivable_account: "",
    excess_interest_collection: "",
    disbursemet_cash: "",
    interest_reversal: "",
    loan_renewal_account: "",
    npa_interest_ledger_account: "",
    od_interest_ledger_account: "",
    od_interest_receivalbe_account: "",
    write_off: "",
    write_off_recovery: "",
    disbursement_other_charges: "",
    waive_off_ledger_account: "",
    advance_principle_ledger_account: "",
    other_coll_charges_ledger_account: "",
    principal_share_percent_ledger_account: "",
    interest_share_percent_ledger_account: "",
    lpf_share_percent_ledger_account: "",
    loan_fee_pre_coll_ledger_account: "",
    membership_fee: "",
    legal_fee_ledger_account: "",
    stamp_duty_ledger_account: "",
    document_charges: "",
    other_charges: "",
    application_fee: "",
    technical_evaluation_charges: "",
    bounce_charges: "",
    penalty_ledger_account: "",
    settlement_charges: "",
    penal_interest_account: "",
  });

 
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find(
      (item) => String(item.id) === String(selectedId)
    );
    setFormData((prev) => ({
      ...prev,
      category: selectedId,
      product_name: selectedCategory?.category_name || "",
    }));
    // Keep accountData in sync
    setAccountData((prev) => ({
      ...prev,
      category_id: selectedId,
      product_name: selectedCategory?.category_name || "",
    }));
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAccountChange(e) {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleProductSubmit(e) {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a Category ID.");
      return;
    }
    if (!formData.product_id.trim()) {
      alert("Product ID is required.");
      return;
    }
    if (!formData.tenure.trim()) {
      alert("Tenure is required.");
      return;
    }
    if (!formData.interest_rate.trim()) {
      alert("Interest Rate is required.");
      return;
    }

    const payload = {
      category: String(formData.category),
      product_name: formData.product_name || "",
      product_id: formData.product_id,
      ext_product_id: formData.ext_product_id || "",
      start_date: formData.start_date || "",
      end_date: formData.end_date || "",
      status: formData.status,
      repayment_frequency: formData.repayment_frequency,
      moratorium: formData.moratorium || "0",
      tenure: formData.tenure,
      interest_rate: formData.interest_rate,
      apr_rate: formData.apr_rate || "0",
      eir_interest_rate: formData.eir_interest_rate || "0",
      calculation_method: formData.calculation_method,
      full_broken: formData.full_broken,
      flexl_emi: formData.flexl_emi,
      emi_round_up: formData.emi_round_up || "",
      emi_round_off_type: formData.emi_round_off_type,
      security_amount: formData.security_amount || "0",
      processing_fee: formData.processing_fee || "0",
      processing_fee_rate: formData.processing_fee_rate || "0",
      auto_calculation: formData.auto_calculation,
      stamp_duty: formData.stamp_duty || "0",
      auto_calculation_stamp: formData.auto_calculation_stamp,
      stamp_duty_rate: formData.stamp_duty_rate || "0",
      legal_fee: formData.legal_fee || "0",
      auto_calculation_legal: formData.auto_calculation_legal,
      legal_fee_rate: formData.legal_fee_rate || "0",
      document_charges: formData.document_charges || "0",
      auto_calculation_document: formData.auto_calculation_document,
      document_fee_rate: formData.document_fee_rate || "0",
      application_fee: formData.application_fee || "0",
      auto_calculation_application: formData.auto_calculation_application,
      application_fee_rate: formData.application_fee_rate || "0",
      technical_evaluation_charges: formData.technical_evaluation_charges || "0",
      advance_principal: formData.advance_principal,
      advance_principal_rate: formData.advance_principal_rate || "0",
      penalty_charges: formData.penalty_charges || "0",
      penalty_rate: formData.penalty_rate || "0",
      penal_interest_rate: formData.penal_interest_rate || "0",
      bounce_charges: formData.bounce_charges || "0",
      prepay_penalty: formData.prepay_penalty || "0",
      login_fees: formData.login_fees || "0",
      login_fees_rate: formData.login_fees_rate || "0",
      early_settlement_rate: formData.early_settlement_rate || "0",
    };

    try {
      await axios.post("http://localhost:5000/api/individual-product", payload);
      alert("Product details saved successfully!");
      navigate("/allproduct");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data?.errors) ||
        error.message;
      alert("Save failed: " + msg);
    }
  }

  async function handleAccountSubmit(e) {
    e.preventDefault();

    const required = [
      "category_id", "product_name", "principal_account", "interest_income_account",
      "process_fee_account", "broken_interest", "income_receivable_account",
      "excess_interest_collection", "disbursemet_cash", "interest_reversal",
      "loan_renewal_account", "npa_interest_ledger_account", "od_interest_ledger_account",
      "od_interest_receivalbe_account", "write_off", "write_off_recovery",
      "disbursement_other_charges", "waive_off_ledger_account",
      "advance_principle_ledger_account", "other_coll_charges_ledger_account",
      "principal_share_percent_ledger_account", "interest_share_percent_ledger_account",
      "lpf_share_percent_ledger_account", "loan_fee_pre_coll_ledger_account",
      "membership_fee", "legal_fee_ledger_account", "stamp_duty_ledger_account",
      "document_charges", "other_charges", "application_fee",
      "technical_evaluation_charges", "bounce_charges", "penalty_ledger_account",
      "settlement_charges", "penal_interest_account",
    ];

    const missing = required.filter((f) => !accountData[f]?.trim());
    if (missing.length > 0) {
      alert("Please fill in all required fields:\n" + missing.join(", "));
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/product-account", accountData);
      alert("Account details saved successfully!");
      navigate("/allproduct");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data?.errors) ||
        error.message;
      alert("Save failed: " + msg);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <div className="flex-1 p-6 py-7">
        <Breadscrumb />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Add Product Individual Details
        </h1>

        {/* Product Category Details — shared header */}
        <div className="bg-white rounded mb-4 shadow p-5 pb-2">
          <div className="text-2xl font-semibold mb-4">Product Category Details</div>
          <div className="grid grid-cols-3 gap-6 pb-2">
            <Dropdown
              id="category"
              label="Category ID"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              options={categories.map((item) => ({
                label: item.category_name || String(item.id),
                value: item.id,
              }))}
            />
            <InputField
              id="product_name"
              label="Product Name"
              name="product_name"
              value={formData.product_name}
              readOnly
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded shadow mb-4">
          <div className="flex border-b border-gray-200">
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`py-3 px-6 font-semibold text-sm outline-none transition ${
                  activeTab === idx
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── TAB 1: PRODUCT DETAIL ── */}
          {activeTab === 0 && (
            <form onSubmit={handleProductSubmit}>
              <div className="p-6 pt-3">
                {/* Product Details */}
                <div className="mb-7">
                  <div className="text-xl font-bold mb-2 text-gray-700">Product Details</div>
                  <div className="grid grid-cols-3 gap-6 mb-2">
                    <InputField id="product_id" label="Product ID" required name="product_id" value={formData.product_id} onChange={handleChange} />
                    <InputField id="ext_product_id" label="Ext Product ID" name="ext_product_id" value={formData.ext_product_id} onChange={handleChange} />
                    <InputField id="start_date" label="Start Date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} />
                    <InputField id="end_date" label="End Date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
                    <div className="flex items-center mt-2">
                      <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="status" />
                      <label htmlFor="status" className="text-base text-gray-700">Status</label>
                    </div>
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <div className="text-xl font-bold mb-2 text-gray-700">Frequency</div>
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <Dropdown
                      id="repayment_frequency"
                      label="Repayment Frequency"
                      name="repayment_frequency"
                      value={formData.repayment_frequency}
                      onChange={handleChange}
                      required
                      options={[
                        { label: "Monthly", value: "Monthly" },
                        { label: "Quarterly", value: "Quarterly" },
                      ]}
                    />
                    <InputField id="moratorium" label="Moratorium" name="moratorium" type="number" value={formData.moratorium} onChange={handleChange} />
                  </div>
                </div>

                {/* Amount and Interest */}
                <div className="bg-white mt-6">
                  <div className="text-2xl font-semibold mb-4 mt-1">Amount and Interest</div>
                  <hr className="mb-4 border-gray-400" />
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="mb-3">
                      <InputField id="tenure" label="Tenure" required name="tenure" value={formData.tenure} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="interest_rate" label="Interest Rate" required name="interest_rate" value={formData.interest_rate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="apr_rate" label="APR Rate" name="apr_rate" value={formData.apr_rate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="eir_interest_rate" label="EIR Interest Rate" name="eir_interest_rate" value={formData.eir_interest_rate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <Dropdown
                        id="calculation_method"
                        label="Calculation Method"
                        name="calculation_method"
                        value={formData.calculation_method}
                        onChange={handleChange}
                        options={[{ label: "Broken Period (First inst)", value: "Broken Period (First inst)" }]}
                      />
                    </div>
                    <div className="mb-3">
                      <Dropdown
                        id="full_broken"
                        label="Full Broken"
                        name="full_broken"
                        value={formData.full_broken}
                        onChange={handleChange}
                        required
                        options={[{ label: "Principal", value: "Principal" }]}
                      />
                    </div>
                    <div className="mb-3">
                      <Dropdown
                        id="flexl_emi"
                        label="FlexI EMI"
                        name="flexl_emi"
                        value={formData.flexl_emi}
                        onChange={handleChange}
                        options={[{ label: "Last FlexI EMI", value: "Last FlexI EMI" }]}
                      />
                    </div>
                    <div className="mb-3">
                      <InputField id="emi_round_up" label="EMI Round Up" name="emi_round_up" value={formData.emi_round_up} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="emi_round_off_type" label="EMI Round Off Type" name="emi_round_off_type" value={formData.emi_round_off_type} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="security_amount" label="Security Amount" name="security_amount" type="number" value={formData.security_amount} onChange={handleChange} />
                    </div>

                    {/* Processing Fee */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="processing_fee" label="Processing Fee" name="processing_fee" type="number" value={formData.processing_fee} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation" checked={formData.auto_calculation} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoProcFee" />
                        <label htmlFor="autoProcFee" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="processing_fee_rate" label="Processing Fee Rate %" name="processing_fee_rate" type="number" value={formData.processing_fee_rate} onChange={handleChange} />
                    </div>

                    {/* Stamp Duty */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="stamp_duty" label="Stamp Duty" name="stamp_duty" type="number" value={formData.stamp_duty} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation_stamp" checked={formData.auto_calculation_stamp} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoStamp" />
                        <label htmlFor="autoStamp" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="stamp_duty_rate" label="Stamp Duty Rate %" name="stamp_duty_rate" type="number" value={formData.stamp_duty_rate} onChange={handleChange} />
                    </div>

                    {/* Legal Fee */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="legal_fee" label="Legal Fee" name="legal_fee" type="number" value={formData.legal_fee} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation_legal" checked={formData.auto_calculation_legal} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoLegal" />
                        <label htmlFor="autoLegal" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="legal_fee_rate" label="Legal Fee Rate %" name="legal_fee_rate" type="number" value={formData.legal_fee_rate} onChange={handleChange} />
                    </div>

                    {/* Document Charges */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="document_charges" label="Document Charges" name="document_charges" type="number" value={formData.document_charges} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation_document" checked={formData.auto_calculation_document} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoDoc" />
                        <label htmlFor="autoDoc" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="document_fee_rate" label="Document Fee Rate %" name="document_fee_rate" type="number" value={formData.document_fee_rate} onChange={handleChange} />
                    </div>

                    {/* Application Fee */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="application_fee" label="Application Fee" name="application_fee" type="number" value={formData.application_fee} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation_application" checked={formData.auto_calculation_application} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoApp" />
                        <label htmlFor="autoApp" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="application_fee_rate" label="Application Fee Rate %" name="application_fee_rate" type="number" value={formData.application_fee_rate} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <InputField id="technical_evaluation_charges" label="Technical Evaluation Charges" name="technical_evaluation_charges" type="number" value={formData.technical_evaluation_charges} onChange={handleChange} />
                    </div>

                    {/* Advance Principal — read-only label field */}
                    <div className="mb-3">
                      <InputField id="advance_principal" label="Advance Principal" name="advance_principal" value={formData.advance_principal} readOnly />
                    </div>
                    <div className="mb-3">
                      <InputField id="advance_principal_rate" label="Advance Principal EMI Rate" name="advance_principal_rate" type="number" value={formData.advance_principal_rate} onChange={handleChange} />
                    </div>

                    {/* Penalty Charges — read-only */}
                    <div className="mb-3">
                      <InputField id="penalty_charges" label="Penalty Charges" name="penalty_charges" value={formData.penalty_charges} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="penalty_rate" label="Penalty Rate %" name="penalty_rate" type="number" value={formData.penalty_rate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <InputField id="penal_interest_rate" label="Penal Interest Rate %" name="penal_interest_rate" type="number" value={formData.penal_interest_rate} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <InputField id="bounce_charges" label="Bounce Charges" name="bounce_charges" type="number" value={formData.bounce_charges} onChange={handleChange} />
                    </div>

                    {/* Prepay Penalty */}
                    <div className="mb-3">
                      <InputField id="prepay_penalty" label="Prepay Penalty" name="prepay_penalty" type="number" value={formData.prepay_penalty} onChange={handleChange} />
                    </div>

                    {/* Login Fees */}
                    <div className="mb-3 flex items-center gap-3">
                      <InputField id="login_fees" label="Login Fees" name="login_fees" type="number" value={formData.login_fees} onChange={handleChange} />
                      <div className="flex items-center mt-6 whitespace-nowrap">
                        <input type="checkbox" name="auto_calculation_login" checked={formData.auto_calculation_login} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" id="autoLogin" />
                        <label htmlFor="autoLogin" className="text-sm text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <InputField id="login_fees_rate" label="Login Fees Rate %" name="login_fees_rate" type="number" value={formData.login_fees_rate} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <InputField id="early_settlement_rate" label="Early Settlement Rate %" name="early_settlement_rate" type="number" value={formData.early_settlement_rate} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Tax Section */}
                <div className="bg-white py-4 mt-2">
                  <div className="text-2xl font-semibold mb-7 mt-1">Tax</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <InputField id="tax" label="Tax" name="tax" value={formData.tax} onChange={handleChange} />

                    <div className="flex gap-3 items-end">
                      <InputField id="lpf_gst_code" label="LPF GST Code" name="lpf_gst_code" value={formData.lpf_gst_code} onChange={handleChange} />
                      <div className="flex items-center mb-2">
                        <input type="checkbox" name="lpf_gst_flag" checked={formData.lpf_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Flag</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="document_charges_gst_code" label="Document Charges GST Code" name="document_charges_gst_code" value={formData.document_charges_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="document_charges_gst_flag" checked={formData.document_charges_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Flag</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="stamp_duty_gst_code" label="Stamp Duty GST Code" name="stamp_duty_gst_code" value={formData.stamp_duty_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="stamp_duty_gst_flag" checked={formData.stamp_duty_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Flag</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="application_fee_gst_code" label="Application Fee GST Code" name="application_fee_gst_code" value={formData.application_fee_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="application_fee_gst_flag" checked={formData.application_fee_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="legal_fee_gst_code" label="Legal Fee GST Code" name="legal_fee_gst_code" value={formData.legal_fee_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="legal_fee_gst_flag" checked={formData.legal_fee_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="penalty_charges_gst_code" label="Penalty Charges GST Code" name="penalty_charges_gst_code" value={formData.penalty_charges_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="penalty_charges_gst_flag" checked={formData.penalty_charges_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="bounce_charges_gst_code" label="Bounce Charges GST Code" name="bounce_charges_gst_code" value={formData.bounce_charges_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="bounce_charges_gst_flag" checked={formData.bounce_charges_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="technical_evaluation_gst_code" label="Technical Evaluation GST Code" name="technical_evaluation_gst_code" value={formData.technical_evaluation_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="technical_evaluation_gst_flag" checked={formData.technical_evaluation_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <InputField id="early_settlement_gst_code" label="Early Settlement GST Code" name="early_settlement_gst_code" value={formData.early_settlement_gst_code} onChange={handleChange} />
                      <div className="flex items-center mt-4">
                        <input type="checkbox" name="early_settlement_gst_flag" checked={formData.early_settlement_gst_flag} onChange={handleChange} className="accent-blue-600 h-5 w-5 mr-2" />
                        <label className="text-base text-gray-600">Auto Calculation</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-7">
                  <button
                    type="submit"
                    className="border border-blue-600 text-blue-600 text-lg rounded-tl-xl rounded-br-xl px-8 py-2 font-medium shadow hover:bg-blue-600 hover:text-white transition"
                  >
                    Save
                  </button>
                  <Link to="/allproduct">
                    <button
                      type="button"
                      className="border border-blue-600 text-blue-600 text-lg rounded-tl-xl rounded-br-xl px-8 py-2 font-medium bg-white hover:bg-blue-600 hover:text-white transition"
                    >
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          )}

          {/* ── TAB 2: ACCOUNT DETAIL ── */}
          {activeTab === 1 && (
            <form onSubmit={handleAccountSubmit}>
              <div className="bg-white rounded px-6 py-6">
                {/* Account Details */}
                <div className="text-2xl font-semibold mb-6 mt-1">Account Details</div>
                <div className="grid grid-cols-3 gap-6 mb-10">
                  <InputField id="ac_category_id" label="Category ID" name="category_id" value={accountData.category_id} onChange={handleAccountChange} required />
                  <InputField id="ac_product_name" label="Product Name" name="product_name" value={accountData.product_name} onChange={handleAccountChange} required />
                  <InputField id="principal_account" label="Principal Account" name="principal_account" value={accountData.principal_account} onChange={handleAccountChange} required />
                  <InputField id="interest_income_account" label="Interest Income Account" name="interest_income_account" value={accountData.interest_income_account} onChange={handleAccountChange} required />
                  <InputField id="process_fee_account" label="Process Fee Account" name="process_fee_account" value={accountData.process_fee_account} onChange={handleAccountChange} required />
                  <InputField id="broken_interest" label="Broken Interest" name="broken_interest" value={accountData.broken_interest} onChange={handleAccountChange} required />
                  <InputField id="income_receivable_account" label="Income Receivable Account" name="income_receivable_account" value={accountData.income_receivable_account} onChange={handleAccountChange} required />
                  <InputField id="excess_interest_collection" label="Excess Interest Collection" name="excess_interest_collection" value={accountData.excess_interest_collection} onChange={handleAccountChange} required />
                  <InputField id="disbursemet_cash" label="Disbursement Cash" name="disbursemet_cash" value={accountData.disbursemet_cash} onChange={handleAccountChange} required />
                  <InputField id="interest_reversal" label="Interest Reversal" name="interest_reversal" value={accountData.interest_reversal} onChange={handleAccountChange} required />
                  <InputField id="loan_renewal_account" label="Loan Renewal Account" name="loan_renewal_account" value={accountData.loan_renewal_account} onChange={handleAccountChange} required />
                  <InputField id="npa_interest_ledger_account" label="NPA Interest Ledger Account" name="npa_interest_ledger_account" value={accountData.npa_interest_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="od_interest_ledger_account" label="OD Interest Ledger Account" name="od_interest_ledger_account" value={accountData.od_interest_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="od_interest_receivalbe_account" label="OD Interest Receivable Acc" name="od_interest_receivalbe_account" value={accountData.od_interest_receivalbe_account} onChange={handleAccountChange} required />
                  <InputField id="write_off" label="Write Off" name="write_off" value={accountData.write_off} onChange={handleAccountChange} required />
                  <InputField id="write_off_recovery" label="WriteOff Recovery" name="write_off_recovery" value={accountData.write_off_recovery} onChange={handleAccountChange} required />
                  <InputField id="disbursement_other_charges" label="Disbursement Other Charges Ledger Account" name="disbursement_other_charges" value={accountData.disbursement_other_charges} onChange={handleAccountChange} required />
                  <InputField id="waive_off_ledger_account" label="WaiveOff Ledger Account" name="waive_off_ledger_account" value={accountData.waive_off_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="advance_principle_ledger_account" label="Advance Principle Ledger Account" name="advance_principle_ledger_account" value={accountData.advance_principle_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="other_coll_charges_ledger_account" label="Other Coll Charges Ledger Account" name="other_coll_charges_ledger_account" value={accountData.other_coll_charges_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="principal_share_percent_ledger_account" label="Principal Share Percent Ledger Account" name="principal_share_percent_ledger_account" value={accountData.principal_share_percent_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="interest_share_percent_ledger_account" label="Interest Share Percent Ledger Account" name="interest_share_percent_ledger_account" value={accountData.interest_share_percent_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="lpf_share_percent_ledger_account" label="LPF Share Percent Ledger Account" name="lpf_share_percent_ledger_account" value={accountData.lpf_share_percent_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="loan_fee_pre_coll_ledger_account" label="Loan Fee Pre Coll Ledger Account" name="loan_fee_pre_coll_ledger_account" value={accountData.loan_fee_pre_coll_ledger_account} onChange={handleAccountChange} required />
                </div>

                {/* Charges */}
                <div className="text-2xl font-semibold mb-6 mt-1">Charges</div>
                <div className="grid grid-cols-3 gap-6 mb-10">
                  <InputField id="membership_fee" label="Membership Fee" name="membership_fee" value={accountData.membership_fee} onChange={handleAccountChange} required />
                  <InputField id="legal_fee_ledger_account" label="Legal Fee Ledger Account" name="legal_fee_ledger_account" value={accountData.legal_fee_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="stamp_duty_ledger_account" label="Stamp Duty Ledger Account" name="stamp_duty_ledger_account" value={accountData.stamp_duty_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="ac_document_charges" label="Document Charges" name="document_charges" value={accountData.document_charges} onChange={handleAccountChange} required />
                  <InputField id="other_charges" label="Other Charges" name="other_charges" value={accountData.other_charges} onChange={handleAccountChange} required />
                  <InputField id="ac_application_fee" label="Application Fee" name="application_fee" value={accountData.application_fee} onChange={handleAccountChange} required />
                  <InputField id="ac_technical_evaluation_charges" label="Technical Evaluation Charges" name="technical_evaluation_charges" value={accountData.technical_evaluation_charges} onChange={handleAccountChange} required />
                </div>

                {/* Penalty */}
                <div className="text-2xl font-semibold mb-6 mt-1">Penalty</div>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <InputField id="ac_bounce_charges" label="Bounce Charges" name="bounce_charges" value={accountData.bounce_charges} onChange={handleAccountChange} required />
                  <InputField id="penalty_ledger_account" label="Penalty Ledger Account" name="penalty_ledger_account" value={accountData.penalty_ledger_account} onChange={handleAccountChange} required />
                  <InputField id="settlement_charges" label="Settlement Charges" name="settlement_charges" value={accountData.settlement_charges} onChange={handleAccountChange} required />
                  <InputField id="penal_interest_account" label="Penal Interest Account" name="penal_interest_account" value={accountData.penal_interest_account} onChange={handleAccountChange} required />
                </div>

                <div className="flex gap-4 mt-7">
                  <button
                    type="submit"
                    className="border border-blue-600 text-blue-600 text-lg rounded-tl-xl rounded-br-xl px-8 py-2 font-medium shadow hover:bg-blue-600 hover:text-white transition"
                  >
                    Save
                  </button>
                  <Link to="/allproduct">
                    <button
                      type="button"
                      className="border border-blue-600 text-blue-600 text-lg rounded-tl-xl rounded-br-xl px-8 py-2 font-medium bg-white hover:bg-blue-600 hover:text-white transition"
                    >
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

