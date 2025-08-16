import React, { useMemo, useState, useEffect } from 'react'
import { PlusIcon, FunnelIcon, ArrowDownTrayIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

// --- Dummy initial data
const initialVitals = [
  { id: 1, date: '2024-07-10', type: 'Blood Pressure', value: '120/78', unit: 'mmHg', status: 'normal' },
  { id: 2, date: '2024-07-09', type: 'Heart Rate', value: '88', unit: 'bpm', status: 'elevated' },
  { id: 3, date: '2024-07-08', type: 'Temperature', value: '99.1', unit: '°F', status: 'normal' },
  { id: 4, date: '2024-07-06', type: 'Weight', value: '70.5', unit: 'kg', status: 'normal' },
  { id: 5, date: '2024-07-05', type: 'Blood Sugar', value: '115', unit: 'mg/dL', status: 'elevated' },
]

const initialSymptoms = [
  { id: 101, date: '2024-07-09', symptom: 'Headache', severity: 'mild', notes: 'After long meeting' },
  { id: 102, date: '2024-07-05', symptom: 'Fatigue', severity: 'moderate', notes: 'Tired in morning' },
]

let uid = 200
const nextId = () => ++uid

const parseDateKey = (d) => {
  if (!d) return null
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return null
  return dt.toISOString().slice(0, 10)
}

const parseBP = (s) => {
  if (!s || typeof s !== 'string') return null
  const parts = s.split('/').map(p => Number(p.trim()))
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return { sys: parts[0], dia: parts[1] }
  }
  return null
}

const detectStatus = ({ type, value }) => {
  if (!type || value == null) return 'normal'
  const t = type.toLowerCase()
  if (t.includes('blood pressure')) {
    const bp = parseBP(String(value))
    if (!bp) return 'unknown'
    if (bp.sys >= 140 || bp.dia >= 90) return 'high'
    if (bp.sys <= 90 || bp.dia <= 60) return 'low'
    return 'normal'
  }
  if (t.includes('heart')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n > 100) return 'high'
    if (n < 50) return 'low'
    return 'normal'
  }
  if (t.includes('temperature') || t.includes('temp')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n >= 100.4) return 'high'
    return 'normal'
  }
  if (t.includes('blood sugar') || t.includes('glucose')) {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    if (Number.isNaN(n)) return 'unknown'
    if (n >= 126) return 'high'
    if (n < 70) return 'low'
    return 'normal'
  }
  return 'normal'
}

const toCSV = (rows) => {
  return rows.map(r => r.map(cell => {
    const s = String(cell ?? '')
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }).join(',')).join('\n')
}

