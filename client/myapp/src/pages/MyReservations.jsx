import { useQueryClient } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useClient } from '../application/hooks/clients/useClient';
import '../styles/pages/MyReservations.css';

export default function MyReservations() {
  const queryClient = useQueryClient();
  const { myReservations, isLoading, isError } = useClient();
  const { upcoming = [], past = [] } = myReservations || {};

  const statusInfo = (s) => {
    switch (s) {
      case 0: return { label: 'On queue', color: '#f59e0b' };
      case -1: return { label: 'Cancelled', color: '#ef4444' };
      case 1: return { label: 'Completed', color: '#10b981' };
      default: return { label: 'Unknown', color: '#6b7280' };
    }
  };

  const StatusBadge = ({ status }) => {
    const { label, color } = statusInfo(status);
    return (
      <span style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        color: '#fff',
        backgroundColor: color,
        marginLeft: 8
      }}>{label}</span>
    );
  };

  if (isLoading) return <p>Loading reservations...</p>;
  if (isError) return <p>Error loading reservations.</p>;

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <h1>My Reservations</h1>

        <section>
          <h2>Upcoming</h2>
          <ul className="reservations">
            {upcoming.length === 0 ? (
              <li>No upcoming reservations.</li>
            ) : (
              upcoming.map(r => (
                <li key={r.idreservation} className="reservation-item">
                  <span>{r.date} • {r.hour}h</span>
                  <StatusBadge status={r.status} />
                  {/**
                   *                   <button
                    onClick={async () => {
                      await cancelReservation(r.idreservation);
                      queryClient.invalidateQueries(['myReservations']);
                    }}
                  >
                    Cancel
                  </button>
                   */}
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <h2>Past</h2>
          <ul className="reservations">
            {past.length === 0 ? (
              <li>No past reservations.</li>
            ) : (
              past.map(r => (
                <li key={r.idreservation} className="reservation-item">
                  <span>{r.date} • {r.hour}h</span>
                  <StatusBadge status={r.status} />
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
