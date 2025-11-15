import ManagerLayout from '../Layout'
import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { useManager } from '../../../application/hooks/managers/useManager'

export default function Statistics(){
  const data = useMemo(() => ([
    { name: 'Mon', Cancelled: 2, Confirmed: 5, Onqueue: 3 },
    { name: 'Tue', Cancelled: 1, Confirmed: 7, Onqueue: 2 },
    { name: 'Wed', Cancelled: 3, Confirmed: 6, Onqueue: 4 },
    { name: 'Thu', Cancelled: 2, Confirmed: 8, Onqueue: 3 },
    { name: 'Fri', Cancelled: 4, Confirmed: 9, Onqueue: 5 },
    { name: 'Sat', Cancelled: 1, Confirmed: 4, Onqueue: 2 },
    { name: 'Sun', Cancelled: 2, Confirmed: 3, Onqueue: 1 },
  ]), [])

  const {stats,statsLoading,statsError}=useManager();

  console.log("stats :",stats);

  const demoTotals = useMemo(()=>{
    return data.reduce((acc,row)=>({
      Cancelled: acc.Cancelled + row.Cancelled,
      Confirmed: acc.Confirmed + row.Confirmed,
      Onqueue: acc.Onqueue + row.Onqueue,
    }), {Cancelled:0, Confirmed:0, Onqueue:0})
  },[data])

  const totals = useMemo(()=>{
    // Prefer API stats if present; expected fields: confirmed_count, pending_count, rejected_count
    const s = Array.isArray(stats) && stats.length > 0 ? stats[0] : null;
    if(s){
      const Cancelled = Number(s.rejected_count || 0);
      const Confirmed = Number(s.confirmed_count || 0);
      const Onqueue = Number(s.pending_count || 0);
      return { Cancelled, Confirmed, Onqueue };
    }
    return demoTotals;
  },[stats, demoTotals])

  const totalReservations = totals.Cancelled + totals.Confirmed + totals.Onqueue;
  const totalClients = 52; // placeholder demo value; replace with real unique clients count later

  const chartData = useMemo(()=>[
    { name: 'Totals', Cancelled: totals.Cancelled, Confirmed: totals.Confirmed, Onqueue: totals.Onqueue }
  ],[totals])
  

  return (
    <ManagerLayout>
      <div className="adm__section" style={{display:'grid', gap:16}}>
        <h2>Statistics</h2>

        <div className="adm__grid2" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16}}>
          <StatCard title="Cancelled" value={totals.Cancelled} color="#EF4444"/>
          <StatCard title="Confirmed" value={totals.Confirmed} color="#22C55E"/>
          <StatCard title="On queue" value={totals.Onqueue} color="#F59E0B"/>
          <StatCard title="Total reservations" value={totalReservations} color="#6366F1"/>
          {/**<StatCard title="Total clients" value={totalClients} color="#06B6D4"/> */}
        </div>

        <div className="adm__card" style={{height:'520px', display:'flex', flexDirection:'column'}}>
          <div style={{padding:'12px 16px', borderBottom:'1px solid #EEF2F6'}}>
            <h3 style={{margin:0}}>Reservations Totals</h3>
          </div>
          <div style={{flex:1, padding:12}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 14, right: 24, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Cancelled" fill="#EF4444" radius={[4,4,0,0]} />
                <Bar dataKey="Confirmed" fill="#22C55E" radius={[4,4,0,0]} />
                <Bar dataKey="Onqueue" fill="#F59E0B" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ManagerLayout>
  )
}

function StatCard({title, value, color}){
  return (
    <div className="adm__card" style={{display:'grid', gap:6}}>
      <div style={{fontSize:12, color:'#667085'}}>{title}</div>
      <div style={{fontSize:34, fontWeight:800, color:'#111827'}}>{value}</div>
      <div style={{height:6, background:'#F3F4F6', borderRadius:999}}>
        <div style={{height:'100%', width:'100%', background:color, borderRadius:999, opacity:.25}}/>
      </div>
    </div>
  )
}
