import AdminSidebar from './Sidebar'
import '../../styles/modules/admin.css'

export default function AdminLayout({ children }) {
  return (
    <div className="adm__layout">
      <AdminSidebar />
      <main className="adm__content">
        {children}
      </main>
    </div>
  )
}