const HealthLogs = () => {
  const [activeTab, setActiveTab] = useState('vitals')
  const [vitals, setVitals] = useState(initialVitals)
  const [symptoms, setSymptoms] = useState(initialSymptoms)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    kind: 'vital',
    date: parseDateKey(new Date()),
    type: 'Heart Rate',
    value: '',
    unit: '',
    status: '',
    symptom: '',
    severity: 'mild',
    notes: '',
  })

  const [filterType, setFilterType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [searchText, setSearchText] = useState('')

  const filteredVitals = useMemo(() => {
    const from = parseDateKey(dateFrom)
    const to = parseDateKey(dateTo)
    return vitals.filter(v => {
      if (filterType !== 'all' && v.type !== filterType) return false
      if (from && v.date < from) return false
      if (to && v.date > to) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        if (!(v.type.toLowerCase().includes(q) || String(v.value).toLowerCase().includes(q) || (v.unit || '').toLowerCase().includes(q))) return false
      }
      return true
    }).sort((a,b)=> b.date.localeCompare(a.date))
  }, [vitals, filterType, dateFrom, dateTo, searchText])

  const filteredSymptoms = useMemo(() => {
    const from = parseDateKey(dateFrom)
    const to = parseDateKey(dateTo)
    return symptoms.filter(s => {
      if (from && s.date < from) return false
      if (to && s.date > to) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        if (!(s.symptom.toLowerCase().includes(q) || (s.notes || '').toLowerCase().includes(q))) return false
      }
      return true
    }).sort((a,b)=> b.date.localeCompare(a.date))
  }, [symptoms, dateFrom, dateTo, searchText])

  const summary = useMemo(() => {
    const allLogs = [...vitals, ...symptoms]
    const total = allLogs.length
    const abnormal = vitals.filter(v => v.status && v.status !== 'normal').length
    const lastLog = allLogs.length ? allLogs.reduce((a,b)=> a.date > b.date ? a : b).date : '--'
    const typeCounts = vitals.reduce((acc, v) => { acc[v.type] = (acc[v.type]||0)+1; return acc }, {})
    const mostCommonType = Object.keys(typeCounts).length ? Object.entries(typeCounts).sort((a,b)=> b[1]-a[1])[0][0] : '--'
    return { total, abnormal, lastLog, mostCommonType, typeCounts }
  }, [vitals, symptoms])

  const openAddModal = (kind = 'vital') => {
    setEditing(null)
    setForm({
      kind,
      date: parseDateKey(new Date()),
      type: kind === 'vital' ? 'Heart Rate' : '',
      value: '',
      unit: kind === 'vital' ? 'bpm' : '',
      status: '',
      symptom: '',
      severity: 'mild',
      notes: '',
    })
    setModalOpen(true)
  }

  const openEditModal = (kind, entry) => {
    setEditing({ kind, id: entry.id })
    setForm({
      kind,
      date: parseDateKey(entry.date),
      type: kind === 'vital' ? entry.type : '',
      value: kind === 'vital' ? String(entry.value) : '',
      unit: kind === 'vital' ? (entry.unit || '') : '',
      status: kind === 'vital' ? entry.status || '' : '',
      symptom: kind === 'symptom' ? entry.symptom : '',
      severity: kind === 'symptom' ? entry.severity : 'mild',
      notes: kind === 'symptom' ? (entry.notes || '') : '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
  }

  const handleSave = () => {
    if (form.kind === 'vital') {
      if (!form.type || !form.date || !form.value) {
        alert('Please provide date, type and value for the vital sign.')
        return
      }
      const auto = detectStatus({ type: form.type, value: form.value })
      const status = form.status && form.status !== 'auto' ? form.status : auto
      if (editing) {
        setVitals(prev => prev.map(v => v.id === editing.id ? { ...v, date: form.date, type: form.type, value: form.value, unit: form.unit, status } : v))
      } else {
        const newEntry = { id: nextId(), date: form.date, type: form.type, value: form.value, unit: form.unit, status }
        setVitals(prev => [newEntry, ...prev])
      }
    } else {
      if (!form.symptom || !form.date) {
        alert('Please provide symptom and date.')
        return
      }
      if (editing) {
        setSymptoms(prev => prev.map(s => s.id === editing.id ? { ...s, date: form.date, symptom: form.symptom, severity: form.severity, notes: form.notes } : s))
      } else {
        const newSym = { id: nextId(), date: form.date, symptom: form.symptom, severity: form.severity, notes: form.notes }
        setSymptoms(prev => [newSym, ...prev])
      }
    }
    closeModal()
  }

  const handleDelete = (kind, id) => {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    if (kind === 'vital') setVitals(prev => prev.filter(v => v.id !== id))
    else setSymptoms(prev => prev.filter(s => s.id !== id))
  }

  const exportCSV = () => {
    const rows = [['Date', 'Type', 'Value', 'Unit', 'Status'], ...vitals.map(v => [v.date, v.type, v.value, v.unit, v.status])]
    const csv = toCSV(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `vitals_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const vitalTypes = useMemo(() => {
    const set = new Set(vitals.map(v => v.type))
    return ['all', ...Array.from(set)]
  }, [vitals])

  useEffect(()=> {
    setFilterType('all')
    setDateFrom('')
    setDateTo('')
    setSearchText('')
  }, [activeTab])

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Health Logs</h2>
        <div className="flex gap-3">
          <button
            onClick={() => openAddModal(activeTab === 'vitals' ? 'vital' : 'symptom')}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Entry</span>
          </button>
          {activeTab === 'vitals' && (
            <button
              onClick={exportCSV}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Logs</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{summary.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Abnormal Vitals</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{summary.abnormal}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Log Date</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{summary.lastLog || '--'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Top Vital Type</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{summary.mostCommonType || '--'}</p>
        </div>
      </div>

      {/* Type breakdown */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Log Type Breakdown</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(summary.typeCounts).length ? (
            Object.entries(summary.typeCounts).map(([type, count]) => (
              <div key={type} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">{type}</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({count})</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400">No vitals recorded yet.</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vitals')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'vitals' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Vital Signs
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'symptoms' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Symptoms
          </button>
        </nav>
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          {activeTab === 'vitals' ? (
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {vitalTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          ) : (
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="all">All</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 dark:text-gray-400">From</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          <label className="text-sm text-gray-500 dark:text-gray-400">To</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>

        <div className="flex items-center ml-auto">
          <input type="search" placeholder="Search..." value={searchText} onChange={e => setSearchText(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full md:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
        </div>
      </div>

      {/* Content container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === 'vitals' && (
          <div className="p-6 space-y-4">
            {filteredVitals.length === 0 && <div className="text-center text-gray-500 dark:text-gray-400 py-8">No vitals match your filters.</div>}
            {filteredVitals.map((v) => (
              <div key={v.id} className={`flex items-center justify-between p-4 rounded-lg ${
                v.status === 'high' ? 'bg-red-50 dark:bg-red-900/20' 
                : v.status === 'low' ? 'bg-yellow-50 dark:bg-yellow-900/20' 
                : 'bg-gray-50 dark:bg-gray-700'
              }`}>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{v.type}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{v.date}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{v.value} {v.unit}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    v.status === 'normal' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : v.status === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : v.status === 'low' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {v.status || 'unknown'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal('vital', v)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                      <PencilSquareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button onClick={() => handleDelete('vital', v.id)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                      <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div className="p-6 space-y-4">
            {filteredSymptoms.length === 0 && <div className="text-center text-gray-500 dark:text-gray-400 py-8">No symptoms match your filters.</div>}
            {filteredSymptoms.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{s.symptom}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.date}</p>
                  {s.notes && <p className="text-sm text-gray-400 dark:text-gray-500">{s.notes}</p>}
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    s.severity === 'mild' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : s.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {s.severity}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal('symptom', s)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                      <PencilSquareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button onClick={() => handleDelete('symptom', s.id)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                      <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 dark:bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{editing ? 'Edit Entry' : 'Add Entry'}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
              </div>

              {form.kind === 'vital' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <input type="text" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value</label>
                        <input
                          type="text"
                           value={form.value}
                             onChange={e => /^[0-9+\-*/%.]*$/.test(e.target.value) && setForm(f => ({ ...f, value: e.target.value }))}
                           className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />

                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                      <input type="text" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <option value="auto">Auto-detect</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </>
              )}

              {form.kind === 'symptom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symptom</label>
                    <input type="text" value={form.symptom} onChange={e => setForm(f => ({ ...f, symptom: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                    <select value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                    <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" rows="3" />
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Cancel</button>
              <button onClick={handleSave} className="btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HealthLogs