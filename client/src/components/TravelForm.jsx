// import React, { useState } from 'react';
// import { Calendar, MapPin, DollarSign, Users, Heart, Home, Car, MessageSquare, ArrowRight, Plus, Trash2 } from 'lucide-react';
// import Button from '../ui/Button';
// import Card from '../ui/Card';
// import Input from '../ui/Input';

// const initialFormData = {
//   fromLocation: '',
//   destination: '',
//   startDate: '',
//   endDate: '',
//   budget: 'mid-range',
//   groupSize: 2,
//   interests: [],
//   accommodationType: 'hotel',
//   transportMode: 'train',
//   specialRequests: '',
//   travelerName: ''
// };

// export default function TravelForm({ onSubmit }) {
//   const [formData, setFormData] = useState(initialFormData);
//   const [step, setStep] = useState(1);
//   const [numDays, setNumDays] = useState(1);
//   const [days, setDays] = useState([{ activities: [], transfers: [] }]);

//   const interestOptions = [
//     'culture', 'food', 'adventure', 'relaxation', 'nightlife', 'shopping', 'nature', 'photography'
//   ];

//   // toggle interest selection
//   const handleInterestToggle = (interest) => {
//     setFormData(prev => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter(i => i !== interest)
//         : [...prev.interests, interest]
//     }));
//   };

//   // Step navigation
//   const handleNext = (e) => {
//     if (e && e.preventDefault) e.preventDefault();
//     if (step === 1) {
//       // basic validation for step 1
//       if (!formData.fromLocation || !formData.destination || !formData.startDate || !formData.endDate) {
//         alert('Please fill required fields: From, Destination, Start Date, End Date.');
//         return;
//       }
//       setStep(3);
//    }// else if (step === 2) {
//     //   // ensure numDays is at least 1
//     //   const val = Math.max(1, parseInt(numDays) || 1);
//     //   setNumDays(val);
//     //   setDays(Array.from({ length: val }, () => ({ activities: [], transfers: [] })));
//     //   setStep(3);
//     // }
//   };

//   const handlePrev = (e) => {
//     if (e && e.preventDefault) e.preventDefault();
//     setStep(prev => Math.max(1, prev - 1));
//   };

//   const handleNumDaysChange = (e) => {
//     const val = Math.max(1, parseInt(e.target.value, 10) || 1);
//     setNumDays(val);
//   };

//   // Activities
//   const handleActivityChange = (dayIdx, actIdx, field, value) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, activities: day.activities.map((act, aIdx) => aIdx === actIdx ? { ...act, [field]: value } : act) }
//         : day
//     ));
//   };

//   const addActivity = (dayIdx) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, activities: [...(day.activities || []), { name: '', description: '', time: '', price: '' }] }
//         : day
//     ));
//   };

//   const removeActivity = (dayIdx, actIdx) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, activities: (day.activities || []).filter((_, aIdx) => aIdx !== actIdx) }
//         : day
//     ));
//   };

//   // Transfers
//   const handleTransferChange = (dayIdx, transIdx, field, value) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, transfers: (day.transfers || []).map((trans, tIdx) => tIdx === transIdx ? { ...trans, [field]: value } : trans) }
//         : day
//     ));
//   };

//   const addTransfer = (dayIdx) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, transfers: [...(day.transfers || []), { type: '', time: '', price: '', peopleAllowed: '' }] }
//         : day
//     ));
//   };

//   const removeTransfer = (dayIdx, transIdx) => {
//     setDays(prev => prev.map((day, dIdx) =>
//       dIdx === dayIdx
//         ? { ...day, transfers: (day.transfers || []).filter((_, tIdx) => tIdx !== transIdx) }
//         : day
//     ));
//   };

//   // helper: convert price to "500 INR" format (if empty return '')
//   const formatToINR = (val) => {
//     if (val === undefined || val === null) return '';
//     const s = String(val).trim();
//     if (s === '') return '';
//     // if already contains INR, return as-is
//     if (/INR$/i.test(s) || /₹/.test(s)) return s;
//     // remove any commas or currency symbols then parse
//     const numeric = s.replace(/[^\d.]/g, '');
//     if (numeric === '') return s;
//     // If it's integer-like, remove trailing .0
//     const n = Number(numeric);
//     if (Number.isNaN(n)) return s;
//     // return in required format "500 INR"
//     // user asked "500 INR" format
//     return `${Math.round(n)} INR`;
//   };

//   // Final submit: build clean object and send to parent
//   const handleFinalSubmit = (e) => {
//     e.preventDefault();

//     // Build full payload
//     const fullData = {
//       travelerName: formData.travelerName || '',
//       fromLocation: formData.fromLocation || '',
//       destination: formData.destination || '',
//       startDate: formData.startDate || '',
//       endDate: formData.endDate || '',
//       budget: formData.budget || 'mid-range',
//       groupSize: Number(formData.groupSize) || 1,
//       interests: Array.isArray(formData.interests) ? formData.interests : [],
//       accommodationType: formData.accommodationType || 'hotel',
//       transportMode: formData.transportMode || 'train',
//       specialRequests: formData.specialRequests || '',
//       days: (days || []).map((day, idx) => ({
//         day: idx + 1,
//         activities: (day.activities || []).map(act => ({
//           name: act.name || '',
//           description: act.description || '',
//           time: act.time || '',
//           price: formatToINR(act.price)
//         })),
//         transfers: (day.transfers || []).map(t => ({
//           type: t.type || '',
//           time: t.time || '',
//           price: formatToINR(t.price),
//           peopleAllowed: t.peopleAllowed || ''
//         }))
//       }))
//     };

//     // Debug log (helps check payload in console)
//     // remove in production if you like
//     // eslint-disable-next-line no-console
//     console.log('FINAL FORM DATA SENT →', fullData);

//     // send to parent
//     if (typeof onSubmit === 'function') {
//       onSubmit(fullData);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">Plan Your Perfect Journey</h2>
//         <p className="text-xl text-gray-600">Tell us your travel dreams and we'll craft the perfect itinerary</p>
//       </div>

//       {/* STEP 1 */}
//       {step === 1 && (
//         <form onSubmit={handleNext}>
//           <Card className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">Your Name</label>
//                 <Input
//                   type="text"
//                   value={formData.travelerName}
//                   onChange={(e) => setFormData(prev => ({ ...prev, travelerName: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <MapPin className="inline w-4 h-4 mr-2" />
//                   From Location
//                 </label>
//                 <Input
//                   type="text"
//                   value={formData.fromLocation}
//                   onChange={(e) => setFormData(prev => ({ ...prev, fromLocation: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                   placeholder="e.g., Delhi, Mumbai"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <MapPin className="inline w-4 h-4 mr-2" />
//                   Dream Destination
//                 </label>
//                 <Input
//                   type="text"
//                   value={formData.destination}
//                   onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                   placeholder="e.g., Paris, Tokyo"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <Calendar className="inline w-4 h-4 mr-2" />
//                   Departure Date
//                 </label>
//                 <Input
//                   type="date"
//                   value={formData.startDate}
//                   onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <Calendar className="inline w-4 h-4 mr-2" />
//                   Return Date
//                 </label>
//                 <Input
//                   type="date"
//                   value={formData.endDate}
//                   onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <DollarSign className="inline w-4 h-4 mr-2" />
//                   Budget Range
//                 </label>
//                 <select
//                   value={formData.budget}
//                   onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                 >
//                   <option value="budget">Budget Friendly (Under 500 INR/day)</option>
//                   <option value="mid-range">Comfortable (500-2000 INR/day)</option>
//                   <option value="luxury">Luxury Experience (2000+ INR/day)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <Users className="inline w-4 h-4 mr-2" />
//                   Number of Travelers
//                 </label>
//                 <Input
//                   type="number"
//                   min="1"
//                   max="20"
//                   value={formData.groupSize}
//                   onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value, 10) || 1 }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-4">
//                 <Heart className="inline w-4 h-4 mr-2" />
//                 What interests you most?
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {interestOptions.map(interest => (
//                   <Button
//                     key={interest}
//                     type="button"
//                     onClick={() => handleInterestToggle(interest)}
//                     className={`px-6 py-3 rounded-xl border-2 transition-all capitalize font-medium ${
//                       formData.interests.includes(interest)
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
//                         : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
//                     }`}
//                   >
//                     {interest}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <Home className="inline w-4 h-4 mr-2" />
//                   Preferred Stay
//                 </label>
//                 <select
//                   value={formData.accommodationType}
//                   onChange={(e) => setFormData(prev => ({ ...prev, accommodationType: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                 >
//                   <option value="hotel">Hotel</option>
//                   <option value="hostel">Hostel</option>
//                   <option value="airbnb">Airbnb</option>
//                   <option value="resort">Resort</option>
//                   <option value="apartment">Apartment</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   <Car className="inline w-4 h-4 mr-2" />
//                   Travel Mode
//                 </label>
//                 <select
//                   value={formData.transportMode}
//                   onChange={(e) => setFormData(prev => ({ ...prev, transportMode: e.target.value }))}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                 >
//                   <option value="train">Train</option>
//                   <option value="bus">Bus</option>
//                   <option value="car">Car</option>
//                   <option value="mixed">Mixed Transport</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 <MessageSquare className="inline w-4 h-4 mr-2" />
//                 Special Requests
//               </label>
//               <Input
//                 type="textarea"
//                 value={formData.specialRequests}
//                 onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
//                 className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg h-32 resize-none"
//                 placeholder="Any dietary requirements, accessibility needs, or special activities you'd like to include..."
//               />
//             </div>

//             <div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 px-8 rounded-xl font-bold text-xl transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center space-x-3"
//               >
//                 <span>Next</span>
//                 <ArrowRight className="w-6 h-6" />
//               </Button>
//             </div>
//           </Card>
//         </form>
//       )}

//       {/* STEP 2: Number of days */}
//       {/* {step === 2 && (
//         <form onSubmit={handleNext}>
//           <Card className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
//             <div>
//               <label className="block text-lg font-semibold text-gray-700 mb-3">How many days is your trip?</label>
//               <Input
//                 type="number"
//                 min="1"
//                 max="30"
//                 value={numDays}
//                 onChange={handleNumDaysChange}
//                 className="w-32 px-4 py-4 border border-gray-200 rounded-xl text-lg"
//                 required
//               />
//             </div>

//             <div className="flex justify-between">
//               <Button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold text-lg">Back</Button>
//               <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-bold text-lg">Next</Button>
//             </div>
//           </Card>
//         </form>
//       )} */}

//       {/* STEP 3: Days / Activities / Transfers */}
//       {step === 3 && (
//         <form onSubmit={handleFinalSubmit}>
//           <Card className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
//             {days.map((day, dayIdx) => (
//               <div key={dayIdx} className="mb-8 border-b pb-8">
//                 <h3 className="text-2xl font-bold text-purple-700 mb-4">Day {dayIdx + 1} Activities</h3>

//                 {(day.activities || []).map((activity, actIdx) => (
//                   <div key={actIdx} className="flex flex-col md:flex-row md:items-end gap-4 mb-4 bg-purple-50 p-4 rounded-xl">
//                     <Input
//                       type="text"
//                       placeholder="Activity Name"
//                       value={activity.name}
//                       onChange={e => handleActivityChange(dayIdx, actIdx, 'name', e.target.value)}
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg"
//                       required
//                     />
//                     <Input
//                       type="text"
//                       placeholder="Description"
//                       value={activity.description}
//                       onChange={e => handleActivityChange(dayIdx, actIdx, 'description', e.target.value)}
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg"
//                     />
//                     <Input
//                       type="text"
//                       placeholder="Time (e.g. Morning, 9:00 AM)"
//                       value={activity.time}
//                       onChange={e => handleActivityChange(dayIdx, actIdx, 'time', e.target.value)}
//                       className="w-40 px-4 py-3 border border-gray-300 rounded-lg text-lg"
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price (INR)"
//                       value={activity.price}
//                       onChange={e => handleActivityChange(dayIdx, actIdx, 'price', e.target.value)}
//                       className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg"
//                     />
//                     <Button type="button" onClick={() => removeActivity(dayIdx, actIdx)} className="text-red-500 hover:bg-red-100 rounded-full p-2">
//                       <Trash2 className="w-5 h-5" />
//                     </Button>
//                   </div>
//                 ))}

//                 <Button type="button" onClick={() => addActivity(dayIdx)} className="flex items-center text-purple-700 hover:text-purple-900 font-semibold mt-2">
//                   <Plus className="w-5 h-5 mr-1" /> Add Activity
//                 </Button>

//                 <h3 className="text-xl font-bold text-blue-700 mt-6 mb-2">Transfers</h3>
//                 {(day.transfers || []).map((transfer, transIdx) => (
//                   <div key={transIdx} className="flex flex-col md:flex-row md:items-end gap-4 mb-4 bg-blue-50 p-4 rounded-xl">
//                     <Input type="text" placeholder="Type" value={transfer.type} onChange={e => handleTransferChange(dayIdx, transIdx, 'type', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
//                     <Input type="text" placeholder="Time" value={transfer.time} onChange={e => handleTransferChange(dayIdx, transIdx, 'time', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
//                     <Input type="number" placeholder="Price (INR)" value={transfer.price} onChange={e => handleTransferChange(dayIdx, transIdx, 'price', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
//                     <Input type="number" placeholder="People Allowed" value={transfer.peopleAllowed} onChange={e => handleTransferChange(dayIdx, transIdx, 'peopleAllowed', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
//                     <Button type="button" onClick={() => removeTransfer(dayIdx, transIdx)} className="text-red-500 hover:bg-red-100 rounded-full p-2"><Trash2 className="w-5 h-5" /></Button>
//                   </div>
//                 ))}

//                 <Button type="button" onClick={() => addTransfer(dayIdx)} className="flex items-center text-blue-700 hover:text-blue-900 font-semibold mt-2"><Plus className="w-5 h-5 mr-1" /> Add Transfer</Button>
//               </div>
//             ))}

//             <div className="flex justify-between">
//               <Button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold text-lg">Back</Button>
//               <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-bold text-lg">Generate Itinerary</Button>
//             </div>
//           </Card>
//         </form>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Calendar, MapPin, DollarSign, Users, Heart, Home, Car, MessageSquare, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

const initialFormData = {
  travelerName: "",
  fromLocation: "",
  destination: "",
  startDate: "",
  endDate: "",
  budget: "mid-range",
  groupSize: 1,
  interests: [],
  accommodationType: "hotel",
  transportMode: "train",
  specialRequests: ""
};

export default function TravelForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);

  const interestOptions = [
    "culture", "food", "adventure", "relaxation",
    "nightlife", "shopping", "nature", "photography"
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.destination || !formData.startDate || !formData.endDate) {
      alert("Please fill required fields.");
      return;
    }
    setStep(2);
  };
const handleFinalSubmit = (e) => {
  e.preventDefault();

  const cleanData = {
    travelerName: formData.travelerName.trim().replace(/^./, str => str.toUpperCase()),
    fromLocation: formData.fromLocation.trim(),
    destination: formData.destination.trim(),
    startDate: formData.startDate,
    endDate: formData.endDate,
    budget: formData.budget,
    groupSize: Number(formData.groupSize),
    interests: formData.interests.length ? formData.interests : ["sightseeing"],
    accommodationType: formData.accommodationType,
    transportMode: formData.transportMode,
    specialRequests: formData.specialRequests.trim() || "none"
  };

  console.log("FINAL CLEAN DATA →", cleanData);
  onSubmit(cleanData);
};

  // const handleFinalSubmit = (e) => {
  //   e.preventDefault();

  //   const cleanData = {
  //     travelerName: formData.travelerName.trim(),
  //     fromLocation: formData.fromLocation.trim(),
  //     destination: formData.destination.trim(),
  //     startDate: formData.startDate,
  //     endDate: formData.endDate,
  //     budget: formData.budget,
  //     groupSize: Number(formData.groupSize),
  //     interests: formData.interests,
  //     accommodationType: formData.accommodationType,
  //     transportMode: formData.transportMode,
  //     specialRequests: formData.specialRequests.trim()
  //     // currency: "INR"
  //   };

  //   console.log("FINAL CLEAN DATA →", cleanData);
  //   onSubmit(cleanData);
  // };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Plan Your Perfect Journey</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleNext}>
          <Card className="p-8 space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="text"
                placeholder="Your Name"
                required
                value={formData.travelerName}
                onChange={e => setFormData({ ...formData, travelerName: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />

              <Input
                type="text"
                placeholder="From Location"
                required
                value={formData.fromLocation}
                onChange={e => setFormData({ ...formData, fromLocation: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />

              <Input
                type="text"
                placeholder="Destination"
                required
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="date"
                required
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
              <Input
                type="date"
                required
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
               <Input
                type="textarea"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-lg h-32 resize-none"
                placeholder="Any dietary requirements, accessibility needs, or special activities you'd like to include..."
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl">
              Next <ArrowRight className="inline ml-2" />
            </Button>

          </Card>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleFinalSubmit}>
          <Card className="p-8 space-y-8">

            <div>
              <label>Budget</label>
              <select
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="budget">Budget Friendly</option>
                <option value="mid-range">Comfortable</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label>Your Interests</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map(i => (
                  <Button
                    key={i}
                    type="button"
                    onClick={() => handleInterestToggle(i)}
                    className={`px-4 py-2 rounded-xl border capitalize ${
                      formData.interests.includes(i)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i}
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 text-white py-4 rounded-lg text-xl">
              Generate Itinerary
            </Button>

          </Card>
        </form>
      )}
    </div>
  );
}
